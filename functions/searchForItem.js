module.exports = (Page, text) => {
    Page
        .setValue('@searchInput', text)
        .click('@searchButton')
        .waitForElementVisible('@searchHeading', 20000)
}
