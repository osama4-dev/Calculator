//getting the id to enter the text
function getHistory() {
  return document.getElementById("history-value").innerText;
}
//with this the numbers can be entetred in the history section
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
//getting the output id
function getOutput() {
  return document.getElementById("output-value").innerText;
}
//to print the users input
function printOutput(num) {
  //if value is empty we set it to empy
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  }
  //or else we get the number
  else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}
//this is used for removing the  , etween numbers
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
// giving a click function so that user can click
// after clicked what action is to be performed
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    //clear button to check if id is clear

    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    }
    //   as well as backspace we convert it to number format then we
    // we convert to string and remove the last character by using substr.
    else if (this.id == "backspace") {
      //this is  done for the number if clicked
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    }
    //the operator in the calculator does not work if the output is empty
    // so we have to first check if the output is not empty.
    else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      //if a number is clicked it is first added to the history

      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);

        history = history + output;
        if (this.id == "=") {
          var result = eval(history);
          //the result will be printed in the output
          // and the history will be set to empty
          printOutput(result);
          printHistory("");
        } else {
          //for other opeartors the operator gets added to history a
          // and the output is set to empty
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
// giving nan value if backspave is entered so fixing it
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
