(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


var _Texture_guid = 0;

// eslint-disable-next-line no-unused-vars
var _Texture_load = F6(function (magnify, mininify, horizontalWrap, verticalWrap, flipY, url) {
  var isMipmap = mininify !== 9728 && mininify !== 9729;
  return _Scheduler_binding(function (callback) {
    var img = new Image();
    function createTexture(gl) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mininify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, horizontalWrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, verticalWrap);
      if (isMipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    }
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      var widthPowerOfTwo = (width & (width - 1)) === 0;
      var heightPowerOfTwo = (height & (height - 1)) === 0;
      var isSizeValid = (widthPowerOfTwo && heightPowerOfTwo) || (
        !isMipmap
        && horizontalWrap === 33071 // clamp to edge
        && verticalWrap === 33071
      );
      if (isSizeValid) {
        callback(_Scheduler_succeed({
          $: 0,
          id: _Texture_guid++,
          createTexture: createTexture,
          a: width,
          b: height
        }));
      } else {
        callback(_Scheduler_fail(A2(
          elm_explorations$webgl$WebGL$Texture$SizeError,
          width,
          height
        )));
      }
    };
    img.onerror = function () {
      callback(_Scheduler_fail(elm_explorations$webgl$WebGL$Texture$LoadError));
    };
    if (url.slice(0, 5) !== 'data:') {
      img.crossOrigin = 'Anonymous';
    }
    img.src = url;
  });
});

// eslint-disable-next-line no-unused-vars
var _Texture_size = function (texture) {
  return _Utils_Tuple2(texture.a, texture.b);
};




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { x: a[0], y: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.x, r.y]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2], w: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z, r.w]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.m11;
    m[1] = r.m21;
    m[2] = r.m31;
    m[3] = r.m41;
    m[4] = r.m12;
    m[5] = r.m22;
    m[6] = r.m32;
    m[7] = r.m42;
    m[8] = r.m13;
    m[9] = r.m23;
    m[10] = r.m33;
    m[11] = r.m43;
    m[12] = r.m14;
    m[13] = r.m24;
    m[14] = r.m34;
    m[15] = r.m44;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        m11: m[0], m21: m[1], m31: m[2], m41: m[3],
        m12: m[4], m22: m[5], m32: m[6], m42: m[7],
        m13: m[8], m23: m[9], m33: m[10], m43: m[11],
        m14: m[12], m24: m[13], m34: m[14], m44: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


function _WebGL_log(/* msg */) {
  // console.log(msg);
}

var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {

  if (!mesh.id) {
    mesh.id = _WebGL_guid++;
  }

  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };

});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (gl, setting) {
  gl.enable(gl.BLEND);
  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  gl.blendEquationSeparate(setting.a, setting.d);
  gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
  gl.blendColor(setting.g, setting.h, setting.i, setting.j);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (gl, setting) {
  gl.enable(gl.DEPTH_TEST);
  // a    b    c    d
  // func mask near far
  gl.depthFunc(setting.a);
  gl.depthMask(setting.b);
  gl.depthRange(setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (gl, setting) {
  gl.enable(gl.STENCIL_TEST);
  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  gl.stencilFuncSeparate(gl.FRONT, setting.d, setting.a, setting.b);
  gl.stencilOpSeparate(gl.FRONT, setting.e, setting.f, setting.g);
  gl.stencilMaskSeparate(gl.FRONT, setting.c);
  gl.stencilFuncSeparate(gl.BACK, setting.h, setting.a, setting.b);
  gl.stencilOpSeparate(gl.BACK, setting.i, setting.j, setting.k);
  gl.stencilMaskSeparate(gl.BACK, setting.c);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (gl, setting) {
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (gl, setting) {
  gl.colorMask(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (gl, setting) {
  gl.enable(gl.CULL_FACE);
  gl.cullFace(setting.a);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (gl, setting) {
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_COVERAGE);
  gl.sampleCoverage(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_disableBlend = function (gl) {
  gl.disable(gl.BLEND);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableDepthTest = function (gl) {
  gl.disable(gl.DEPTH_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableStencilTest = function (gl) {
  gl.disable(gl.STENCIL_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableScissor = function (gl) {
  gl.disable(gl.SCISSOR_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableColorMask = function (gl) {
  gl.colorMask(true, true, true, true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableCullFace = function (gl) {
  gl.disable(gl.CULL_FACE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disablePolygonOffset = function (gl) {
  gl.disable(gl.POLYGON_OFFSET_FILL);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleCoverage = function (gl) {
  gl.disable(gl.SAMPLE_COVERAGE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleAlphaToCoverage = function (gl) {
  gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
};

function _WebGL_doCompile(gl, src, type) {

  var shader = gl.createShader(type);
  _WebGL_log('Created shader');

  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;

}

function _WebGL_doLink(gl, vshader, fshader) {

  var program = gl.createProgram();
  _WebGL_log('Created program');

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  return program;

}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, type: Int32Array, baseType: gl.INT };
    case gl.INT_VEC2:
      return { size: 2, type: Int32Array, baseType: gl.INT };
    case gl.INT_VEC3:
      return { size: 3, type: Int32Array, baseType: gl.INT };
    case gl.INT_VEC4:
      return { size: 4, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.elemSize;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * attributeInfo.size * elemSize);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += attributeInfo.size * elemSize;
  }, mesh.b);

  var buffer = gl.createBuffer();
  _WebGL_log('Created attribute buffer ' + attribute.name);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer} buffer.indexBuffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  _WebGL_log('Created index buffer');
  var indexBuffer = gl.createBuffer();
  var indices = (mesh.a.indexSize === 0)
    ? _WebGL_makeSequentialBuffer(mesh.a.elemSize * _WebGL_listLength(mesh.b))
    : _WebGL_makeIndexedBuffer(mesh.c, mesh.a.indexSize);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return {
    numIndices: indices.length,
    indexBuffer: indexBuffer,
    buffers: {}
  };
}

/**
 *  Create an indices array and fill it with 0..n
 *
 *  @param {Number} numIndices The number of indices
 *  @return {Uint16Array} indices
 */
function _WebGL_makeSequentialBuffer(numIndices) {
  var indices = new Uint16Array(numIndices);
  for (var i = 0; i < numIndices; i++) {
    indices[i] = i;
  }
  return indices;
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint16Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint16Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {

  var gl = model.f.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  _WebGL_log('Drawing');

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = model.f.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = model.f.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        model.f.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = model.f.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        model.f.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        uniformSetters: _WebGL_createUniformSetters(
          gl,
          model,
          glProgram,
          Object.assign({}, entity.b.uniforms, entity.c.uniforms)
        )
      };

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      model.f.programs[progid] = program;

    }

    gl.useProgram(program.glProgram);

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = model.f.buffers[entity.d.id];

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      model.f.buffers[entity.d.id] = buffer;
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);

    var numAttributes = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; i++) {
      var attribute = gl.getActiveAttrib(program.glProgram, i);

      var attribLocation = gl.getAttribLocation(program.glProgram, attribute.name);
      gl.enableVertexAttribArray(attribLocation);

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      var attributeBuffer = buffer.buffers[attribute.name];
      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

      gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);
      gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
    }

    _WebGL_listEach(function (setting) {
      return A2(elm_explorations$webgl$WebGL$Internal$enableSetting, gl, setting);
    }, entity.a);

    gl.drawElements(entity.d.a.mode, buffer.numIndices, gl.UNSIGNED_SHORT, 0);

    _WebGL_listEach(function (setting) {
      return A2(elm_explorations$webgl$WebGL$Internal$disableSetting, gl, setting);
    }, entity.a);

  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var textureCounter = 0;
  function createUniformSetter(program, uniform) {
    var uniformLocation = gl.getUniformLocation(program, uniform.name);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      case gl.FLOAT:
        return function (value) {
          gl.uniform1f(uniformLocation, value);
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          gl.uniform2fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          gl.uniform3fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          gl.uniform4fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = model.f.textures[texture.id];
          if (!tex) {
            _WebGL_log('Created texture');
            tex = texture.createTexture(gl);
            model.f.textures[texture.id] = tex;
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(uniformLocation, currentTexture);
        };
      case gl.BOOL:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      default:
        _WebGL_log('Unsupported uniform type: ' + uniform.type);
        return function () {};
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(program, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(program, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2(elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  _WebGL_log('Render canvas');
  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl) {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });
  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  model.f.gl = gl;
  model.f.shaders = [];
  model.f.programs = {};
  model.f.buffers = [];
  model.f.textures = [];

  // Render for the first time.
  // This has to be done in animation frame,
  // because the canvas is not in the DOM yet
  _WebGL_rAF(function () {
    return A2(_WebGL_drawGL, model, canvas);
  });

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}
var author$project$Config$OnTexture = function (a) {
	return {$: 'OnTexture', a: a};
};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var elm_explorations$webgl$WebGL$Texture$Resize = function (a) {
	return {$: 'Resize', a: a};
};
var elm_explorations$webgl$WebGL$Texture$linear = elm_explorations$webgl$WebGL$Texture$Resize(9729);
var elm_explorations$webgl$WebGL$Texture$nearestMipmapLinear = elm_explorations$webgl$WebGL$Texture$Resize(9986);
var elm_explorations$webgl$WebGL$Texture$Wrap = function (a) {
	return {$: 'Wrap', a: a};
};
var elm_explorations$webgl$WebGL$Texture$repeat = elm_explorations$webgl$WebGL$Texture$Wrap(10497);
var elm_explorations$webgl$WebGL$Texture$defaultOptions = {flipY: true, horizontalWrap: elm_explorations$webgl$WebGL$Texture$repeat, magnify: elm_explorations$webgl$WebGL$Texture$linear, minify: elm_explorations$webgl$WebGL$Texture$nearestMipmapLinear, verticalWrap: elm_explorations$webgl$WebGL$Texture$repeat};
var elm_explorations$webgl$WebGL$Texture$LoadError = {$: 'LoadError'};
var elm_explorations$webgl$WebGL$Texture$SizeError = F2(
	function (a, b) {
		return {$: 'SizeError', a: a, b: b};
	});
var elm_explorations$webgl$WebGL$Texture$loadWith = F2(
	function (_n0, url) {
		var magnify = _n0.magnify;
		var minify = _n0.minify;
		var horizontalWrap = _n0.horizontalWrap;
		var verticalWrap = _n0.verticalWrap;
		var flipY = _n0.flipY;
		var expand = F4(
			function (_n1, _n2, _n3, _n4) {
				var mag = _n1.a;
				var min = _n2.a;
				var hor = _n3.a;
				var vert = _n4.a;
				return A6(_Texture_load, mag, min, hor, vert, flipY, url);
			});
		return A4(expand, magnify, minify, horizontalWrap, verticalWrap);
	});
var elm_explorations$webgl$WebGL$Texture$load = elm_explorations$webgl$WebGL$Texture$loadWith(elm_explorations$webgl$WebGL$Texture$defaultOptions);
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var xarvh$elm_gamepad$Gamepad$UserMappings = function (a) {
	return {$: 'UserMappings', a: a};
};
var xarvh$elm_gamepad$Gamepad$emptyUserMappings = xarvh$elm_gamepad$Gamepad$UserMappings(
	{byId: elm$core$Dict$empty, byIndexAndId: elm$core$Dict$empty});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var xarvh$elm_gamepad$Gamepad$Axis = {$: 'Axis'};
var xarvh$elm_gamepad$Gamepad$Button = {$: 'Button'};
var xarvh$elm_gamepad$Gamepad$Origin = F3(
	function (a, b, c) {
		return {$: 'Origin', a: a, b: b, c: c};
	});
var xarvh$elm_gamepad$Gamepad$userMappingsDecoder = function () {
	var stringToOriginType = function (s) {
		switch (s) {
			case 'axis':
				return elm$json$Json$Decode$succeed(xarvh$elm_gamepad$Gamepad$Axis);
			case 'button':
				return elm$json$Json$Decode$succeed(xarvh$elm_gamepad$Gamepad$Button);
			default:
				return elm$json$Json$Decode$fail('unrecognised Origin Type');
		}
	};
	var originDecoder = A4(
		elm$json$Json$Decode$map3,
		xarvh$elm_gamepad$Gamepad$Origin,
		A2(elm$json$Json$Decode$field, 'isReverse', elm$json$Json$Decode$bool),
		A2(
			elm$json$Json$Decode$field,
			'type',
			A2(elm$json$Json$Decode$andThen, stringToOriginType, elm$json$Json$Decode$string)),
		A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
	var listToUserMappings = function (listByIndexAndId) {
		return xarvh$elm_gamepad$Gamepad$UserMappings(
			{
				byId: elm$core$Dict$fromList(
					A2(
						elm$core$List$map,
						elm$core$Tuple$mapFirst(elm$core$Tuple$second),
						listByIndexAndId)),
				byIndexAndId: elm$core$Dict$fromList(listByIndexAndId)
			});
	};
	var keyDecoder = A3(
		elm$json$Json$Decode$map2,
		elm$core$Tuple$pair,
		A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int),
		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
	var tuplesDecoder = A3(
		elm$json$Json$Decode$map2,
		elm$core$Tuple$pair,
		keyDecoder,
		A2(
			elm$json$Json$Decode$field,
			'mapping',
			elm$json$Json$Decode$dict(originDecoder)));
	return A2(
		elm$json$Json$Decode$map,
		listToUserMappings,
		elm$json$Json$Decode$list(tuplesDecoder));
}();
var xarvh$elm_gamepad$Gamepad$userMappingsFromString = function (asString) {
	return A2(elm$json$Json$Decode$decodeString, xarvh$elm_gamepad$Gamepad$userMappingsDecoder, asString);
};
var author$project$Config$init = function (flags) {
	var gamepadDatabase = A2(
		elm$core$Result$withDefault,
		xarvh$elm_gamepad$Gamepad$emptyUserMappings,
		xarvh$elm_gamepad$Gamepad$userMappingsFromString(flags.gamepadDatabaseAsString));
	var model = {gamepadDatabase: gamepadDatabase, gamepadDatabaseKey: flags.gamepadDatabaseKey, hasGamepads: false, hasKnownGamepads: false, maybeApp: elm$core$Maybe$Nothing, maybeInputConfig: elm$core$Maybe$Nothing, maybeModal: elm$core$Maybe$Nothing};
	var cmd = elm$core$Platform$Cmd$batch(
		_List_fromArray(
			[
				A2(
				elm$core$Task$attempt,
				author$project$Config$OnTexture,
				elm_explorations$webgl$WebGL$Texture$load('meh.png'))
			]));
	return _Utils_Tuple2(model, cmd);
};
var author$project$App$OnInputMsg = function (a) {
	return {$: 'OnInputMsg', a: a};
};
var author$project$App$OnWindowResizes = function (a) {
	return {$: 'OnWindowResizes', a: a};
};
var author$project$Input$OnKeyboardMsg = function (a) {
	return {$: 'OnKeyboardMsg', a: a};
};
var author$project$Input$OnMouseButton = function (a) {
	return {$: 'OnMouseButton', a: a};
};
var author$project$Input$OnMouseMove = function (a) {
	return {$: 'OnMouseMove', a: a};
};
var elm$json$Json$Decode$index = _Json_decodeIndex;
var author$project$MousePort$mouseButton = _Platform_incomingPort(
	'mouseButton',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$bool));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$int)));
var author$project$MousePort$button = author$project$MousePort$mouseButton;
var author$project$MousePort$mouseMovement = _Platform_incomingPort(
	'mouseMovement',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$int));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$int)));
var author$project$MousePort$movement = author$project$MousePort$mouseMovement;
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$map = _Platform_map;
var ohanhi$keyboard$Keyboard$Down = function (a) {
	return {$: 'Down', a: a};
};
var ohanhi$keyboard$Keyboard$Up = function (a) {
	return {$: 'Up', a: a};
};
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onKeyDown = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'keydown');
var ohanhi$keyboard$Keyboard$RawKey = function (a) {
	return {$: 'RawKey', a: a};
};
var ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	elm$json$Json$Decode$field,
	'key',
	A2(elm$json$Json$Decode$map, ohanhi$keyboard$Keyboard$RawKey, elm$json$Json$Decode$string));
var ohanhi$keyboard$Keyboard$downs = function (toMsg) {
	return elm$browser$Browser$Events$onKeyDown(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var elm$browser$Browser$Events$onKeyUp = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'keyup');
var ohanhi$keyboard$Keyboard$ups = function (toMsg) {
	return elm$browser$Browser$Events$onKeyUp(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var ohanhi$keyboard$Keyboard$subscriptions = elm$core$Platform$Sub$batch(
	_List_fromArray(
		[
			ohanhi$keyboard$Keyboard$downs(ohanhi$keyboard$Keyboard$Down),
			ohanhi$keyboard$Keyboard$ups(ohanhi$keyboard$Keyboard$Up)
		]));
var author$project$Input$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(elm$core$Platform$Sub$map, author$project$Input$OnKeyboardMsg, ohanhi$keyboard$Keyboard$subscriptions),
				author$project$MousePort$movement(author$project$Input$OnMouseMove),
				author$project$MousePort$button(author$project$Input$OnMouseButton)
			]));
};
var elm$browser$Browser$Events$Window = {$: 'Window'};
var elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		elm$browser$Browser$Events$on,
		elm$browser$Browser$Events$Window,
		'resize',
		A2(
			elm$json$Json$Decode$field,
			'target',
			A3(
				elm$json$Json$Decode$map2,
				func,
				A2(elm$json$Json$Decode$field, 'innerWidth', elm$json$Json$Decode$int),
				A2(elm$json$Json$Decode$field, 'innerHeight', elm$json$Json$Decode$int))));
};
var author$project$Viewport$onWindowResize = function (msgConstructor) {
	return elm$browser$Browser$Events$onResize(
		F2(
			function (w, h) {
				return msgConstructor(
					{height: h, width: w});
			}));
};
var author$project$App$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Viewport$onWindowResize(author$project$App$OnWindowResizes),
				A2(
				elm$core$Platform$Sub$map,
				author$project$App$OnInputMsg,
				author$project$Input$subscriptions(model.input))
			]));
};
var author$project$Config$OnAppMsg = function (a) {
	return {$: 'OnAppMsg', a: a};
};
var author$project$Config$OnGamepad = function (a) {
	return {$: 'OnGamepad', a: a};
};
var author$project$Config$OnKey = function (a) {
	return {$: 'OnKey', a: a};
};
var author$project$Config$OnMouseUnlock = {$: 'OnMouseUnlock'};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$String$toUpper = _String_toUpper;
var author$project$Config$singleToUpper = function (s) {
	return (elm$core$String$length(s) !== 1) ? s : elm$core$String$toUpper(s);
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var author$project$Config$keyboardDecoder = function (msg) {
	return A2(
		elm$json$Json$Decode$map,
		A2(elm$core$Basics$composeR, author$project$Config$singleToUpper, msg),
		A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
};
var elm$json$Json$Decode$array = _Json_decodeArray;
var elm$json$Json$Decode$float = _Json_decodeFloat;
var author$project$GamepadPort$gamepad = _Platform_incomingPort(
	'gamepad',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(
					elm$json$Json$Decode$index,
					1,
					A2(
						elm$json$Json$Decode$andThen,
						function (timestamp) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (gamepads) {
									return elm$json$Json$Decode$succeed(
										{gamepads: gamepads, timestamp: timestamp});
								},
								A2(
									elm$json$Json$Decode$field,
									'gamepads',
									elm$json$Json$Decode$list(
										A2(
											elm$json$Json$Decode$andThen,
											function (mapping) {
												return A2(
													elm$json$Json$Decode$andThen,
													function (index) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (id) {
																return A2(
																	elm$json$Json$Decode$andThen,
																	function (buttons) {
																		return A2(
																			elm$json$Json$Decode$andThen,
																			function (axes) {
																				return elm$json$Json$Decode$succeed(
																					{axes: axes, buttons: buttons, id: id, index: index, mapping: mapping});
																			},
																			A2(
																				elm$json$Json$Decode$field,
																				'axes',
																				elm$json$Json$Decode$array(elm$json$Json$Decode$float)));
																	},
																	A2(
																		elm$json$Json$Decode$field,
																		'buttons',
																		elm$json$Json$Decode$array(
																			A2(
																				elm$json$Json$Decode$andThen,
																				function (x0) {
																					return A2(
																						elm$json$Json$Decode$andThen,
																						function (x1) {
																							return elm$json$Json$Decode$succeed(
																								_Utils_Tuple2(x0, x1));
																						},
																						A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
																				},
																				A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$bool)))));
															},
															A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
													},
													A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
											},
											A2(elm$json$Json$Decode$field, 'mapping', elm$json$Json$Decode$string)))));
						},
						A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$float))));
		},
		A2(
			elm$json$Json$Decode$index,
			0,
			A2(
				elm$json$Json$Decode$andThen,
				function (timestamp) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (gamepads) {
							return elm$json$Json$Decode$succeed(
								{gamepads: gamepads, timestamp: timestamp});
						},
						A2(
							elm$json$Json$Decode$field,
							'gamepads',
							elm$json$Json$Decode$list(
								A2(
									elm$json$Json$Decode$andThen,
									function (mapping) {
										return A2(
											elm$json$Json$Decode$andThen,
											function (index) {
												return A2(
													elm$json$Json$Decode$andThen,
													function (id) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (buttons) {
																return A2(
																	elm$json$Json$Decode$andThen,
																	function (axes) {
																		return elm$json$Json$Decode$succeed(
																			{axes: axes, buttons: buttons, id: id, index: index, mapping: mapping});
																	},
																	A2(
																		elm$json$Json$Decode$field,
																		'axes',
																		elm$json$Json$Decode$array(elm$json$Json$Decode$float)));
															},
															A2(
																elm$json$Json$Decode$field,
																'buttons',
																elm$json$Json$Decode$array(
																	A2(
																		elm$json$Json$Decode$andThen,
																		function (x0) {
																			return A2(
																				elm$json$Json$Decode$andThen,
																				function (x1) {
																					return elm$json$Json$Decode$succeed(
																						_Utils_Tuple2(x0, x1));
																				},
																				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$float));
																		},
																		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$bool)))));
													},
													A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string));
											},
											A2(elm$json$Json$Decode$field, 'index', elm$json$Json$Decode$int));
									},
									A2(elm$json$Json$Decode$field, 'mapping', elm$json$Json$Decode$string)))));
				},
				A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$float)))));
