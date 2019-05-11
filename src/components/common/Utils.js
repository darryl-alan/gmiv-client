const unnullify = obj => {
    Object.keys(obj).forEach(key => (obj[key] = obj[key] || ""));
    return obj;
};

export default { unnullify };
