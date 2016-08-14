JS Calculator [WIP]
===================

-After doing a bit of research on floating-point rounding errors, I decided to use a precision of 14 decimal places. This can be set when creating the Calculator object. The total number of digits is limited to 16. 0.1 + 0.2 equals 0.3 instead of JavaScript's usual output of 0.30000000000000004.

-In the future will prevent input errors including multiple decimal points and unclosed parenthesis.

-Calculations resulting in or using 'Infinity' are allowed, and backspace deletes the entire word from input.

-Keyboard support tested for IE, FF, and Chrome.

-includes Gulp build scripts

TODO
----

-fix numbers immediately after 'Infinity' (wipe input if first input after previous calculation is a number)

-fix e+(not a number)

-fix trailing operations (3+ etc.)

-use/format pretty text output for operators

-fix responsive containers to maintain ratio

-fix decimals to allow multiple in input (one per number)

-add multiplication error prevention

-add subtraction error prevention

-set input length

-add parenthesis

-add additional operations