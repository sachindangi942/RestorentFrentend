import Joi from "joi";

const Login_val = (usrdata) => {
    const validation_schema = Joi.object({
        Email: Joi.alternatives().try(
            Joi.string()
                .email({ tlds: { allow: ["com", "net", "in", "org"] } })
                .message("Invalid email format"),
            Joi.string()
                .pattern(/^[6-9]\d{9}$/)
                .message("Invalid mobile number format")
        ).required().messages({
            "alternatives.match": "Login must be a valid email or mobile number",
            "any.required": "username is required"
        }),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required"
        }),
    });

    return validation_schema.validate(usrdata,{abortEarly:false});
};

export default Login_val;
