let testData = require('../testData/followTestData')
let searchForItem = require('../functions/searchForItem')
let clearFollowlist = require('../functions/clearFollowlist')
let firstWordsToUpperCase = require('../functions/firstWordsToUpperCase')
let arrEquals = require('../functions/arrEquals')
let TVMazePage = {}
var shows = []
var people = []
var networks = []
var webchannels = []
var displayedItems = []
var listLength = 0
var input = ''

module.exports = {
    // Login to TVMaze and start with an empty Watchlist
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
            .loginToTVMaze(browser)
        clearFollowlist(TVMazePage, browser)
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

    'QOBB-165 No items in Follow List': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-165

        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 2000)
        browser
            .verify.elementNotPresent('#follow-list > ol > li')
        TVMazePage
            .verify.elementPresent('@showsEmptyFollowMsg')
            .verify.elementPresent('@peopleEmptyFollowMsg')
            .verify.elementPresent('@networksEmptyFollowMsg')
            .verify.elementPresent('@webchannelsEmptyFollowMsg')
    },

    'QOBB-165 Follow Shows, People, Networks and Web Channels and verify Follow List': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-165

        browser.perform(function () {
            shows = []
            people = []
            networks = []
            webchannels = []
            displayedItems = []
            input = ''
        })

        // Follow Shows
        browser.perform(function () {
            testData.showInputs.forEach(test => {
                searchForItem(TVMazePage, test.input)
                browser.pause(6000)
                TVMazePage.click('@followIcon')
                browser.back()
                TVMazePage.clearValue('@searchInput')
                browser.perform(function () {
                    input = firstWordsToUpperCase(TVMazePage, test.input)
                })
                browser.perform(function () {
                    shows.push(input)
                })
            })
        })

        // Follow People
        browser.perform(function () {
            testData.peopleInputs.forEach(test => {
                searchForItem(TVMazePage, test.input)
                TVMazePage.click('@personName')
                    .waitForElementVisible('@peopleListHeading', 20000)
                browser.pause(6000)
                TVMazePage.click('@firstFollowIcon')
                browser.pause(6000)
                browser.back()
                TVMazePage.clearValue('@searchInput')
                browser.perform(function () {
                    input = firstWordsToUpperCase(TVMazePage, test.input)
                })
                browser.perform(function () {
                    people.push(input)
                })
            })
        })

        // Follow Networks
        TVMazePage.click('@networksButton')
            .waitForElementVisible('@networksListHeading', 20000)
        browser.perform(function () {
            testData.networkInputs.forEach(test => {
                browser.useXpath()
                browser.click(`//a[text()="${test.input}"]`)
                browser.pause(6000)
                TVMazePage.click('@firstFollowIcon')
                browser.back()
                browser.perform(function () {
                    networks.push(test.input)
                })
                browser.pause(6000)
            })
        })

        // Follow Web Channels
        TVMazePage.click('@webChannelsButton')
            .waitForElementVisible('@webchannelsListHeading', 20000)
        browser.perform(function () {
            testData.webchannelInputs.forEach(test => {
                browser.useXpath()
                browser.click(`//a[text()="${test.input}"]`)
                browser.pause(6000)
                TVMazePage.click('@firstFollowIcon')
                browser.back()
                browser.perform(function () {
                    webchannels.push(test.input)
                })
                browser.pause(6000)
            })
        })

        // Verify Shows are correct in Follow List
        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 4000)
        browser.useXpath()
        browser.elements('xpath', '//*[@id="follow-list"]/ol[1]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[1]/li[${i}]/span[1]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, shows, displayedItems), 'Show Follow List items are correct')
        })
        browser.pause(4000)
        browser.perform(function () {
            browser.verify.ok(testData.showInputs.length == listLength, 'Show Follow List Length is Correct')
        })

        // Verify People are correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 4000)
        browser.useXpath()
        browser.elements('xpath', '//*[@id="follow-list"]/ol[2]/li', function (result) {
            listLength = result.value.length
            browser.perform(function () {
                for (i = 1; i <= listLength; i++) {
                    browser.getText(`//*[@id="follow-list"]/ol[2]/li[${i}]/a`, function (txt) {
                        displayedItems.push(txt.value)
                    })
                }
            })
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, people, displayedItems), 'People Follow List items are correct')
        })
        browser.pause(2000)
        browser.perform(function () {
            browser.verify.ok(testData.peopleInputs.length == listLength, 'People Follow List Length is Correct')
        })

        // Verify Networks are correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 2000)
        browser.useXpath()
        browser.elements('xpath', '//*[@id="follow-list"]/ol[3]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[3]/li[${i}]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, networks, displayedItems), 'Networks Follow List items are correct')
        })
        browser.pause(2000)
        browser.perform(function () {
            browser.verify.ok(testData.networkInputs.length == listLength, 'Networks Follow List Length is Correct')
        })

        // Verify Web Channels are correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 2000)
        browser.useXpath()
        browser.elements('xpath', '//*[@id="follow-list"]/ol[4]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[4]/li[${i}]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, webchannels, displayedItems), 'Web Channels Follow List items are correct')
        })
        browser.pause(2000)
        browser.perform(function () {
            browser.verify.ok(testData.webchannelInputs.length == listLength, 'Web Channels Follow List Length is Correct')
        })
        browser.useCss()
    },

    'QOBB-165 Unfollow some Shows. People, Networks and Web Channels and verify Follow list': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-165

        // Unfollow some Shows
        browser.perform(function () {
            testData.showsToAddandRemoveFromFollowlist.forEach(test => {
                searchForItem(TVMazePage, test.input)
                browser.pause(4000)
                TVMazePage.click('@unfollowIcon')
                browser.perform(function () {
                    TVMazePage.clearValue('@searchInput')
                    browser.perform(function () {
                        input = firstWordsToUpperCase(TVMazePage, test.input)
                    })
                    browser.perform(function () {
                        listLength = shows.length
                    })
                    browser.perform(function () {
                        for (let i = 0; i < listLength; i++) {
                            browser.perform(function () {
                                if (input == shows[i]) {
                                    shows.splice(i, 1);
                                }
                            })
                        }
                    })
                    browser.pause(4000)
                })
            })
        })

        // Unfollow some People
        browser.perform(function () {
            testData.peopleToAddandRemoveFromFollowlist.forEach(test => {
                searchForItem(TVMazePage, test.input)
                browser.pause(2000)
                TVMazePage.click('@personName')
                    .waitForElementVisible('@peopleListHeading', 4000)
                TVMazePage.click('@unfollowIcon')
                browser.perform(function () {
                    TVMazePage.clearValue('@searchInput')
                    browser.perform(function () {
                        input = firstWordsToUpperCase(TVMazePage, test.input)
                    })
                    browser.perform(function () {
                        listLength = people.length
                    })
                    browser.perform(function () {
                        for (let i = 0; i < listLength; i++) {
                            browser.perform(function () {
                                if (input == people[i]) {
                                    people.splice(i, 1);
                                }
                            })
                        }
                    })
                    browser.pause(4000)
                })
            })
        })

        // Unfollow some networks
        browser.perform(function () {
            testData.networksToAddandRemoveFromFollowlist.forEach(test => {
                TVMazePage.click('@networksButton')
                    .waitForElementVisible('@networksListHeading', 4000)
                browser.useXpath()
                browser.click(`//a[text()="${test.input}"]`)
                browser.pause(2000)
                TVMazePage.click('@unfollowIcon')
                browser.perform(function () {
                    for (let i = 0; i < listLength; i++) {
                        browser.perform(function () {
                            if (test.input == networks[i]) {
                                networks.splice(i, 1);
                            }
                        })
                    }
                })
                browser.pause(8000)
            })
        })

        // Unfollow some Web Channels
        browser.perform(function () {
            testData.webchannelsToAddandRemoveFromFollowlist.forEach(test => {
                TVMazePage.click('@webChannelsButton')
                    .waitForElementVisible('@webchannelsListHeading', 4000)
                browser.useXpath()
                browser.click(`//a[text()="${test.input}"]`)
                browser.pause(2000)
                TVMazePage.click('@unfollowIcon')
                browser.perform(function () {
                    listLength = webchannels.length
                })
                browser.perform(function () {
                    for (let i = 0; i < listLength; i++) {
                        browser.perform(function () {
                            if (test.input == webchannels[i]) {
                                webchannels.splice(i, 1);
                            }
                        })
                    }
                })
                browser.pause(8000)
            })
        })

        // Verify Shows Correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        TVMazePage
            .click('@tools')
            .click('@followsButton')
            .waitForElementVisible('@followlistHeading', 4000)
        browser.useXpath()
        browser.elements('xpath', '//*[@id="follow-list"]/ol[1]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[1]/li[${i}]/span[1]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })
        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, shows, displayedItems), 'Shows correct in Follow List')
        })

        // Verify People Correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        browser.elements('xpath', '//*[@id="follow-list"]/ol[2]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[2]/li[1]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })
        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, people, displayedItems), 'People correct in Follow List')
        })

        // Verify Networks Correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        browser.elements('xpath', '//*[@id="follow-list"]/ol[3]/li', function (result) {
            listLength = result.value.length
            browser.perform(function () {
                for (i = 1; i <= listLength; i++) {
                    browser.getText(`//*[@id="follow-list"]/ol[3]/li[1]/a`, function (txt) {
                        displayedItems.push(txt.value)
                    })
                }
            })
        })
        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, networks, displayedItems), 'Networks correct in Follow List')
        })

        // Verify Web Channels Correct in Follow List
        browser.perform(function () {
            displayedItems = []
        })
        browser.elements('xpath', '//*[@id="follow-list"]/ol[4]/li', function (result) {
            listLength = result.value.length
            for (i = 1; i <= listLength; i++) {
                browser.getText(`//*[@id="follow-list"]/ol[4]/li[1]/a`, function (txt) {
                    displayedItems.push(txt.value)
                })
            }
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, webchannels, displayedItems), 'Web Channels correct in Follow List')
        })
        browser.useCss()
    },

    'QOBB-164 Unfollow remaining shows, people, networks and webchannels and verify Follow list is Empty': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-165

        clearFollowlist(TVMazePage, browser)
        browser
            .verify.elementNotPresent('#follow-list > ol > li')
            .useCss()
    }
}  