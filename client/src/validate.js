export default(type, value) => {
    var idNoRegex = /(WWA-)([a-zA-Z0-9])+/;

    if (type === 'idNo') {

        if (idNoRegex.test(value)) return true;
        return false;

    }
}