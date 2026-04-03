// Copyright (c) 2026 Bisma Rohpanca Joyosumarto - BismaBRJ (https://www.github.com/BismaBRJ/)

// upon first loading the page (not subsequent "reloads")
let input_lines = ["", ""];
render_lines();

function render_lines() {
    const n = input_lines.length;
    const input_lines_div = document.getElementById("input_lines_div");
    input_lines_div.innerHTML = "";

    for (let idx = 0; idx < n; idx++) {
        if (n > 2) {
            // create delete button
            let delete_button = document.createElement("button");
            delete_button.id = `delete_button_${idx+1}`;
            delete_button.innerHTML = "Delete";
            delete_button.addEventListener("click", () => delete_input_box(idx));
            input_lines_div.appendChild(delete_button);
        }

        // create clear button
        let clear_button = document.createElement("button");
        clear_button.id = `clear_button_${idx+1}`;
        clear_button.innerHTML = "Clear";
        clear_button.addEventListener("click", () => clear_input_box(idx));
        input_lines_div.appendChild(clear_button);

        // create text box
        let line = input_lines[idx];
        let box = document.createElement("textarea");
        box.id = `input_box_${idx+1}`;
        box.rows = "4";
        box.cols = "80";
        box.value = line;
        input_lines_div.appendChild(box);
        input_lines_div.appendChild(document.createElement("br"));
    }

    const add_box_button = document.createElement("button");
    add_box_button.id = "btn_add_input_box";
    add_box_button.innerHTML = "Add input box";
    add_box_button.addEventListener("click", add_input_box);
    input_lines_div.appendChild(add_box_button);
    input_lines_div.appendChild(document.createElement("br"));
}

function save_lines() {
    // reset global variable
    input_lines = [];

    let idx = 0;
    let done = false;
    while (!done) {
        let box = document.getElementById(`input_box_${idx+1}`);
        if (box === null) {
            done = true;
        } else {
            let line = box.value;
            input_lines.push(line);
            idx++;
        }
    }
}

function add_input_box() {
    save_lines();
    input_lines.push("");
    render_lines();
}

function clear_input_box(idx) {
    save_lines();
    input_lines[idx] = "";
    render_lines();
}

function delete_input_box(idx) {
    save_lines();
    input_lines.splice(idx, 1);
    render_lines();
}

