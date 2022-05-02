const inputValue = document.querySelector('input');
var numberOfTries = 0;
var expression;

$( document ).ready(function() {
   generateExpression()
   console.log(expression)
   $("#equals").text(eval(expression));
});


function goToHome() {
    window.location.href = "../index.html"
};

function zero() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '0');
    }
}

function one() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '1');
    }
}

function two() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '2');
    }
}

function three() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '3');
    }
}

function four() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '4');
    }
}

function five() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '5');
    }
}

function six() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '6');
    }
}

function seven() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '7');
    }
}

function eight() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '8');
    }
}

function nine() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '9');
    }
}

function plus() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '+');
    }
}

function minus() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '-');
    }
}

function times() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '*');
    }
}

function divide() {
    var value = document.getElementById('textbox').value;
    if (value.length < 5) {
        $('#textbox').val($('#textbox').val() + '/');
    }
}

function reset() {
    document.getElementById('textbox').value = '';
}

function del() {
    const value = inputValue.value;
    inputValue.value = value.slice(0, value.length - 1);
}

function generateExpression() {
    let operations = /[*\/+-]/;
    let withoutNumbers =/[^0-9]/
    let Digit_1 = new RandExp(/[1-9]/).gen();
    let Digit_2 = new RandExp(/[0-9*\/+-]/).gen();
    let Digit_3 = new RandExp(/[0-9*\/+-]/).gen();

    if(operations.test(Digit_2) && operations.test(Digit_3))
        Digit_3 = new RandExp(/[0-9]/).gen();  
    else if(operations.test(Digit_2) && Digit_3==0)
        Digit_3 = new RandExp(/[1-9]/).gen();  
    
    let Digit_4 = new RandExp(/[0-9*\/+-]/).gen();
    if(operations.test(Digit_3) && operations.test(Digit_4))
        Digit_4 = new RandExp(/[0-9]/).gen(); 
    else if(operations.test(Digit_3) && Digit_4==0)
        Digit_4 = new RandExp(/[1-9]/).gen();  

    let Digit_5 = new RandExp(/[0-9]/).gen();
    expression = Digit_1 + Digit_2 + Digit_3 + Digit_4 + Digit_5

    if(eval(expression)%1 != 0 || eval(expression)<=0 || !withoutNumbers.test(expression) || eval(expression)>25 )
        generateExpression()
    else
        return expression
}

function evaluateAnswer(){
  
    var evaluateResult;
    if(numberOfTries < 6){
        test = document.getElementById('textbox').value;
        if(test==expression){
            evaluateResult = "Correct";
            $("#textbox").attr("disabled", "disabled"); 
            $(':button').prop('disabled', true); //
        }
        else
            evaluateResult = "Wrong";
            numberOfTries+=1;
            document.getElementById('textbox').value = '';

        console.log("Test Answer: " + test +"\nExpression: " + expression +"\nAnswer: "+eval(expression) + "\nEvaluation: "+evaluateResult + "\nNumber of tries: "+numberOfTries)
    }
    else 
        console.log("No more tries left")
}