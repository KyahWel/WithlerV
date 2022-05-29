const inputValue = document.querySelector('input');
var numberOfTries = 0;
var expression;

$(document).ready(function () {
    generateExpression()
    console.log(expression)
    $(".hardDiff").css("background-color","#6c7c7c")
    $("#equals").text(eval(expression));
});



const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('button');
const boxContainers = document.querySelectorAll('.box-containerHard');

const MAX_BOX = 8; //PALITAN KUNG ILANG BOX
const MAX_CONTAINER = 6; //PALITAN KUNG ILANG CONTAINER

let currentContainer = 0;
let inputIndex = 0;
let streak = 0;
var Answer = '';
for (const button of buttons) {
    button.onclick = buttonHandler;
}

function buttonHandler(event) {
    if (currentContainer < MAX_CONTAINER) {
        var currentBox = boxContainers[currentContainer].children[inputIndex];
        if (event.target.id !== '' && event.target.id !== 'delete-btn' && event.target.id !== 'enter-btn' && event.target.id !== 'reset-btn' && event.target.id !== 'help' && event.target.id !== 'close') {

            if (inputIndex < MAX_BOX) {
                if (inputIndex == -1) inputIndex = 0;
                currentBox.children[0].textContent = event.target.textContent;
                if(Answer.length < MAX_BOX) Answer += event.target.textContent
                inputIndex++;

                if (inputIndex == 8) inputIndex = 8;

            }
           
          
        } else if (event.target.id === 'delete-btn') {

            if (inputIndex > 0 && inputIndex <= MAX_BOX) inputIndex--;
            
            if (inputIndex <= 0) inputIndex = 0;
           
            currentBox = boxContainers[currentContainer].children[inputIndex];
            currentBox.children[0].textContent = '';
            
            Answer = Answer.slice(0, Answer.length - 1);
        
        } else if (event.target.id === 'reset-btn') {


        } else if (event.target.id === 'enter-btn') {
            const answerArray = Answer.split("");
            const expressionArray = expression.split("");
            const containsAll = answerArray.every(element => {
                return expressionArray.includes(element);
              });
            numberOfTries++;
            if (evaluateAnswer(Answer) == 1){
               const opt = "1234567890+-/*()"
               for(let i = 0; i<MAX_BOX;i++){
                currentBox = boxContainers[currentContainer].children[i];
                currentBox.style.backgroundColor = "#3AA346";
               }
               for(let x = currentContainer+1; x<MAX_CONTAINER;x++){
                   for (let y = 0; y<MAX_BOX; y++){
                    currentBox = boxContainers[x].children[y];
                    currentBox.style.backgroundColor = "#BBC6CD";
                   } 
               }
               for (let z = 0; z < answerArray.length ; z++){
                document.getElementById(answerArray[z]).style.background = "#3AA346";
               }
               for (let z = 0 ; z < opt.length ; z++){
                document.getElementById(opt[z]).disabled = true;
               }
               
               document.getElementById('enter-btn').disabled = true;
               streak++;
               var myModal = new bootstrap.Modal(document.getElementById('correctModal'),{
                    keyboard: false
                  })
                myModal.toggle()
                $("#streak").text(streak)
                if( !$('#myModal').is(':visible')){
                    continueGame();
                    
                }
            }
            else if(evaluateAnswer(Answer)== -1) {
                var myModal = new bootstrap.Modal(document.getElementById('errorModal'),{
                    keyboard: false
                  })
                myModal.toggle()
                $("#answer").text(eval(expression))
                
            }
            else {
               
                for (let i = 0 ; i < answerArray.length ; i++){
                    currentBox = boxContainers[currentContainer].children[i];
                   
                    if(expressionArray[i] == answerArray[i] ){
                        currentBox.style.backgroundColor = "#3AA346";
                        document.getElementById(answerArray[i]).style.background = "#3AA346";
                    }
                    
                    else if(expressionArray.includes(answerArray[i])){
                        currentBox.style.backgroundColor = "#FFC30B";
                        document.getElementById(answerArray[i]).style.background = "#FFC30B";  
                    }
                    else{
                        currentBox.style.backgroundColor = "#e25252";
                        document.getElementById(answerArray[i]).style.background = "#e25252"; 
                    }                   
                }
                Answer = '';
                currentContainer++;
                inputIndex = 0;
              
            }
        }
        else if (event.target.id === 'reset-btn') {
            
        }

        if (currentContainer < MAX_CONTAINER) {
            if (boxContainers[currentContainer].lastElementChild.children[0].textContent !== '') {
                document.getElementById('enter-btn').disabled = false;


            } else {
                document.getElementById('enter-btn').disabled = true;

            }
        }
    } else if (currentContainer > MAX_CONTAINER - 1) {
        var myModal = new bootstrap.Modal(document.getElementById('failModal'),{
            keyboard: false
          })
        myModal.toggle()
    }
}
 

function generateExpression() {

    let setA = '([(])([1-9])([/+*-])([1-9])([)])([/+*-])([1-9])([0-9])'
    let setB = '([1-9])([/+*-])([1-9])([/+*-])([1-9])([/+*-])([1-9])([0-9])'
    let setC = '([1-9])([0-9])([/+*-])([(])([1-9])([/+*-])([1-9])([)])'
    let setD = '([(])([1-9])([/+*-])([1-9])([)])([/+*-])([1-9])([0-9])'
    let setE = '([(])([1-9])([0-9])([/+*-])([1-9])([)])([/*])([1-9])'
    let setF = '([(])([1-9])([/+*-])([1-9])([0-9])([)])([/*])([1-9])'    
    let setG = '([1-9])([0-9])([/+*-])([1-9])([0-9])([/+*-])([1-9])([0-9])'
    let setH = '([1-9])([0-9])([0-9])([/+*-])([1-9])([/+*-])([1-9])([0-9])'
    let setI = '([1-9])([0-9])([/+*-])([1-9])([/+*-])([1-9])([0-9])([0-9])'
    
    expression = new RandExp(setA+'|'+setB+'|'+setC+'|'+setD+'|'+setE +'|'+setF+'|'+setG+'|'+setH+'|'+setI).gen()

    if (eval(expression) % 1 != 0 || eval(expression) <= 0  || eval(expression) > 500)
        generateExpression()
    else
        return expression
}

function evaluateAnswer(AnswerExp) {
    const answerArray = AnswerExp.split("");
    const expressionArray = expression.split("");
    const containsAll = answerArray.every(element => {
        return expressionArray.includes(element);
      });
    if(eval(AnswerExp) != eval(expression)) return -1 
    else if(AnswerExp != expression && containsAll) return 1
    else if (AnswerExp == expression) return 1
    else return 0
  
}

function continueGame(){

    Answer = "";
    const opt = "1234567890+-/*"
    for (let i = 0; i < MAX_CONTAINER; i++){
        for (let x = 0; x < MAX_BOX; x++){
            currentBox = boxContainers[i].children[x];
            currentBox.children[0].textContent = '';
            currentBox.style.backgroundColor = '#FFFFFF';
        }
    }
    for (let z = 0 ; z < opt.length ; z++){
        document.getElementById(opt[z]).disabled = false;
        document.getElementById(opt[z]).style.background= "#768d87";
    }
    inputIndex = 0;
    currentContainer = 0;
    generateExpression();
    $("#equals").text(eval(expression));
    console.log(expression)

}

$('.easyDiff').click(function(){
    location.replace('easy.html')
});

$('.normalDiff').click(function(){
    location.replace('normal.html')
});



