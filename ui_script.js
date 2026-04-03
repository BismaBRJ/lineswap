// Copyright (c) 2026 Bisma Rohpanca Joyosumarto - BismaBRJ (https://www.github.com/BismaBRJ/)

// upon first loading the page (not subsequent "reloads")
let inputLines = ["", ""];
renderLines();

function renderLines() {
    const n = inputLines.length;
    const inputLinesDiv = document.getElementById("inputLinesDiv");
    inputLinesDiv.innerHTML = "";

    for (let idx = 0; idx < n; idx++) {
        if (n > 2) {
            // create delete button
            let deleteButton = document.createElement("button");
            deleteButton.id = `deleteButton${idx+1}`;
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click", () => deleteInputBox(idx));
            inputLinesDiv.appendChild(deleteButton);
        }

        // create clear button
        let clearButton = document.createElement("button");
        clearButton.id = `clearButton${idx+1}`;
        clearButton.innerHTML = "Clear";
        clearButton.addEventListener("click", () => clearInputBox(idx));
        inputLinesDiv.appendChild(clearButton);

        // create text box
        let line = inputLines[idx];
        let box = document.createElement("textarea");
        box.id = `inputBox${idx+1}`;
        box.rows = "4";
        box.cols = "80";
        box.value = line;
        inputLinesDiv.appendChild(box);
        inputLinesDiv.appendChild(document.createElement("br"));
    }

    const addBoxButton = document.createElement("button");
    addBoxButton.id = "buttonAddInputBox";
    addBoxButton.innerHTML = "Add input box";
    addBoxButton.addEventListener("click", addInputBox);
    inputLinesDiv.appendChild(addBoxButton);
    inputLinesDiv.appendChild(document.createElement("br"));
}

function saveLines() {
    // reset global variable
    inputLines = [];

    let idx = 0;
    let done = false;
    while (!done) {
        let box = document.getElementById(`inputBox${idx+1}`);
        if (box === null) {
            done = true;
        } else {
            let line = box.value;
            inputLines.push(line);
            idx++;
        }
    }
}

function addInputBox() {
    saveLines();
    inputLines.push("");
    renderLines();
}

function clearInputBox(idx) {
    saveLines();
    inputLines[idx] = "";
    renderLines();
}

function deleteInputBox(idx) {
    saveLines();
    inputLines.splice(idx, 1);
    renderLines();
}

