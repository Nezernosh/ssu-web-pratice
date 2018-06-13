function setFormatDateResult() {
    let date = new Date(document.getElementById("datetime-local-input").value);
    let mask = document.getElementById("mask-input").value;
    let matches = mask.match(/[y]{2,4}|[m]{1,2}|[M]{1,4}|[H]{1,2}|[h]{1,2}|[d]{1,2}|[s]{1,2}/g);

    for (let i = 0; i < matches.length; i++) {
        mask = formatReplace(matches[i], date, mask)
    }

    document.getElementById("datetime-result").value = mask
}

function getRoundHours(hours, zero) {
    if (hours >= 0 && hours <= 9) {
        return zero ? "0" + hours : hours
    }
    if (hours >= 10 && hours <= 12) {
        return hours
    }
    if (hours >= 22 && hours <= 24) {
        return hours % 12
    }
    if (hours >= 13 && hours <= 21) {
        return zero ? "0" + hours % 12 : hours % 12
    }
}

function formatReplace(match, date, mask) {
    switch (match) {
        case "yyyy":
            return mask.replace(/yyyy/g, date.getFullYear());
        case "yy":
            return mask.replace(/yy/g, date.getFullYear() % 100 >= 10 ? date.getFullYear() % 100 : "0" + date.getFullYear() % 100);
        case "MMMM":
            return mask.replace(/MMMM/g, date.toLocaleString("en-us", {month: "long"}));
        case "MMM":
            return mask.replace(/MMM/g, date.toLocaleString("en-us", {month: "short"}));
        case "MM":
            return mask.replace(/MM/g, date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));
        case "M":
            return mask.replace(/M/g, date.getMonth() + 1);
        case "dd":
            return mask.replace(/dd/g, date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
        case "d":
            return mask.replace(/d/g, date.getDate());
        case "HH":
            return mask.replace(/HH/g, date.getHours() >= 10 ? date.getHours() : "0" + date.getHours());
        case "H":
            return mask.replace(/H/g, date.getHours());
        case "hh":
            return mask.replace(/hh/g, getRoundHours(date.getHours(), true));
        case "h":
            return mask.replace(/h/g, getRoundHours(date.getHours(), false));
        case "mm":
            return mask.replace(/mm/g, date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
        case "m":
            return mask.replace(/m/g, date.getMinutes());
        case "ss":
            return mask.replace(/ss/g, date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds());
        case "s":
            return mask.replace(/s/g, date.getSeconds());
        default:
            return mask

    }
}