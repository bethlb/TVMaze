let testData = require('../testData/statusTestData')
let searchForItem = require('../functions/searchForItem')
let clearFollowlist = require('../functions/clearFollowlist')
let arrEquals = require('../functions/arrEquals')
let TVMazePage = {}
var shows = []
displayedShows = []
var showStatus = []
var showListLength = 0
var newShowListLength = 0

module.exports = {
    // Login to TVMaze and start with an empty Watchlist
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
            .loginToTVMaze(browser)
        clearFollowlist(TVMazePage, browser)
        browser.pause(8000)
    },

    beforeEach: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        TVMazePage.navigate()
            .waitForElementVisible('#logo', 8000)
        browser.pause(8000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-164 Follow shows and verify in Status list with correct status': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-164

        testData.showStatusInputAndResults.forEach(test => {
            searchForItem(TVMazePage, test.input)
            TVMazePage.click('@followIcon')
            browser.back()
            TVMazePage.clearValue('@searchInput')
            browser.pause(5000)
        })

        TVMazePage
            .click('@toolsButton')
            .click('@showStatusButton')

        browser.perform(function () {
            shows = []
            showStatus = []
        })

        browser.useXpath()
        browser.elements('xpath', '//td[@data-title="Show"]', function (result) {
            showListLength = result.value.length
            browser.perform(function () {
                for (i = 1; i <= showListLength; i++) {
                    browser.getText(`//*[@id="w0"]/table/tbody/tr[${i}]/td[1]/a`, function (txt) {
                        shows.push(txt.value)
                    })
                    browser.getText(`//*[@id="w0"]/table/tbody/tr[${i}]/td[4]`, function (txt) {
                        showStatus.push(txt.value)
                    })
                }
            })
        })

        browser.perform(function () {
            browser.verify.ok(testData.showStatusInputAndResults.length == showListLength, 'Show Status List Length is Correct')
        })

        testData.showStatusInputAndResults.forEach(test => {
            browser.perform(function () {
                for (let i = 0; i < showListLength; i++) {
                    browser.perform(function () {
                        if (test.input == shows[i]) {
                            browser.verify.ok(test.result == showStatus[i], 'Show has correct status')
                        }
                    })
                }
            })
        })
        browser.useCss()
    },

    'QOBB-164 Unfollow subset of shows and verify Show Status list': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-164 

        testData.showsToAddandRemoveFromWatchlist.forEach(test => {
            searchForItem(TVMazePage, test.input)
            TVMazePage.click('@unfollowIcon')
            TVMazePage.clearValue('@searchInput')
            browser.perform(function () {
                for (let i = 0; i < showListLength; i++) {
                    browser.perform(function () {
                        if (test.input == shows[i]) {
                            shows.splice(i, 1);
                        }
                    })
                }
            })
            browser.pause(4000)
        })

        TVMazePage
            .click('@toolsButton')
            .click('@showStatusButton')

        browser.useXpath()
        browser.elements('xpath', '//td[@data-title="Show"]', function (result) {
            showListLength = result.value.length
            browser.perform(function () {
                for (i = 1; i <= showListLength; i++) {
                    browser.getText(`//*[@id="w0"]/table/tbody/tr[${i}]/td[1]/a`, function (txt) {
                        displayedShows.push(txt.value)
                    })
                }
            })
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, shows, displayedShows), 'Show Status List items are correct')
        })
        browser.pause(2000)
        browser.perform(function () {
            browser.verify.ok(testData.showsToAddandRemoveFromWatchlist.length == showListLength, 'Show Status List Length is Correct')
        })
        browser.useCss()
    },

    'QOBB-164 Follow removed shows and verify they are added to Show Status list': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-164

        testData.showStatusInputAndResults.forEach(test => {
            searchForItem(TVMazePage, test.input)
            browser.pause(8000)
            TVMazePage.click('@followIcon')
            browser.back()
            TVMazePage.clearValue('@searchInput')
            shows.push(test.input)
        })
        newShowListLength = showListLength + testData.showsToAddandRemoveFromWatchlist.length

        TVMazePage
            .click('@toolsButton')
            .click('@showStatusButton')

        browser.useXpath()
        browser.elements('xpath', '//td[@data-title="Show"]', function (result) {
            showListLength = result.value.length
            browser.perform(function () {
                for (i = 1; i <= showListLength; i++) {
                    browser.getText(`//*[@id="w0"]/table/tbody/tr[${i}]/td[1]/a`, function (txt) {
                        displayedShows.push(txt.value)
                    })
                }
            })
        })

        browser.perform(function () {
            browser.verify.ok(arrEquals(browser, shows, displayedShows), 'Show Status List items are correct')
            browser.pause(2000)
        })
        browser.pause(2000)
        browser.perform(function () {
            browser.verify.ok(newShowListLength == showListLength, 'Show Status List Length is Correct')
        })
        browser.useCss()
    },

    'QOBB-164 Unfollow all shows and verify Show Status list is Empty': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-164

        TVMazePage
            .click('@toolsButton')
            .click('@showStatusButton')
            .waitForElementVisible('@showStatusHeading', 2000)

        browser.useXpath()
        browser.elements('xpath', '//td[@data-title="Show"]', function (result) {
            showListLength = result.value.length
        })

        browser.perform(function () {
            for (i = 1; i <= showListLength; i++) {
                browser.click('//*[@id="w0"]/table/tbody/tr[1]/td[1]/a')
                TVMazePage.click('@unfollowIcon')
                    .click('@toolsButton')
                    .click('@showStatusButton')
                    .waitForElementVisible('@showStatusHeading', 2000)
                browser.pause(4000)    
            }
        })
        browser.perform(function () {
            browser.elements('xpath', '//td[@data-title="Show"]', function (result) {
                showListLength = result.value.length
            })
        })
        browser.perform(function () {
            browser.verify.ok(showListLength == 0, 'Show Status List is empty')
        })
        browser.useCss()
    }
}    