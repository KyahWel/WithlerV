const inputValue = document.querySelector('input');
var numberOfTries = 0;
var expression;

$(document).ready(function () {
    generateExpression()
    console.log(expression)
    $("#equals").text(eval(expression));
});


function goToHome() {
    window.location.href = "../index.html"
};

const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('button');
const boxContainers = document.querySelectorAll('.box-container');

const MAX_BOX = 5; //PALITAN KUNG ILANG BOX
const MAX_CONTAINER = 6; //PALITAN KUNG ILANG CONTAINER

let currentContainer = 0;
let inputIndex = 0;
var Answer = '';
for (const button of buttons) {
    button.onclick = buttonHandler;
}

function buttonHandler(event) {
    if (currentContainer < MAX_CONTAINER) {
        var currentBox = boxContainers[currentContainer].children[inputIndex];
        if (event.target.id !== 'delete-btn' && event.target.id !== 'enter-btn' && event.target.id !== 'reset-btn' && event.target.id !== 'help' && event.target.id !== 'close') {

            if (inputIndex < MAX_BOX) {
                if (inputIndex == -1) inputIndex = 0;
                currentBox.children[0].textContent = event.target.textContent;
                if(Answer.length < MAX_BOX) Answer += event.target.textContent
                inputIndex++;

                if (inputIndex == 5) inputIndex = 4;

            }
            console.log("Input index: "+inputIndex)
            console.log("Answer: "+Answer)
        } else if (event.target.id === 'delete-btn') {

            if (inputIndex > 0 && inputIndex <= MAX_BOX-1) inputIndex--;
            
            if (inputIndex <= 0) inputIndex = 0;
            if(inputIndex == MAX_BOX-1){
                currentBox.children[0].textContent = '';
                 currentBox = boxContainers[currentContainer].children[inputIndex];
            }
            else{     
                currentBox = boxContainers[currentContainer].children[inputIndex];
                currentBox.children[0].textContent = '';
            }
            
           
            
            
            Answer = Answer.slice(0, Answer.length - 1);
            console.log("Delete index: "+inputIndex)
            console.log("Answer: "+Answer)
           

        } else if (event.target.id === 'reset-btn') {


        } else if (event.target.id === 'enter-btn') {

            numberOfTries++;
            var result = evaluateAnswer(Answer)
            if (result == true){
                var evaluateResult = "Correct";
            }
            else var evaluateResult = "Wrong";

            console.log("Test Answer: " + Answer + "\nExpression: " + expression + "\nAnswer: " + eval(expression) + "\nEvaluation: " + evaluateResult + "\nNumber of tries: " + numberOfTries)
            inputIndex = 0;

            Answer = '';
            currentContainer++;
            console.log(currentContainer)


        }
        else if (event.target.id === 'reset-btn') {
            location.reload(true);
        }

        if (currentContainer < MAX_CONTAINER) {
            if (boxContainers[currentContainer].lastElementChild.children[0].textContent !== '') {
                document.getElementById('enter-btn').disabled = false;


            } else {
                document.getElementById('enter-btn').disabled = true;

            }
        }
    } else if (currentContainer > MAX_CONTAINER - 1) {
        console.log("exit");
    }
}
 

function generateExpression() {
    let operations = /[*\/+-]/;
    let withoutNumbers = /[^0-9]/
    let Digit_1 = new RandExp(/[1-9]/).gen();
    let Digit_2 = new RandExp(/[0-9*\/+-]/).gen();
    let Digit_3 = new RandExp(/[1-9*\/+-]/).gen();

    if (operations.test(Digit_2) && operations.test(Digit_3))
        Digit_3 = new RandExp(/[1-9]/).gen();


    let Digit_4 = new RandExp(/[1-9*\/+-]/).gen();
    if (operations.test(Digit_3) && operations.test(Digit_4))
        Digit_4 = new RandExp(/[1-9]/).gen();


    let Digit_5 = new RandExp(/[1-9]/).gen();
    expression = Digit_1 + Digit_2 + Digit_3 + Digit_4 + Digit_5

    if (eval(expression) % 1 != 0 || eval(expression) <= 0 || !withoutNumbers.test(expression) || eval(expression) > 25)
        generateExpression()
    else
        return expression
}

function evaluateAnswer(AnswerExp) {
    return (AnswerExp == expression ? true : false)
}