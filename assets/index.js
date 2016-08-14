'use strict';

var Calculator = function(numberPrecision, outputTopDOM, outputBottomDOM){
	var precision = numberPrecision, //number of decimal places to format calculations to, 14 recommended
		outputTop = outputTopDOM, //previous calculation
		outputBottom = outputBottomDOM, //current input/answer
		txtTop = '',
		txtBottom = '',
		prettyTop = '', //formatted operators with html entities for better display
		prettyBottom = '';

	return {
		printTopOutput : function(){
			outputTop.html(txtTop === '' ? '&nbsp;' : '&gt;' + txtTop);
		},

		printBottomOutput : function(){
			outputBottom.html(txtBottom === '' ? '&nbsp;' : txtBottom);
		},

		inputNum: function(num){
			//prevent leading zeroes
			if (txtBottom.charAt(0) === '0' && txtBottom.indexOf('.') === -1){
				txtBottom = num;
			} else {
				txtBottom += num;
			}

			this.printBottomOutput();
		},

		calculate: function(){
			txtTop = txtBottom;
			
			//eval on empty string throws an error
			if (txtBottom !== ''){
				txtBottom = Number(Number(eval(txtBottom).toFixed(14)).toPrecision(16)).toString();
			}

			this.printTopOutput();
			this.printBottomOutput();
		},

		operate: function(operation){
			var prevChar = txtBottom.charAt(txtBottom.length-1);

			switch(operation){
				case '+':
					switch(prevChar){
						case '+':
							break;
						case '-':
							txtBottom = txtBottom.slice(0, -1)+'+';
							break;
						default:
							txtBottom += '+';
							break;
					}
					break;
				
				case '-':
					switch(prevChar){
						case '-':
							break;
						case '+':
							txtBottom = txtBottom.slice(0, -1)+'-';
							break;
						default:
							txtBottom += '-';
							break;
					}
					break;
				
				case '*':
					switch(prevChar){
						default:
							txtBottom += '*';
							break;
					}
					break;
				
				case '/':
					switch(prevChar){
						default:
							txtBottom += '/';
							break;
					}
					break;
				
				default:
					break;
			}

			this.printTopOutput();
			this.printBottomOutput();
		},

		decimal: function(){
			//only allow 1 decimal point per number
			//TODO

			txtBottom += ".";
			this.printBottomOutput(txtBottom);
		},

		allClear: function(){
			txtTop = '';
			txtBottom = '';
			this.printTopOutput(txtTop);
			this.printBottomOutput(txtBottom);
		},

		clearEntry: function(){
			txtBottom = '';
			this.printBottomOutput(txtBottom);
		},

		backspace: function(){
			if (txtBottom !== ''){
				//check if +-Infinity to delete the entire word
				if(txtBottom.charAt(txtBottom.length-1) === 'y'){
					txtBottom = '';
				} else {
					txtBottom = txtBottom.slice(0, -1);	
				}
				this.printBottomOutput(txtBottom);
			}
		}
	};
};

$(document).ready(function(){
	var myCalculator = new Calculator(14, $('#output-top'), $('#output-bottom'));

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
			case '.':
				myCalculator.decimal();
				break;
			case '+':
			case '-':
			case '*':
			case '/':
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
		console.log('keypress ' + e.which);
		switch(e.which){
			case 8:
				//prevent browser from going back in FF
				e.preventDefault();
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
		}
	});
});