var author$project$MousePort$mousePointerUnlocked = _Platform_incomingPort(
	'mousePointerUnlocked',
	elm$json$Json$Decode$succeed(
		{}));
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var author$project$MousePort$unlocked = function (msg) {
	return author$project$MousePort$mousePointerUnlocked(
		elm$core$Basics$always(msg));
};
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Config$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				elm$browser$Browser$Events$onKeyUp(
				author$project$Config$keyboardDecoder(author$project$Config$OnKey)),
				author$project$MousePort$unlocked(author$project$Config$OnMouseUnlock),
				author$project$GamepadPort$gamepad(author$project$Config$OnGamepad),
				function () {
				var _n0 = model.maybeApp;
				if (_n0.$ === 'Just') {
					var app = _n0.a;
					return A2(
						elm$core$Platform$Sub$map,
						author$project$Config$OnAppMsg,
						author$project$App$subscriptions(app));
				} else {
					return elm$core$Platform$Sub$none;
				}
			}()
			]));
};
var author$project$App$OnAnimationFrame = function (a) {
	return {$: 'OnAnimationFrame', a: a};
};
var author$project$Game$nextId = function (game) {
	var id = game.lastId + 1;
	return _Utils_Tuple2(
		id,
		_Utils_update(
			game,
			{lastId: id}));
};
var elm$core$Basics$pi = _Basics_pi;
var elm$core$Basics$turns = function (angleInTurns) {
	return (2 * elm$core$Basics$pi) * angleInTurns;
};
var elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var author$project$Game$addHero = F2(
	function (player, oldGame) {
		var _n0 = author$project$Game$nextId(oldGame);
		var id = _n0.a;
		var game = _n0.b;
		var hero = {
			heading: elm$core$Basics$turns(0.1),
			id: id,
			playerId: player.id,
			position: A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0.1, 0)
		};
		var heroes = A3(elm$core$Dict$insert, id, hero, game.heroes);
		return _Utils_Tuple2(
			hero,
			_Utils_update(
				game,
				{heroes: heroes}));
	});
var elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var author$project$Player$init = function (id) {
	return {
		aim: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
		id: id,
		inputState: {
			dAim: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			fire: false,
			move: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		}
	};
};
var author$project$Game$addPlayer = function (oldGame) {
	var _n0 = author$project$Game$nextId(oldGame);
	var id = _n0.a;
	var game = _n0.b;
	var player = author$project$Player$init(id);
	var players = A3(elm$core$Dict$insert, id, player, game.players);
	return _Utils_Tuple2(
		player,
		A2(
			author$project$Game$addHero,
			player,
			_Utils_update(
				game,
				{players: players})).b);
};
var author$project$Game$init = {heroes: elm$core$Dict$empty, lastId: 0, players: elm$core$Dict$empty};
var author$project$Input$init = {
	mouseButtonLeft: false,
	mouseButtonMiddle: false,
	mouseButtonRight: false,
	mouseDelta: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
	pressedKeys: _List_Nil
};
var elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var author$project$Viewport$getWindowSize = function (msgConstructor) {
	var viewportToMsg = function (viewport) {
		return msgConstructor(
			{
				height: elm$core$Basics$floor(viewport.viewport.height),
				width: elm$core$Basics$floor(viewport.viewport.width)
			});
	};
	return A2(elm$core$Task$perform, viewportToMsg, elm$browser$Browser$Dom$getViewport);
};
var author$project$App$init = function (texture) {
	var game = A3(elm$core$Basics$composeR, author$project$Game$addPlayer, elm$core$Tuple$second, author$project$Game$init);
	return _Utils_Tuple2(
		{
			game: game,
			input: author$project$Input$init,
			texture: texture,
			windowSize: {height: 100, width: 100}
		},
		author$project$Viewport$getWindowSize(author$project$App$OnWindowResizes));
};
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$App$noCmd = function (model) {
	return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var author$project$Game$heroToPlayer = F2(
	function (game, hero) {
		return A2(elm$core$Dict$get, hero.playerId, game.players);
	});
var author$project$Game$maxHeroSpeed = 0.5;
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var elm_explorations$linear_algebra$Math$Vector2$toRecord = _MJS_v2toRecord;
var author$project$Game$vec2Rotate = F2(
	function (a, v) {
		var o = elm_explorations$linear_algebra$Math$Vector2$toRecord(v);
		var ny = (o.x * elm$core$Basics$sin(a)) - (o.y * elm$core$Basics$cos(a));
		var nx = (o.x * elm$core$Basics$cos(a)) + (o.y * elm$core$Basics$sin(a));
		return A2(elm_explorations$linear_algebra$Math$Vector2$vec2, nx, ny);
	});
var elm_explorations$linear_algebra$Math$Vector2$getX = _MJS_v2getX;
var elm_explorations$linear_algebra$Math$Vector2$scale = _MJS_v2scale;
var elm_explorations$linear_algebra$Math$Vector3$add = _MJS_v3add;
var elm_explorations$linear_algebra$Math$Vector3$scale = _MJS_v3scale;
var author$project$Game$thinkHero = F4(
	function (game, dt, id, hero) {
		var _n0 = A2(author$project$Game$heroToPlayer, game, hero);
		if (_n0.$ === 'Nothing') {
			return hero;
		} else {
			var player = _n0.a;
			var v = elm_explorations$linear_algebra$Math$Vector2$toRecord(
				A2(
					elm_explorations$linear_algebra$Math$Vector2$scale,
					author$project$Game$maxHeroSpeed,
					A2(
						author$project$Game$vec2Rotate,
						elm_explorations$linear_algebra$Math$Vector2$getX(player.aim),
						player.inputState.move)));
			var dp = A2(
				elm_explorations$linear_algebra$Math$Vector3$scale,
				dt,
				A3(elm_explorations$linear_algebra$Math$Vector3$vec3, v.x, 0, v.x));
			var position = A2(elm_explorations$linear_algebra$Math$Vector3$add, hero.position, dp);
			return _Utils_update(
				hero,
				{position: position});
		}
	});
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var author$project$Game$think = F2(
	function (dtAsTime, game) {
		var dt = dtAsTime;
		var heroes = A2(
			elm$core$Dict$map,
			A2(author$project$Game$thinkHero, game, dt),
			game.heroes);
		return _Utils_update(
			game,
			{heroes: heroes});
	});
var author$project$Input$AllPlayersUseGamepads = {$: 'AllPlayersUseGamepads'};
var author$project$Input$Player1UsesKeyboardAndMouse = {$: 'Player1UsesKeyboardAndMouse'};
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm_explorations$linear_algebra$Math$Vector2$add = _MJS_v2add;
var author$project$Input$applyInputState = F2(
	function (inputState, player) {
		var _n0 = elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2(elm_explorations$linear_algebra$Math$Vector2$add, player.aim, inputState.dAim));
		var x = _n0.x;
		var y = _n0.y;
		var _n1 = _Utils_Tuple2(x, y);
		var unclampedTraverse = _n1.a;
		var unclampedElevation = _n1.b;
		var elevation = A3(
			elm$core$Basics$clamp,
			-elm$core$Basics$turns(0.25),
			elm$core$Basics$turns(0.25),
			unclampedElevation);
		var traverse = unclampedTraverse;
		return _Utils_update(
			player,
			{
				aim: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, traverse, elevation),
				inputState: inputState
			});
	});
var xarvh$elm_gamepad$Gamepad$A = {$: 'A'};
var xarvh$elm_gamepad$Gamepad$LeftX = {$: 'LeftX'};
var xarvh$elm_gamepad$Gamepad$LeftY = {$: 'LeftY'};
var xarvh$elm_gamepad$Gamepad$RightX = {$: 'RightX'};
var xarvh$elm_gamepad$Gamepad$RightY = {$: 'RightY'};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var xarvh$elm_gamepad$Gamepad$axisToButton = function (n) {
	return n > 0.6;
};
var xarvh$elm_gamepad$Gamepad$destinationToString = function (destination) {
	switch (destination.$) {
		case 'A':
			return 'a';
		case 'B':
			return 'b';
		case 'X':
			return 'x';
		case 'Y':
			return 'y';
		case 'Start':
			return 'start';
		case 'Back':
			return 'back';
		case 'Home':
			return 'home';
		case 'LeftStickLeft':
			return 'leftleft';
		case 'LeftStickRight':
			return 'leftright';
		case 'LeftStickUp':
			return 'leftup';
		case 'LeftStickDown':
			return 'leftdown';
		case 'LeftStickPress':
			return 'leftstick';
		case 'LeftBumper':
			return 'leftbumper';
		case 'LeftTrigger':
			return 'lefttrigger';
		case 'RightStickLeft':
			return 'rightleft';
		case 'RightStickRight':
			return 'rightright';
		case 'RightStickUp':
			return 'rightup';
		case 'RightStickDown':
			return 'rightdown';
		case 'RightStickPress':
			return 'rightstick';
		case 'RightBumper':
			return 'rightbumper';
		case 'RightTrigger':
			return 'righttrigger';
		case 'DpadUp':
			return 'dpadup';
		case 'DpadDown':
			return 'dpaddown';
		case 'DpadLeft':
			return 'dpadleft';
		default:
			return 'dpadright';
	}
};
var xarvh$elm_gamepad$Gamepad$mappingToOrigin = F2(
	function (destination, mapping) {
		return A2(
			elm$core$Dict$get,
			xarvh$elm_gamepad$Gamepad$destinationToString(destination),
			mapping);
	});
var xarvh$elm_gamepad$Gamepad$reverseAxis = F2(
	function (isReverse, n) {
		return isReverse ? (-n) : n;
	});
var xarvh$elm_gamepad$Gamepad$getAsBool = F3(
	function (destination, mapping, frame) {
		var _n0 = A2(xarvh$elm_gamepad$Gamepad$mappingToOrigin, destination, mapping);
		if (_n0.$ === 'Nothing') {
			return false;
		} else {
			if (_n0.a.b.$ === 'Axis') {
				var _n1 = _n0.a;
				var isReverse = _n1.a;
				var _n2 = _n1.b;
				var index = _n1.c;
				return xarvh$elm_gamepad$Gamepad$axisToButton(
					A2(
						xarvh$elm_gamepad$Gamepad$reverseAxis,
						isReverse,
						A2(
							elm$core$Maybe$withDefault,
							0,
							A2(elm$core$Array$get, index, frame.axes))));
			} else {
				var _n3 = _n0.a;
				var isReverse = _n3.a;
				var _n4 = _n3.b;
				var index = _n3.c;
				return A2(
					elm$core$Maybe$withDefault,
					false,
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$first,
						A2(elm$core$Array$get, index, frame.buttons)));
			}
		}
	});
var xarvh$elm_gamepad$Gamepad$isPressed = F2(
	function (_n0, digital) {
		var mapping = _n0.a;
		var currentFrame = _n0.b;
		var previousFrame = _n0.c;
		return A3(xarvh$elm_gamepad$Gamepad$getAsBool, digital, mapping, currentFrame);
	});
var xarvh$elm_gamepad$Gamepad$LeftStickDown = {$: 'LeftStickDown'};
var xarvh$elm_gamepad$Gamepad$LeftStickLeft = {$: 'LeftStickLeft'};
var xarvh$elm_gamepad$Gamepad$LeftStickRight = {$: 'LeftStickRight'};
var xarvh$elm_gamepad$Gamepad$LeftStickUp = {$: 'LeftStickUp'};
var xarvh$elm_gamepad$Gamepad$LeftTrigger = {$: 'LeftTrigger'};
var xarvh$elm_gamepad$Gamepad$One = function (a) {
	return {$: 'One', a: a};
};
var xarvh$elm_gamepad$Gamepad$RightStickDown = {$: 'RightStickDown'};
var xarvh$elm_gamepad$Gamepad$RightStickLeft = {$: 'RightStickLeft'};
var xarvh$elm_gamepad$Gamepad$RightStickRight = {$: 'RightStickRight'};
var xarvh$elm_gamepad$Gamepad$RightStickUp = {$: 'RightStickUp'};
var xarvh$elm_gamepad$Gamepad$RightTrigger = {$: 'RightTrigger'};
var xarvh$elm_gamepad$Gamepad$Two = F2(
	function (a, b) {
		return {$: 'Two', a: a, b: b};
	});
var xarvh$elm_gamepad$Gamepad$analogToDestination = function (analog) {
	switch (analog.$) {
		case 'LeftX':
			return A2(xarvh$elm_gamepad$Gamepad$Two, xarvh$elm_gamepad$Gamepad$LeftStickLeft, xarvh$elm_gamepad$Gamepad$LeftStickRight);
		case 'LeftY':
			return A2(xarvh$elm_gamepad$Gamepad$Two, xarvh$elm_gamepad$Gamepad$LeftStickDown, xarvh$elm_gamepad$Gamepad$LeftStickUp);
		case 'LeftTriggerAnalog':
			return xarvh$elm_gamepad$Gamepad$One(xarvh$elm_gamepad$Gamepad$LeftTrigger);
		case 'RightX':
			return A2(xarvh$elm_gamepad$Gamepad$Two, xarvh$elm_gamepad$Gamepad$RightStickLeft, xarvh$elm_gamepad$Gamepad$RightStickRight);
		case 'RightY':
			return A2(xarvh$elm_gamepad$Gamepad$Two, xarvh$elm_gamepad$Gamepad$RightStickDown, xarvh$elm_gamepad$Gamepad$RightStickUp);
		default:
			return xarvh$elm_gamepad$Gamepad$One(xarvh$elm_gamepad$Gamepad$RightTrigger);
	}
};
var xarvh$elm_gamepad$Gamepad$getAsFloat = F3(
	function (destination, mapping, frame) {
		var _n0 = A2(xarvh$elm_gamepad$Gamepad$mappingToOrigin, destination, mapping);
		if (_n0.$ === 'Nothing') {
			return 0;
		} else {
			if (_n0.a.b.$ === 'Axis') {
				var _n1 = _n0.a;
				var isReverse = _n1.a;
				var _n2 = _n1.b;
				var index = _n1.c;
				return A2(
					xarvh$elm_gamepad$Gamepad$reverseAxis,
					isReverse,
					A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, index, frame.axes)));
			} else {
				var _n3 = _n0.a;
				var isReverse = _n3.a;
				var _n4 = _n3.b;
				var index = _n3.c;
				return A2(
					elm$core$Maybe$withDefault,
					0,
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$second,
						A2(elm$core$Array$get, index, frame.buttons)));
			}
		}
	});
var xarvh$elm_gamepad$Gamepad$getAxis = F4(
	function (negativeDestination, positiveDestination, mapping, frame) {
		var positive = A3(xarvh$elm_gamepad$Gamepad$getAsFloat, positiveDestination, mapping, frame);
		var negative = A3(xarvh$elm_gamepad$Gamepad$getAsFloat, negativeDestination, mapping, frame);
		return _Utils_eq(positive, -negative) ? positive : (positive - negative);
	});
