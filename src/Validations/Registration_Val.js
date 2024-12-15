import Joi from "joi";

const Registration_Val =(usrData)=>{
    const validation_Schema = Joi.object({
        Name:Joi.string().required().min(2).max(15),
        Email:Joi.string().email({tlds:{allow:["net","com","org"]}}).required(),
        Mobile:Joi.string().required().pattern(/^[6-9][0-9]{9}$/),
        password:Joi.string().required().min(6),
        confirmPassword:Joi.string().required().valid(Joi.ref("password"))
        .messages({
            "any.only": "Confirm Password do not match",
            "any.required": "Confirm password is required",
          })
    });
    return validation_Schema.validate(usrData ,{abortEarly:false});
}
export default Registration_Val;