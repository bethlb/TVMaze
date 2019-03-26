var TVMazePage = {}

module.exports = {
    before: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        .loginToTVMaze(browser)
    },

    beforeEach: browser => {
        TVMazePage = browser.page.TVMazePageObject()
        TVMazePage.navigate()
            .waitForElementVisible('#logo', 5000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-160 Home Page': browser => {
    // https://dmutah.atlassian.net/browse/QOBB-160

        //  Check categories
        browser.useXpath()
        browser.verify.visible('//h1[text()="Popular shows airing tonight"]')
        browser.verify.visible('//h1[text()="Upcoming Season Premieres"]')
        browser.verify.visible('//h1[text()="Latest Blogs, Articles and News"]')
        browser.verify.visible('//h1[contains(text(),"Schedule")]')
        browser.useCss()
        
        // Check Search Button
        TVMazePage
            .verify.visible('@searchInput')
        
        // Check top menu
            .verify.visible('@showsButton')
            .verify.visible('@peopleButton')
            .verify.visible('@networksButton')
            .verify.visible('@webChannelsButton')
            .verify.visible('@articlesButton')
            .verify.visible('@scheduleButton')
            .verify.visible('@calendarButton')
            .verify.visible('@countDownButton')
            .verify.visible('@forumsButton')

        // Check notifications icon
            .verify.visible('@notificationsIcon')

        // Check Tools Button
            .verify.visible('@toolsButton')
    }
}