var xarvh$elm_gamepad$Gamepad$value = F2(
	function (_n0, analog) {
		var mapping = _n0.a;
		var currentFrame = _n0.b;
		var previousFrame = _n0.c;
		var _n1 = xarvh$elm_gamepad$Gamepad$analogToDestination(analog);
		if (_n1.$ === 'One') {
			var positive = _n1.a;
			return A3(xarvh$elm_gamepad$Gamepad$getAsFloat, positive, mapping, currentFrame);
		} else {
			var negative = _n1.a;
			var positive = _n1.b;
			return A4(xarvh$elm_gamepad$Gamepad$getAxis, negative, positive, mapping, currentFrame);
		}
	});
var author$project$Input$gamepadToInputState = F2(
	function (dt, gamepad) {
		var timeForAFullTurn = 2;
		var move = A2(
			elm_explorations$linear_algebra$Math$Vector2$vec2,
			A2(xarvh$elm_gamepad$Gamepad$value, gamepad, xarvh$elm_gamepad$Gamepad$LeftX),
			A2(xarvh$elm_gamepad$Gamepad$value, gamepad, xarvh$elm_gamepad$Gamepad$LeftY));
		var maxTurningSpeed = elm$core$Basics$turns(1) / timeForAFullTurn;
		var maxDeltaAim = dt * maxTurningSpeed;
		var fire = A2(xarvh$elm_gamepad$Gamepad$isPressed, gamepad, xarvh$elm_gamepad$Gamepad$A);
		var dAim = A2(
			elm_explorations$linear_algebra$Math$Vector2$scale,
			maxDeltaAim,
			A2(
				elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2(xarvh$elm_gamepad$Gamepad$value, gamepad, xarvh$elm_gamepad$Gamepad$RightX),
				-A2(xarvh$elm_gamepad$Gamepad$value, gamepad, xarvh$elm_gamepad$Gamepad$RightY)));
		return {dAim: dAim, fire: fire, move: move};
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 'Character', a: a};
};
var ohanhi$keyboard$Keyboard$Arrows$boolToInt = function (bool) {
	return bool ? 1 : 0;
};
var ohanhi$keyboard$Keyboard$Arrows$wasd = function (keys) {
	var toInt = F2(
		function (char1, char2) {
			return ohanhi$keyboard$Keyboard$Arrows$boolToInt(
				A2(
					elm$core$List$member,
					ohanhi$keyboard$Keyboard$Character(char1),
					keys) || A2(
					elm$core$List$member,
					ohanhi$keyboard$Keyboard$Character(char2),
					keys));
		});
	var x = A2(toInt, 'D', 'd') - A2(toInt, 'A', 'a');
	var y = A2(toInt, 'W', 'w') - A2(toInt, 'S', 's');
	return {x: x, y: y};
};
var author$project$Input$keyboardAndMouseToInputState = function (model) {
	var pixelsForAFullTurn = 2000;
	var turningRatio = elm$core$Basics$turns(1) / pixelsForAFullTurn;
	var dAim = A2(elm_explorations$linear_algebra$Math$Vector2$scale, turningRatio, model.mouseDelta);
	var _n0 = ohanhi$keyboard$Keyboard$Arrows$wasd(model.pressedKeys);
	var x = _n0.x;
	var y = _n0.y;
	var move = A2(elm_explorations$linear_algebra$Math$Vector2$vec2, x, y);
	return {dAim: dAim, fire: model.mouseButtonLeft, move: move};
};
var author$project$Input$v0 = A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0);
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$core$List$sortBy = _List_sortBy;
var xarvh$elm_gamepad$Gamepad$getIndex = function (_n0) {
	var mapping = _n0.a;
	var currentFrame = _n0.b;
	var previousFrame = _n0.c;
	return currentFrame.index;
};
var author$project$Input$updatePlayersInput = F4(
	function (_n0, dt, model, players) {
		var maybeConfig = _n0.maybeConfig;
		var gamepads = _n0.gamepads;
		var tupleToTuple = function (_n3) {
			var player = _n3.a;
			var inputState = _n3.b;
			return _Utils_Tuple2(
				player.id,
				A2(author$project$Input$applyInputState, inputState, player));
		};
		var sortedPlayers = A2(
			elm$core$List$sortBy,
			function ($) {
				return $.id;
			},
			elm$core$Dict$values(players));
		var gamepadInputs = A2(
			elm$core$List$map,
			author$project$Input$gamepadToInputState(dt),
			A2(elm$core$List$sortBy, xarvh$elm_gamepad$Gamepad$getIndex, gamepads));
		var config = function () {
			if (maybeConfig.$ === 'Just') {
				var c = maybeConfig.a;
				return c;
			} else {
				return (elm$core$List$length(gamepads) > 0) ? author$project$Input$AllPlayersUseGamepads : author$project$Input$Player1UsesKeyboardAndMouse;
			}
		}();
		var keyboardInputs = function () {
			if (config.$ === 'AllPlayersUseGamepads') {
				return _List_Nil;
			} else {
				return _List_fromArray(
					[
						author$project$Input$keyboardAndMouseToInputState(model)
					]);
			}
		}();
		var inputs = _Utils_ap(keyboardInputs, gamepadInputs);
		var playersMinusInputs = elm$core$List$length(sortedPlayers) - elm$core$List$length(inputs);
		var fillers = A2(
			elm$core$List$repeat,
			playersMinusInputs,
			{
				dAim: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
				fire: false,
				move: A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
			});
		return A3(
			F3(
				function (a, b, c) {
					return _Utils_Tuple3(a, b, c);
				}),
			playersMinusInputs,
			_Utils_update(
				model,
				{mouseDelta: author$project$Input$v0}),
			elm$core$Dict$fromList(
				A2(
					elm$core$List$map,
					tupleToTuple,
					A3(
						elm$core$List$map2,
						elm$core$Tuple$pair,
						sortedPlayers,
						_Utils_ap(inputs, fillers)))));
	});
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var xarvh$elm_gamepad$Gamepad$Gamepad = F3(
	function (a, b, c) {
		return {$: 'Gamepad', a: a, b: b, c: c};
	});
var xarvh$elm_gamepad$Gamepad$B = {$: 'B'};
var xarvh$elm_gamepad$Gamepad$Back = {$: 'Back'};
var xarvh$elm_gamepad$Gamepad$DpadDown = {$: 'DpadDown'};
var xarvh$elm_gamepad$Gamepad$DpadLeft = {$: 'DpadLeft'};
var xarvh$elm_gamepad$Gamepad$DpadRight = {$: 'DpadRight'};
var xarvh$elm_gamepad$Gamepad$DpadUp = {$: 'DpadUp'};
var xarvh$elm_gamepad$Gamepad$Home = {$: 'Home'};
var xarvh$elm_gamepad$Gamepad$LeftBumper = {$: 'LeftBumper'};
var xarvh$elm_gamepad$Gamepad$LeftStickPress = {$: 'LeftStickPress'};
var xarvh$elm_gamepad$Gamepad$RightBumper = {$: 'RightBumper'};
var xarvh$elm_gamepad$Gamepad$RightStickPress = {$: 'RightStickPress'};
var xarvh$elm_gamepad$Gamepad$Start = {$: 'Start'};
var xarvh$elm_gamepad$Gamepad$X = {$: 'X'};
var xarvh$elm_gamepad$Gamepad$Y = {$: 'Y'};
var xarvh$elm_gamepad$Gamepad$pairsToMapping = function (pairs) {
	return elm$core$Dict$fromList(
		A2(
			elm$core$List$map,
			function (_n0) {
				var origin = _n0.a;
				var digital = _n0.b;
				return _Utils_Tuple2(
					xarvh$elm_gamepad$Gamepad$destinationToString(digital),
					origin);
			},
			pairs));
};
var xarvh$elm_gamepad$Gamepad$standardGamepadMapping = xarvh$elm_gamepad$Gamepad$pairsToMapping(
	A2(
		elm$core$List$map,
		function (_n0) {
			var a = _n0.a;
			var b = _n0.b;
			return _Utils_Tuple2(b, a);
		},
		_List_fromArray(
			[
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$A,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 0)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$B,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 1)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$X,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 2)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$Y,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 3)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$Start,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 9)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$Back,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 8)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$Home,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 16)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftStickLeft,
				A3(xarvh$elm_gamepad$Gamepad$Origin, true, xarvh$elm_gamepad$Gamepad$Axis, 0)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftStickRight,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Axis, 0)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftStickUp,
				A3(xarvh$elm_gamepad$Gamepad$Origin, true, xarvh$elm_gamepad$Gamepad$Axis, 1)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftStickDown,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Axis, 1)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftStickPress,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 10)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftBumper,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 4)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$LeftTrigger,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 6)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightStickLeft,
				A3(xarvh$elm_gamepad$Gamepad$Origin, true, xarvh$elm_gamepad$Gamepad$Axis, 2)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightStickRight,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Axis, 2)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightStickUp,
				A3(xarvh$elm_gamepad$Gamepad$Origin, true, xarvh$elm_gamepad$Gamepad$Axis, 3)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightStickDown,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Axis, 3)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightStickPress,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 11)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightBumper,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 5)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$RightTrigger,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 7)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$DpadUp,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 12)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$DpadDown,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 13)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$DpadLeft,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 14)),
				_Utils_Tuple2(
				xarvh$elm_gamepad$Gamepad$DpadRight,
				A3(xarvh$elm_gamepad$Gamepad$Origin, false, xarvh$elm_gamepad$Gamepad$Button, 15))
			])));
var xarvh$elm_gamepad$Gamepad$getGamepadMapping = F2(
	function (_n0, frame) {
		var database = _n0.a;
		var _n1 = A2(
			elm$core$Dict$get,
			_Utils_Tuple2(frame.index, frame.id),
			database.byIndexAndId);
		if (_n1.$ === 'Just') {
			var mapping = _n1.a;
			return elm$core$Maybe$Just(mapping);
		} else {
			return (frame.mapping === 'standard') ? elm$core$Maybe$Just(xarvh$elm_gamepad$Gamepad$standardGamepadMapping) : A2(elm$core$Dict$get, frame.id, database.byId);
		}
	});
var xarvh$elm_gamepad$Gamepad$getGamepads = F2(
	function (userMappings, _n0) {
		var currentBlobFrame = _n0.a;
		var previousBlobFrame = _n0.b;
		var getGamepad = function (currentGamepadFrame) {
			return A3(
				elm$core$Maybe$map2,
				F2(
					function (previousGamepadFrame, mapping) {
						return A3(xarvh$elm_gamepad$Gamepad$Gamepad, mapping, currentGamepadFrame, previousGamepadFrame);
					}),
				A2(
					elm_community$list_extra$List$Extra$find,
					function (prev) {
						return _Utils_eq(prev.index, currentGamepadFrame.index);
					},
					previousBlobFrame.gamepads),
				A2(xarvh$elm_gamepad$Gamepad$getGamepadMapping, userMappings, currentGamepadFrame));
		};
		return A2(elm$core$List$filterMap, getGamepad, currentBlobFrame.gamepads);
	});
var author$project$App$updateAnimationFrame = F4(
	function (config, dt, blob, model) {
		var oldGame = model.game;
		var _n0 = A4(
			author$project$Input$updatePlayersInput,
			{
				gamepads: A2(xarvh$elm_gamepad$Gamepad$getGamepads, config.gamepadDatabase, blob),
				maybeConfig: config.maybeInputConfig
			},
			dt,
			model.input,
			oldGame.players);
		var playersMinusInputs = _n0.a;
		var inputModel = _n0.b;
		var players = _n0.c;
		var addNewPlayer = (playersMinusInputs < 0) ? A2(elm$core$Basics$composeR, author$project$Game$addPlayer, elm$core$Tuple$second) : elm$core$Basics$identity;
		var game = addNewPlayer(
			_Utils_update(
				oldGame,
				{players: players}));
		return author$project$App$noCmd(
			_Utils_update(
				model,
				{
					game: A2(author$project$Game$think, dt, game),
					input: inputModel
				}));
	});
