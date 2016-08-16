'use strict';

var Calculator = function(numberPrecision, outputTopDOM, outputBottomDOM, historyDOM){
	var precision = numberPrecision, //number of decimal places to format calculations to, 14 recommended
		outputTop = outputTopDOM, //previous calculation
		outputBottom = outputBottomDOM, //current input/answer
		history = historyDOM,
		txtTop = '', //for internal calculations
		txtBottom = '',
		stripEndArr = ['+', '-', '*', '/'], //ignored input endings
		unclosedParens = 0, //parenthesis counter
		canDecimal = true, //can input a .
		canClearWithNum = false, //used to clear input when typing a number immediately after a calculation
		canClear = false; //used to clear input after an error

	return {
		printOutput : function(isTop, printHistory){ //both booleans
			if (isTop){
				//print top
				outputTop.html(txtTop === '' ? '&nbsp;' : '&gt;' + txtTop);
				if (printHistory){
					if (txtBottom !== ''){
						history.prepend($('<p class="flow-text">').html(outputTop.html()));
					}
				}
			} else {
				//print bottom
				outputBottom.html(txtBottom === '' ? '&nbsp;' : txtBottom);
				if (printHistory){
					if (txtBottom !== ''){
						history.prepend($('<p class="flow-text">').html(outputBottom.html()));
					}
				}
			}
		},

		inputNum: function(num){
			if (canClear){
				this.clearEntry();
				canClear = false;
				canClearWithNum = false;
			} else if (canClearWithNum){
				this.clearEntry();
				canClearWithNum = false;
			}

			txtBottom += num;

			this.printOutput(false, false);
		},

		calculate: function(){
			if (txtBottom !== ''){

				//remove trailing operations
				while (stripEndArr.indexOf((txtBottom.charAt(txtBottom.length-1))) !== -1 ){
					txtBottom = txtBottom.slice(0, -1);
				}

				//remove trailing zeros
				txtBottom = txtBottom.replace(/\d+(?:\.\d+)?/g, function(x){
					return Number(x);
				});

				//add unclosed parenthesis
				while (unclosedParens > 0){
					txtBottom += ')';
					unclosedParens--;
				}

				//insert implied * for cases such as 1(1)1
				txtBottom = txtBottom.replace(/[\d\.]\(|\)[\d\.]|\)\(/g, function(x){
					x = x.split('');
					x.splice(1, 0, '*');
					return x.join('');
				});
			}

			txtTop = txtBottom;

			//eval on empty string throws an error
			if (txtBottom !== ''){
				try {
					var answer = Number(Number(eval(txtBottom).toFixed(14)).toPrecision(16)).toString();
					if (isNaN(answer)){
						txtBottom = 'That\'s undefined.';
						canClear = true;
					} else {
						txtBottom = answer;
					}
				} catch(err) {
					txtBottom = 'Invalid input.';
					canClear = true;
				}
			}

			this.printOutput(false, true);
			this.printOutput(true, true);
			canClearWithNum = true;
		},

		operate: function(operation){
			if (canClear){
				txtBottom = '';
				canClear = false;
			}

			var prevChar = txtBottom.charAt(txtBottom.length-1);

			switch(operation){
				case '+':
					switch(prevChar){
						case '':
							Materialize.toast('Cannot start input with +', 2000, 'toast');
							break;
						case '+':
							break;
						case '-':
							txtBottom = txtBottom.slice(0, -1) + '+';
							break;
						default:
							txtBottom += '+';
							break;
					}
					canDecimal = true;
					break;
				
				case '-':
					switch(prevChar){
						case '-':
							break;
						case '+':
							txtBottom = txtBottom.slice(0, -1) + '-';
							break;
						default:
							txtBottom += '-';
							break;
					}
					canDecimal = true;
					break;
				
				case '*':
					switch(prevChar){
						case '':
							Materialize.toast('Cannot start input with &Cross;', 2000, 'toast');
							break;
						case '+':
							txtBottom = txtBottom.slice(0, -1) + '*';
							break;
						case '-':
							txtBottom = txtBottom.slice(0, -1) + '*';
							break;
						case '*':
							break;
						case '/':
							txtBottom = txtBottom.slice(0, -1) + '*';
							break;
						default:
							txtBottom += '*';
							break;
					}
					canDecimal = true;
					break;
				
				case '/':
					switch(prevChar){
						case '':
							Materialize.toast('Cannot start input with &divide;', 2000, 'toast');
							break;
						case '+':
							txtBottom = txtBottom.slice(0, -1) + '/';
							break;
						case '-':
							txtBottom = txtBottom.slice(0, -1) + '/';
							break;
						case '/':
							break;
						case '*':
							txtBottom = txtBottom.slice(0, -1) + '/';
							break;
						default:
							txtBottom += '/';
							break;
					}
					canDecimal = true;
					break;

				case '.':
					this.decimal();
					break;

				case '(':
					txtBottom += '(';
					unclosedParens++;
					canDecimal = true;
					break;
				case ')':
					if (unclosedParens > 0){
						txtBottom += ')';
						unclosedParens--;
						canDecimal = true;
					} else {
						Materialize.toast('Mismatched parenthesis.', 2000, 'toast');
					}
					break;
				
				default:
					break;
			}

			canClearWithNum = false;

			this.printOutput(true, false);
			this.printOutput(false, false);
		},

		decimal: function(){
			if (canClearWithNum){
				txtBottom = '';
				canDecimal = true;
			}

			//only allow 1 decimal point per number
			if (canDecimal){
				txtBottom += ".";
				canDecimal = false;
			} else {
				Materialize.toast('Please use one decimal point per number.', 2000, 'toast');
			}
		},

		clearHistory: function(){
			history.html('');
		},

		allClear: function(){
			this.clearEntry();
			txtTop = '';
			this.printOutput(true, false);
		},

		clearEntry: function(){
			canClear = false;
			canClearWithNum = false;
			canDecimal = true;
			txtBottom = '';
			this.printOutput(false, false);
		},

		backspace: function(){
			if (txtBottom !== ''){
				if (canClear){
					canClear = false;
					txtBottom = '';
				} else {
					var prevChar = txtBottom.charAt(txtBottom.length-1);

					switch(prevChar){
						case '.':
							txtBottom = txtBottom.slice(0, -1);
							canDecimal = true;
							break;
						case '(':
							unclosedParens--;
							txtBottom = txtBottom.slice(0, -1);
							break;
						case ')':
							unclosedParens++;
							txtBottom = txtBottom.slice(0, -1);
							break;
						case 'y':
							txtBottom = '';
							break;
						default:
							txtBottom = txtBottom.slice(0, -1);
							break;
					}
					
					prevChar = txtBottom.charAt(txtBottom.length-1);
					canClearWithNum = (prevChar === 'y') ? true : false;
				}
				
				this.printOutput(false, false);
			}
		}
	};
};

