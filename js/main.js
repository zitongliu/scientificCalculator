function add(num1, num2) {
  return num1 + num2;
}

function minus(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1/num2;
}


function mapOperatorStringToFunction(operator) {
  switch(operator) {
    case '+':
      return add;
    case '-':
      return minus;
    case '*':
      return multiply;
    case '/':
      return divide;
  }
}

var calculator = {
  inputs: [], // array of inputs
  output: [], // array of outputs
  inputDisplay: '',
  outputDisplay: '',
  requiredOperations: [], // array of math operator in string format (length of this array must be this.inputs.length - 1)
  calculate: function() {

    var inputString = this.inputDisplay;
    var patternOnlyOperators = new RegExp(/[\+-\/*]/g);
    var patternNotOperators = new RegExp(/[^\+-\/*]/g);

    this.inputs = inputString.split(patternOnlyOperators);


    // convert array of strings to array of numbers
    for (var i = 0; i < this.inputs.length; i++) {
      this.inputs[i] = parseFloat(this.inputs[i], 10);
    }


    this.requiredOperations = inputString.replace(patternNotOperators, '').split('');
    // debugger
    // Solve order of precedence by:
    // 1. scan through the operators array
    // 2. when it detects a higher precedence operator, do the calculation and put the result back into the inputs array
    for (var i = 0; i < this.requiredOperations.length; i++) {
      if (this.requiredOperations[i] === '*' || this.requiredOperations[i] === '/') {
        if (this.requiredOperations[i] === '*') {
          var localSum = this.inputs[i] * this.inputs[i+1];
        } else if (this.requiredOperations[i] === '/'){
          var localSum = this.inputs[i] / this.inputs[i+1];
        }
        this.inputs[i] = localSum;
        this.inputs.splice(i+1,1);

        this.requiredOperations.splice(i,1);
        i -= 1;
      }
    }

    var total = this.inputs[0];
    for (var i = 1; i < this.inputs.length; i++) {
      var currentOperationFunction = mapOperatorStringToFunction(this.requiredOperations[i-1]);
      total = currentOperationFunction(total, this.inputs[i]);
    }

    this.output.push(total);
  },
  displayInputs: function(displayNode) {
    displayNode.innerHTML = calculator.inputDisplay;
  },
  displayResult: function(displayNode) {
    displayNode.innerHTML = this.output[0];
  },
  resetCalculator: function() {
    this.inputs = [];
    this.output = [];
    this.inputDisplay = '';
    this.outputDisplay = '';
  }
}

window.onload = function() {
  // Select all input buttons
  var inputButtons = document.querySelectorAll('button.input');

  var inputScreen = document.querySelector('.inputDisplay');

  // Add event listener to input buttons
  for (var i = 0; i < inputButtons.length; i++) {
    inputButtons[i].addEventListener("click", function() {
      calculator.inputDisplay = calculator.inputDisplay.concat(this.value);
      calculator.displayInputs(inputScreen);
    });
  }

  var equalButton = document.querySelector('.equal');
  var resultScreen = document.querySelector('.outputDisplay');

  equalButton.addEventListener("click", function() {
    calculator.calculate();
    calculator.displayResult(resultScreen);
  });

  document.querySelector('.reset').addEventListener("click", function() {
    calculator.resetCalculator();
    calculator.displayInputs(inputScreen);
    calculator.displayResult(resultScreen);
  });

  document.querySelector('.ans').addEventListener("click", function() {
    var previousAnswer = calculator.output[0];
    calculator.resetCalculator();
    calculator.inputDisplay = calculator.inputDisplay.concat(previousAnswer);
    calculator.displayInputs(inputScreen);
  });

}
