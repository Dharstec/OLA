module.exports = {
    EmailValidator(email) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    },
    PhoneNumberValidator(number) {
        const regex = /^$|^\d{10}$/;
        return regex.test(number);
    }

}