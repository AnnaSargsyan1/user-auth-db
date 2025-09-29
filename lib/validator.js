class Validator {
    constructor() {
        throw new Error("Cannot create an instance from this class");
    }
    static isNumeric(val) {
        return /^-?\d+(\.\d+)?$/.test(val);
    }
    static isEmail(val) {
        return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(val);
    }
    static isValidStr(val) {
        return /^[A-Za-z][A-Za-z\- ]{1,49}$/.test(val);
    }
    static isValidPassword(val) {
        // ✅ Password: 8–50 chars, at least 1 lowercase, 1 uppercase, 1 digit, 1 special
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,50}$/.test(val);
    }
}
export default Validator;