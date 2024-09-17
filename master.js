// let t = [[1], [2], [3]],
//     e = [[[1, 2, 3]], [[1, 2, 3]], [[1, 2, 3]]];
// // e.length = 9;
// for (let g = 0; g < e.length; g++) {
//     console.table(e[g]);
// }
// let a = new Set();
// let f = 0;
// do {
//     f++;
//     let x = Math.floor(Math.random() * 9 + 1);
//     a.add(x);
// } while (a.size < 9);
// a.delete(9);
// a = Array.from(a);
// console.log(a[0], f);
let row = [],
    box = [],
    inrow = [];
let matrex = [[[[]]]];
// matrex[0][0][0][0] = 8;
// console.log(matrex[0][0][0][0]);
// console.log(chk(0, 0, 0, 1, 0));
// let ll = [...matrex[0][0]].join().replace(/,/g, "");
// ll = [...matrex[0][0][0], ...matrex[0][0][1], ...matrex[0][0][2]];
// ll = Array.from(ll);
// console.log(ll);
let v = 0;
for (let g = 0; g < 3; g++) {
    matrex[g] = [];
    for (let h = 0; h < 3; h++) {
        matrex[g][h] = [];
        let a = [];
        do {
            let x = Math.floor(Math.random() * 9 + 1);
            if (!a.includes(x)) {
                a.push(x);
            }
        } while (a.length < 9);
        for (let i = 0; i < 3; i++) {
            matrex[g][h][i] = [];
            for (let j = 0; j < 3; j++) {
                let t = true;
                for (let m = 0; m < a.length; m++) {
                    let xx = a[m];
                    if (rowchk(g, h, i, xx, j)) {
                        matrex[g][h][i][j] = xx;
                        a[m] = a.pop();
                        t = false;
                        break;
                    }
                }
                if (t) {
                    g = h = i = 0;
                    j = -1;
                    matrex[g] = [];
                    matrex[g][h] = [];
                    matrex[g][h][i] = [];
                    // matrex[g][h][i][j] = 1000;
                    v++;
                    // console.log(v);
                    a = [];
                    do {
                        let x = Math.floor(Math.random() * 9 + 1);
                        if (!a.includes(x)) {
                            a.push(x);
                        }
                    } while (a.length < 9);
                }
            }
        }
    }
}

console.log("Sudoku created in", v, "Tries");
// console.log("---------------->", matrex);
// console.log(chk(1, 1, 1, 1, 1));
function rowchk(x, y, z, key, index) {
    let row = [];
    for (let i = 0; i < 3; i++) {
        if (matrex[x][i] == undefined) {
            break;
        } else {
            row[i] = matrex[x][i][z];
        }
    }
    row = row.join().replace(/,/g, "");
    row = Array.from(row);
    // console.log("row---------->", row);
    if (row.indexOf(String(key)) == -1) {
        // console.error("row");
        return colchk(x, y, z, key, index);
    } else {
        return false;
    }
}
function boxchk(x, y, z, key, index) {
    let box = [];
    for (let i = 0; i < 3; i++) {
        if (matrex[x][y] == undefined && matrex[x][y][i] == undefined) {
            break;
        } else {
            box[i] = matrex[x][y][i];
        }
    }
    box = box.join().replace(/,/g, "");
    box = Array.from(box);
    // console.log("row---------->", box);
    if (box.indexOf(String(key)) == -1) {
        // console.error("row");
        return rowchk(x, y, z, key, index);
    } else {
        return false;
    }
}
function colchk(x, y, z, key, index) {
    for (let i = 0; i < 3; i++) {
        if (x == i) {
            continue;
        }
        for (let j = 0; j < 3; j++) {
            // console.log(j);
            if (
                matrex[i] != undefined &&
                matrex[i][y] != undefined &&
                matrex[i][y][j] != undefined &&
                matrex[i][y][j][index] != undefined
            ) {
                // console.log(j);
                let b = matrex[i][y][j].includes(key);
                // console.log(b);
                if (matrex[i][y][j][index] == key) {
                    // console.error("column");
                    return false;
                }
            } else {
                // return true;
            }
        }
    }
    return true;
}