$(document).ready(function(){
	var myCalculator = new Calculator(14, $('#output-top'), $('#output-bottom'), $('#history-text'));

	//0-9
	$('.num').on('click', function(){
		myCalculator.inputNum($(this).text());
	});

	//all other buttons
	$('.mod').on('click', function(){
		//console.log($(this).data('input'));
		var dataInput = $(this).data('input');

		switch(dataInput){
			case 'ac':
				myCalculator.allClear();
				break;
			case 'ce':
				myCalculator.clearEntry();
				break;
			case 'backspace':
				myCalculator.backspace();
				break;
			case 'history':
				myCalculator.clearHistory();
				break;
			case '+':
			case '-':
			case '*':
			case '/':
			case '.':
			case '(':
			case ')':
			case '^':
			case 'sqrt':
			case 'sin':
			case 'cos':
			case 'tan':
			case 'log':
				myCalculator.operate(dataInput);
				break;
			case '=':
				myCalculator.calculate();
				break;
		}
	});

	$(document).on('keydown', function(e){
		//console.log('keydown ' + e.which);
		switch(e.which){
			case 8:
				//prevent browser going back warning from Chrome, and going back in FF
				myCalculator.backspace();
				return false;
			case 46:
				myCalculator.allClear();
				break;
		}
	});


	//keyboard
	$(document).on('keypress', function(e){
		//console.log('keypress ' + e.which);
		switch(e.which){
			case 8:
				//prevent browser from going back in FF
				e.preventDefault();
				break;
			case 40:
				$('#lp').click();
				break;
			case 41:
				$('#rp').click();
				break;
			case 120:
			case 42:
				$('#multiply').click();
				break;
			case 43:
				$('#plus').click();
				break;
			case 45:
				$('#minus').click();
				break;
			case 46:
				$('#decimal').click();
				break;
			case 47:
				$('#divide').click();
				//prevent searchbar in FF
				e.preventDefault();
				break;
			case 48:
				$('#zero').click();
				break;
			case 49:
				$('#one').click();
				break;
			case 50:
				$('#two').click();
				break;
			case 51:
				$('#three').click();
				break;
			case 52:
				$('#four').click();
				break;
			case 53:
				$('#five').click();
				break;
			case 54:
				$('#six').click();
				break;
			case 55:
				$('#seven').click();
				break;
			case 56:
				$('#eight').click();
				break;
			case 57:
				$('#nine').click();
				break;
			case 13:
			case 61:
				$('#equals').click();
				break;
			case 94:
				$('#caret').click();
				break;
			case 99:
				$('#cos').click();
				break;
			case 104:
			case 113:
				$('#history').click();
				break;
			case 108:
				$('#log').click();
				break;
			case 114:
				$('#sqrt').click();
				break;
			case 115:
				$('#sin').click();
				break;
			case 116:
				$('#tan').click();
				break;
		}
	});
});