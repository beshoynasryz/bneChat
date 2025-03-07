export const validation = (schema) => {
    return async (req, res, next) => {
       let resultError = []
       for (const key of Object.keys(schema)) {
        const result = schema[key].validate(req[key] , {AbortEarly : false});
        if (result.error) {
            resultError.push(result.error.details[0].message)
        }
    }
    if (resultError.length > 0) {
        return res.status(400).send({message: resultError});
    }
    next();
    }
}