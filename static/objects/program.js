var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};


document.writeln(flight.airline);

//another way of referencing member 
document.writeln(flight["number"]);
document.writeln(flight.status);

//get Default Value if member is undefined
document.writeln(flight.status || "status");

//to avoid type error because member is undefined
var errorMember = flight.status && flight.status.number;

// if the member does not exists with assignment the object is augmented
flight.status = "new";
document.writeln(flight.status);

//pass by reference sample
var temp = flight;
temp.status = "old";
document.writeln(flight.status);

//prototyping sample
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}
var another_flight = Object.create(flight);
document.writeln(another_flight.departure.IATA);
flight.newNumber = 134;
document.writeln(another_flight.newNumber);

//typeof & hasOwnProperty sample
document.writeln(typeof flight.number);
document.writeln(typeof another_flight.constructor);
document.writeln(another_flight.hasOwnProperty('constructor'));
document.writeln(flight.hasOwnProperty('departure'));

//Accessing all properties
testRecursion(another_flight);
function testRecursion(objectName,parentName){
	var propertyName;
	for(propertyName in objectName){
		if(typeof another_flight[propertyName]!=='function' && typeof another_flight[propertyName]!=='object'){
			document.writeln((parentName?parentName + '.' + propertyName:propertyName) + ':' + objectName[propertyName]);
		}else{
			testRecursion(another_flight[propertyName],parentName?parentName + '.' + propertyName:propertyName);
		}
	}
}

//delete/remove property sample
another_flight.number = 999;
document.writeln(another_flight.number);
document.writeln(flight.number);
delete another_flight.number;
document.writeln(another_flight.number);
document.writeln(flight.number);