var ohanhi$keyboard$Keyboard$characterKey = function (_n0) {
	var value = _n0.a;
	return (elm$core$String$length(value) === 1) ? elm$core$Maybe$Just(
		ohanhi$keyboard$Keyboard$Character(value)) : elm$core$Maybe$Nothing;
};
var ohanhi$keyboard$Keyboard$Backspace = {$: 'Backspace'};
var ohanhi$keyboard$Keyboard$Clear = {$: 'Clear'};
var ohanhi$keyboard$Keyboard$Copy = {$: 'Copy'};
var ohanhi$keyboard$Keyboard$CrSel = {$: 'CrSel'};
var ohanhi$keyboard$Keyboard$Cut = {$: 'Cut'};
var ohanhi$keyboard$Keyboard$Delete = {$: 'Delete'};
var ohanhi$keyboard$Keyboard$EraseEof = {$: 'EraseEof'};
var ohanhi$keyboard$Keyboard$ExSel = {$: 'ExSel'};
var ohanhi$keyboard$Keyboard$Insert = {$: 'Insert'};
var ohanhi$keyboard$Keyboard$Paste = {$: 'Paste'};
var ohanhi$keyboard$Keyboard$Redo = {$: 'Redo'};
var ohanhi$keyboard$Keyboard$Undo = {$: 'Undo'};
var ohanhi$keyboard$Keyboard$editingKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'Backspace':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Undo);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$F1 = {$: 'F1'};
var ohanhi$keyboard$Keyboard$F10 = {$: 'F10'};
var ohanhi$keyboard$Keyboard$F11 = {$: 'F11'};
var ohanhi$keyboard$Keyboard$F12 = {$: 'F12'};
var ohanhi$keyboard$Keyboard$F13 = {$: 'F13'};
var ohanhi$keyboard$Keyboard$F14 = {$: 'F14'};
var ohanhi$keyboard$Keyboard$F15 = {$: 'F15'};
var ohanhi$keyboard$Keyboard$F16 = {$: 'F16'};
var ohanhi$keyboard$Keyboard$F17 = {$: 'F17'};
var ohanhi$keyboard$Keyboard$F18 = {$: 'F18'};
var ohanhi$keyboard$Keyboard$F19 = {$: 'F19'};
var ohanhi$keyboard$Keyboard$F2 = {$: 'F2'};
var ohanhi$keyboard$Keyboard$F20 = {$: 'F20'};
var ohanhi$keyboard$Keyboard$F3 = {$: 'F3'};
var ohanhi$keyboard$Keyboard$F4 = {$: 'F4'};
var ohanhi$keyboard$Keyboard$F5 = {$: 'F5'};
var ohanhi$keyboard$Keyboard$F6 = {$: 'F6'};
var ohanhi$keyboard$Keyboard$F7 = {$: 'F7'};
var ohanhi$keyboard$Keyboard$F8 = {$: 'F8'};
var ohanhi$keyboard$Keyboard$F9 = {$: 'F9'};
var ohanhi$keyboard$Keyboard$functionKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'F1':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F20);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ChannelDown = {$: 'ChannelDown'};
var ohanhi$keyboard$Keyboard$ChannelUp = {$: 'ChannelUp'};
var ohanhi$keyboard$Keyboard$MediaFastForward = {$: 'MediaFastForward'};
var ohanhi$keyboard$Keyboard$MediaPause = {$: 'MediaPause'};
var ohanhi$keyboard$Keyboard$MediaPlay = {$: 'MediaPlay'};
var ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 'MediaPlayPause'};
var ohanhi$keyboard$Keyboard$MediaRecord = {$: 'MediaRecord'};
var ohanhi$keyboard$Keyboard$MediaRewind = {$: 'MediaRewind'};
var ohanhi$keyboard$Keyboard$MediaStop = {$: 'MediaStop'};
var ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 'MediaTrackNext'};
var ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 'MediaTrackPrevious'};
var ohanhi$keyboard$Keyboard$mediaKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'ChannelDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Alt = {$: 'Alt'};
var ohanhi$keyboard$Keyboard$AltGraph = {$: 'AltGraph'};
var ohanhi$keyboard$Keyboard$CapsLock = {$: 'CapsLock'};
var ohanhi$keyboard$Keyboard$Control = {$: 'Control'};
var ohanhi$keyboard$Keyboard$Fn = {$: 'Fn'};
var ohanhi$keyboard$Keyboard$FnLock = {$: 'FnLock'};
var ohanhi$keyboard$Keyboard$Hyper = {$: 'Hyper'};
var ohanhi$keyboard$Keyboard$Meta = {$: 'Meta'};
var ohanhi$keyboard$Keyboard$NumLock = {$: 'NumLock'};
var ohanhi$keyboard$Keyboard$ScrollLock = {$: 'ScrollLock'};
var ohanhi$keyboard$Keyboard$Shift = {$: 'Shift'};
var ohanhi$keyboard$Keyboard$Super = {$: 'Super'};
var ohanhi$keyboard$Keyboard$Symbol = {$: 'Symbol'};
var ohanhi$keyboard$Keyboard$SymbolLock = {$: 'SymbolLock'};
var ohanhi$keyboard$Keyboard$modifierKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'Alt':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ArrowDown = {$: 'ArrowDown'};
var ohanhi$keyboard$Keyboard$ArrowLeft = {$: 'ArrowLeft'};
var ohanhi$keyboard$Keyboard$ArrowRight = {$: 'ArrowRight'};
var ohanhi$keyboard$Keyboard$ArrowUp = {$: 'ArrowUp'};
var ohanhi$keyboard$Keyboard$End = {$: 'End'};
var ohanhi$keyboard$Keyboard$Home = {$: 'Home'};
var ohanhi$keyboard$Keyboard$PageDown = {$: 'PageDown'};
var ohanhi$keyboard$Keyboard$PageUp = {$: 'PageUp'};
var ohanhi$keyboard$Keyboard$navigationKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'ArrowDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageUp);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _n1 = fn(key);
				if (_n1.$ === 'Just') {
					var a = _n1.a;
					return elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var ohanhi$keyboard$Keyboard$AppSwitch = {$: 'AppSwitch'};
var ohanhi$keyboard$Keyboard$Call = {$: 'Call'};
var ohanhi$keyboard$Keyboard$Camera = {$: 'Camera'};
var ohanhi$keyboard$Keyboard$CameraFocus = {$: 'CameraFocus'};
var ohanhi$keyboard$Keyboard$EndCall = {$: 'EndCall'};
var ohanhi$keyboard$Keyboard$GoBack = {$: 'GoBack'};
var ohanhi$keyboard$Keyboard$GoHome = {$: 'GoHome'};
var ohanhi$keyboard$Keyboard$HeadsetHook = {$: 'HeadsetHook'};
var ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 'LastNumberRedial'};
var ohanhi$keyboard$Keyboard$MannerMode = {$: 'MannerMode'};
var ohanhi$keyboard$Keyboard$Notification = {$: 'Notification'};
var ohanhi$keyboard$Keyboard$VoiceDial = {$: 'VoiceDial'};
var ohanhi$keyboard$Keyboard$phoneKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'AppSwitch':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Again = {$: 'Again'};
var ohanhi$keyboard$Keyboard$Attn = {$: 'Attn'};
var ohanhi$keyboard$Keyboard$Cancel = {$: 'Cancel'};
var ohanhi$keyboard$Keyboard$ContextMenu = {$: 'ContextMenu'};
var ohanhi$keyboard$Keyboard$Escape = {$: 'Escape'};
var ohanhi$keyboard$Keyboard$Execute = {$: 'Execute'};
var ohanhi$keyboard$Keyboard$Find = {$: 'Find'};
var ohanhi$keyboard$Keyboard$Finish = {$: 'Finish'};
var ohanhi$keyboard$Keyboard$Help = {$: 'Help'};
var ohanhi$keyboard$Keyboard$Pause = {$: 'Pause'};
var ohanhi$keyboard$Keyboard$Play = {$: 'Play'};
var ohanhi$keyboard$Keyboard$Props = {$: 'Props'};
var ohanhi$keyboard$Keyboard$Select = {$: 'Select'};
var ohanhi$keyboard$Keyboard$ZoomIn = {$: 'ZoomIn'};
var ohanhi$keyboard$Keyboard$ZoomOut = {$: 'ZoomOut'};
var ohanhi$keyboard$Keyboard$uiKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'Again':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Enter = {$: 'Enter'};
var ohanhi$keyboard$Keyboard$Spacebar = {$: 'Spacebar'};
var ohanhi$keyboard$Keyboard$Tab = {$: 'Tab'};
var ohanhi$keyboard$Keyboard$whitespaceKey = function (_n0) {
	var value = _n0.a;
	switch (value) {
		case 'Enter':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$anyKey = ohanhi$keyboard$Keyboard$oneOf(
	_List_fromArray(
		[ohanhi$keyboard$Keyboard$characterKey, ohanhi$keyboard$Keyboard$modifierKey, ohanhi$keyboard$Keyboard$whitespaceKey, ohanhi$keyboard$Keyboard$navigationKey, ohanhi$keyboard$Keyboard$editingKey, ohanhi$keyboard$Keyboard$functionKey, ohanhi$keyboard$Keyboard$uiKey, ohanhi$keyboard$Keyboard$phoneKey, ohanhi$keyboard$Keyboard$mediaKey]));
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var ohanhi$keyboard$Keyboard$insert = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (_n0.$ === 'Just') {
			var key = _n0.a;
			return A2(
				elm$core$List$cons,
				key,
				A2(
					elm$core$List$filter,
					elm$core$Basics$neq(key),
					list));
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$remove = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (_n0.$ === 'Just') {
			var key = _n0.a;
			return A2(
				elm$core$List$filter,
				elm$core$Basics$neq(key),
				list);
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$updateWithParser = F3(
	function (keyParser, msg, state) {
		if (msg.$ === 'Down') {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$insert, keyParser, key, state);
		} else {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$remove, keyParser, key, state);
		}
	});
var ohanhi$keyboard$Keyboard$update = ohanhi$keyboard$Keyboard$updateWithParser(ohanhi$keyboard$Keyboard$anyKey);
var author$project$Input$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'OnKeyboardMsg':
				var keyboardMsg = msg.a;
				return _Utils_update(
					model,
					{
						pressedKeys: A2(ohanhi$keyboard$Keyboard$update, keyboardMsg, model.pressedKeys)
					});
			case 'OnMouseButton':
				var _n1 = msg.a;
				var button = _n1.a;
				var toggle = _n1.b;
				switch (button) {
					case 0:
						return _Utils_update(
							model,
							{mouseButtonLeft: toggle});
					case 1:
						return _Utils_update(
							model,
							{mouseButtonMiddle: toggle});
					default:
						return _Utils_update(
							model,
							{mouseButtonRight: toggle});
				}
			default:
				var _n3 = msg.a;
				var dx = _n3.a;
				var dy = _n3.b;
				return _Utils_update(
					model,
					{
						mouseDelta: A2(
							elm_explorations$linear_algebra$Math$Vector2$add,
							model.mouseDelta,
							A2(elm_explorations$linear_algebra$Math$Vector2$vec2, dx, dy))
					});
		}
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$MousePort$lockMouse = _Platform_outgoingPort('lockMouse', elm$json$Json$Encode$string);
var author$project$MousePort$lock = author$project$MousePort$lockMouse('');
var xarvh$elm_gamepad$Gamepad$animationFrameDelta = function (_n0) {
	var currentFrame = _n0.a;
	var previousFrame = _n0.b;
	return currentFrame.timestamp - previousFrame.timestamp;
};
var author$project$App$update = F3(
	function (config, msg, model) {
		switch (msg.$) {
			case 'OnAnimationFrame':
				var blob = msg.a;
				return A4(
					author$project$App$updateAnimationFrame,
					config,
					xarvh$elm_gamepad$Gamepad$animationFrameDelta(blob) / 1000,
					blob,
					model);
			case 'OnClick':
				return _Utils_Tuple2(model, author$project$MousePort$lock);
			case 'OnInputMsg':
				var inputMsg = msg.a;
				return author$project$App$noCmd(
					_Utils_update(
						model,
						{
							input: A2(author$project$Input$update, inputMsg, model.input)
						}));
			default:
				var size = msg.a;
				return author$project$App$noCmd(
					_Utils_update(
						model,
						{windowSize: size}));
		}
	});
var author$project$Config$Main = {$: 'Main'};
var author$project$Config$noCmd = function (model) {
	return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
};
var elm$core$Debug$toString = _Debug_toString;
var elm$core$Debug$todo = _Debug_todo;
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Config$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'OnTexture':
				var result = msg.a;
				if (result.$ === 'Err') {
					var err = result.a;
					return _Debug_todo(
						'Config',
						{
							start: {line: 95, column: 21},
							end: {line: 95, column: 31}
						})(
						elm$core$Debug$toString(err));
				} else {
					var texture = result.a;
					var _n2 = author$project$App$init(texture);
					var app = _n2.a;
					var appCmd = _n2.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								maybeApp: elm$core$Maybe$Just(app)
							}),
						A2(elm$core$Platform$Cmd$map, author$project$Config$OnAppMsg, appCmd));
				}
			case 'OnAppMsg':
				var appMsg = msg.a;
				var _n3 = model.maybeApp;
				if (_n3.$ === 'Nothing') {
					return author$project$Config$noCmd(model);
				} else {
					var app = _n3.a;
					var _n4 = A3(
						author$project$App$update,
						{gamepadDatabase: model.gamepadDatabase, maybeInputConfig: model.maybeInputConfig},
						appMsg,
						app);
					var appModel = _n4.a;
					var appCmd = _n4.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								maybeApp: elm$core$Maybe$Just(appModel)
							}),
						A2(elm$core$Platform$Cmd$map, author$project$Config$OnAppMsg, appCmd));
				}
			case 'OnGamepad':
				var blob = msg.a;
				var knownGamepads = elm$core$List$length(
					A2(xarvh$elm_gamepad$Gamepad$getGamepads, model.gamepadDatabase, blob));
				var appUpdate = _Utils_eq(model.maybeModal, elm$core$Maybe$Nothing) ? author$project$Config$update(
					author$project$Config$OnAppMsg(
						author$project$App$OnAnimationFrame(blob))) : author$project$Config$noCmd;
				return appUpdate(
					_Utils_update(
						model,
						{hasGamepads: true, hasKnownGamepads: knownGamepads > 0}));
			case 'OnMouseUnlock':
				return author$project$Config$noCmd(
					_Utils_update(
						model,
						{
							maybeModal: elm$core$Maybe$Just(author$project$Config$Main)
						}));
			case 'OnKey':
				var keyName = msg.a;
				if (keyName === 'Escape') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{maybeModal: elm$core$Maybe$Nothing}),
						author$project$MousePort$lock);
				} else {
					return author$project$Config$noCmd(model);
				}
			default:
				var value = msg.a;
				return author$project$Config$noCmd(
					_Utils_update(
						model,
						{
							maybeInputConfig: function () {
								switch (value) {
									case 'key':
										return elm$core$Maybe$Just(author$project$Input$Player1UsesKeyboardAndMouse);
									case 'pad':
										return elm$core$Maybe$Just(author$project$Input$AllPlayersUseGamepads);
									default:
										return elm$core$Maybe$Nothing;
								}
							}()
						}));
		}
	});
var author$project$App$OnClick = {$: 'OnClick'};
var author$project$App$shrinkViewport = F2(
	function (shrink, viewport) {
		return {height: viewport.height - shrink, width: viewport.width - shrink};
	});
