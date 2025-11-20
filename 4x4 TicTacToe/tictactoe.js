window.addEventListener("load", function() {
    let square = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "];
    let MoveCounter = 1;
    let running = true;
	let resettable = false;
    let spielfeld = this.document.getElementById("spielfeld");
    let squares = this.document.querySelectorAll(".square");
	let byali = this.document.getElementById("byali");
	let willkommen = this.document.getElementById("willkommen");
	let by4 = this.document.getElementById("4x4");
	const startButton = document.getElementById("startbutton");
	const heading = document.getElementById("heading");
	const spielfeld2 = document.getElementById("spielfeld");


	this.setTimeout(()=>{
		willkommen.classList.add("new");
	},500)
	this.setTimeout(()=>{
		by4.classList.add("new");
	},1100)
	this.setTimeout(()=>{
		byali.classList.add("new");
	},1700)

	this.setTimeout(()=>{
		startButton.classList.add("clickbait");
	},1600);

	startButton.addEventListener("click", () => {
		heading.classList.add("fade-out");
		startButton.classList.add("fade-out");
		startButton.disabled = true;
		setTimeout(() => {
			heading.style.display = "none";
			startButton.style.display = "none";
			spielfeld2.classList.remove("hidden");
			spielfeld2.classList.add("visible");
		}, 400);
	});

	spielfeld.addEventListener("click", function() {
		if(resettable){
			restartGame();
		}
	})
    
    squares.forEach(quadrat => {
        quadrat.addEventListener("click", function handleClick() {
			if(running){
				let index = this.id;
				if(square[index-1]!="X" && square[index-1]!="O") {
					if(MoveCounter%2==0) {
						square[index-1]="O";
						this.innerText = "O";
						this.classList.remove("unclicked");
						this.classList.add("clickedO", "ticked");
					}else {
						square[index-1]="X";
						this.innerText = "X";
						this.classList.remove("unclicked");
						this.classList.add("clickedX", "ticked");
					}
					MoveCounter++;
					checkGameStatus(index);
				}
			}
        })
    })

    
    let checkGameStatus = function(i) {
        if(horizontalCheck(i)||verticalCheck(i)||diagonalLeftCheck(i)||diagonalRightCheck(i)||MoveCounter==17) {
            finishGame();
            if(MoveCounter<17) {
                console.log(square[i-1] + " lost! ");							
            }
        }
    }

    let finishGame = function() {
        running = false;
		setTimeout(() => {
			document.getElementById("game-over-overlay").classList.add("active");
			resettable = true;
		}, 2000);
    }

	let restartGame = function() {
		resettable = false;
		running = true;
		MoveCounter = 1;
		document.getElementById("game-over-overlay").classList.remove("active");
		squares.forEach(quadrat => {
			quadrat.classList.remove("clickedO","clickedX","ticked", "highlighted", "unclicked");
			quadrat.classList.add("unclicked");
			quadrat.innerText = quadrat.id;
			square[quadrat.id-1] = " ";
		})
	}

	/* markiert die 3 gesetzten Zeichen die zur Niederlage gefuehrt haben */
	let highlight = function(a,b,c) {
		let x = a+1;
		let y = x+b;
		let z = x+c;
		console.log('#'+x, '#'+y, '#'+z)
		let highlightOne = document.getElementById(x);
		let highlightTwo = document.getElementById(y);
		let highlightThree = document.getElementById(z);
		let highlights = [document.getElementById(x),document.getElementById(y),document.getElementById(z)]
		console.log(highlights);
		highlights.forEach(highlight => {
			highlight.classList.remove("ticked");
			highlight.classList.add("highlighted");
		})
	}

    let horizontalCheck = function(i) {
		index = i-1;
		answer = false;
		if(isFirstHorizontalSquare(i)) {
			if(square[index]==square[index+1] && square[index]==square[index+2]) {
				answer = true;
				highlight(index, 1, 2);
			}else {
				answer = false;
			}
		}
		if(isCentreHorizontalSquare(i) && !answer) {
			if(square[index]==square[index-1] && square[index]==square[index+1]) {
				answer = true;
				highlight(index,-1,1)
			}else {
				answer = false;
			}
		}
		if(isLastHorizontalSquare(i) && !answer) {
			if(square[index]==square[index-1] && square[index]==square[index-2]) {
				answer = true;
				highlight(index, -1, -2)
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	let verticalCheck = function(i) {
        index = i-1;
        answer = false;
		if(isFirstVerticalSquare(i)) {
			if(square[index]==square[index+4] && square[index]==square[index+8]) {
				answer = true;
				highlight(index, 4, 8)
			}else {
				answer = false;
			}
		}
		if(isCentreVerticalSquare(i) && !answer) {
			if(square[index]==square[index-4] && square[index]==square[index+4]) {
				answer = true;
				highlight(index, -4, 4)
			}else {	answer = false;
			}
		}
		if(isLastVerticalSquare(i) && !answer) {
			if(square[index]==square[index-4] && square[index]==square[index-8]) {
				answer = true;
				highlight(index, -4, -8)
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	let diagonalLeftCheck = function(i) {
		index = i-1;
		answer = false;
		if(isFirstDiagonalLeftSquare(i)) {
			if(square[index]==square[index+3] && square[index]==square[index+6]) {
				answer = true;
				highlight(index, 3, 6)
			}else {
				answer = false;
			}
		}
		if(isCentreDiagonalLeftSquare(i) && !answer) {
			if(square[index]==square[index-3] && square[index]==square[index+3]) {
				answer = true;
				highlight(index, -3, 3)
			}else {
				answer = false;
			}
		}
		if(isLastDiagonalLeftSquare(i) && !answer) {
			if(square[index]==square[index-3] && square[index]==square[index-6]) {
				answer = true;
				highlight(index, -3, -6)
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	let diagonalRightCheck = function(i) {
		index = i-1;
		answer = false;
		if(isFirstDiagonalRightSquare(i)) {
			if(square[index]==square[index+5] && square[index]==square[index+10]) {
				answer = true;
				highlight(index, 5, 10)
			}else {
				answer = false;
			}
		}
		if(isCentreDiagonalRightSquare(i) && !answer) {
			if(square[index]==square[index-5] && square[index]==square[index+5]) {
				answer = true;
				highlight(index, -5, 5)
			}else {
				answer = false;
			}
		}
		if(isLastDiagonalRightSquare(i) && !answer) {
			if(square[index]==square[index-5] && square[index]==square[index-10]) {
				answer = true;
				highlight(index, -5, -10)
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	let isFirstHorizontalSquare = function(i) {
		if(i==1||i==2||i==5||i==6||i==9||i==10||i==13||i==14) {
			return true;
		}else{
			return false;
		}
	}
	
	let isCentreHorizontalSquare = function(i) {
		if(i==2||i==3||i==6||i==7||i==10||i==11||i==14||i==15) {
			return true;
		}else{
			return false;
		}
	}
	
	let isLastHorizontalSquare = function(i) {
		if(i==3||i==4||i==7||i==8||i==11||i==12||i==15||i==16) {
			return true;
		}else{
			return false;
		}
	}
	
	let isFirstVerticalSquare = function(i) {
		if(i>=1 && i<=8) {
			return true;
		}else{
			return false;
		}
	}
	
	let isCentreVerticalSquare = function(i) {
		if(i>=5 && i<=12) {
			return true;
		}else{
			return false;
		}
	}
	
	let isLastVerticalSquare = function(i) {
		if(i>=9 && i<=16) {
			return true;
		}else{
			return false;
		}
	}
	
	let isFirstDiagonalRightSquare = function(i) {
		if(i==1||i==2||i==5||i==6) {
			return true;
		}else{
			return false;
		}
	}
	
	let isCentreDiagonalRightSquare = function(i) {
		if(i==6||i==7||i==10||i==11) {
			return true;
		}else{
			return false;
		}
	}
	
	let isLastDiagonalRightSquare = function(i) {
		if(i==11||i==12||i==15||i==16) {
			return true;
		}else{
			return false;
		}
	}
	
	let isFirstDiagonalLeftSquare = function(i) {
		if(i==3||i==4||i==7||i==8) {
			return true;
		}else{
			return false;
		}
	}
	
	let isCentreDiagonalLeftSquare = function(i) {
		if(i==6||i==7||i==10||i==11) {
			return true;
		}else{
			return false;
		}
	}
	
	let isLastDiagonalLeftSquare = function(i) {
		if(i==9||i==10||i==13||i==14) {
			return true;
		}else{
			return false;
		}
	}
});