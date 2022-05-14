let div1 = document.querySelector('#grid1');
let div2 = document.querySelector('#grid2');
let div3 = document.querySelector('#grid3');
let div4 = document.querySelector('#grid4');
let div5 = document.querySelector('#grid5');
let div6 = document.querySelector('#grid6');
let div7 = document.querySelector('#grid7');
let div8 = document.querySelector('#grid8');
let div9 = document.querySelector('#grid9');
let resetBtn = document.querySelector('#resetBtn')

div1.addEventListener("click",  clickAction);
div2.addEventListener("click",  clickAction);
div3.addEventListener("click",  clickAction);
div4.addEventListener("click",  clickAction);
div5.addEventListener("click",  clickAction);
div6.addEventListener("click",  clickAction);
div7.addEventListener("click",  clickAction);
div8.addEventListener("click",  clickAction);
div9.addEventListener("click",  clickAction);
resetBtn.addEventListener('click', resetBoard);


function clickAction(){
    let turn = document.querySelector('#turn')

    if (this.textContent == ''){
        if (turn.innerHTML == "X turn"){
                this.textContent = 'x';
                turn.innerHTML = "O turn"
        }
        else {
            this.textContent = 'O';
            turn.innerHTML = "X turn"
        }
    }
}

let boxes = [];
boxes.push(div1);
boxes.push(div2);
boxes.push(div3);
boxes.push(div4);
boxes.push(div5);
boxes.push(div6);
boxes.push(div7);
boxes.push(div8);
boxes.push(div9);

function resetBoard() {
    boxes.forEach(div => {
        div.textContent = ''
    });
}