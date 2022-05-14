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

    const currentBox = boxContainers[currentContainer].children[inputIndex];
    if (event.target.id !== 'delete-btn' && event.target.id !== 'enter-btn' && event.target.id !== 'reset-btn' && event.target.id !== 'help' && event.target.id !== 'close') {

        if (inputIndex < MAX_BOX && currentContainer < MAX_CONTAINER ) {
            currentBox.children[0].textContent = event.target.textContent;
            Answer += event.target.textContent
            inputIndex++;
        }

    } else if (event.target.id === 'delete-btn') {
        currentBox.children[0].textContent = '';
        if (inputIndex > -1) inputIndex--;
        if (inputIndex < 0) inputIndex = 0;

    } else if (event.target.id === 'reset-btn') {
        currentBox.children[0].textContent = '';
        if (inputIndex > 0) inputIndex--;
        if (inputIndex < 0) inputIndex = 0;

    }else if (event.target.id === 'enter-btn') {
        if (currentContainer < MAX_CONTAINER) {
            currentContainer++;
            console.log(currentContainer)
            numberOfTries++;
            var result = evaluateAnswer(Answer)
            if (result == true) var evaluateResult = "Correct";
            else var evaluateResult = "Wrong";
    
            console.log("Test Answer: " + Answer + "\nExpression: " + expression + "\nAnswer: " + eval(expression) + "\nEvaluation: " + evaluateResult + "\nNumber of tries: " + numberOfTries)
            inputIndex = 0;
            
            
            Answer = '';
        }
        else if(currentContainer > MAX_CONTAINER-1){
            console.log("exit");
        }
       
    }
    if (boxContainers[currentContainer].lastElementChild.children[0].textContent !== '') {
        document.getElementById('enter-btn').disabled = false;
        

    } else {
        document.getElementById('enter-btn').disabled = true;
        
    }
}

function reset() {
    $("#textbox").removeAttr("disabled");
    $(':button').prop('disabled', false);
    generateExpression()
    console.log(expression)
    $("#equals").text(eval(expression)); //

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