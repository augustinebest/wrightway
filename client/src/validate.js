export default(type, value) => {
    var idNoRegex = /(WWA-)([a-zA-Z0-9])+/;
    var monthRegex = /[a-zA-Z]*/;
    var yearRegex = /[0-9]*/;
    var textRegex = /[A-Za-z0-9_-]*/;

    if (type === 'idNo') {

        if (idNoRegex.test(value)) return true;
        return false;

    }
    if (type === 'month') {

        if (monthRegex.test(value)) return true;
        return false;

    }
    if (type === 'year') {

        if (yearRegex.test(value)) return true;
        return false;

    }
    if(type === 'text') {

        if(textRegex.test(value)) return true
        return false;
        
    }
}