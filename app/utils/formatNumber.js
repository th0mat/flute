
export default function formatNumber(num, decPlaces, thouSeparator, decSeparator) {
    let n = num;
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
    decSeparator = decSeparator == undefined ? "." : decSeparator;
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
    const sign = n < 0 ? "" : ""; // removed - sign to avoid -0 in case of -0.01 rounding
    let i = parseInt(n = Math.abs(n || 0).toFixed(decPlaces)) + "";
    let j = i.length > 3 ? i.length % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g,
            "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