var author$project$App$splitScreen = F2(
	function (windowSize, playersNumber) {
		switch (playersNumber) {
			case 0:
				return _Utils_Tuple2(1, windowSize);
			case 1:
				return _Utils_Tuple2(1, windowSize);
			case 2:
				return _Utils_Tuple2(
					2,
					_Utils_update(
						windowSize,
						{width: (windowSize.width / 2) | 0}));
			case 3:
				return _Utils_Tuple2(
					3,
					_Utils_update(
						windowSize,
						{width: (windowSize.width / 3) | 0}));
			default:
				return _Utils_Tuple2(
					2,
					{height: (windowSize.height / 2) | 0, width: (windowSize.width / 2) | 0});
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Game$playerToHero = F2(
	function (game, player) {
		return elm$core$List$head(
			A2(
				elm$core$List$filter,
				function (h) {
					return _Utils_eq(h.playerId, player.id);
				},
				elm$core$Dict$values(game.heroes)));
	});
var author$project$Hero$fragmentShader = {
	src: '\n        precision mediump float;\n\n        uniform mat4 transform;\n        uniform sampler2D t;\n\n        varying float vfog;\n        varying vec3 vnormal;\n\n        void main() {\n            vec4 heroColor = vec4(0.0, 0.0, 1.0, 1.0);\n            vec3 lightDirection = vec3(1.0, -1.0, -1.0);\n\n            vec4 white = vec4(1.0);\n            vec4 black = vec4(0.0, 0.0, 0.0, 1.0);\n            vec4 fogColor = white;\n\n            float lightIntensity = 0.5 + 0.5 * dot(vnormal, -1.0 * lightDirection);\n\n            vec4 colorWithLight = mix(black, heroColor, lightIntensity);\n\n            gl_FragColor = texture2D(t, vnormal.xy); //mix(colorWithLight, fogColor, vfog);\n        }\n    ',
	attributes: {},
	uniforms: {t: 't', transform: 'transform'}
};
var author$project$Hero$vertexShader = {
	src: '\n        precision mediump float;\n\n        attribute vec3 v;\n        attribute vec3 n;\n\n        uniform mat4 transform;\n        uniform sampler2D t;\n\n        varying float vfog;\n        varying vec3 vnormal;\n\n        void main () {\n            gl_Position = transform * vec4(v, 1.0);\n            vfog = length(gl_Position.xyz) / 10.0;\n            vnormal = normalize((transform * vec4(n, 1.0)).xyz);\n        }\n    ',
	attributes: {n: 'n', v: 'v'},
	uniforms: {t: 't', transform: 'transform'}
};
var author$project$WebglMesh$two = '\n# Exported from Wings 3D 2.1.5\nmtllib two.mtl\no Torus2\n#128 vertices, 128 faces\nv 1.25000000 0.0000000e+0 0.0000000e+0\nv 1.17677670 -0.17677670 0.0000000e+0\nv 1.00000000 -0.25000000 0.0000000e+0\nv 0.82322330 -0.17677670 0.0000000e+0\nv 0.75000000 -3.0616170e-17 0.0000000e+0\nv 0.82322330 0.17677670 0.0000000e+0\nv 1.00000000 0.25000000 0.0000000e+0\nv 1.17677670 0.17677670 0.0000000e+0\nv 1.15484942 0.0000000e+0 0.47835429\nv 1.08719990 -0.17677670 0.45033294\nv 0.92387953 -0.25000000 0.38268343\nv 0.76055916 -0.17677670 0.31503392\nv 0.69290965 -3.0616170e-17 0.28701257\nv 0.76055916 0.17677670 0.31503392\nv 0.92387953 0.25000000 0.38268343\nv 1.08719990 0.17677670 0.45033294\nv 0.88388348 0.0000000e+0 0.88388348\nv 0.83210678 -0.17677670 0.83210678\nv 0.70710678 -0.25000000 0.70710678\nv 0.58210678 -0.17677670 0.58210678\nv 0.53033009 -3.0616170e-17 0.53033009\nv 0.58210678 0.17677670 0.58210678\nv 0.70710678 0.25000000 0.70710678\nv 0.83210678 0.17677670 0.83210678\nv 0.47835429 0.0000000e+0 1.15484942\nv 0.45033294 -0.17677670 1.08719990\nv 0.38268343 -0.25000000 0.92387953\nv 0.31503392 -0.17677670 0.76055916\nv 0.28701257 -3.0616170e-17 0.69290965\nv 0.31503392 0.17677670 0.76055916\nv 0.38268343 0.25000000 0.92387953\nv 0.45033294 0.17677670 1.08719990\nv 7.6540425e-17 0.0000000e+0 1.25000000\nv 7.2056791e-17 -0.17677670 1.17677670\nv 6.1232340e-17 -0.25000000 1.00000000\nv 5.0407889e-17 -0.17677670 0.82322330\nv 4.5924255e-17 -3.0616170e-17 0.75000000\nv 5.0407889e-17 0.17677670 0.82322330\nv 6.1232340e-17 0.25000000 1.00000000\nv 7.2056791e-17 0.17677670 1.17677670\nv -0.47835429 0.0000000e+0 1.15484942\nv -0.45033294 -0.17677670 1.08719990\nv -0.38268343 -0.25000000 0.92387953\nv -0.31503392 -0.17677670 0.76055916\nv -0.28701257 -3.0616170e-17 0.69290965\nv -0.31503392 0.17677670 0.76055916\nv -0.38268343 0.25000000 0.92387953\nv -0.45033294 0.17677670 1.08719990\nv -0.88388348 0.0000000e+0 0.88388348\nv -0.83210678 -0.17677670 0.83210678\nv -0.70710678 -0.25000000 0.70710678\nv -0.58210678 -0.17677670 0.58210678\nv -0.53033009 -3.0616170e-17 0.53033009\nv -0.58210678 0.17677670 0.58210678\nv -0.70710678 0.25000000 0.70710678\nv -0.83210678 0.17677670 0.83210678\nv -1.15484942 0.0000000e+0 0.47835429\nv -1.08719990 -0.17677670 0.45033294\nv -0.92387953 -0.25000000 0.38268343\nv -0.76055916 -0.17677670 0.31503392\nv -0.69290965 -3.0616170e-17 0.28701257\nv -0.76055916 0.17677670 0.31503392\nv -0.92387953 0.25000000 0.38268343\nv -1.08719990 0.17677670 0.45033294\nv -1.25000000 0.0000000e+0 1.5308085e-16\nv -1.17677670 -0.17677670 1.4411358e-16\nv -1.00000000 -0.25000000 1.2246468e-16\nv -0.82322330 -0.17677670 1.0081578e-16\nv -0.75000000 -3.0616170e-17 9.1848510e-17\nv -0.82322330 0.17677670 1.0081578e-16\nv -1.00000000 0.25000000 1.2246468e-16\nv -1.17677670 0.17677670 1.4411358e-16\nv -1.15484942 0.0000000e+0 -0.47835429\nv -1.08719990 -0.17677670 -0.45033294\nv -0.92387953 -0.25000000 -0.38268343\nv -0.76055916 -0.17677670 -0.31503392\nv -0.69290965 -3.0616170e-17 -0.28701257\nv -0.76055916 0.17677670 -0.31503392\nv -0.92387953 0.25000000 -0.38268343\nv -1.08719990 0.17677670 -0.45033294\nv -0.88388348 0.0000000e+0 -0.88388348\nv -0.83210678 -0.17677670 -0.83210678\nv -0.70710678 -0.25000000 -0.70710678\nv -0.58210678 -0.17677670 -0.58210678\nv -0.53033009 -3.0616170e-17 -0.53033009\nv -0.58210678 0.17677670 -0.58210678\nv -0.70710678 0.25000000 -0.70710678\nv -0.83210678 0.17677670 -0.83210678\nv -0.47835429 0.0000000e+0 -1.15484942\nv -0.45033294 -0.17677670 -1.08719990\nv -0.38268343 -0.25000000 -0.92387953\nv -0.31503392 -0.17677670 -0.76055916\nv -0.28701257 -3.0616170e-17 -0.69290965\nv -0.31503392 0.17677670 -0.76055916\nv -0.38268343 0.25000000 -0.92387953\nv -0.45033294 0.17677670 -1.08719990\nv -2.2962127e-16 0.0000000e+0 -1.25000000\nv -2.1617037e-16 -0.17677670 -1.17677670\nv -1.8369702e-16 -0.25000000 -1.00000000\nv -1.5122367e-16 -0.17677670 -0.82322330\nv -1.3777276e-16 -3.0616170e-17 -0.75000000\nv -1.5122367e-16 0.17677670 -0.82322330\nv -1.8369702e-16 0.25000000 -1.00000000\nv -2.1617037e-16 0.17677670 -1.17677670\nv 0.47835429 0.0000000e+0 -1.15484942\nv 0.45033294 -0.17677670 -1.08719990\nv 0.38268343 -0.25000000 -0.92387953\nv 0.31503392 -0.17677670 -0.76055916\nv 0.28701257 -3.0616170e-17 -0.69290965\nv 0.31503392 0.17677670 -0.76055916\nv 0.38268343 0.25000000 -0.92387953\nv 0.45033294 0.17677670 -1.08719990\nv 0.88388348 0.0000000e+0 -0.88388348\nv 0.83210678 -0.17677670 -0.83210678\nv 0.70710678 -0.25000000 -0.70710678\nv 0.58210678 -0.17677670 -0.58210678\nv 0.53033009 -3.0616170e-17 -0.53033009\nv 0.58210678 0.17677670 -0.58210678\nv 0.70710678 0.25000000 -0.70710678\nv 0.83210678 0.17677670 -0.83210678\nv 1.15484942 0.0000000e+0 -0.47835429\nv 1.08719990 -0.17677670 -0.45033294\nv 0.92387953 -0.25000000 -0.38268343\nv 0.76055916 -0.17677670 -0.31503392\nv 0.69290965 -3.0616170e-17 -0.28701257\nv 0.76055916 0.17677670 -0.31503392\nv 0.92387953 0.25000000 -0.38268343\nv 1.08719990 0.17677670 -0.45033294\nvn 1.00000000 4.5818250e-16 -2.2145487e-16\nvn 0.70509498 -0.70911288 -1.2513545e-16\nvn -1.2051732e-16 -1.00000000 0.0000000e+0\nvn -0.70509498 -0.70911288 1.5167933e-17\nvn -1.00000000 -3.2072775e-16 1.5272750e-17\nvn -0.70509498 0.70911288 3.7919832e-17\nvn 6.0258661e-17 1.00000000 0.0000000e+0\nvn 0.70509498 0.70911288 -1.2892743e-16\nvn 0.92387953 5.3454624e-16 0.38268343\nvn 0.65142282 -0.70911288 0.26982817\nvn -6.0258661e-17 -1.00000000 -2.2596998e-17\nvn -0.65142282 -0.70911288 -0.26982817\nvn -0.92387953 -3.5127325e-16 -0.38268343\nvn -0.65142282 0.70911288 -0.26982817\nvn 9.0387992e-17 1.00000000 5.2726329e-17\nvn 0.65142282 0.70911288 0.26982817\nvn 0.70710678 6.4145549e-16 0.70710678\nvn 0.49857744 -0.70911288 0.49857744\nvn -4.5193996e-17 -1.00000000 -6.0258661e-17\nvn -0.49857744 -0.70911288 -0.49857744\nvn -0.70710678 -3.9709150e-16 -0.70710678\nvn -0.49857744 0.70911288 -0.49857744\nvn 7.5323327e-17 1.00000000 9.0387992e-17\nvn 0.49857744 0.70911288 0.49857744\nvn 0.38268343 5.4981899e-16 0.92387953\nvn 0.26982817 -0.70911288 0.65142282\nvn -4.5193996e-17 -1.00000000 -7.5323327e-17\nvn -0.26982817 -0.70911288 -0.65142282\nvn -0.38268343 -3.5127325e-16 -0.92387953\nvn -0.26982817 0.70911288 -0.65142282\nvn 3.3895497e-17 1.00000000 9.0387992e-17\nvn 0.26982817 0.70911288 0.65142282\nvn -1.5272750e-17 4.7345525e-16 1.00000000\nvn -7.5839664e-18 -0.70911288 0.70509498\nvn 0.0000000e+0 -1.00000000 -6.0258661e-17\nvn -7.5839664e-18 -0.70911288 -0.70509498\nvn 0.0000000e+0 -3.0545500e-16 -1.00000000\nvn 3.7919832e-18 0.70911288 -0.70509498\nvn 0.0000000e+0 1.00000000 9.0387992e-17\nvn -7.5839664e-18 0.70911288 0.70509498\nvn -0.38268343 5.3454624e-16 0.92387953\nvn -0.26982817 -0.70911288 0.65142282\nvn 3.0129331e-17 -1.00000000 -6.0258661e-17\nvn 0.26982817 -0.70911288 -0.65142282\nvn 0.38268343 -3.8181875e-16 -0.92387953\nvn 0.26982817 0.70911288 -0.65142282\nvn -4.5193996e-17 1.00000000 1.2051732e-16\nvn -0.26982817 0.70911288 0.65142282\nvn -0.70710678 5.6509174e-16 0.70710678\nvn -0.49857744 -0.70911288 0.49857744\nvn 4.5193996e-17 -1.00000000 -5.2726329e-17\nvn 0.49857744 -0.70911288 -0.49857744\nvn 0.70710678 -4.1236425e-16 -0.70710678\nvn 0.49857744 0.70911288 -0.49857744\nvn -1.2051732e-16 1.00000000 1.3558199e-16\nvn -0.49857744 0.70911288 0.49857744\nvn -0.92387953 5.3454624e-16 0.38268343\nvn -0.65142282 -0.70911288 0.26982817\nvn 7.5323327e-17 -1.00000000 -4.1427830e-17\nvn 0.65142282 -0.70911288 -0.26982817\nvn 0.92387953 -3.3600050e-16 -0.38268343\nvn 0.65142282 0.70911288 -0.26982817\nvn -1.0545266e-16 1.00000000 6.4024828e-17\nvn -0.65142282 0.70911288 0.26982817\nvn -1.00000000 3.6654600e-16 5.3454624e-17\nvn -0.70509498 -0.70911288 1.1375950e-17\nvn 6.0258661e-17 -1.00000000 -3.3895497e-17\nvn 0.70509498 -0.70911288 -1.2134346e-16\nvn 1.00000000 -2.9018225e-16 -1.7563662e-16\nvn 0.70509498 0.70911288 -1.2134346e-16\nvn -6.0258661e-17 1.00000000 1.1298499e-17\nvn -0.70509498 0.70911288 1.0617553e-16\nvn -0.92387953 2.7490950e-16 -0.38268343\nvn -0.65142282 -0.70911288 -0.26982817\nvn 3.0129331e-17 -1.00000000 7.5323327e-18\nvn 0.65142282 -0.70911288 0.26982817\nvn 0.92387953 -3.0545500e-16 0.38268343\nvn 0.65142282 0.70911288 0.26982817\nvn -4.5193996e-17 1.00000000 -1.5064665e-17\nvn -0.65142282 0.70911288 -0.26982817\nvn -0.70710678 4.8872799e-16 -0.70710678\nvn -0.49857744 -0.70911288 -0.49857744\nvn 6.7790994e-17 -1.00000000 1.0545266e-16\nvn 0.49857744 -0.70911288 0.49857744\nvn 0.70710678 -3.5127325e-16 0.70710678\nvn 0.49857744 0.70911288 0.49857744\nvn -4.5193996e-17 1.00000000 -6.0258661e-17\nvn -0.49857744 0.70911288 -0.49857744\nvn -0.38268343 5.6509174e-16 -0.92387953\nvn -0.26982817 -0.70911288 -0.65142282\nvn 6.7790994e-17 -1.00000000 1.2051732e-16\nvn 0.26982817 -0.70911288 0.65142282\nvn 0.38268343 -3.5127325e-16 0.92387953\nvn 0.26982817 0.70911288 0.65142282\nvn -3.3895497e-17 1.00000000 -9.0387992e-17\nvn -0.26982817 0.70911288 -0.65142282\nvn -1.6036387e-16 4.8872799e-16 -1.00000000\nvn -9.1007596e-17 -0.70911288 -0.70509498\nvn 1.1298499e-17 -1.00000000 1.5064665e-17\nvn 5.3087765e-17 -0.70911288 0.70509498\nvn 9.1636499e-17 -3.3600050e-16 1.00000000\nvn 6.0671731e-17 0.70911288 0.70509498\nvn 1.5064665e-17 1.00000000 -1.2051732e-16\nvn -7.5839664e-17 0.70911288 -0.70509498\nvn 0.38268343 5.4981899e-16 -0.92387953\nvn 0.26982817 -0.70911288 -0.65142282\nvn 7.5323327e-18 -1.00000000 -3.0129331e-17\nvn -0.26982817 -0.70911288 0.65142282\nvn -0.38268343 -3.6654600e-16 0.92387953\nvn -0.26982817 0.70911288 0.65142282\nvn 6.7790994e-17 1.00000000 -1.5064665e-16\nvn 0.26982817 0.70911288 -0.65142282\nvn 0.70710678 5.8036449e-16 -0.70710678\nvn 0.49857744 -0.70911288 -0.49857744\nvn -4.5193996e-17 -1.00000000 3.7661663e-17\nvn -0.49857744 -0.70911288 0.49857744\nvn -0.70710678 -3.0545500e-16 0.70710678\nvn -0.49857744 0.70911288 0.49857744\nvn 7.5323327e-17 1.00000000 -1.1298499e-16\nvn 0.49857744 0.70911288 -0.49857744\nvn 0.92387953 5.1927349e-16 -0.38268343\nvn 0.65142282 -0.70911288 -0.26982817\nvn -1.3558199e-16 -1.00000000 5.6492495e-17\nvn -0.65142282 -0.70911288 0.26982817\nvn -0.92387953 -2.7490950e-16 0.38268343\nvn -0.65142282 0.70911288 0.26982817\nvn 4.5193996e-17 1.00000000 -4.1427830e-17\nvn 0.65142282 0.70911288 -0.26982817\ng Torus2_default\nusemtl default\ns 1\nf 1//1 9//9 10//10 2//2\nf 1//1 121//121 128//128 8//8\nf 2//2 10//10 11//11 3//3\nf 2//2 122//122 121//121 1//1\nf 3//3 11//11 12//12 4//4\nf 3//3 123//123 122//122 2//2\nf 4//4 12//12 13//13 5//5\nf 4//4 124//124 123//123 3//3\nf 5//5 13//13 14//14 6//6\nf 5//5 125//125 124//124 4//4\nf 6//6 14//14 15//15 7//7\nf 6//6 126//126 125//125 5//5\nf 7//7 15//15 16//16 8//8\nf 7//7 127//127 126//126 6//6\nf 8//8 16//16 9//9 1//1\nf 8//8 128//128 127//127 7//7\nf 9//9 17//17 18//18 10//10\nf 10//10 18//18 19//19 11//11\nf 11//11 19//19 20//20 12//12\nf 12//12 20//20 21//21 13//13\nf 13//13 21//21 22//22 14//14\nf 14//14 22//22 23//23 15//15\nf 15//15 23//23 24//24 16//16\nf 16//16 24//24 17//17 9//9\nf 17//17 25//25 26//26 18//18\nf 18//18 26//26 27//27 19//19\nf 19//19 27//27 28//28 20//20\nf 20//20 28//28 29//29 21//21\nf 21//21 29//29 30//30 22//22\nf 22//22 30//30 31//31 23//23\nf 23//23 31//31 32//32 24//24\nf 24//24 32//32 25//25 17//17\nf 25//25 33//33 34//34 26//26\nf 26//26 34//34 35//35 27//27\nf 27//27 35//35 36//36 28//28\nf 28//28 36//36 37//37 29//29\nf 29//29 37//37 38//38 30//30\nf 30//30 38//38 39//39 31//31\nf 31//31 39//39 40//40 32//32\nf 32//32 40//40 33//33 25//25\nf 33//33 41//41 42//42 34//34\nf 34//34 42//42 43//43 35//35\nf 35//35 43//43 44//44 36//36\nf 36//36 44//44 45//45 37//37\nf 37//37 45//45 46//46 38//38\nf 38//38 46//46 47//47 39//39\nf 39//39 47//47 48//48 40//40\nf 40//40 48//48 41//41 33//33\nf 41//41 49//49 50//50 42//42\nf 42//42 50//50 51//51 43//43\nf 43//43 51//51 52//52 44//44\nf 44//44 52//52 53//53 45//45\nf 45//45 53//53 54//54 46//46\nf 46//46 54//54 55//55 47//47\nf 47//47 55//55 56//56 48//48\nf 48//48 56//56 49//49 41//41\nf 49//49 57//57 58//58 50//50\nf 50//50 58//58 59//59 51//51\nf 51//51 59//59 60//60 52//52\nf 52//52 60//60 61//61 53//53\nf 53//53 61//61 62//62 54//54\nf 54//54 62//62 63//63 55//55\nf 55//55 63//63 64//64 56//56\nf 56//56 64//64 57//57 49//49\nf 57//57 65//65 66//66 58//58\nf 58//58 66//66 67//67 59//59\nf 59//59 67//67 68//68 60//60\nf 60//60 68//68 69//69 61//61\nf 61//61 69//69 70//70 62//62\nf 62//62 70//70 71//71 63//63\nf 63//63 71//71 72//72 64//64\nf 64//64 72//72 65//65 57//57\nf 65//65 73//73 74//74 66//66\nf 66//66 74//74 75//75 67//67\nf 67//67 75//75 76//76 68//68\nf 68//68 76//76 77//77 69//69\nf 69//69 77//77 78//78 70//70\nf 70//70 78//78 79//79 71//71\nf 71//71 79//79 80//80 72//72\nf 72//72 80//80 73//73 65//65\nf 73//73 81//81 82//82 74//74\nf 74//74 82//82 83//83 75//75\nf 75//75 83//83 84//84 76//76\nf 76//76 84//84 85//85 77//77\nf 77//77 85//85 86//86 78//78\nf 78//78 86//86 87//87 79//79\nf 79//79 87//87 88//88 80//80\nf 80//80 88//88 81//81 73//73\nf 81//81 89//89 90//90 82//82\nf 82//82 90//90 91//91 83//83\nf 83//83 91//91 92//92 84//84\nf 84//84 92//92 93//93 85//85\nf 85//85 93//93 94//94 86//86\nf 86//86 94//94 95//95 87//87\nf 87//87 95//95 96//96 88//88\nf 88//88 96//96 89//89 81//81\nf 89//89 97//97 98//98 90//90\nf 90//90 98//98 99//99 91//91\nf 91//91 99//99 100//100 92//92\nf 92//92 100//100 101//101 93//93\nf 93//93 101//101 102//102 94//94\nf 94//94 102//102 103//103 95//95\nf 95//95 103//103 104//104 96//96\nf 96//96 104//104 97//97 89//89\nf 97//97 105//105 106//106 98//98\nf 98//98 106//106 107//107 99//99\nf 99//99 107//107 108//108 100//100\nf 100//100 108//108 109//109 101//101\nf 101//101 109//109 110//110 102//102\nf 102//102 110//110 111//111 103//103\nf 103//103 111//111 112//112 104//104\nf 104//104 112//112 105//105 97//97\nf 105//105 113//113 114//114 106//106\nf 106//106 114//114 115//115 107//107\nf 107//107 115//115 116//116 108//108\nf 108//108 116//116 117//117 109//109\nf 109//109 117//117 118//118 110//110\nf 110//110 118//118 119//119 111//111\nf 111//111 119//119 120//120 112//112\nf 112//112 120//120 113//113 105//105\nf 113//113 121//121 122//122 114//114\nf 114//114 122//122 123//123 115//115\nf 115//115 123//123 124//124 116//116\nf 116//116 124//124 125//125 117//117\nf 117//117 125//125 126//126 118//118\nf 118//118 126//126 127//127 119//119\nf 119//119 127//127 128//128 120//120\nf 120//120 128//128 121//121 113//113\no sphere1\n#114 vertices, 128 faces\nv -4.84931657 0.92387953 0.0000000e+0\nv -4.87844661 0.92387953 0.14644661\nv -4.96140195 0.92387953 0.27059805\nv -5.08555339 0.92387953 0.35355339\nv -5.23200000 0.92387953 0.38268343\nv -5.37844661 0.92387953 0.35355339\nv -5.50259805 0.92387953 0.27059805\nv -5.58555339 0.92387953 0.14644661\nv -5.61468343 0.92387953 4.6865204e-17\nv -5.58555339 0.92387953 -0.14644661\nv -5.50259805 0.92387953 -0.27059805\nv -5.37844661 0.92387953 -0.35355339\nv -5.23200000 0.92387953 -0.38268343\nv -5.08555339 0.92387953 -0.35355339\nv -4.96140195 0.92387953 -0.27059805\nv -4.87844661 0.92387953 -0.14644661\nv -4.52489322 0.70710678 0.0000000e+0\nv -4.57871852 0.70710678 0.27059805\nv -4.73200000 0.70710678 0.50000000\nv -4.96140195 0.70710678 0.65328148\nv -5.23200000 0.70710678 0.70710678\nv -5.50259805 0.70710678 0.65328148\nv -5.73200000 0.70710678 0.50000000\nv -5.88528148 0.70710678 0.27059805\nv -5.93910678 0.70710678 8.6595606e-17\nv -5.88528148 0.70710678 -0.27059805\nv -5.73200000 0.70710678 -0.50000000\nv -5.50259805 0.70710678 -0.65328148\nv -5.23200000 0.70710678 -0.70710678\nv -4.96140195 0.70710678 -0.65328148\nv -4.73200000 0.70710678 -0.50000000\nv -4.57871852 0.70710678 -0.27059805\nv -4.30812047 0.38268343 0.0000000e+0\nv -4.37844661 0.38268343 0.35355339\nv -4.57871852 0.38268343 0.65328148\nv -4.87844661 0.38268343 0.85355339\nv -5.23200000 0.38268343 0.92387953\nv -5.58555339 0.38268343 0.85355339\nv -5.88528148 0.38268343 0.65328148\nv -6.08555339 0.38268343 0.35355339\nv -6.15587953 0.38268343 1.1314261e-16\nv -6.08555339 0.38268343 -0.35355339\nv -5.88528148 0.38268343 -0.65328148\nv -5.58555339 0.38268343 -0.85355339\nv -5.23200000 0.38268343 -0.92387953\nv -4.87844661 0.38268343 -0.85355339\nv -4.57871852 0.38268343 -0.65328148\nv -4.37844661 0.38268343 -0.35355339\nv -4.23200000 6.1232340e-17 0.0000000e+0\nv -4.30812047 6.1232340e-17 0.38268343\nv -4.52489322 6.1232340e-17 0.70710678\nv -4.84931657 6.1232340e-17 0.92387953\nv -5.23200000 6.1232340e-17 1.00000000\nv -5.61468343 6.1232340e-17 0.92387953\nv -5.93910678 6.1232340e-17 0.70710678\nv -6.15587953 6.1232340e-17 0.38268343\nv -6.23200000 6.1232340e-17 1.2246468e-16\nv -6.15587953 6.1232340e-17 -0.38268343\nv -5.93910678 6.1232340e-17 -0.70710678\nv -5.61468343 6.1232340e-17 -0.92387953\nv -5.23200000 6.1232340e-17 -1.00000000\nv -4.84931657 6.1232340e-17 -0.92387953\nv -4.52489322 6.1232340e-17 -0.70710678\nv -4.30812047 6.1232340e-17 -0.38268343\nv -4.30812047 -0.38268343 0.0000000e+0\nv -4.37844661 -0.38268343 0.35355339\nv -4.57871852 -0.38268343 0.65328148\nv -4.87844661 -0.38268343 0.85355339\nv -5.23200000 -0.38268343 0.92387953\nv -5.58555339 -0.38268343 0.85355339\nv -5.88528148 -0.38268343 0.65328148\nv -6.08555339 -0.38268343 0.35355339\nv -6.15587953 -0.38268343 1.1314261e-16\nv -6.08555339 -0.38268343 -0.35355339\nv -5.88528148 -0.38268343 -0.65328148\nv -5.58555339 -0.38268343 -0.85355339\nv -5.23200000 -0.38268343 -0.92387953\nv -4.87844661 -0.38268343 -0.85355339\nv -4.57871852 -0.38268343 -0.65328148\nv -4.37844661 -0.38268343 -0.35355339\nv -4.52489322 -0.70710678 0.0000000e+0\nv -4.57871852 -0.70710678 0.27059805\nv -4.73200000 -0.70710678 0.50000000\nv -4.96140195 -0.70710678 0.65328148\nv -5.23200000 -0.70710678 0.70710678\nv -5.50259805 -0.70710678 0.65328148\nv -5.73200000 -0.70710678 0.50000000\nv -5.88528148 -0.70710678 0.27059805\nv -5.93910678 -0.70710678 8.6595606e-17\nv -5.88528148 -0.70710678 -0.27059805\nv -5.73200000 -0.70710678 -0.50000000\nv -5.50259805 -0.70710678 -0.65328148\nv -5.23200000 -0.70710678 -0.70710678\nv -4.96140195 -0.70710678 -0.65328148\nv -4.73200000 -0.70710678 -0.50000000\nv -4.57871852 -0.70710678 -0.27059805\nv -4.84931657 -0.92387953 0.0000000e+0\nv -4.87844661 -0.92387953 0.14644661\nv -4.96140195 -0.92387953 0.27059805\nv -5.08555339 -0.92387953 0.35355339\nv -5.23200000 -0.92387953 0.38268343\nv -5.37844661 -0.92387953 0.35355339\nv -5.50259805 -0.92387953 0.27059805\nv -5.58555339 -0.92387953 0.14644661\nv -5.61468343 -0.92387953 4.6865204e-17\nv -5.58555339 -0.92387953 -0.14644661\nv -5.50259805 -0.92387953 -0.27059805\nv -5.37844661 -0.92387953 -0.35355339\nv -5.23200000 -0.92387953 -0.38268343\nv -5.08555339 -0.92387953 -0.35355339\nv -4.96140195 -0.92387953 -0.27059805\nv -4.87844661 -0.92387953 -0.14644661\nv -5.23200000 1.00000000 0.0000000e+0\nv -5.23200000 -1.00000000 0.0000000e+0\nvn 0.38219484 0.92408176 5.3242356e-17\nvn 0.35310199 0.92408176 0.14625963\nvn 0.27025256 0.92408176 0.27025256\nvn 0.14625963 0.92408176 0.35310199\nvn 6.7440318e-17 0.92408176 0.38219484\nvn -0.14625963 0.92408176 0.35310199\nvn -0.27025256 0.92408176 0.27025256\nvn -0.35310199 0.92408176 0.14625963\nvn -0.38219484 0.92408176 3.5849853e-16\nvn -0.35310199 0.92408176 -0.14625963\nvn -0.27025256 0.92408176 -0.27025256\nvn -0.14625963 0.92408176 -0.35310199\nvn 1.5617758e-16 0.92408176 -0.38219484\nvn 0.14625963 0.92408176 -0.35310199\nvn 0.27025256 0.92408176 -0.27025256\nvn 0.35310199 0.92408176 -0.14625963\nvn 0.70658450 0.70762868 -2.0004106e-16\nvn 0.65279895 0.70762868 0.27039818\nvn 0.49963069 0.70762868 0.49963069\nvn 0.27039818 0.70762868 0.65279895\nvn 0.0000000e+0 0.70762868 0.70658450\nvn -0.27039818 0.70762868 0.65279895\nvn -0.49963069 0.70762868 0.49963069\nvn -0.65279895 0.70762868 0.27039818\nvn -0.70658450 0.70762868 6.0012317e-16\nvn -0.65279895 0.70762868 -0.27039818\nvn -0.49963069 0.70762868 -0.49963069\nvn -0.27039818 0.70762868 -0.65279895\nvn 5.0010264e-17 0.70762868 -0.70658450\nvn 0.27039818 0.70762868 -0.65279895\nvn 0.49963069 0.70762868 -0.49963069\nvn 0.65279895 0.70762868 -0.27039818\nvn 0.92368212 0.38315969 -7.5490053e-16\nvn 0.85337100 0.38315969 0.35347784\nvn 0.65314189 0.38315969 0.65314189\nvn 0.35347784 0.38315969 0.85337100\nvn 0.0000000e+0 0.38315969 0.92368212\nvn -0.35347784 0.38315969 0.85337100\nvn -0.65314189 0.38315969 0.65314189\nvn -0.85337100 0.38315969 0.35347784\nvn -0.92368212 0.38315969 2.8039162e-16\nvn -0.85337100 0.38315969 -0.35347784\nvn -0.65314189 0.38315969 -0.65314189\nvn -0.35347784 0.38315969 -0.85337100\nvn -7.1895288e-18 0.38315969 -0.92368212\nvn 0.35347784 0.38315969 -0.85337100\nvn 0.65314189 0.38315969 -0.65314189\nvn 0.85337100 0.38315969 -0.35347784\nvn 1.00000000 7.2082126e-18 -1.0091498e-15\nvn 0.92387953 0.0000000e+0 0.38268343\nvn 0.70710678 0.0000000e+0 0.70710678\nvn 0.38268343 0.0000000e+0 0.92387953\nvn 0.0000000e+0 0.0000000e+0 1.00000000\nvn -0.38268343 7.2082126e-18 0.92387953\nvn -0.70710678 -7.2082126e-18 0.70710678\nvn -0.92387953 0.0000000e+0 0.38268343\nvn -1.00000000 0.0000000e+0 0.0000000e+0\nvn -0.92387953 0.0000000e+0 -0.38268343\nvn -0.70710678 -7.2082126e-18 -0.70710678\nvn -0.38268343 0.0000000e+0 -0.92387953\nvn -2.8832850e-17 7.2082126e-18 -1.00000000\nvn 0.38268343 0.0000000e+0 -0.92387953\nvn 0.70710678 -7.2082126e-18 -0.70710678\nvn 0.92387953 0.0000000e+0 -0.38268343\nvn 0.92368212 -0.38315969 -1.0281026e-15\nvn 0.85337100 -0.38315969 0.35347784\nvn 0.65314189 -0.38315969 0.65314189\nvn 0.35347784 -0.38315969 0.85337100\nvn 0.0000000e+0 -0.38315969 0.92368212\nvn -0.35347784 -0.38315969 0.85337100\nvn -0.65314189 -0.38315969 0.65314189\nvn -0.85337100 -0.38315969 0.35347784\nvn -0.92368212 -0.38315969 7.1895288e-18\nvn -0.85337100 -0.38315969 -0.35347784\nvn -0.65314189 -0.38315969 -0.65314189\nvn -0.35347784 -0.38315969 -0.85337100\nvn -5.0326702e-17 -0.38315969 -0.92368212\nvn 0.35347784 -0.38315969 -0.85337100\nvn 0.65314189 -0.38315969 -0.65314189\nvn 0.85337100 -0.38315969 -0.35347784\nvn 0.70658450 -0.70762868 -7.9659207e-16\nvn 0.65279895 -0.70762868 0.27039818\nvn 0.49963069 -0.70762868 0.49963069\nvn 0.27039818 -0.70762868 0.65279895\nvn 0.0000000e+0 -0.70762868 0.70658450\nvn -0.27039818 -0.70762868 0.65279895\nvn -0.49963069 -0.70762868 0.49963069\nvn -0.65279895 -0.70762868 0.27039818\nvn -0.70658450 -0.70762868 7.1443235e-18\nvn -0.65279895 -0.70762868 -0.27039818\nvn -0.49963069 -0.70762868 -0.49963069\nvn -0.27039818 -0.70762868 -0.65279895\nvn -3.5721617e-18 -0.70762868 -0.70658450\nvn 0.27039818 -0.70762868 -0.65279895\nvn 0.49963069 -0.70762868 -0.49963069\nvn 0.65279895 -0.70762868 -0.27039818\nvn 0.38219484 -0.92408176 -2.6976127e-16\nvn 0.35310199 -0.92408176 0.14625963\nvn 0.27025256 -0.92408176 0.27025256\nvn 0.14625963 -0.92408176 0.35310199\nvn -3.9044395e-17 -0.92408176 0.38219484\nvn -0.14625963 -0.92408176 0.35310199\nvn -0.27025256 -0.92408176 0.27025256\nvn -0.35310199 -0.92408176 0.14625963\nvn -0.38219484 -0.92408176 3.9044395e-17\nvn -0.35310199 -0.92408176 -0.14625963\nvn -0.27025256 -0.92408176 -0.27025256\nvn -0.14625963 -0.92408176 -0.35310199\nvn -6.7440318e-17 -0.92408176 -0.38219484\nvn 0.14625963 -0.92408176 -0.35310199\nvn 0.27025256 -0.92408176 -0.27025256\nvn 0.35310199 -0.92408176 -0.14625963\nvn 9.7352198e-17 1.00000000 -4.4250999e-19\nvn -9.3812118e-17 -1.00000000 7.7439248e-17\ng sphere1_default\nusemtl default\ns 1\nf 129//129 145//145 160//160 144//144\nf 129//129 241//241 130//130\nf 130//130 146//146 145//145 129//129\nf 130//130 241//241 131//131\nf 131//131 147//147 146//146 130//130\nf 131//131 241//241 132//132\nf 132//132 148//148 147//147 131//131\nf 132//132 241//241 133//133\nf 133//133 149//149 148//148 132//132\nf 133//133 241//241 134//134\nf 134//134 150//150 149//149 133//133\nf 134//134 241//241 135//135\nf 135//135 151//151 150//150 134//134\nf 135//135 241//241 136//136\nf 136//136 152//152 151//151 135//135\nf 136//136 241//241 137//137\nf 137//137 153//153 152//152 136//136\nf 137//137 241//241 138//138\nf 138//138 154//154 153//153 137//137\nf 138//138 241//241 139//139\nf 139//139 155//155 154//154 138//138\nf 139//139 241//241 140//140\nf 140//140 156//156 155//155 139//139\nf 140//140 241//241 141//141\nf 141//141 157//157 156//156 140//140\nf 141//141 241//241 142//142\nf 142//142 158//158 157//157 141//141\nf 142//142 241//241 143//143\nf 143//143 159//159 158//158 142//142\nf 143//143 241//241 144//144\nf 144//144 160//160 159//159 143//143\nf 144//144 241//241 129//129\nf 145//145 161//161 176//176 160//160\nf 146//146 162//162 161//161 145//145\nf 147//147 163//163 162//162 146//146\nf 148//148 164//164 163//163 147//147\nf 149//149 165//165 164//164 148//148\nf 150//150 166//166 165//165 149//149\nf 151//151 167//167 166//166 150//150\nf 152//152 168//168 167//167 151//151\nf 153//153 169//169 168//168 152//152\nf 154//154 170//170 169//169 153//153\nf 155//155 171//171 170//170 154//154\nf 156//156 172//172 171//171 155//155\nf 157//157 173//173 172//172 156//156\nf 158//158 174//174 173//173 157//157\nf 159//159 175//175 174//174 158//158\nf 160//160 176//176 175//175 159//159\nf 161//161 177//177 192//192 176//176\nf 162//162 178//178 177//177 161//161\nf 163//163 179//179 178//178 162//162\nf 164//164 180//180 179//179 163//163\nf 165//165 181//181 180//180 164//164\nf 166//166 182//182 181//181 165//165\nf 167//167 183//183 182//182 166//166\nf 168//168 184//184 183//183 167//167\nf 169//169 185//185 184//184 168//168\nf 170//170 186//186 185//185 169//169\nf 171//171 187//187 186//186 170//170\nf 172//172 188//188 187//187 171//171\nf 173//173 189//189 188//188 172//172\nf 174//174 190//190 189//189 173//173\nf 175//175 191//191 190//190 174//174\nf 176//176 192//192 191//191 175//175\nf 177//177 193//193 208//208 192//192\nf 178//178 194//194 193//193 177//177\nf 179//179 195//195 194//194 178//178\nf 180//180 196//196 195//195 179//179\nf 181//181 197//197 196//196 180//180\nf 182//182 198//198 197//197 181//181\nf 183//183 199//199 198//198 182//182\nf 184//184 200//200 199//199 183//183\nf 185//185 201//201 200//200 184//184\nf 186//186 202//202 201//201 185//185\nf 187//187 203//203 202//202 186//186\nf 188//188 204//204 203//203 187//187\nf 189//189 205//205 204//204 188//188\nf 190//190 206//206 205//205 189//189\nf 191//191 207//207 206//206 190//190\nf 192//192 208//208 207//207 191//191\nf 193//193 209//209 224//224 208//208\nf 194//194 210//210 209//209 193//193\nf 195//195 211//211 210//210 194//194\nf 196//196 212//212 211//211 195//195\nf 197//197 213//213 212//212 196//196\nf 198//198 214//214 213//213 197//197\nf 199//199 215//215 214//214 198//198\nf 200//200 216//216 215//215 199//199\nf 201//201 217//217 216//216 200//200\nf 202//202 218//218 217//217 201//201\nf 203//203 219//219 218//218 202//202\nf 204//204 220//220 219//219 203//203\nf 205//205 221//221 220//220 204//204\nf 206//206 222//222 221//221 205//205\nf 207//207 223//223 222//222 206//206\nf 208//208 224//224 223//223 207//207\nf 209//209 225//225 240//240 224//224\nf 210//210 226//226 225//225 209//209\nf 211//211 227//227 226//226 210//210\nf 212//212 228//228 227//227 211//211\nf 213//213 229//229 228//228 212//212\nf 214//214 230//230 229//229 213//213\nf 215//215 231//231 230//230 214//214\nf 216//216 232//232 231//231 215//215\nf 217//217 233//233 232//232 216//216\nf 218//218 234//234 233//233 217//217\nf 219//219 235//235 234//234 218//218\nf 220//220 236//236 235//235 219//219\nf 221//221 237//237 236//236 220//220\nf 222//222 238//238 237//237 221//221\nf 223//223 239//239 238//238 222//222\nf 224//224 240//240 239//239 223//223\nf 225//225 242//242 240//240\nf 226//226 242//242 225//225\nf 227//227 242//242 226//226\nf 228//228 242//242 227//227\nf 229//229 242//242 228//228\nf 230//230 242//242 229//229\nf 231//231 242//242 230//230\nf 232//232 242//242 231//231\nf 233//233 242//242 232//232\nf 234//234 242//242 233//233\nf 235//235 242//242 234//234\nf 236//236 242//242 235//235\nf 237//237 242//242 236//236\nf 238//238 242//242 237//237\nf 239//239 242//242 238//238\nf 240//240 242//242 239//239\n';
var author$project$WavefrontObject$GeometricVertex = function (a) {
	return {$: 'GeometricVertex', a: a};
};
var author$project$WavefrontObject$TextureVertex = function (a) {
	return {$: 'TextureVertex', a: a};
};
var author$project$WavefrontObject$VertexNormal = function (a) {
	return {$: 'VertexNormal', a: a};
};
var author$project$WavefrontObject$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = A5(_Parser_findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n0.a;
			var newRow = _n0.b;
			var newCol = _n0.c;
			var adjustedOffset = (newOffset < 0) ? elm$core$String$length(s.src) : newOffset;
			return A3(
				elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, adjustedOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: adjustedOffset, row: newRow, src: s.src});
		});
};
var elm$core$Basics$not = _Basics_not;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$lineComment = function (start) {
	return A2(
		elm$parser$Parser$Advanced$ignorer,
		elm$parser$Parser$Advanced$token(start),
		elm$parser$Parser$Advanced$chompUntilEndOr('\n'));
};
var elm$parser$Parser$lineComment = function (str) {
	return elm$parser$Parser$Advanced$lineComment(
		elm$parser$Parser$toToken(str));
};
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var author$project$WavefrontObject$comment = A2(
	elm$parser$Parser$ignorer,
	elm$parser$Parser$succeed(author$project$WavefrontObject$Empty),
	elm$parser$Parser$lineComment('#'));
