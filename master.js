// let t = [[1], [2], [3]],
//     e = [[[1, 2, 3]], [[1, 2, 3]], [[1, 2, 3]]];
// // e.length = 9;
// for (let g = 0; g < e.length; g++) {
//     console.table(e[g]);
// }

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
        for (let i = 0; i < 3; i++) {
            matrex[g][h][i] = [];
            for (let j = 0; j < 3; j++) {
                let count = 0;
                while (count < 100) {
                    count++;
                    let x = Math.floor(Math.random() * 9 + 1);
                    if (boxchk(g, h, i, x, j)) {
                        matrex[g][h][i][j] = x;
                        break;
                    }
                }
                if (count == 100) {
                    g = h = i = 0;
                    j = -1;
                    matrex[g][h][i][j] = count;
                    matrex[g] = [];
                    matrex[g][h] = [];
                    matrex[g][h][i] = [];
                    v++;
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
let c = 0;
let outcell = document.querySelectorAll(".outcell");
for (let i = 0; i < outcell.length; i++) {
    let inn = outcell[i].querySelectorAll(".in");
    let f = Math.floor(i / 3);
    let k = matrex[f][c];
    if (c == 2) {
        c = 0;
    } else {
        c++;
    }
    for (let i = 0; i < inn.length; i++) {
        // console.log(f);
        let l = [...k[0], ...k[1], ...k[2]];
        let x = Math.floor(Math.random() * 9 + 1);
        inn[i].textContent = l[i];
    }
}
let but1 = document.getElementById("but1");
if (but1.checked) {
    console.log('rrrrrrrrr');

    document.querySelector('#but1+div').style.backgroundColor = 'red';
}
document.getElementById("but1").onclick = function () {
    // document.getElementById("but2");
    // document.getElementById("but1").querySelector('+div').style.backgroundColor = 'red';
};
// let a = new Set();
// do {
//     let x = Math.floor(Math.random() * 9 + 1);
//     a.add(x);
// } while (a.size < 9);

// console.log(a);
