// Copyright (c) 2026 Bisma Rohpanca Joyosumarto - BismaBRJ (https://www.github.com/BismaBRJ/)

// upon first loading the page (not subsequent "reloads")
let inputLines = ["", ""];
let leftInputRadioIdx = 0;
let rightInputRadioIdx = 1;
renderInputLines();

function renderInputLines() {
    const n = inputLines.length;
    const inputLinesDiv = document.getElementById("inputLinesDiv");
    inputLinesDiv.innerHTML = "";

    // fix out-of-bounds checked radio button data,
    // which usually happens after deletion
    if ((leftInputRadioIdx >= n) && (rightInputRadioIdx >= n)) {
        leftInputRadioIdx = 0;
        rightInputRadioIdx = 1;
    } else if (leftInputRadioIdx >= n) {
        leftInputRadioIdx = rightInputRadioIdx;
    } else if (rightInputRadioIdx >= n) {
        rightInputRadioIdx = leftInputRadioIdx;
    }

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
        
        // create left radio button
        let leftRadio = document.createElement("input");
        leftRadio.type = "radio";
        leftRadio.id = `leftInputRadio${idx+1}`;
        leftRadio.name = "leftInputRadio";
        if (idx === leftInputRadioIdx) {
            leftRadio.checked = true;
        }
        inputLinesDiv.appendChild(leftRadio);

        // similarly, right radio button
        let rightRadio = document.createElement("input");
        rightRadio.type = "radio";
        rightRadio.id = `rightInputRadio${idx+1}`;
        rightRadio.name = "rightInputRadio";
        if (idx === rightInputRadioIdx) {
            rightRadio.checked = true;
        }
        inputLinesDiv.appendChild(rightRadio);

        // create swap button on first row
        if (idx === 0) {
            let swapButton = document.createElement("button");
            swapButton.id = "inputSwapButton";
            swapButton.innerHTML = "Swap";
            swapButton.addEventListener("click", swapInputLines);
            inputLinesDiv.appendChild(swapButton);
        }

        // newline
        inputLinesDiv.appendChild(document.createElement("br"));
    }

    const addBoxButton = document.createElement("button");
    addBoxButton.id = "buttonAddInputBox";
    addBoxButton.innerHTML = "Add input box";
    addBoxButton.addEventListener("click", addInputBox);
    inputLinesDiv.appendChild(addBoxButton);
    inputLinesDiv.appendChild(document.createElement("br"));
}

function saveInputLines() {
    // reset global variables
    inputLines = [];
    leftInputRadioIdx = -1;
    rightInputRadioIdx = -1;

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

    const leftRadio = document.querySelector(
        'input[name="leftInputRadio"]:checked'
    );
    const rightRadio = document.querySelector(
        'input[name="rightInputRadio"]:checked'
    );
    leftInputRadioIdx = leftRadio.id.match(/\d+/)[0] - 1;
    rightInputRadioIdx = rightRadio.id.match(/\d+/)[0] - 1;
}

function addInputBox() {
    saveInputLines();
    inputLines.push("");
    renderInputLines();
}

function clearInputBox(idx) {
    saveInputLines();
    inputLines[idx] = "";
    renderInputLines();
}

function deleteInputBox(idx) {
    saveInputLines();
    inputLines.splice(idx, 1);
    renderInputLines();
}

function swapInputLines() {
    const leftRadio = document.querySelector(
        'input[name="leftInputRadio"]:checked'
    );
    const rightRadio = document.querySelector(
        'input[name="rightInputRadio"]:checked'
    );

    if ((leftRadio !== null) && (rightRadio !== null)) {
        saveInputLines();

        const idx1 = leftRadio.id.match(/\d+/)[0] - 1;
        const idx2 = rightRadio.id.match(/\d+/)[0] - 1;

        const temp = inputLines[idx1];
        inputLines[idx1] = inputLines[idx2];
        inputLines[idx2] = temp;

        renderInputLines();
    }
}

