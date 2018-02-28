const express = require('express');

const l = express.static(__dirname + "/public");

console.log('l = ', typeof l);
console.log('l = ', l);