'use strict';

var Calculator = function(outputDOM){
	var output = outputDOM,
		input = '',
		answer = '';

	return {
		printOutput : function(toOutput){
			output.html(toOutput);
		},

		calculate: function(){
			answer = eval(input);
			input = answer.toString();
			this.printOutput(answer);
		},

		setInput: function(newInput){
			input += newInput;
			this.printOutput(input);
		}
	};
};

$(document).ready(function(){
	var myCalculator = new Calculator($('#output'));

	$('.input').on('click', function(){
		myCalculator.setInput($(this).data('input'));
	});

	$('#equals').on('click', function(){
		myCalculator.calculate();
	});

	//keyboard
	$(document).on('keypress', function(e){
		console.log(e.keyCode);
		switch(e.keyCode){
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
			case 61:
				$('#equals').click();
				break;
		}
	});
});