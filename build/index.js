"use strict";var Calculator=function(outputDOM){var output=outputDOM,input="",answer="";return{printOutput:function(c){output.html(c)},calculate:function(){answer=eval(input),input=answer.toString(),this.printOutput(answer)},setInput:function(c){input+=c,this.printOutput(input)}}};$(document).ready(function(){var c=new Calculator($("#output"));$(".input").on("click",function(){c.setInput($(this).data("input"))}),$("#equals").on("click",function(){c.calculate()}),$(document).on("keypress",function(c){switch(console.log(c.keyCode),c.keyCode){case 43:$("#plus").click();break;case 46:$("#decimal").click();break;case 48:$("#zero").click();break;case 49:$("#one").click();break;case 50:$("#two").click();break;case 51:$("#three").click();break;case 52:$("#four").click();break;case 53:$("#five").click();break;case 54:$("#six").click();break;case 55:$("#seven").click();break;case 56:$("#eight").click();break;case 57:$("#nine").click();break;case 61:$("#equals").click()}})});