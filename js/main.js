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
  inputs: [3, 2, 3],
  output: [],
  requiredOperations: ['-','+'],
  calculate: function() {
    var total = this.inputs[0];

    for (var i = 1; i < this.inputs.length; i++) {
      var currentOperationFunction = mapOperatorStringToFunction(this.requiredOperations[i-1]);
      total = currentOperationFunction(total, this.inputs[i]);
    }

    this.output.push(total);
  }
}

calculator.calculate();
console.log(calculator.output);
