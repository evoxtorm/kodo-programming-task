import Joi from 'Joi';

export default function makeSearchParamters(searchInfo) {
    const schema = Joi.object({
        searchString: Joi.string().min(0),
        page: Joi.number().min(0).required()
      });
    const { error, value } = schema.validate(searchInfo);
    if (error) {
        throw new Error(`${error.details[0].message} Error in request body`);
    }
    return Object.freeze(value);
}