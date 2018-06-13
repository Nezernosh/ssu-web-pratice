function setDeleteResult() {
    let text = document.getElementById("text-input").value;
    let matches = text.match(/[^!.?,;: ]+/gi);

    if (!matches) {
        document.getElementById("delete-result").value = text
    }

    let firstWord = matches[0];
    let found = false;
    for (let i = 0; i < firstWord.length; i++) {
        for (let j = 1; j < matches.length; j++) {
            if (!~matches[j].indexOf(firstWord[i])) {
                found = false;
                break
            }

            found = true
        }

        if (!found) continue;

        let pattern;
        if (!!~['$', '^', '[', ']', '+'].indexOf(firstWord[i])) {
            pattern = "\\" + firstWord[i]
        }
        else {
            pattern = firstWord[i]
        }
        text = text.replace(new RegExp(pattern, "gi"), "")
    }

    document.getElementById("delete-result").value = text
}
