let testData = require('../testData/browseTestData')
let sortAscending = require('../functions/sortAscending')
let sortDescending = require('../functions/sortDescending')
let arrEquals = require('../functions/arrEquals')
let TVMazePage = {}
var networks = []
var networksOrig = []
var sortedNetworks = []

module.exports = {
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
            .loginToTVMaze(browser)
    },

    beforeEach: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        TVMazePage.navigate()
            .waitForElementVisible('#logo', 5000)
        browser.pause(8000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-162 Browse': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-162 

        //  Go to Networks, select Country and Sort filters

        TVMazePage
            .click('@networksButton')
            .waitForElementVisible('@networksHeading', 8000)
        browser.pause(10000)

        testData.countryInputs.forEach(test => {
            browser.useXpath()
                .click(`//*[@id="network-country_enum"]/option[text()="${test.input}"]`)
            TVMazePage
                // .setValue('@networksCountry', test.input)
                .setValue('@networksSort', 'A-Z')
                .click('button[class="button round"]')
                .waitForElementVisible('@networksHeading', 8000)

            // Verify A-Z sorting is correct
            browser.pause(10000)
            browser.elements('css selector', '.title > h2 > a', function (result) {
                browser.perform(function () {
                    for (i = 1; i <= result.value.length; i++) {
                        browser.useXpath()
                        browser.getText(`//*[@id="w1"]/div[${i}]/div/div/span/h2/a`, function (txt) {
                            networks.push(txt.value.toUpperCase())
                        })
                        browser.useCss()
                    }
                })
            })

            browser.perform(function () {
                networksOrig = networks.slice()
                sorter = sortAscending(browser, '*!@_.()#^&%-=+01234567989ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                sortedNetworks = networks.sort(sorter)
                browser.verify.ok(arrEquals(browser, networksOrig, sortedNetworks), `Networks are sorted correctly A-Z for Country: ${test.input}`)
            })

            // Select Z-A filter

            TVMazePage
                .setValue('@networksSort', 'Z-A')
                .click('button[class="button round"]')
                .waitForElementVisible('@networksHeading', 5000)

            // Verify Z-A sorting is correct

            browser.perform(function () {
                networks = []
                networksOrig = []
                sortedNetworks = []
            })
            browser.pause(10000)
            browser.elements('css selector', '.title > h2 > a', function (result) {
                browser.perform(function () {
                    for (i = 1; i <= result.value.length; i++) {
                        browser.useXpath()
                        browser.getText(`//*[@id="w1"]/div[${i}]/div/div/span/h2/a`, function (txt) {
                            networks.push(txt.value.toUpperCase())
                        })
                        browser.useCss()
                    }
                })
            })

            browser.perform(function () {
                networksOrig = networks.slice()
                sorter = sortDescending(browser, '*!@_.()#^&%-=+01234567989ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                sortedNetworks = networks.sort(sorter)
                browser.verify.ok(arrEquals(browser, networksOrig, sortedNetworks), `Networks are sorted correctly Z-A for Country: ${test.input}`)
            })
            browser.perform(function () {
                networks = []
                networksOrig = []
                sortedNetworks = []
            })
            browser.pause(15000)
        })
    }
}