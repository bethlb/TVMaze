module.exports = (Page, str) => {
    Page
        return str.replace(/\w\S*/g, function(text){
          return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        })       
    }   