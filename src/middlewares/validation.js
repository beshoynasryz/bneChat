export const validation = (schema) => {
    return async (req, res, next) => {
       const inputData = {...req.body, ...req.query, ...req.params}
     
        const result = schema.validate(inputData , {AbortEarly : false});
        if (result.error) {
          return res.status (400).json({message : "validation error" , error : result?.error.details })
        }

    next();
    }
}