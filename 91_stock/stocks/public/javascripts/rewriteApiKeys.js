/**
 * The alphavantage api sends back an object that looks something like this
 {
    "01. symbol": "C",
    "02. open": "54.0100",
    "03. high": "54.9900",
    "04. low": "53.6600",
    "05. price": "54.6500",
    "06. volume": "9360751",
    "07. latest trading day": "2019-01-04",
    "08. previous close": "52.5600",
    "09. change": "2.0900",
    "10. change percent": "3.9764%"
}
this method will turn it into this
{
    "symbol": "C",
    "open": "54.0100",
    "high": "54.9900",
    "low": "53.6600",
    "price": "54.6500",
    "volume": "9360751",
    "latestTradingDay": "2019-01-04",
    "previousClose": "52.5600",
    "change": "2.0900",
    "changePercent": "3.9764%"
}
You may first have to get the object from an array or from an outer object
 */
module.exports = obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[`${key.substring(key.indexOf(' ') + 1).replace(/\s(\w)/g, (m, p1) => p1.toUpperCase())}`] =
            obj[key];
    });
    return newObj;
};
