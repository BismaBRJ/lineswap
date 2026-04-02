// Copyright (c) 2026 Bisma Rohpanca Joyosumarto - BismaBRJ (https://www.github.com/BismaBRJ/)

// upon first loading the page (not subsequent "reloads")
let input_lines = ["", ""];
render_lines();

function render_lines() {
    const n = input_lines.length;
    const input_lines_div = document.getElementById("input_lines_div");
    input_lines_div.innerHTML = "";

    for (let i = 0; i < n; i++) {
        line = input_lines[i];
        let box = document.createElement("textarea");
        box.id = `input_box_${i+1}`;
        box.rows = "4";
        box.cols = "80";
        box.value = line;
        input_lines_div.appendChild(box);
        input_lines_div.appendChild(document.createElement("br"));
    }

    const add_box_button = document.createElement("button");
    add_box_button.id = "btn_add_input_box";
    add_box_button.value = "Add input box";
    add_box_button.addEventListener("click", add_input_box);
    input_lines_div.appendChild(add_box_button);
    input_lines_div.appendChild(document.createElement("br"));
}

function save_lines() {
    // reset global variable
    input_lines = [];

    let i = 0;
    let done = false;
    while (!done) {
        let box = document.getElementById(`input_box_${i+1}`);
        if (box === null) {
            done = true;
        } else {
            let line = box.value;
            input_lines.push(line);
            i++;
        }
    }
}

function add_input_box() {
    const n = input_lines.length;
    const input_lines_div = document.getElementById("input_lines_div");
    let box = document.createElement("textarea");
    box.id = `input_box_${n+1}`;
    box.rows = "4";
    box.cols = "80";
    box.value = ""; // text inside the box
    input_lines_div.appendChild(box);
    input_lines_div.appendChild(document.createElement("br"));

    save_lines();
    render_lines();
}

