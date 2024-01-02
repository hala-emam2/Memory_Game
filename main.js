
var errors=0;
var cardList=
[
"Anab",
"apple",
"banana",
"karasa",
"kiwi",
"orange",
"pear",
"Strawberry",
"Romman",
"water-melon"

];
var cardSet;
var board=[];
var rows=4;
var cols=5;
var card1Selected;
var card2Selected;
window.onload= function(){
    shuffleCards();
    startGame();
}
function shuffleCards(){
    cardSet=cardList.concat(cardList);
    console.log(cardSet);
    //shuffle
    for(let i=0 ; i<cardSet.length; i++){
        let j= Math.floor(Math.random()*cardSet.length);//get random index
        let temp=cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;

    }
    console.log(cardSet);

}
function startGame(){
    //arange board 4x5
    for(let r=0; r< rows; r++){
        let row=[];
        for(let c=0; c<cols; c++){
            let cardImage= cardSet.pop();
            row.push(cardImage);

            //<img id="0-0" class="card" src="water.jpg">
            let card= document.createElement("img");
            card.id=r.toString()+"-"+c.toString();
            card.src= cardImage+(".jpg");
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);


        }
        board.push(row);
    }
    // console.log(board);
    setTimeout(hideCards, 10000);
}

//function to hide the cards

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard(){
    if(this.src.includes('back')){
        if (!card1Selected){
            card1Selected= this;
            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src =board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null; 
    card2Selected = null;
}