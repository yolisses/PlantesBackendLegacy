export function checkNotNull(res, fieldsAndValues) {
    const missing = []
    for (let field in fieldsAndValues) {
        if (fieldsAndValues[field] === undefined)
            missing.push(field)
    }
    if (missing.length > 0)
        return res.status(400).send({
            error: `Missing fields: ${missing}`
        })
}