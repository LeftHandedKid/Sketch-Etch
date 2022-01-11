'use strict';

// grid variables
const canvas = document.getElementById("canvas");
const container = document.createElement("div");
const gridSize = document.getElementById("grid-size");
const gridNumber = document.getElementById("display-grid-size-p");

container.className = "make-grid";

// button variables
const randomColorBtn = document.getElementById("rainbow-color");
const eraseBtn = document.getElementById("erase-color");
const colorSelector = document.getElementById("select-color");
const clearBtn = document.getElementById("clear-color");

// colors
const divPaintColors = {
    "colors": {
        "#000000": "black",
        "#FF0000": "red",
        "#FFA500": "orange",
        "#FFFF00": "yellow",
        "#008000": "green",
        "#00BFFF": "blue",
        "#4B0082": "indigo",
        "#EE82EE": "violet"
    }
};

const black = divPaintColors.colors["#000000"];
const red = divPaintColors.colors["#FF0000"];
const orange = divPaintColors.colors["#FFA500"];
const yellow = divPaintColors.colors["#FFFF00"];
const green = divPaintColors.colors["#008000"];
const blue = divPaintColors.colors["#00BFFF"];
const indigo = divPaintColors.colors["#4B0082"];
const violet = divPaintColors.colors["#EE82EE"];

const colors = [black, red, orange, yellow, green, blue, indigo, violet];


const createGrid = num => {
    const createColumn = num => {
        // canvas is 500px but divs in the grid are 499px / num
        // so the canvas can have a border
        for (let i = 0; i < num; i++) {
            const div = document.createElement("div");
            div.style.height = `${499 / num}px`;
            div.style.width = `${499 / num}px`;

            container.appendChild(div);
        };

        return canvas.appendChild(container);
    };

    for (let i = 0; i < num; i++) {
        createColumn(num);
    };
};

const paintDivRandomColor = () => {
    // need to make html collection into true array
    // to run actual array methods like find() below
    const divs = Array.from(container.children);

    // this returns a single div to "paint"

    // and make a keypress event so user can make figures without
    // coloring sides of canvas... something like, press k to stop
    // drawing and move the mouse over the div and press j to start
    // drawing again or something like that
    return divs.find(div => {
        div.addEventListener("mouseover", () => {
            return div.style.backgroundColor = `
                rgb(
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)}
                )
            `;
        });
    });
};

const selectColor = () => {
    const divs = Array.from(container.children);

    const chooseHexColor = hexColor => {
        return divs.find(div => {
            div.addEventListener("mouseover", () => {
                return div.style.backgroundColor = hexColor;
            });
        });
    };

    switch (colorSelector.value) {
        case black:
            chooseHexColor("#000000");
            break;

        case red:
            chooseHexColor("#FF0000");
            break;

        case orange:
            chooseHexColor("#FFA500");
            break;

        case yellow:
            chooseHexColor("#FFFF00");
            break;

        case green:
            chooseHexColor("#008000");
            break;

        case blue:
            chooseHexColor("#00BFFF");
            break;

        case indigo:
            chooseHexColor("#4B0082");
            break;

        case violet:
            chooseHexColor("#EE82EE");
            break;

        default:
            break;
    }
};


// load page with default values 
window.addEventListener("load", () => {
    gridSize.value = 16;
    createGrid(16);
    selectColor();
});

randomColorBtn.addEventListener("click", () => {
    paintDivRandomColor();
});

colorSelector.addEventListener("click", () => {
    selectColor();
});

clearBtn.addEventListener("click", () => {
    const divs = Array.from(container.children);

    for (let i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = "#f5f5f5";
    };
});

eraseBtn.addEventListener("click", () => {
    const divs = Array.from(container.children);

    return divs.find(div => {
        div.addEventListener("mouseover", () => {
            return div.style.backgroundColor = "#f5f5f5";
        });
    });
});

gridSize.addEventListener("change", () => {
    gridNumber.textContent = `${gridSize.value} x ${gridSize.value}`;
    gridNumber.insertAdjacentElement("beforebegin", gridSize);

    container.replaceChildren();
    createGrid(gridSize.value);
    selectColor();
});
