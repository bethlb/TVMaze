let searchForItem = require('../functions/searchForItem')
let clearFollowlist = require('../functions/clearFollowlist')
let TVMazePage = {}

module.exports = {
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
            .loginToTVMaze(browser)
        clearFollowlist(TVMazePage, browser)
        browser.pause(4000)
    },

    beforeEach: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        TVMazePage.navigate()
            .waitForElementVisible('#logo', 10000)
        browser.pause(4000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-163 Add Series to Watchlist': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-163 

        // Add series to Watchlist and verify they appear in Tools -> Watchlist

        searchForItem(TVMazePage, 'enlightened')
        browser.pause(4000)
        TVMazePage
            .click('@followIcon')
            .clearValue('@searchInput')
        searchForItem(TVMazePage, 'dead like me')
        browser.pause(4000)
        TVMazePage
            .click('@followIcon')
            .clearValue('@searchInput')
        searchForItem(TVMazePage, 'firefly')
        browser.pause(4000)
        TVMazePage
            .click('@followIcon')
            .clearValue('@searchInput')
            .click('@tools')
            .click('@watchlistButton')
            .waitForElementVisible('@watchlistHeading', 10000)
        browser.useXpath()
        browser.pause(6000)
            .verify.elementPresent('//a[text()="Enlightened"]')
            .verify.elementPresent('//a[text()="Dead Like Me"]')
            .verify.elementPresent('//a[text()="Firefly"]')
            .elements('css selector', 'div > h2 > a', function (result) {
                browser.verify.ok(`${result.value.length}` == 3, 'Watchlist length is correct')
            })
            .useCss()
    },

    'QOBB-163 Add Watchlist episode settings': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-163 

        // Watchlist settings can be set (Acquired, Watched or Skipped)

        searchForItem(TVMazePage, 'firefly')
        browser.pause(4000)
        TVMazePage
            .waitForElementVisible('@searchListHeading', 10000)
        browser.useXpath()
            .click('//a[text()="Firefly"]')
        TVMazePage
            .waitForElementVisible('@showsListHeading', 10000)
            .click('@episodesButton')
            .waitForElementVisible('@episodesHeading', 10000)
        browser.pause(4000)
        browser.useXpath()
        // Set Episode 1 to Acquired
            .click('/html/body/div[2]/div/section/section/article/section/article[14]/div[6]/div/div[1]/i')
        browser.pause(4000)
        // Set Episode 3 to Watched
            .click('/html/body/div[2]/div/section/section/article/section/article[12]/div[6]/div/div[2]/i')
        browser.pause(4000)
        // Set Episode 4 to Skipped
            .click('/html/body/div[2]/div/section/section/article/section/article[11]/div[6]/div/div[3]/i')
        browser.pause(4000)
        // Set Episode 11 to Acquired 
            .click('/html/body/div[2]/div/section/section/article/section/article[4]/div[6]/div/div[1]/i')
        browser.pause(4000)

        // Verify episodes have correct settings
        TVMazePage
            .click('@episodesWatchListButton')
            .waitForElementVisible('@watchlistHeading', 10000)
        browser.useXpath()
        browser.pause(6000)
        // Check Episode 1 is Acquired
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[14]/div[6]/div/div[1]/i/..', 'title', 'Acquired')
        // Check Episode 3 is Watched
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[12]/div[6]/div/div[2]/i/..', 'title', 'Watched')
        // Check Episode 4 is Skipped
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[11]/div[6]/div/div[3]/i/..', 'title', 'Skipped')
        // Check Episode 11 is Acquired
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[4]/div[6]/div/div[1]/i/..', 'title', 'Acquired')
            .useCss()
    },

    'QOBB-163 Update Watchlist episode settings': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-163 

        // Watchlist settings can be updated (Acquired, Watched or Skipped)

        searchForItem(TVMazePage, 'firefly')
        browser.pause(4000)
        TVMazePage
            .waitForElementVisible('@searchListHeading', 10000)
        browser.useXpath()
            .click('//a[text()="Firefly"]')
        TVMazePage
            .waitForElementVisible('@showsListHeading', 10000)
            .click('@episodesButton')
            .waitForElementVisible('@episodesHeading', 10000)
        browser.useXpath()
        // Set Episode 1 to Watched
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[14]/div[6]/div/div[2]/i')
        // Set Episode 3 to Skipped
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[12]/div[6]/div/div[3]/i')
        // Check Episode 1 is Watched
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[14]/div[6]/div/div[2]/i/..', 'title', 'Watched')
        // Check Episode 3 is Skipped
            .assert.attributeContains('/html/body/div[2]/div/section/section/article/section/article[12]/div[6]/div/div[3]/i/..', 'title', 'Skipped')

        // Clear Episode 1 Setting
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[14]/div[6]/div/div[2]/i')
        // Clear Episode 3 Setting
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[12]/div[6]/div/div[3]/i')
        // Clear Episode 4 Setting
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[11]/div[6]/div/div[3]/i')
        // Clear Episode 11 Setting 
        browser.pause(4000)
            .click('/html/body/div[2]/div/section/section/article/section/article[4]/div[6]/div/div[1]/i')
        browser.pause(4000)
            .useCss()
    },

    'QOBB-163 Remove series from Watchlist': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-163 

        // Remove series from Watchlist and verify list is empty 

        clearFollowlist(TVMazePage, browser)
        browser
            .verify.elementNotPresent('#follow-list > ol > li')
            .useCss()
    }
}