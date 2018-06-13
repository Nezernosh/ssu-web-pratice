function setExpressionResult() {
    let matches = document
        .getElementById("expression-input")
        .value
        .match(/\d+(\.\d+)?|([+\-*\/=])/g);

    if (!matches || !checkMatches(matches)) {
        alert("incorrect expression");
        return;
    }

    let operations = {
        "+" : function (x, y) { return x + y },
        "-" : function (x, y) { return x - y },
        "*" : function (x, y) { return x * y },
        "/" : function (x, y) { return y !== 0 ? x / y : 0}
    };

    let result = matches[0];
    for (let i = 1; i + 2 < matches.length; i += 2) {
        result = operations[matches[i]](Number(result), Number(matches[i + 1]))
    }

    document.getElementById("expression-result").value = result
}

function checkMatches(matches) {
    if (matches.filter(function (x) { return x === "=" }).length !== 1 && matches[matches.lastIndex] !== "=") {
        return false
    }

    for (let i = 0; i < matches.length; i++) {
        if (i % 2 === 0 && isNaN(matches[i])) {
            return false
        }
        if (i % 2 === 1 && !isNaN(matches[i])) {
            return false
        }
    }

    return true
}