var author$project$WavefrontObject$isSpace = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\t'));
};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var author$project$WavefrontObject$spaces = elm$parser$Parser$chompWhile(author$project$WavefrontObject$isSpace);
var author$project$WavefrontObject$empty = A2(
	elm$parser$Parser$ignorer,
	elm$parser$Parser$succeed(author$project$WavefrontObject$Empty),
	author$project$WavefrontObject$spaces);
var author$project$WavefrontObject$Face = function (a) {
	return {$: 'Face', a: a};
};
var author$project$WavefrontObject$V = function (a) {
	return {$: 'V', a: a};
};
var author$project$WavefrontObject$VN = function (a) {
	return {$: 'VN', a: a};
};
var author$project$WavefrontObject$VT = function (a) {
	return {$: 'VT', a: a};
};
var author$project$WavefrontObject$VTN = function (a) {
	return {$: 'VTN', a: a};
};
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var author$project$WavefrontObject$parseVertexListEnd = function (maybeVertexList) {
	if (maybeVertexList.$ === 'Nothing') {
		return elm$parser$Parser$problem('face has no vertices');
	} else {
		var faceVertices = maybeVertexList.a;
		return elm$parser$Parser$succeed(
			function () {
				switch (faceVertices.$) {
					case 'V':
						var list = faceVertices.a;
						return author$project$WavefrontObject$V(
							elm$core$List$reverse(list));
					case 'VN':
						var list = faceVertices.a;
						return author$project$WavefrontObject$VN(
							elm$core$List$reverse(list));
					case 'VT':
						var list = faceVertices.a;
						return author$project$WavefrontObject$VT(
							elm$core$List$reverse(list));
					default:
						var list = faceVertices.a;
						return author$project$WavefrontObject$VTN(
							elm$core$List$reverse(list));
				}
			}());
	}
};
var elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var author$project$WavefrontObject$atLeastOneSpace = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$chompIf(author$project$WavefrontObject$isSpace)),
	author$project$WavefrontObject$spaces);
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var author$project$WavefrontObject$maybeLeadingMinus = function (p) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$negate),
					elm$parser$Parser$symbol('-')),
				p),
				p
			]));
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$ExpectingInt = {$: 'ExpectingInt'};
var elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var elm$core$String$toFloat = _String_toFloat;
var elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3(elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2(elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3(elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			elm$parser$Parser$Advanced$consumeExp,
			A2(elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2(elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _n0, s) {
		var endOffset = _n0.a;
		var n = _n0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2(elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2(elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2(elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A4(elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5(elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							elm$parser$Parser$Advanced$Bad,
							true,
							A2(elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _n1 = elm$core$String$toFloat(
							A3(elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_n1.$ === 'Nothing') {
							return A2(
								elm$parser$Parser$Advanced$Bad,
								true,
								A2(elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _n1.a;
							return A3(
								elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2(elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$number = function (c) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3(elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3(elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2(elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3(elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3(elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3(elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return elm$parser$Parser$Advanced$number(
			{
				binary: elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: elm$core$Result$Err(invalid),
				hex: elm$core$Result$Err(invalid),
				_int: elm$core$Result$Ok(elm$core$Basics$identity),
				invalid: invalid,
				octal: elm$core$Result$Err(invalid)
			});
	});
var elm$parser$Parser$int = A2(elm$parser$Parser$Advanced$int, elm$parser$Parser$ExpectingInt, elm$parser$Parser$ExpectingInt);
var author$project$WavefrontObject$index = function () {
	var failIfNegative = function (n) {
		return (n < 0) ? elm$parser$Parser$problem('Negative indices are not (yet) supported') : elm$parser$Parser$succeed(n);
	};
	return A2(
		elm$parser$Parser$andThen,
		failIfNegative,
		author$project$WavefrontObject$maybeLeadingMinus(elm$parser$Parser$int));
}();
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var author$project$WavefrontObject$maybe = function (parser) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(elm$parser$Parser$map, elm$core$Maybe$Just, parser),
				elm$parser$Parser$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$WavefrontObject$maybesToFaceVertices = F3(
	function (v, maybeT, maybeN) {
		var _n0 = _Utils_Tuple2(maybeT, maybeN);
		if (_n0.a.$ === 'Nothing') {
			if (_n0.b.$ === 'Nothing') {
				var _n1 = _n0.a;
				var _n2 = _n0.b;
				return author$project$WavefrontObject$V(
					_List_fromArray(
						[v]));
			} else {
				var _n3 = _n0.a;
				var n = _n0.b.a;
				return author$project$WavefrontObject$VN(
					_List_fromArray(
						[
							_Utils_Tuple2(v, n)
						]));
			}
		} else {
			if (_n0.b.$ === 'Nothing') {
				var t = _n0.a.a;
				var _n4 = _n0.b;
				return author$project$WavefrontObject$VT(
					_List_fromArray(
						[
							_Utils_Tuple2(v, t)
						]));
			} else {
				var t = _n0.a.a;
				var n = _n0.b.a;
				return author$project$WavefrontObject$VTN(
					_List_fromArray(
						[
							_Utils_Tuple3(v, t, n)
						]));
			}
		}
	});
var author$project$WavefrontObject$parseV = function (v_list) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(
				function (v) {
					return author$project$WavefrontObject$V(
						A2(elm$core$List$cons, v, v_list));
				}),
			author$project$WavefrontObject$atLeastOneSpace),
		A2(
			elm$parser$Parser$ignorer,
			author$project$WavefrontObject$index,
			author$project$WavefrontObject$maybe(
				elm$parser$Parser$symbol('//'))));
};
var author$project$WavefrontObject$parseVN = function (vn_list) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(
					F2(
						function (v, vn) {
							return author$project$WavefrontObject$VN(
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(v, vn),
									vn_list));
						})),
				author$project$WavefrontObject$atLeastOneSpace),
			A2(
				elm$parser$Parser$ignorer,
				author$project$WavefrontObject$index,
				elm$parser$Parser$symbol('//'))),
		author$project$WavefrontObject$index);
};
var author$project$WavefrontObject$parseVT = function (vt_list) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(
					F2(
						function (v, vt) {
							return author$project$WavefrontObject$VT(
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(v, vt),
									vt_list));
						})),
				author$project$WavefrontObject$atLeastOneSpace),
			A2(
				elm$parser$Parser$ignorer,
				author$project$WavefrontObject$index,
				elm$parser$Parser$symbol('/'))),
		A2(
			elm$parser$Parser$ignorer,
			author$project$WavefrontObject$index,
			elm$parser$Parser$symbol('/')));
};
var author$project$WavefrontObject$parseVTN = function (vtn_list) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(
						F3(
							function (v, vt, vn) {
								return author$project$WavefrontObject$VTN(
									A2(
										elm$core$List$cons,
										_Utils_Tuple3(v, vt, vn),
										vtn_list));
							})),
					author$project$WavefrontObject$atLeastOneSpace),
				A2(
					elm$parser$Parser$ignorer,
					author$project$WavefrontObject$index,
					elm$parser$Parser$symbol('/'))),
			A2(
				elm$parser$Parser$ignorer,
				author$project$WavefrontObject$index,
				elm$parser$Parser$symbol('/'))),
		author$project$WavefrontObject$index);
};
var author$project$WavefrontObject$parseVertexListNext = function (maybeVertexList) {
	if (maybeVertexList.$ === 'Nothing') {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(author$project$WavefrontObject$maybesToFaceVertices),
						author$project$WavefrontObject$atLeastOneSpace),
					A2(
						elm$parser$Parser$ignorer,
						author$project$WavefrontObject$index,
						elm$parser$Parser$symbol('/'))),
				A2(
					elm$parser$Parser$ignorer,
					author$project$WavefrontObject$maybe(author$project$WavefrontObject$index),
					elm$parser$Parser$symbol('/'))),
			author$project$WavefrontObject$maybe(author$project$WavefrontObject$index));
	} else {
		switch (maybeVertexList.a.$) {
			case 'V':
				var list = maybeVertexList.a.a;
				return author$project$WavefrontObject$parseV(list);
			case 'VT':
				var list = maybeVertexList.a.a;
				return author$project$WavefrontObject$parseVT(list);
			case 'VN':
				var list = maybeVertexList.a.a;
				return author$project$WavefrontObject$parseVN(list);
			default:
				var list = maybeVertexList.a.a;
				return author$project$WavefrontObject$parseVTN(list);
		}
	}
};
var elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var author$project$WavefrontObject$faceHelp = function (maybeVertexList) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				A2(elm$core$Basics$composeR, elm$core$Maybe$Just, elm$parser$Parser$Loop),
				author$project$WavefrontObject$parseVertexListNext(maybeVertexList)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				author$project$WavefrontObject$parseVertexListEnd(maybeVertexList))
			]));
};
var elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var elm$parser$Parser$Advanced$keyword = function (_n0) {
	var kwd = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(kwd);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$keyword = function (kwd) {
	return elm$parser$Parser$Advanced$keyword(
		A2(
			elm$parser$Parser$Advanced$Token,
			kwd,
			elm$parser$Parser$ExpectingKeyword(kwd)));
};
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0.a;
			var _n1 = parse(s0);
			if (_n1.$ === 'Good') {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var author$project$WavefrontObject$face = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(author$project$WavefrontObject$Face),
		elm$parser$Parser$keyword('f')),
	A2(
		elm$parser$Parser$ignorer,
		A2(elm$parser$Parser$loop, elm$core$Maybe$Nothing, author$project$WavefrontObject$faceHelp),
		author$project$WavefrontObject$spaces));
