
export default function titleCaseOui(str = "", maxLength=30){
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    let tmp = splitStr.join(' ');
    const j = tmp.indexOf('-');
    if (j < tmp.length-2) {
        tmp = tmp.slice(0,j+1) + tmp[j+1].toUpperCase() + tmp.slice(j+2);
    }
    const k = tmp.indexOf('(');
    if (k < tmp.length-2) {
        tmp = tmp.slice(0,k+1) + tmp[k+1].toUpperCase() + tmp.slice(k+2);
    }
    const m = tmp.indexOf(',');
    if (m < tmp.length-2) {
        tmp = tmp.slice(0,m+1) + tmp[m+1].toUpperCase() + tmp.slice(m+2);
    }
    if (tmp.length > maxLength) {
        tmp = tmp.substr(0, maxLength-3) + '...'
    }
    return tmp;
}