const TicTac = {
    cPlayer: "X", 
    state: Array(9).fill(null), 
    gameOver: false, 

 
    init() {
        this.cBoard();
        document
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
    },


    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = ""; 
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", (e) => this.handleClick(e)); 
        this.uMessage(`Player ${this.cPlayer}'s turn`);
    },

    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;

 
        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");


        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
        } else {
    
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
        }
    },

    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6], 
        ];
        return wins.find((combo) =>
            combo.every((i) => this.state[i] === this.cPlayer)
        );
    },

 
    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.color = "red";
        });
    },

   
    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
    },

    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },
};

const display = document.getElementById("display")
let timer = null;
let startTime = 0;
let elaspedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elaspedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop(){
    if(isRunning){
        clearInterval(timer);
        elaspedTime = Date.now - startTime;
        isRunning = false;
    }
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elaspedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00"
}

function update(){
    const currentTime = Date.now();
    elaspedTime = currentTime - startTime;


    let hours = Math.floor(elaspedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elaspedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elaspedTime / 1000 % 60);
    let milliseconds = Math.floor(elaspedTime % 1000 / 10);

     hours = String(hours).padStart(2,"0");
     minutes = String(minutes).padStart(2,"0");
     seconds = String(seconds).padStart(2,"0");
     milliseconds = String(milliseconds).padStart(2,"0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`

}


TicTac.init();