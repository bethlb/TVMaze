var TVMazeCommands = {

    loginToTVMaze: function (browser) {
        this
            .navigate('https://www.tvmaze.com')
            .click('a[href="https://www.tvmaze.com/account/login"]')
            .setValue('#loginform-username', 'bethlb')
            .setValue('#loginform-password', 'Testpw456')
            .click('#w0 > button')
        browser.pause(15000)
        return this
    }
}

module.exports = {
    url: 'https://www.tvmaze.com',
    commands: [TVMazeCommands],
    elements: {
        searchInput: '#searchform-q',
        searchButton: 'i[class="fa fa-search fa-lg"]',
        showsButton: {
            selector: '//a[text()="Shows"]',
            locateStrategy: 'xpath'
        },
        peopleButton: {
            selector: '//a[text()="People"]',
            locateStrategy: 'xpath',
        },
        networksButton: {
            selector: '//a[text()="Networks"]',
            locateStrategy: 'xpath',
        },
        webChannelsButton: {
            selector: '//a[text()="Web Channels"]',
            locateStrategy: 'xpath',
        },
        articlesButton: {
            selector: '//a[text()="Articles"]',
            locateStrategy: 'xpath',
        },
        scheduleButton: {
            selector: '//a[text()="Schedule"]',
            locateStrategy: 'xpath',
        },
        calendarButton: {
            selector: '//a[text()="Calendar"]',
            locateStrategy: 'xpath',
        },
        countDownButton: {
            selector: '//a[text()="Countdown"]',
            locateStrategy: 'xpath',
        },
        forumsButton: {
            selector: '//a[text()="Forums"]',
            locateStrategy: 'xpath',
        },
        notificationsIcon: {
            selector: '//i[@class="fas fa-envelope fa-lg"]',
            locateStrategy: 'xpath',
        },
        toolsButton: {
            selector: '//*[@id="user-menu"]/img',
            locateStrategy: 'xpath',
        },
        networksHeading: {
            selector: '//h1[text()="Networks"]',
            locateStrategy: 'xpath',
        },
        searchHeading: {
            selector: '//h1[text()="Search"]',
            locateStrategy: 'xpath',
        },
        networksCountry: {
            selector: '//*[@id="network-country_enum"]',
            locateStrategy: 'xpath',
        },    
        networksSort: '#network-sort',
        followIcon: '#w0 > div:nth-child(2) > article > div > span > a:nth-child(1) > i',
        firstFollowIcon: {
            selector: '//*[@id="following"]/span[1]/i',
            locateStrategy: 'xpath',
        },
        unfollowIcon: '.fa.fa-heart.fa-lg.active',
        watchlistButton: {
            selector: '//a[@href="/watchlist"]',
            locateStrategy: 'xpath',
        },
        episodesWatchListButton: {
            selector: '//*[@id="user-episode-listing-options"]/a[2]/p/span',
            locateStrategy: 'xpath',
        },
        watchlistHeading: {
            selector: '//span[text()="Watch List"]',
            locateStrategy: 'xpath',
        },
        tools: '#user-menu',
        showsHeading: {
            selector: '//span[text()="Shows"]',
            locateStrategy: 'xpath',
        },
        episodesButton: {
            selector: '//a[text()="Episodes"]',
            locateStrategy: 'xpath',
        },
        episodesHeading: {
            selector: '//span[text()="Episodes"]',
            locateStrategy: 'xpath',
        },
        showStatusHeading: {
            selector: '//span[text()="Show Status"]',
            locateStrategy: 'xpath',
        },
        showStatusButton: {
            selector: '//a[@href="/showstatus"]',
            locateStrategy: 'xpath',
        },
        followsButton: {
            selector: '//a[@href="/dashboard/follows"]',
            locateStrategy: 'xpath',
        },
        followlistHeading: {
            selector: '//span[text()="Follows"]',
            locateStrategy: 'xpath',
        },
        searchListHeading: {
            selector: '//span[text()="Search"]',
            locateStrategy: 'xpath',
        },
        showsListHeading: {
            selector: '//span[text()="Shows"]',
            locateStrategy: 'xpath',
        },
        peopleListHeading: {
            selector: '//span[text()="People"]',
            locateStrategy: 'xpath',
        },
        networksListHeading: {
            selector: '//span[text()="Networks"]',
            locateStrategy: 'xpath',
        },
        webchannelsListHeading: {
            selector: '//span[text()="Web Channels"]',
            locateStrategy: 'xpath',
        },
        personName: {
            selector: '//h3/a[contains(@href,"/people/")]',
            locateStrategy: 'xpath',
        },
        showsEmptyFollowMsg: {
            selector: '//div[@id="follow-list"]/descendant::div[last()-3]',
            locateStrategy: 'xpath',
        },
        peopleEmptyFollowMsg: {
            selector: '//div[@id="follow-list"]/descendant::div[last()-2]',
            locateStrategy: 'xpath',
        },
        networksEmptyFollowMsg: {
            selector: '//div[@id="follow-list"]/descendant::div[last()-1]',
            locateStrategy: 'xpath',
        },
        webchannelsEmptyFollowMsg: {
            selector: '//div[@id="follow-list"]/descendant::div[last()]',
            locateStrategy: 'xpath',
        },
    }
}