var author$project$WavefrontObject$GroupNames = function (a) {
	return {$: 'GroupNames', a: a};
};
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm$parser$Parser$ExpectingVariable = {$: 'ExpectingVariable'};
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$variable = function (i) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7(elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3(elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2(elm$core$Set$member, name, i.reserved) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var elm$parser$Parser$variable = function (i) {
	return elm$parser$Parser$Advanced$variable(
		{expecting: elm$parser$Parser$ExpectingVariable, inner: i.inner, reserved: i.reserved, start: i.start});
};
var author$project$WavefrontObject$nameIdentifier = function () {
	var validSymbols = elm$core$Set$fromList(
		elm$core$String$toList('_.-'));
	var isValid = function (_char) {
		return elm$core$Char$isAlphaNum(_char) || A2(elm$core$Set$member, _char, validSymbols);
	};
	return elm$parser$Parser$variable(
		{inner: isValid, reserved: elm$core$Set$empty, start: isValid});
}();
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var author$project$WavefrontObject$groupNames = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(
				A2(elm$core$Basics$composeR, elm$core$List$singleton, author$project$WavefrontObject$GroupNames)),
			elm$parser$Parser$keyword('g')),
		author$project$WavefrontObject$atLeastOneSpace),
	A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$nameIdentifier, author$project$WavefrontObject$spaces));
var author$project$WavefrontObject$MaterialLibraryFileName = function (a) {
	return {$: 'MaterialLibraryFileName', a: a};
};
var author$project$WavefrontObject$fileName = function () {
	var validSymbols = elm$core$Set$fromList(
		elm$core$String$toList(' \\_.@~/%+-=;:'));
	var isValid = function (_char) {
		return elm$core$Char$isAlphaNum(_char) || A2(elm$core$Set$member, _char, validSymbols);
	};
	return elm$parser$Parser$variable(
		{inner: isValid, reserved: elm$core$Set$empty, start: isValid});
}();
var author$project$WavefrontObject$materialLibrary = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(author$project$WavefrontObject$MaterialLibraryFileName),
			elm$parser$Parser$keyword('mtllib')),
		author$project$WavefrontObject$spaces),
	A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$fileName, author$project$WavefrontObject$spaces));
var author$project$WavefrontObject$ObjectName = function (a) {
	return {$: 'ObjectName', a: a};
};
var author$project$WavefrontObject$objectName = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(author$project$WavefrontObject$ObjectName),
			elm$parser$Parser$keyword('o')),
		author$project$WavefrontObject$spaces),
	A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$nameIdentifier, author$project$WavefrontObject$spaces));
var author$project$WavefrontObject$SmoothingGroupNumber = function (a) {
	return {$: 'SmoothingGroupNumber', a: a};
};
var author$project$WavefrontObject$smoothingGroup = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(author$project$WavefrontObject$SmoothingGroupNumber),
			elm$parser$Parser$keyword('s')),
		author$project$WavefrontObject$spaces),
	A2(elm$parser$Parser$ignorer, elm$parser$Parser$int, author$project$WavefrontObject$spaces));
var author$project$WavefrontObject$UseMaterialId = function (a) {
	return {$: 'UseMaterialId', a: a};
};
var author$project$WavefrontObject$useMaterial = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(author$project$WavefrontObject$UseMaterialId),
			elm$parser$Parser$keyword('usemtl')),
		author$project$WavefrontObject$spaces),
	A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$nameIdentifier, author$project$WavefrontObject$spaces));
var elm$parser$Parser$ExpectingFloat = {$: 'ExpectingFloat'};
var elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return elm$parser$Parser$Advanced$number(
			{
				binary: elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: elm$core$Result$Ok(elm$core$Basics$identity),
				hex: elm$core$Result$Err(invalid),
				_int: elm$core$Result$Ok(elm$core$Basics$toFloat),
				invalid: invalid,
				octal: elm$core$Result$Err(invalid)
			});
	});
var elm$parser$Parser$float = A2(elm$parser$Parser$Advanced$float, elm$parser$Parser$ExpectingFloat, elm$parser$Parser$ExpectingFloat);
var author$project$WavefrontObject$float = author$project$WavefrontObject$maybeLeadingMinus(elm$parser$Parser$float);
var author$project$WavefrontObject$vertex = F2(
	function (keyword, lineConstructor) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(
								F3(
									function (x, y, z) {
										return lineConstructor(
											A3(elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z));
									})),
							elm$parser$Parser$keyword(keyword)),
						author$project$WavefrontObject$spaces),
					A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$float, author$project$WavefrontObject$spaces)),
				A2(elm$parser$Parser$ignorer, author$project$WavefrontObject$float, author$project$WavefrontObject$spaces)),
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							author$project$WavefrontObject$float,
							elm$parser$Parser$succeed(0)
						])),
				author$project$WavefrontObject$spaces));
	});
var author$project$WavefrontObject$lineParser = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			author$project$WavefrontObject$comment,
			author$project$WavefrontObject$materialLibrary,
			author$project$WavefrontObject$objectName,
			A2(author$project$WavefrontObject$vertex, 'v', author$project$WavefrontObject$GeometricVertex),
			A2(author$project$WavefrontObject$vertex, 'vn', author$project$WavefrontObject$VertexNormal),
			A2(author$project$WavefrontObject$vertex, 'vt', author$project$WavefrontObject$TextureVertex),
			author$project$WavefrontObject$groupNames,
			author$project$WavefrontObject$useMaterial,
			author$project$WavefrontObject$smoothingGroup,
			author$project$WavefrontObject$face,
			author$project$WavefrontObject$empty
		]));
var author$project$WavefrontObject$newline = elm$parser$Parser$symbol('\n');
var author$project$WavefrontObject$resultToParser = function (r) {
	if (r.$ === 'Ok') {
		var a = r.a;
		return elm$parser$Parser$succeed(a);
	} else {
		var s = r.a;
		return elm$parser$Parser$problem(s);
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var author$project$WavefrontObject$customContainerParser = F2(
	function (applyLine, initialOutput) {
		var makeResult = F3(
			function (output, line, loopControl) {
				return A2(
					elm$core$Result$map,
					loopControl,
					A2(applyLine, line, output));
			});
		var parseHelp = function (output) {
			return A2(
				elm$parser$Parser$andThen,
				author$project$WavefrontObject$resultToParser,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(
							makeResult(output)),
						author$project$WavefrontObject$lineParser),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(elm$parser$Parser$Loop),
								author$project$WavefrontObject$newline),
								A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(elm$parser$Parser$Done),
								elm$parser$Parser$end)
							]))));
		};
		return A2(elm$parser$Parser$loop, initialOutput, parseHelp);
	});
var author$project$WebglObj$normalizeFace = function (face) {
	switch (face.$) {
		case 'V':
			var list = face.a;
			return A2(
				elm$core$List$map,
				function (v) {
					return _Utils_Tuple2(v, 0);
				},
				list);
		case 'VT':
			var list = face.a;
			return A2(
				elm$core$List$map,
				function (_n1) {
					var v = _n1.a;
					var t = _n1.b;
					return _Utils_Tuple2(v, 0);
				},
				list);
		case 'VN':
			var list = face.a;
			return list;
		default:
			var list = face.a;
			return A2(
				elm$core$List$map,
				function (_n2) {
					var v = _n2.a;
					var t = _n2.b;
					var n = _n2.c;
					return _Utils_Tuple2(v, n);
				},
				list);
	}
};
var author$project$WebglObj$VertexAttributes = F2(
	function (v, n) {
		return {n: n, v: v};
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var author$project$WebglObj$arrayGet = F3(
	function (name, index, array) {
		var _n0 = A2(elm$core$Array$get, index, array);
		if (_n0.$ === 'Just') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			return elm$core$Result$Err(
				name + (' index is ' + (elm$core$String$fromInt(index) + (' but array length is ' + elm$core$String$fromInt(
					elm$core$Array$length(array))))));
		}
	});
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var author$project$WebglObj$resolveIndex = F2(
	function (object, _n0) {
		var vIndex = _n0.a;
		var nIndex = _n0.b;
		return A3(
			elm$core$Result$map2,
			author$project$WebglObj$VertexAttributes,
			A3(author$project$WebglObj$arrayGet, 'v', vIndex, object.vs),
			A3(author$project$WebglObj$arrayGet, 'n', nIndex, object.ns));
	});
var elm_community$result_extra$Result$Extra$combine = A2(
	elm$core$List$foldr,
	elm$core$Result$map2(elm$core$List$cons),
	elm$core$Result$Ok(_List_Nil));
var author$project$WebglObj$addFace = F2(
	function (faces, object) {
		return A2(
			elm$core$Result$map,
			function (resolvedFace) {
				return _Utils_update(
					object,
					{
						faces: A2(elm$core$List$cons, resolvedFace, object.faces)
					});
			},
			elm_community$result_extra$Result$Extra$combine(
				A2(
					elm$core$List$map,
					author$project$WebglObj$resolveIndex(object),
					author$project$WebglObj$normalizeFace(faces))));
	});
var elm$core$Elm$JsArray$push = _JsArray_push;
var elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					elm$core$Elm$JsArray$push,
					elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, elm$core$Elm$JsArray$empty));
				return A2(elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, subTree));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(
						elm$core$Array$insertTailInTree,
						shift - elm$core$Array$shiftStep,
						index,
						tail,
						elm$core$Elm$JsArray$singleton(value)));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var originalTailLen = elm$core$Elm$JsArray$length(tail);
		var newTailLen = elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + elm$core$Array$shiftStep;
				var newTree = A4(
					elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					elm$core$Elm$JsArray$singleton(
						elm$core$Array$SubTree(tree)));
				return A4(elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4(elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4(elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			elm$core$Array$unsafeReplaceTail,
			A2(elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var author$project$WebglObj$applyLine = F2(
	function (line, accu) {
		switch (line.$) {
			case 'Empty':
				return elm$core$Result$Ok(accu);
			case 'MaterialLibraryFileName':
				var name = line.a;
				return elm$core$Result$Ok(accu);
			case 'ObjectName':
				var name = line.a;
				return elm$core$Result$Ok(accu);
			case 'UseMaterialId':
				var id = line.a;
				return elm$core$Result$Ok(accu);
			case 'SmoothingGroupNumber':
				var number = line.a;
				return elm$core$Result$Ok(accu);
			case 'GroupNames':
				var names = line.a;
				return elm$core$Result$Ok(accu);
			case 'TextureVertex':
				var vt = line.a;
				return elm$core$Result$Ok(accu);
			case 'GeometricVertex':
				var v = line.a;
				return elm$core$Result$Ok(
					_Utils_update(
						accu,
						{
							vs: A2(elm$core$Array$push, v, accu.vs)
						}));
			case 'VertexNormal':
				var n = line.a;
				return elm$core$Result$Ok(
					_Utils_update(
						accu,
						{
							ns: A2(elm$core$Array$push, n, accu.ns)
						}));
			default:
				var faceVertices = line.a;
				return A2(author$project$WebglObj$addFace, faceVertices, accu);
		}
	});
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var author$project$WebglObj$emptyAccumulator = {
	faces: _List_Nil,
	ns: elm$core$Array$fromList(
		_List_fromArray(
			[
				A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0)
			])),
	vs: elm$core$Array$fromList(
		_List_fromArray(
			[
				A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0)
			]))
};
var author$project$WebglObj$tailToTris = F3(
	function (a, tail, tris) {
		tailToTris:
		while (true) {
			if (tail.b && tail.b.b) {
				var b = tail.a;
				var _n1 = tail.b;
				var c = _n1.a;
				var xs = _n1.b;
				var $temp$a = a,
					$temp$tail = A2(elm$core$List$cons, c, xs),
					$temp$tris = A2(
					elm$core$List$cons,
					_Utils_Tuple3(a, b, c),
					tris);
				a = $temp$a;
				tail = $temp$tail;
				tris = $temp$tris;
				continue tailToTris;
			} else {
				return tris;
			}
		}
	});
var author$project$WebglObj$faceToTriangles = F2(
	function (face, tris) {
		if (!face.b) {
			return tris;
		} else {
			var a = face.a;
			var tail = face.b;
			return A3(author$project$WebglObj$tailToTris, a, tail, tris);
		}
	});
var author$project$WebglObj$meshParser = A2(
	elm$parser$Parser$map,
	A2(
		elm$core$Basics$composeR,
		function ($) {
			return $.faces;
		},
		A2(elm$core$List$foldl, author$project$WebglObj$faceToTriangles, _List_Nil)),
	A2(author$project$WavefrontObject$customContainerParser, author$project$WebglObj$applyLine, author$project$WebglObj$emptyAccumulator));
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$WebglObj$parseMesh = function (string) {
	return A2(elm$parser$Parser$run, author$project$WebglObj$meshParser, string);
};
var author$project$WebglMesh$vertices = A2(
	elm$core$Result$withDefault,
	_List_Nil,
	author$project$WebglObj$parseMesh(author$project$WebglMesh$two));
var elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 'Mesh3', a: a, b: b};
	});
var elm_explorations$webgl$WebGL$triangles = elm_explorations$webgl$WebGL$Mesh3(
	{elemSize: 3, indexSize: 0, mode: 4});
