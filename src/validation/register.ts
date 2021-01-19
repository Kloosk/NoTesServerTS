import validator from 'validator';

interface Data{
    name: string;
    email: string;
    password: string;
    password2: string;
}


const validateRegisterInput = (data:Data) => {
    const errors = [];
    // Convert empty fields to an empty string so we can use validator functions
    data.name = data.name ? data.name : "";
    data.email = data.email ? data.email : "";
    data.password = data.password ? data.password : "";
    data.password2 = data.password2 ? data.password2 : "";

    // Name checks
    if (validator.isEmpty(data.name)) {
        errors.push("Name field is required");
    }
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
    if (validator.isEmpty(data.password2)) {
        errors.push("Confirm password field is required");
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.push("Password must be at least 6 characters");
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.push("Passwords must match");
    }
    return {
        errors,
        isValid: errors
    };
};

module.exports = validateRegisterInput;