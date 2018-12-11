
const DIGIT_TO_ROMAN = [
  ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
  ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
  ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
  ["", "M", "MM", "MMM"]
];

const ROMAN_TO_DIGIT = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

exports.toInt = function (roman) {
  let num = 0;
  let arr = roman.split('').map(c => ROMAN_TO_DIGIT[c])
  for(let i=0; i<roman.length; i++) {
    num += arr[i];
    if (i>0 && arr[i] > arr[i-1]) num -= 2 * arr[i-1];
  }
  return num;
}

exports.fromInt = function (num) {
  num = num.toString()
  if (num === '0') return 'ZERO';
  return num.split('')
    .map((iv, ik) => DIGIT_TO_ROMAN[ num.length - 1 - ik ][ parseInt(iv, 10) ])
    .join('');
}

exports.sub = function (a, b) {
  return exports.fromInt(exports.toInt(a) - exports.toInt(b));
}