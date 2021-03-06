JS Calculator
=============

- After doing a bit of research on floating-point rounding errors, I decided to use a precision of 14 decimal places. This can be set when creating the Calculator object. The total number of digits is limited to 16. `0.1 + 0.2 = 0.3` instead of JavaScript's usual output of `0.30000000000000004`.

- Math.js' eval is used as a safer substitution, and it also helps to parse `2^4` to `Math.pow(2, 4)`.

- Prevents leading operations except `-` and removes leading zeros and trailing operations. Avoids common input errors by overwriting illegal adjacent operations such as `1*/`, and only allows one `.` per number. Rarer input errors (for example, by typing `1*+/2`) print `Invalid input.` to avoid confusing the user with too many automatic input edits.

- Prevents mismatched parentheses and automatically closes unclosed ones. `1(2)(3)4` is computed as `1*(2)*(3)*4`. `2sin(2)` is computed as `2*sin(2)`.

- Calculations such as `0/0` that result in `NaN` print `That's undefined.`.

- Calculations resulting in or using 'Infinity' are allowed, and backspace deletes the entire word from input.

- Keyboard support tested for IE, FF, and Chrome (see shortcut list on webpage).

- Includes Gulp build scripts.

Unminified CodePen version: http://codepen.io/Meepasaurus/full/akrJQG/
----------------------------------------------------------------------

- Please note that Codepen is currently acting a little strangely and may require you to click on the calculator UI before it registers key presses. This issue is not present in the standalone version.

Future TODO
-----------

- Make a custom Math.js bundle to reduce load time.