var author$project$WebglMesh$mesh = elm_explorations$webgl$WebGL$triangles(author$project$WebglMesh$vertices);
var elm_explorations$linear_algebra$Math$Matrix4$identity = _MJS_m4x4identity;
var elm_explorations$linear_algebra$Math$Matrix4$makeRotate = _MJS_m4x4makeRotate;
var elm_explorations$linear_algebra$Math$Matrix4$makeTranslate = _MJS_m4x4makeTranslate;
var elm_explorations$linear_algebra$Math$Matrix4$mul = _MJS_m4x4mul;
var elm_explorations$webgl$WebGL$Internal$disableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 'Blend':
				return _WebGL_disableBlend(gl);
			case 'DepthTest':
				return _WebGL_disableDepthTest(gl);
			case 'StencilTest':
				return _WebGL_disableStencilTest(gl);
			case 'Scissor':
				return _WebGL_disableScissor(gl);
			case 'ColorMask':
				return _WebGL_disableColorMask(gl);
			case 'CullFace':
				return _WebGL_disableCullFace(gl);
			case 'PolygonOffset':
				return _WebGL_disablePolygonOffset(gl);
			case 'SampleCoverage':
				return _WebGL_disableSampleCoverage(gl);
			default:
				return _WebGL_disableSampleAlphaToCoverage(gl);
		}
	});
var elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 'Alpha':
				return A2(_WebGL_enableAlpha, ctx, option);
			case 'Depth':
				return A2(_WebGL_enableDepth, ctx, option);
			case 'Stencil':
				return A2(_WebGL_enableStencil, ctx, option);
			case 'Antialias':
				return A2(_WebGL_enableAntialias, ctx, option);
			default:
				return A2(_WebGL_enableClearColor, ctx, option);
		}
	});
var elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 'Blend':
				return A2(_WebGL_enableBlend, gl, setting);
			case 'DepthTest':
				return A2(_WebGL_enableDepthTest, gl, setting);
			case 'StencilTest':
				return A2(_WebGL_enableStencilTest, gl, setting);
			case 'Scissor':
				return A2(_WebGL_enableScissor, gl, setting);
			case 'ColorMask':
				return A2(_WebGL_enableColorMask, gl, setting);
			case 'CullFace':
				return A2(_WebGL_enableCullFace, gl, setting);
			case 'PolygonOffset':
				return A2(_WebGL_enablePolygonOffset, gl, setting);
			case 'SampleCoverage':
				return A2(_WebGL_enableSampleCoverage, gl, setting);
			default:
				return A2(_WebGL_enableSampleAlphaToCoverage, gl, setting);
		}
	});
var elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 'DepthTest', a: a, b: b, c: c, d: d};
	});
var elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_n0) {
	var write = _n0.write;
	var near = _n0.near;
	var far = _n0.far;
	return A4(elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var elm_explorations$webgl$WebGL$Settings$DepthTest$default = elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{far: 1, near: 0, write: true});
var elm_explorations$webgl$WebGL$entity = elm_explorations$webgl$WebGL$entityWith(
	_List_fromArray(
		[elm_explorations$webgl$WebGL$Settings$DepthTest$default]));
var author$project$Hero$entity = F3(
	function (texture, perspectiveAndCamera, hero) {
		var translation = elm_explorations$linear_algebra$Math$Matrix4$makeTranslate(hero.position);
		var rotation = A2(
			elm_explorations$linear_algebra$Math$Matrix4$makeRotate,
			hero.heading,
			A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, -1, 0));
		var transform = A2(
			elm_explorations$linear_algebra$Math$Matrix4$mul,
			perspectiveAndCamera,
			A2(
				elm_explorations$linear_algebra$Math$Matrix4$mul,
				translation,
				A2(elm_explorations$linear_algebra$Math$Matrix4$mul, rotation, elm_explorations$linear_algebra$Math$Matrix4$identity)));
		var uniforms = {t: texture, transform: transform};
		return A4(elm_explorations$webgl$WebGL$entity, author$project$Hero$vertexShader, author$project$Hero$fragmentShader, author$project$WebglMesh$mesh, uniforms);
	});
var author$project$Plane$planeSize = 3;
var author$project$Plane$fragmentShader = {
	src: '\n\n        precision mediump float;\n\n        uniform float duskDawn;\n\n        varying vec3 vcolor;\n        varying vec2 vcoord;\n\n        float css(float apex, float width, float value) {\n          return smoothstep(apex - width, apex, value) - smoothstep(apex, apex + width, value);\n        }\n\n        float f(vec2 position) {\n          return position.x;\n        }\n\n        void main() {\n\n            float value = f(vcoord);\n\n            vec3 dusk\n              = vec3(0.4, 0.4, 0.6) * css(0.00, 0.33, value)\n              + vec3(0.9, 0.8, 0.6) * css(0.33, 0.33, value)\n              + vec3(0.9, 0.6, 0.3) * css(0.66, 0.33, value)\n              + vec3(0.9, 0.3, 0.1) * css(1.00, 0.33, value)\n              ;\n\n            vec3 night\n              = vec3(0.0, 0.0, 0.2) * css(0.00, 0.33, value)\n              + vec3(0.5, 0.4, 0.2) * css(0.33, 0.33, value)\n              + vec3(0.5, 0.2, 0.0) * css(0.66, 0.33, value)\n              + vec3(0.5, 0.0, 0.0) * css(1.00, 0.33, value)\n              ;\n\n            vec3 dawn\n              = vec3(0.4, 0.4, 0.6) * css(1.00, 0.33, value)\n              + vec3(0.9, 0.8, 0.6) * css(0.66, 0.33, value)\n              + vec3(0.9, 0.6, 0.3) * css(0.33, 0.33, value)\n              + vec3(0.9, 0.3, 0.1) * css(0.00, 0.33, value)\n              ;\n\n            vec3 day\n              = vec3(0.4, 0.4, 0.9) * css(0.00, 0.33, value)\n              + vec3(0.9, 0.8, 0.9) * css(0.33, 0.33, value)\n              + vec3(0.9, 0.6, 0.7) * css(0.66, 0.33, value)\n              + vec3(0.9, 0.3, 0.5) * css(1.00, 0.33, value)\n              ;\n\n            vec3 c\n              = dusk  * css(0.00, 0.33, duskDawn)\n              + night * css(0.33, 0.33, duskDawn)\n              + dawn  * css(0.66, 0.33, duskDawn)\n              + day   * css(1.00, 0.33, duskDawn)\n              ;\n\n            gl_FragColor = vec4(c, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {duskDawn: 'duskDawn'}
};
var author$project$Plane$MeshVertex = F2(
	function (color, position) {
		return {color: color, position: position};
	});
var author$project$Plane$squareMesh = function () {
	var white = A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 1, 1, 1);
	var vertex = function (position) {
		return A2(author$project$Plane$MeshVertex, white, position);
	};
	var size = 0.8;
	var half = size / 2;
	var left = -half;
	var right = half;
	var front = half;
	var c = A3(elm_explorations$linear_algebra$Math$Vector3$vec3, right, 0, front);
	var back = -half;
	var d = A3(elm_explorations$linear_algebra$Math$Vector3$vec3, right, 0, back);
	var b = A3(elm_explorations$linear_algebra$Math$Vector3$vec3, left, 0, front);
	var a = A3(elm_explorations$linear_algebra$Math$Vector3$vec3, left, 0, back);
	return elm_explorations$webgl$WebGL$triangles(
		_List_fromArray(
			[
				_Utils_Tuple3(
				vertex(a),
				vertex(b),
				vertex(c)),
				_Utils_Tuple3(
				vertex(c),
				vertex(d),
				vertex(a))
			]));
}();
var author$project$Plane$vertexShader = {
	src: '\n\n        attribute vec3 position;\n        attribute vec3 color;\n\n        uniform mat4 perspectiveAndCamera;\n        uniform mat4 translation;\n\n        varying vec3 vcolor;\n        varying vec2 vcoord;\n\n        void main () {\n            gl_Position = perspectiveAndCamera * translation * vec4(position, 1.0);\n            vcolor = color;\n            vcoord = (position.xy + vec2(1.0, 1.0)) * 0.5;\n        }\n\n    ',
	attributes: {color: 'color', position: 'position'},
	uniforms: {perspectiveAndCamera: 'perspectiveAndCamera', translation: 'translation'}
};
var author$project$Plane$tile = F2(
	function (perspectiveAndCamera, _n0) {
		var tileI = _n0.a;
		var tileJ = _n0.b;
		var z = (tileJ - (author$project$Plane$planeSize / 2)) + 0.5;
		var x = (tileI - (author$project$Plane$planeSize / 2)) + 0.5;
		var uniforms = {
			duskDawn: 0,
			perspectiveAndCamera: perspectiveAndCamera,
			translation: elm_explorations$linear_algebra$Math$Matrix4$makeTranslate(
				A3(elm_explorations$linear_algebra$Math$Vector3$vec3, x, 0, z))
		};
		return A4(elm_explorations$webgl$WebGL$entity, author$project$Plane$vertexShader, author$project$Plane$fragmentShader, author$project$Plane$squareMesh, uniforms);
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Plane$entities = function (perspectiveAndCamera) {
	var zs = A2(elm$core$List$range, 0, author$project$Plane$planeSize - 1);
	var xs = A2(elm$core$List$range, 0, author$project$Plane$planeSize - 1);
	var xzs = elm$core$List$concat(
		A2(
			elm$core$List$map,
			function (x) {
				return A2(
					elm$core$List$map,
					function (z) {
						return _Utils_Tuple2(x, z);
					},
					zs);
			},
			xs));
	return A2(
		elm$core$List$map,
		author$project$Plane$tile(perspectiveAndCamera),
		xzs);
};
var elm_explorations$linear_algebra$Math$Matrix4$rotate = _MJS_m4x4rotate;
var elm_explorations$linear_algebra$Math$Matrix4$translate = _MJS_m4x4translate;
var elm_explorations$linear_algebra$Math$Matrix4$translate3 = _MJS_m4x4translate3;
var author$project$Scene$camera = F2(
	function (aimDirection, playerPosition) {
		var aim = elm_explorations$linear_algebra$Math$Vector2$toRecord(aimDirection);
		var _n0 = _Utils_Tuple2(aim.x, aim.y);
		var yaw = _n0.a;
		var pitch = _n0.b;
		return A2(
			elm_explorations$linear_algebra$Math$Matrix4$translate,
			A2(elm_explorations$linear_algebra$Math$Vector3$scale, -1, playerPosition),
			A3(
				elm_explorations$linear_algebra$Math$Matrix4$rotate,
				yaw,
				A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 1, 0),
				A3(
					elm_explorations$linear_algebra$Math$Matrix4$rotate,
					pitch,
					A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 1, 0, 0),
					A4(elm_explorations$linear_algebra$Math$Matrix4$translate3, -0.5, -0.5, -3, elm_explorations$linear_algebra$Math$Matrix4$identity))));
	});
var elm_explorations$linear_algebra$Math$Matrix4$makePerspective = _MJS_m4x4makePerspective;
var author$project$Scene$perspective = F2(
	function (viewportWidth, viewportHeight) {
		var ratio = viewportWidth / viewportHeight;
		return A4(elm_explorations$linear_algebra$Math$Matrix4$makePerspective, 45, ratio, 1.0e-2, 100);
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Scene$entities = F4(
	function (maybeViewer, viewport, texture, game) {
		var playerPosition = A2(
			elm$core$Maybe$withDefault,
			A3(elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0),
			A2(
				elm$core$Maybe$map,
				function ($) {
					return $.position;
				},
				A2(
					elm$core$Maybe$andThen,
					author$project$Game$playerToHero(game),
					maybeViewer)));
		var p = A2(author$project$Scene$perspective, viewport.width, viewport.height);
		var aimDirection = A2(
			elm$core$Maybe$withDefault,
			A2(elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			A2(
				elm$core$Maybe$map,
				function ($) {
					return $.aim;
				},
				maybeViewer));
		var c = A2(author$project$Scene$camera, aimDirection, playerPosition);
		var perspectiveAndcamera = A2(elm_explorations$linear_algebra$Math$Matrix4$mul, p, c);
		var heroes = A2(
			elm$core$List$map,
			A2(author$project$Hero$entity, texture, perspectiveAndcamera),
			elm$core$Dict$values(game.heroes));
		var planeTiles = author$project$Plane$entities(perspectiveAndcamera);
		return elm$core$List$concat(
			_List_fromArray(
				[planeTiles, heroes]));
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		elm$core$String$fromInt(n));
};
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm_community$list_extra$List$Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2(elm$core$List$drop, step, xs);
		var thisGroup = A2(elm$core$List$take, size, xs);
		var okayLength = _Utils_eq(
			size,
			elm$core$List$length(thisGroup));
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayLength) ? A2(
			elm$core$List$cons,
			thisGroup,
			A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var elm_community$list_extra$List$Extra$groupsOf = F2(
	function (size, xs) {
		return A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, size, xs);
	});
var elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 'Alpha', a: a};
};
var elm_explorations$webgl$WebGL$alpha = elm_explorations$webgl$WebGL$Internal$Alpha;
var elm_explorations$webgl$WebGL$Internal$Antialias = {$: 'Antialias'};
var elm_explorations$webgl$WebGL$antialias = elm_explorations$webgl$WebGL$Internal$Antialias;
var elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 'Depth', a: a};
};
var elm_explorations$webgl$WebGL$depth = elm_explorations$webgl$WebGL$Internal$Depth;
var elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var elm_explorations$webgl$WebGL$toHtml = elm_explorations$webgl$WebGL$toHtmlWith(
	_List_fromArray(
		[
			elm_explorations$webgl$WebGL$alpha(true),
			elm_explorations$webgl$WebGL$antialias,
			elm_explorations$webgl$WebGL$depth(1)
		]));
var author$project$App$view = function (model) {
	var sortedPlayers = A2(
		elm$core$List$sortBy,
		function ($) {
			return $.id;
		},
		elm$core$Dict$values(model.game.players));
	var _n0 = A2(
		elm$core$Tuple$mapSecond,
		author$project$App$shrinkViewport(4),
		A2(
			author$project$App$splitScreen,
			model.windowSize,
			elm$core$List$length(sortedPlayers)));
	var columns = _n0.a;
	var viewportsSize = _n0.b;
	var viewPlayer = function (player) {
		return A2(
			elm_explorations$webgl$WebGL$toHtml,
			_List_fromArray(
				[
					elm$html$Html$Attributes$width(viewportsSize.width),
					elm$html$Html$Attributes$height(viewportsSize.height),
					elm$html$Html$Attributes$class('playerViewport')
				]),
			A4(
				author$project$Scene$entities,
				elm$core$Maybe$Just(player),
				viewportsSize,
				model.texture,
				model.game));
	};
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('playerViewport-Rows'),
				elm$html$Html$Events$onClick(author$project$App$OnClick)
			]),
		A2(
			elm$core$List$map,
			elm$html$Html$div(
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('playerViewport-Row')
					])),
			A2(
				elm_community$list_extra$List$Extra$groupsOf,
				columns,
				A2(elm$core$List$map, viewPlayer, sortedPlayers))));
};
var author$project$Config$OnInputConfig = function (a) {
	return {$: 'OnInputConfig', a: a};
};
var elm$html$Html$option = _VirtualDom_node('option');
var elm$html$Html$select = _VirtualDom_node('select');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$selected = elm$html$Html$Attributes$boolProperty('selected');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var author$project$Config$viewInputConfig = F2(
	function (hasKnownGamepads, maybeInputConfig) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Use keyboard?')
						])),
					A2(
					elm$html$Html$select,
					_List_fromArray(
						[
							A2(
							elm$html$Html$Events$on,
							'change',
							A2(elm$json$Json$Decode$map, author$project$Config$OnInputConfig, elm$html$Html$Events$targetValue)),
							elm$html$Html$Attributes$disabled(!hasKnownGamepads)
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$option,
							_List_fromArray(
								[
									elm$html$Html$Attributes$value(''),
									elm$html$Html$Attributes$selected(
									_Utils_eq(maybeInputConfig, elm$core$Maybe$Nothing))
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Guess')
								])),
							A2(
							elm$html$Html$option,
							_List_fromArray(
								[
									elm$html$Html$Attributes$value('key'),
									elm$html$Html$Attributes$selected(
									_Utils_eq(
										maybeInputConfig,
										elm$core$Maybe$Just(author$project$Input$Player1UsesKeyboardAndMouse)))
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Player 1 uses the keyboard')
								])),
							A2(
							elm$html$Html$option,
							_List_fromArray(
								[
									elm$html$Html$Attributes$value('pad'),
									elm$html$Html$Attributes$selected(
									_Utils_eq(
										maybeInputConfig,
										elm$core$Maybe$Just(author$project$Input$AllPlayersUseGamepads)))
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Everyone uses only gamepads')
								]))
						]))
				]));
	});
var elm$html$Html$button = _VirtualDom_node('button');
var author$project$Config$viewConfig = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('configModal-Container')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('configModal-Content')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('configModal-Item')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Press Esc to to toggle Menu')
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('configModal-Item')
							]),
						_List_fromArray(
							[
								A2(author$project$Config$viewInputConfig, model.hasKnownGamepads, model.maybeInputConfig)
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('configModal-Item')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Attributes$disabled(!model.hasGamepads)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Remap gamepads (not implemented yet)')
									]))
							]))
					]))
			]));
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var author$project$Config$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('root')
					]),
				_List_fromArray(
					[
						function () {
						var _n0 = model.maybeApp;
						if (_n0.$ === 'Just') {
							var app = _n0.a;
							return A2(
								elm$html$Html$map,
								author$project$Config$OnAppMsg,
								author$project$App$view(app));
						} else {
							return elm$html$Html$text('');
						}
					}(),
						function () {
						var _n1 = model.maybeModal;
						if (_n1.$ === 'Nothing') {
							return elm$html$Html$text('');
						} else {
							var _n2 = _n1.a;
							return author$project$Config$viewConfig(model);
						}
					}()
					]))
			]),
		title: ''
	};
};
var author$project$Config$programWithFlags = {init: author$project$Config$init, subscriptions: author$project$Config$subscriptions, update: author$project$Config$update, view: author$project$Config$view};
var elm$browser$Browser$document = _Browser_document;
var author$project$Main$main = elm$browser$Browser$document(author$project$Config$programWithFlags);
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (gamepadDatabaseKey) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (gamepadDatabaseAsString) {
					return elm$json$Json$Decode$succeed(
						{gamepadDatabaseAsString: gamepadDatabaseAsString, gamepadDatabaseKey: gamepadDatabaseKey});
				},
				A2(elm$json$Json$Decode$field, 'gamepadDatabaseAsString', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'gamepadDatabaseKey', elm$json$Json$Decode$string)))(0)}});}(this));