let testData = require('../testData/searchTestData')
let searchForItem = require('../functions/searchForItem')
let TVMazePage = {}

module.exports = {
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
            .loginToTVMaze(browser)
    },

    beforeEach: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        TVMazePage.navigate()
            .waitForElementVisible('#logo', 2000)
        browser.pause(8000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-161 Show Search': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-161
        //  Search valid shows

        testData.showInputAndResults.forEach(test => {
            searchForItem(TVMazePage, test.input)
            browser.elements('xpath', '//span[@class="showname"]', function (result) {
                browser.verify.ok(result.value.length == test.results.length)
            })
            for (i = 0; i < test.results.length; i++) {
                browser.useXpath()
                browser.verify.elementPresent(`//a[contains(@href,"shows")][text()="${test.results[i]}"]`)
            }
            TVMazePage.clearValue('@searchInput')
            browser.pause(6000)
        })
    },

    'QOBB-161 People Search': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-161 
        //  Search valid people

        testData.peopleInputAndResults.forEach(test => {
            searchForItem(TVMazePage, test.input)
            browser.elements('xpath', '//*[@id="w1"]/div]', function (result) {
                browser.verify.ok(result.value.length == test.results.length)
            })
            for (i = 0; i < test.results.length; i++) {
                browser.useXpath()
                browser.verify.elementPresent(`//a[contains(@href,"people")][text()="${test.results[i]}"]`)
            }
            TVMazePage.clearValue('@searchInput')
            browser.pause(6000)
        })
    },

    'QOBB-161 Empty Search': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-161 
        // Search gives empty results

        testData.emptySearchInputs.forEach(test => {
            searchForItem(TVMazePage, test.input)
            TVMazePage.waitForElementVisible('@searchListHeading', 5000)
            // Verify error message is present
            browser.verify.elementPresent('#search > article > div.callout.primary > i')
            TVMazePage.clearValue('@searchInput')
        })
    },
}




