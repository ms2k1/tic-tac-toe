(function init(){
    let playfield = document.getElementById("playfield");
    //playfield.style.visibility = "hidden";
    let human = document.getElementById("sel_hum");
    let com = document.getElementById("sel_com")
    let confirm = document.getElementById("confirm");
    let select = document.getElementById("select");

    human.addEventListener("click", (e) => {
        com.checked = false;
    })

    com.addEventListener("click", (e) => {
        human.checked = false;
    })

    confirm.addEventListener("click", (e) => {
        if(human.checked || com.checked){
            playfield.style.visibility = "visible";
            select.remove();
            //document.body.appendChild(select);
            let pf = null;
            let reset = document.getElementById("reset");
            if(human.checked){
                pf = new Playfield(true, playfield.children[0], reset);
            } else {
                pf = new Playfield(false, playfield.children[0], reset);
            }
        }
        
    })
})();

class Playfield {
    constructor(isHuman, notifyHTML, resetButton){
        this.buttons = [];
        this.isHuman = isHuman;
        this.notifyHTML = notifyHTML;
        this.humanTurn = true;
        this.p1 = [];
        this.p2 = [];
        console.log(this.p1);
        this.buttons = document.getElementsByClassName("tic_tac_toe_button")
        console.log(this.buttons)
        this.makeTurn = this.makeTurn.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.makeComTurn = this.makeComTurn.bind(this);
        this.reset = this.reset.bind(this);
        for(let i=0; i < this.buttons.length; i++){
            this.buttons[i].innerHTML = "";
            this.buttons[i].addEventListener("click", this.makeTurn)
        }
        this.notifyHTML.innerHTML = "PLAYER ONE'S TURN (X)";
        resetButton.addEventListener("click", this.reset);
    }

    makeTurn(e){
        let i = parseInt(e.target.dataset.index);
        console.log(typeof(i));
        if(this.p1.includes(i) || this.p2.includes(i)) return;
        if(this.humanTurn){
            this.p1.push(i);
            e.target.innerHTML = "X";
            if(this.checkWin()) return;
            this.humanTurn = !this.humanTurn;
            if(this.isHuman){    
                this.notifyHTML.innerHTML = "PLAYER TWO'S TURN (O)";
            } else {
                this.makeComTurn();
            }
        } else {
            this.p2.push(i);
            e.target.innerHTML = "O";
            if(this.checkWin()) return;
            this.humanTurn = !this.humanTurn;
            this.notifyHTML.innerHTML = "PLAYER ONE'S TURN (X)";
        }
    }

    makeComTurn(){
        let i;
        while(true){
            i = Math.round(Math.random() * 8)
            if(!this.p1.includes(i) && !this.p2.includes(i)) break;
        }
        this.p2.push(i);
        this.buttons[i].innerHTML = "O";
        if(this.checkWin()) return;
        this.humanTurn = !this.humanTurn;
    }

    checkWin(){
        console.log("C");
        let p;
        let win = false;
        if(this.humanTurn){
            p = this.p1;
        } else {
            p = this.p2;
        }
        let isWin = function(in1, in2, in3){
            return (p.includes(in1) && p.includes(in2) && p.includes(in3));
        }
        for(let x of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]){
            win = isWin(x[0], x[1], x[2]);
            if(win){
                this.notifyHTML.innerHTML = this.humanTurn ? "PLAYER ONE (X) WINS!" : "PLAYER TWO (O) WINS!";
                for(let i=0; i<this.buttons.length; i++){
                    if(x.includes(i)) this.buttons[i].style.backgroundColor = "#FF000055";
                    this.buttons[i].removeEventListener("click", this.makeTurn)
                }
                break;
            }
        }
        console.log(p.includes(0), win);
        return win;
    }

    reset(e){
        for(let i of this.buttons){
            i.innerHTML = "";
        }
        this.humanTurn = true;
        this.p1 = [];
        this.p2 = [];
        for(let i=0; i < this.buttons.length; i++){
            this.buttons[i].innerHTML = "";
            this.buttons[i].addEventListener("click", this.makeTurn);
            this.buttons[i].style.backgroundColor = "#00000000";
        }
        this.notifyHTML.innerHTML = "PLAYER ONE'S TURN (X)";
    }


}