'use strict';

var Calculator = function(outputTopDOM, outputBottomDOM){
	var outputTop = outputTopDOM, //previous calculation
		outputBottom = outputBottomDOM, //current input/answer
		txtTop = '',
		txtBottom = '';

	return {
		printTopOutput : function(output){
			outputTop.html(output === '' ? '&nbsp;' : '&gt;' + output);
		},

		printBottomOutput : function(output){
			outputBottom.html(output === '' ? '&nbsp;' : output);
		},

		inputNum: function(num){
			txtBottom += num;
			this.printBottomOutput(txtBottom);
		},

		calculate: function(){
			txtTop = txtBottom;
			txtBottom = '';
			this.printTopOutput(txtTop);
			//answer = eval(input);
			//input = answer.toString();
			this.printBottomOutput(txtBottom);
		},

		add: function(){

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
				txtBottom = txtBottom.slice(0, -1);
				this.printBottomOutput(txtBottom);
			}
		},

		decimal: function(){
			//only allow 1 decimal point
			if (txtBottom.indexOf('.') === -1){
				//add a leading zero if empty
				if (txtBottom === ''){
					txtBottom = '0.';
				} else {
					txtBottom += ".";
				}
				this.printBottomOutput(txtBottom);
			}
		}
	};
};

function decimalPlaces(num) {
  	//adapted from SO - Mike Samuel
  	var match = (''+num).match(/(\.(\d+))/);
  	if (!match) { return 0; }
  	return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[2] ? match[2].length : 0)
	);
}

$(document).ready(function(){
	console.log(0.7+0.1);

	var scaled = ((decimalPlaces(0.3)*10*0.7)+(decimalPlaces(0.1)*10*0.1));
	console.log(scaled);

	console.log(scaled / (decimalPlaces(0.2)*10));

	var myCalculator = new Calculator($('#output-top'), $('#output-bottom'));

	//0-9
	$('.num').on('click', function(){
		myCalculator.inputNum($(this).text());
	});

	//all other buttons
	$('.mod').on('click', function(){
		console.log($(this).data('input'));
		switch($(this).data('input')){
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
				myCalculator.add();
				break;
			case '=':
				myCalculator.calculate();
				break;
		}
	});

	$(document).on('keydown', function(e){
		console.log('keydown ' + e.which);
		switch(e.which){
			case 8:
				//prevent browser going back warning from Chrome, and going back in FF
				e.preventDefault;
				myCalculator.backspace();
				break;
			case 46:
				myCalculator.allClear();
				break;
		}
	});


	//keyboard
	$(document).on('keypress', function(e){
		console.log('keypress ' + e.which);
		switch(e.which){
			//prevent browser from going back in FF
			case 8:
				e.preventDefault();
				break;
			case 43:
				$('#plus').click();
				break;
			case 46:
				$('#decimal').click();
				break;
			case 48:
				$('#zero').click();
				break;
			case 49:
				console.log('one');
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