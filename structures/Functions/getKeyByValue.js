module.exports = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}