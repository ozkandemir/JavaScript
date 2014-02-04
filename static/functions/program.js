//cerate and initialize a function
//This function has no name so is called anoynomus
var add = function(a, b) {
	document.writeln(this);
	document.writeln(arguments);

	var testRecursion = function testRecursion(objectName, parentName) {
		document.writeln(this);
		var propertyName;
		for (propertyName in objectName) {
			if (typeof objectName[propertyName] !== 'function' && typeof objectName[propertyName] !== 'object') {
				document.writeln((parentName ? parentName + '.' + propertyName : propertyName) + ':' + objectName[propertyName]);
			} else {
				testRecursion(objectName[propertyName], parentName ? parentName + '.' + propertyName : propertyName);
			}
		}
	}

	//This call causes maximum stack exceeds :)
	//testRecursion(this);
	testRecursion(arguments);

	return a + b;
}

add(5, 10);

// this invocation sample. 
//Method invocation pattern
var sampleObject = {
	'id': 0,

	method1: function(param1) {
		console.log('param1:' + param1);
		//this becomes the object itself here
		console.log(this);
	}

};

sampleObject.method1('Ozkan');

// this invocation sample. 
//function invocation pattern

function method1(param1) {
	console.log('param1:' + param1);
	//this becomes window here
	console.log(this);
};

method1('Ozkan');


// Augment myObject with a double method.
var myObject = {
	value: 1,

	getValue: function() {
		return this.value;
	}
};

myObject.double = function() {
	var that = this; // Workaround.
	var helper = function() {
		//this comes here as window CAUTION
		console.log('wrong this:' + this);
		that.value = add(that.value, that.value);
	};

	helper(); // Invoke helper as a function. 
};
// Invoke double as a method.
myObject.double();
document.writeln(myObject.getValue()); // 6



//Apply pattern sample
// this is a constructor
var applySampleFunction = function() {
	console.log('this is a constructor');
};

applySampleFunction.prototype.updateValue = function() {
	this.value++;
};

//invojke updateValue method on myObject unless myObject does not have ant method of updateValue
//be aware of this in updateValue function. this here is the myObject
applySampleFunction.prototype.updateValue.apply(myObject, null);
console.log(myObject.getValue());


//Closure sample

function sayHello2(name) {
	var text = 'Hello ' + name; // local variable
	var sayAlert = function() {
		console.log(text);
	}
	return sayAlert;
}
var say2 = sayHello2('Ozkan');
say2();
console.log(say2.toString());


//2. example

function say667() {
	// Local variable that ends up within closure
	var num = 666;
	var sayAlert = function() {
		console.log(num);
	}
	num++;
	return sayAlert;
}
var sayNumba = say667();
sayNumba();
console.log(sayNumba.toString());

//3. sample 

function setupSomeGlobals() {
	// Local variable that ends up within closure
	var num = 666;
	// Store some references to functions as global variables
	gAlertNumber = function() {
		console.log(num);
	}
	gIncreaseNumber = function() {
		num++;
	}
	gSetNumber = function(x) {
		num = x;
	}
}

setupSomeGlobals();
gAlertNumber();
gIncreaseNumber();
gAlertNumber();
gSetNumber(5);
gAlertNumber();

//4. sample

function buildList(list) {
	var result = [];
	for (var i = 0; i < list.length; i++) {
		var item = 'item' + list[i];
		result.push(function() {
			console.log(item + ' ' + list[i])
		});
	}
	return result;
}

function testList() {
	var fnlist = buildList([1, 2, 3]);
	// using j only to help prevent confusion - could use i
	for (var j = 0; j < fnlist.length; j++) {
		fnlist[j]();
	}
}

testList();

//5. example

function sayAlice() {
	var sayAlert = function() {
		console.log(alice);
	}
	// Local variable that ends up within closure
	var alice = 'Hello Alice';
	return sayAlert;
}

sayAlice()();

//6. example
//This example is about to create closure in the for loop
var add_the_handlers = function(nodes) {
	var i;
	for (i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = function(i) {
			return function(e) {
				alert(e);
			};
		}(i);
	}
};