function chk(x, y, z, key, index) {
    // if (
    //     matrex[x] != undefined &&
    //     matrex[x][0] != undefined &&
    //     matrex[x][y][z] != undefined &&
    //     matrex[x][y][z][index] != undefined
    // ) {
    //     console.log(x, y, z, key, index);
    //     let row = [matrex[x][0][z], matrex[x][1][z], matrex[x][2][z]]
    //         .join()
    //         .replace(/,/g, "");
    //     row = Array.from(row);
    //     console.log(row);

    //     // row = [...matrex[x][0][z], ...matrex[x][1][z], ...matrex[x][2][z]];
    //     if (row.indexOf(String(key)) != -1) {
    //         console.error("row");
    //         // return false;
    //     }
    // }
    let row = [];
    let box = [];
    for (let i = 0; i < 3; i++) {
        if (matrex[x] != undefined && matrex[x][y] != undefined) {
            if (matrex[x][i] == undefined) {
                break;
            } else {
                row[i] = matrex[x][i][z];
            }
            if (matrex[x][y][i] == undefined) {
                break;
            } else {
                box[i] = matrex[x][y][i];
            }
        }
        // let row = [matrex[x][0][z], matrex[x][1][z], matrex[x][2][z]]
    }
    box = box.join().replace(/,/g, "");
    row = row.join().replace(/,/g, "");
    box = Array.from(box);
    row = Array.from(row);

    // console.log("row", row);

    if (row.indexOf(String(key)) != -1) {
        console.error("row");
        return false;
    }

    console.log(box);
    // let box = [...matrex[x][y][0], ...matrex[x][y][1], ...matrex[x][y][2]];
    if (box.indexOf(String(key)) != -1) {
        console.error("box");
        return false;
    }

    for (let i = 0; i < 3; i++) {
        if (x == i) {
            continue;
        }
        for (let j = 0; j < 3; j++) {
            // console.log(j);
            if (
                matrex[i] != undefined &&
                matrex[i][y] != undefined &&
                matrex[i][y][j] != undefined &&
                matrex[i][y][j][index] != undefined
            ) {
                console.log(j);
                let b = matrex[i][y][j].includes(key);
                console.log(b);
                if (matrex[i][y][j][index] == key) {
                    console.error("column");
                    return false;
                }
            } else {
                return true;
            }
        }
    }
    return true;
}
// let row2 = [...matrex[0][0][0], ...matrex[0][0][1], ...matrex[0][0][2]];
// console.log(row2);
// let l = [...matrex[0][0]].join().replace(/,/g, "");
// l = Array.from(l);
// console.log(l);
// console.log(matrex[0][0]);
// for (let i = 0; i < 9; i++) {
//     let k = [];
//     for (let j = 1; j < 10; j++) {
//         k.push(j);
//         // e[[[j]]]=j
//     }
//     e[i] = k;
// }
// let r = [1, 2, 3];
// let arr = [[], []];
// for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {}
// }
let c;
let outcell = $(".outcell");
// outcell[2].style.backgroundColor = "red";
for (let i = 0; i < outcell.length; i++) {
    let inn = outcell[i].querySelectorAll(".in");
    let f = Math.floor(i / 3);
    c = i;
    if (i > 2 && i < 6) {
        c = i - 3;
    } else if (i > 5) {
        c = i - 6;
    } else {
        c = i;
    }
    let k = matrex[f][c];
    for (let i = 0; i < inn.length; i++) {
        // console.log(f);
        let l = [...k[0], ...k[1], ...k[2]];
        inn[i].querySelector("p").textContent = l[i];
    }
}

//!-------------------------------------
let innum;
let penceil = document.getElementById("pen");
// document.getElementById().addEventListener('click',write)
outcell[0].querySelectorAll(".in")[0].addEventListener("click", write);
function writeee(params) {
    console.log("sdfghjkl");
}
function write() {
    // this.style.backgroundColor = "gray";
    console.log(this.parentNode);
    let tx1 = clk();

    let cell = this;
    let color = cell.querySelector("p").style.color;
    console.log(getnum(0, 0));
    if (penceil.checked) {
        cell.querySelector("div").style.display = "grid";
        cell.querySelector("div").querySelectorAll("p")[tx1 - 1].textContent =
            tx1;
        // penceil.style.display = "none";
    } else {
        // cell.querySelector('p').textContent = clk();

        if (color == "red" || cell.querySelector("p").style.color == "white") {
            console.log(cell.querySelector("p").style.color);
            let tx = cell.querySelector("p").textContent;
            console.log(tx1, tx);
            cell.querySelector("div").style.display = "none";
            cell.querySelector("p").style.display = "block";
            if (getnum(0, 0) == tx1) {
                cell.querySelector("p").textContent = tx1;
                cell.querySelector("p").style.color = "lightgreen";
            } else {
                cell.querySelector("p").textContent = tx1;
                cell.querySelector("p").style.color = "red";
            }
        }
    }
}
function getnum(x, y) {
    let f = Math.floor(x / 3);
    let c = x;
    if (x > 2 && x < 6) {
        c = x - 3;
    } else if (x > 5) {
        c = x - 6;
    } else {
        c = x;
    }
    let k = matrex[f][c];
    let l = [...k[0], ...k[1], ...k[2]];
    return l[y];
}
function clk() {
    let num;
    let but = document.getElementsByName("but");
    for (let i = 0; i < but.length; i++) {
        if (but[i].checked) {
            num = i + 1;
            break;
        }
    }
    return num;
}
//!-------------------------------------
let condition = 0;
while (condition != 40) {
    condition++;
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    // outcell[x].querySelectorAll(".in")[y].style.color = "white";
    outcell[x].querySelectorAll(".in")[y].querySelector("p").style.color =
        "white";
    outcell[x].querySelectorAll(".in")[y].querySelector("p").style.display =
        "none";
    outcell[x].querySelectorAll(".in")[y].addEventListener("click", write);
}

console.log(...matrex);
