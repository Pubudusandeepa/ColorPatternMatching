


 const gameColor = ["red","blue","green","yellow"];
 const message = document.querySelector(".message");
 const gamearea = document.querySelector(".gamearea");
 const button = document.querySelector("button");

 let gameClicks = [];
 let userClicks = [];
 let inPlay = false;
 let playNum = 5;
 window.addEventListener("load",setup);
 button.addEventListener("click",function(){
     if(!inPlay){
         player();
     }
     
 })

function player(){
    button.disabled =true;
    button.style.display = "none";
    messager("Match Pattern");
    gameClicks = [];
     userClicks = [];
     runSequence(playNum);
}

function runSequence(num){
  let squares = document.querySelectorAll(".box");
  num--;
  if(num<0){
      inPlay = true;
      return;
  }
  let randomNum = Math.floor(Math.random()*gameColor.length);
  gameClicks.push(gameColor[randomNum]);
  squares[randomNum].style.opacity="1";
  setTimeout(function(){
      squares[randomNum].style.opacity ="0.5";
      setTimeout(function(){
          runSequence(num);
      },100);
  },500)
}

 function setup(){
      for(let x=0;x<gameColor.length;x++){
          let div = eleFactory("div");
          div.style.backgroundColor = gameColor[x];
          div.classList.add("box");
          div.style.opacity =".5";
          div.myColor = gameColor[x];
          div.addEventListener("click",checkAnswer);
          gamearea.appendChild(div);
      }  

 }

 function checkAnswer(e){
    if(inPlay){
        let el = e.target;
        userClicks.push(el.myColor);
        el.style.opacity = "1";
        setTimeout(function(){
            el.style.opacity = "0.5";
        },500);
        if(userClicks.length == gameClicks.length){
            inPlay = false;
           endGame();
        }
        console.log(userClicks);
    }
 
 }
 function messager(mes){
    message.innerHTML = mes;
 }

 function endGame(){
     button.disable = false;
     button.style.display = "block";
     if(userClicks.toString() == gameClicks.toString()){
         playNum++;
         let correct ="correct"
         messager(correct);
     }else{
         let incorrect="incorrect"
         messager(incorrect);
     }
 }



 function eleFactory(elType){
     let ele = document.createElement(elType);
     return ele;
 }