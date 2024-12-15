import Joi from "joi"

const AddProduct_val =({data})=>{
const validation_schema = Joi.object({
    code:Joi.string().required().min(2),
    iteam:Joi.string().required(),
    price : Joi.number().required().min(5),
    quantity: Joi.number()

});
return validation_schema.validate(data , {abortEarly:false});

}

export default AddProduct_val;