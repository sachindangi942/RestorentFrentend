import Joi from "joi";


export const RegistratinVal = (form) => {


    const validation_schema = Joi.object({
        name: Joi.string().required().min(2).max(15),
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required(),
        password: Joi.string().required().length(6),
        confirmPassword: Joi.string().required().valid(Joi.ref("password"))
    });
    return validation_schema.validate(form)
}

