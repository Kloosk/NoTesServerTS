import validator from 'validator';

interface Data{
    email: string;
    password: string;
}

const validateLoginInput = (data:Data) => {
    const errors = [];
    // Convert empty fields to an empty string so we can use validator functions
    data.email = data.email ? data.email : "";
    data.password = data.password ? data.password : "";

    // Email checks
    if (validator.isEmpty(data.email)) {
        errors.push("Email field is required");
    } else if (!validator.isEmail(data.email)) {
        errors.push("Email is invalid");
    }

    // Password checks
    if (validator.isEmpty(data.password)) {
        errors.push("Password field is required");
    }
    return {
        errors,
        isValid: errors
    };
};

module.exports = validateLoginInput;