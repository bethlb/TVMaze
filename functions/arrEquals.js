module.exports = (Page, arr1, arr2) => {
    Page
    for (var i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] == (arr2[i])) {
            return true
        }
        else {
            return false
        }
    }
}
