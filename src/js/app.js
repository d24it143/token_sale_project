App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 750000,

    init: function () {
        console.log("App initialized...");
        return App.initWeb3();
    },

    initWeb3: async function () {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({ method: "eth_requestAccounts" });
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        console.log("Web3 Provider set to:", App.web3Provider);
        web3 = new Web3(App.web3Provider);
        console.log("Web3 instance created:", web3.version);
        return App.initContracts();
    },

    initContracts: function () {
        $.getJSON("DappTokenSale.json", function (dappTokenSale) {
            App.contracts.DappTokenSale = TruffleContract(dappTokenSale);
            App.contracts.DappTokenSale.setProvider(App.web3Provider);
            App.contracts.DappTokenSale.deployed().then(function (dappTokenSale) {
                console.log("Dapp Token Sale Address:", dappTokenSale.address);
            }).catch(function (error) {
                console.warn("DappTokenSale not deployed to current network");
            });
        }).done(function () {
            $.getJSON("DappToken.json", function (dappToken) {
                App.contracts.DappToken = TruffleContract(dappToken);
                App.contracts.DappToken.setProvider(App.web3Provider);
                App.contracts.DappToken.deployed().then(function (dappToken) {
                    console.log("Dapp Token Address:", dappToken.address);
                }).catch(function (error) {
                    console.warn("DappToken not deployed to current network");
                });
                App.listenForEvents();
                return App.render();
            });
        }).fail(function () {
            console.error("Could not load contract JSON files.");
            $('#loader').html('<p class="text-danger">Could not load contract data. Make sure files are in build/contracts/.</p>');
        });
    },

    // Listen for events emitted from the contract
    listenForEvents: function () {
        App.contracts.DappTokenSale.deployed().then(function (instance) {
            instance.Sell({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function (error, event) {
                console.log("event triggered", event);
                App.render();
            });
        });
    },

    render: function () {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getAccounts(function (err, accounts) {
            if (err === null && accounts.length > 0) {
                App.account = accounts[0];
                $('#accountAddress').html("Your Account: " + App.account);
            } else if (err) {
                console.error("Could not get accounts:", err);
            }
        });

        // Load token sale contract
        App.contracts.DappTokenSale.deployed().then(function (instance) {
            dappTokenSaleInstance = instance;
            return dappTokenSaleInstance.tokenPrice();
        }).then(function (tokenPrice) {
            App.tokenPrice = tokenPrice;
            var priceInEth = web3.utils ? web3.utils.fromWei(App.tokenPrice.toString(), "ether") : web3.fromWei(App.tokenPrice, "ether");
            $('.token-price').html(priceInEth);
            return dappTokenSaleInstance.tokensSold();
        }).then(function (tokensSold) {
            App.tokensSold = tokensSold.toNumber();
            $('.tokens-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokensAvailable);

            var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%');

            // Load token contract
            return App.contracts.DappToken.deployed();
        }).then(function (instance) {
            dappTokenInstance = instance;
            return dappTokenInstance.balanceOf(App.account);
        }).then(function (balance) {
            $('.dapp-balance').html(balance.toNumber());
            App.loading = false;
            loader.hide();
            content.show();
        }).catch(function (err) {
            console.error("Error in render:", err);
            App.loading = false;
            loader.show();
            loader.html('<div class="alert alert-danger"><h5>Connection Error</h5>' +
                '<p>Contract not found on current network. Please check:</p>' +
                '<ul><li>MetaMask is on port <b>7545</b></li>' +
                '<li>You ran <code>truffle migrate --reset</code></li></ul>' +
                '<button class="btn btn-sm btn-outline-danger mt-2" onclick="location.reload()">Retry</button></div>');
        });
    },

    buyTokens: function () {
        $('#content').hide();
        $('#loader').show();
        var numberOfTokens = $('#numberOfTokens').val();
        App.contracts.DappTokenSale.deployed().then(function (instance) {
            return instance.buyTokens(numberOfTokens, {
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000 // Gas limit
            });
        }).then(function (result) {
            console.log("Tokens bought...");
            $('form').trigger('reset'); // reset number of tokens in form
            // Wait for Sell event or just reload
            // App.render(); // event listener will handle this
        });
    }
};

$(function () {
    $(window).on('load', function () {
        App.init();
    });
});
