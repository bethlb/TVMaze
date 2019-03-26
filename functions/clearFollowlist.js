module.exports = (Page, browser) => {
    var list = []
    var listlength = 0

    Page
        .click('@tools')
        .click('@followsButton')
        .waitForElementVisible('@followlistHeading', 2000)

    // Clear Shows    
    browser.perform(function () {
        browser.elements('xpath', '//*[@id="follow-list"]/ol[1]/li', function (result) {
            listlength = result.value.length
        })
    })
    browser.perform(function () {
        for (i = 1; i <= listlength; i++) {
            browser
                .useXpath()
                .click(`//*[@id="follow-list"]/ol[1]/li[1]/span[1]/a`)
                .pause(2000)
            Page
                .waitForElementVisible('@showsListHeading', 4000)
                .click('@unfollowIcon')
            browser.back()
            Page.waitForElementVisible('@followlistHeading', 4000)
        }
    })

    // Clear People   
    browser.perform(function () {
        browser.elements('xpath', '//*[@id="follow-list"]/ol[2]/li', function (result) {
            listlength = result.value.length
        })
    })
    browser.perform(function () {
        for (i = 1; i <= listlength; i++) {
            browser
                .useXpath()
                .click(`//*[@id="follow-list"]/ol[2]/li[1]/a`)
                .pause(2000)
            Page
                .waitForElementVisible('@peopleListHeading', 4000)
                .click('@unfollowIcon')
            browser.back()
            Page.waitForElementVisible('@followlistHeading', 4000)
        }
    })

    // Clear Networks  
    browser.perform(function () {
        browser.elements('xpath', '//*[@id="follow-list"]/ol[3]/li', function (result) {
            listlength = result.value.length
        })
    })
    browser.perform(function () {
        for (i = 1; i <= listlength; i++) {
            browser
                .useXpath()
                .click(`//*[@id="follow-list"]/ol[3]/li[1]/a`)
                .pause(2000)
            Page
                .waitForElementVisible('@networksListHeading', 4000)
                .click('@unfollowIcon')
            browser.back()
            Page.waitForElementVisible('@followlistHeading', 4000)
        }
    })

    // Clear Web Channels   
    browser.perform(function () {
        browser.elements('xpath', '//*[@id="follow-list"]/ol[4]/li', function (result) {
            listlength = result.value.length
        })
    })
    browser.perform(function () {
        for (i = 1; i <= listlength; i++) {
            browser
                .useXpath()
                .click(`//*[@id="follow-list"]/ol[4]/li[1]/a`)
                .pause(2000)
            Page
                .waitForElementVisible('@webchannelsListHeading', 4000)
                .click('@unfollowIcon')
            browser.back()
            Page.waitForElementVisible('@followlistHeading', 4000)
        }
    })
}
