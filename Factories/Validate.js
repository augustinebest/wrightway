module.exports = (type, value) => {
    const fullNameRegex = /^[a-zA-Z.+'-]+(?:\s[a-zA-Z.+'-]+)*\s?$/; //^([A-z]+) ([A-z]+)$
    const emailRegex = /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const nameRegex = /[0-9a-zA-Z]{6,}/;
    const passwordRegex = /[0-9a-zA-Z]{6,}/;
    const phoneNumberRegex = /[0-9]{7}/;
    const salaryAmountRegex = /[0-9]{4}/;
    const genderRegex = /(Male|Female)/; //[a-zA-Z]{4,6}
    const ageRegex = /^([1-9][0-9]?|)$/; //[0-9]{1,3}
    if(type == 'email') {
        if(emailRegex.test(value)) return true
            return false;
    } else if(type == 'name') {
        if(nameRegex.test(value)) return true
            return false;
    } else if(type == 'password') {
        if(passwordRegex.test(value)) return true
            return false;
    } else if(type == 'phone_number') {
        if(phoneNumberRegex.test(value)) return true
            return false;
    } else if (type == 'sex') {
        if(genderRegex.test(value)) return true
            return false;
    } else if (type == 'age') {
        if(ageRegex.test(value)) return true
            return false;
    } else if (type == 'fullName') {
        if(fullNameRegex.test(value)) return true
            return false;
    } else if (type == 'salary') {
        if(salaryAmountRegex.test(value)) return true
            return false;
    }
}