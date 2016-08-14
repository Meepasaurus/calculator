JS Calculator [WIP]
===================

-After doing a bit of research on floating-point rounding errors, I decided to use a precision of 14 decimal places. This can be set when creating the Calculator object. The total number of digits is limited to 16. `0.1 + 0.2 equals 0.3` instead of JavaScript's usual output of `0.30000000000000004`.

-Prevents leading operators except `-` and removes trailing operators. Avoids common input errors by overwriting illegal adjacent operations such as `1*/`. Rarer input errors, for example by typing `1*+/2` print `Invalid input.` to avoid confusing the user with too many automatic input edits.

-Calculations resulting in or using 'Infinity' are allowed, and backspace deletes the entire word from input.

-Keyboard support tested for IE, FF, and Chrome.

-includes Gulp build scripts

TODO
----

-fix e+(not a number)

-fix leading zeroes

-use/format pretty text output for operators

-fix responsive containers to maintain ratio

-fix decimals to allow multiple in input (one per number)

-set input length

-add toasts for max input, invalid first input

Extra TODO
----------

-add parenthesis

-add additional operations

-add history box