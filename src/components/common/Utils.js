const unnullify = obj => {
    Object.keys(obj).forEach(key => (obj[key] = obj[key] || ""));
    return obj;
};

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
const format = (num, n = 2, x = 3, s = ".", c = ",") => {
    num = Number(num);
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
        num = num.toFixed(Math.max(0, ~~n));

    return (c ? num.replace(".", c) : num).replace(new RegExp(re, "g"), "$&" + (s || ","));
};

// 12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
// 123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
// 12345678.9.format(0, 3, '-');       // "12-345-679"

export default { unnullify, format };
