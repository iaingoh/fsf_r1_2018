const mkHello = (name) => {
	return () => {
		console.log('Hello ', name);
	}
};
// base ^ exp = 2 ^ 3 = 8
const power = (base, exp) => {
	let ans = 1;
	for (let i = 0; i < exp; i++)
		ans = ans * base;
	return (ans);
}

const mkPower = (exp) => {

	const f = (base) => {
		let ans = 1;
		for (let i = 0; i < exp; i++)
			ans = ans * base;
		return (ans);
	}
	return (f);
};

const square = mkPower(2);
const cube = mkPower(3);
const quad = mkPower(4);

console.log('3 ^ 2 = ', square(3));
console.log('3 ^ 3 = ', cube(3));
console.log('3 ^ 4 = ', quad(3));

//console.log('2 ^ 3 = ', power(2, 3));
//console.log('3 ^ 3 = ', power(3, 3));
//console.log('4 ^ 3 = ', power(4, 3));

const sayHelloToFred = mkHello('Fred');
const sayHelloToBarney = mkHello('Barney');

sayHelloToFred();
sayHelloToBarney();
