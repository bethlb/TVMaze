module.exports = (Page, characters) => {
    Page
        return function (a, b) {
            var index_a = characters.indexOf(a[0]),
                index_b = characters.indexOf(b[0]);
    
            if (index_a === index_b) {
                // same first character, sort regular
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
                return 0;
            } else {
                return index_a - index_b;
            }
        }
    }
