const roman = require('./roman');
describe('roman', () => {
  // https://roman-numerals.info/3999
  test.each([
    ['I', 1],
    ['II', 2],
    ['III', 3],
    ['IV', 4],
    ['V', 5],
    ['VI', 6],
    ['VII', 7],
    ['VIII', 8],
    ['IX', 9],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
    ['XL', 40],
    ['XC', 90],
    ['CD', 400],
    ['CM', 900],
    ['MMM', 3000]
  ])('羅馬數字 %s 應該要被轉換成十進位的 %d', (input, expected) => {
    expect(roman.toInt(input)).toBe(expected)
  });

  test.each([
    [0, 'ZERO'],
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [9, 'IX'],
    [10, 'X'],
    [50, 'L'],
    [100, 'C'],
    [500, 'D'],
    [1000, 'M'],
    [40, 'XL'],
    [90, 'XC'],
    [400, 'CD'],
    [900, 'CM'],
    [3999, 'MMMCMXCIX']
  ])('十進位的 %d 應該要被轉換成羅馬數字 %s', (input, expected) => {
    expect(roman.fromInt(input)).toEqual(expected)
  });

  test('sub 應該要執行羅馬數字減法 (mock 版本)', () => {
    // arrange
    roman._toInt = roman.toInt
    roman.toInt = jest.fn()
    roman._fromInt = roman.fromInt
    roman.fromInt = jest.fn()
    roman.toInt.mockReturnValueOnce(10)
    roman.toInt.mockReturnValueOnce(1)

    // action
    roman.sub('', '')

    // assert
    expect(roman.toInt).toHaveBeenCalledTimes(2)
    expect(roman.fromInt).toHaveBeenCalledTimes(1)
    expect(roman.fromInt).toHaveBeenCalledWith(9)

    // clear
    roman.toInt = roman._toInt
    roman.fromInt = roman._fromInt
  });

  test.each([
    ['I', 'I', 'ZERO'],
    ['MM', 'II', 'MCMXCVIII']
  ])('羅馬數字 %s 剪掉羅馬數字 %s 應該等於羅馬數字 %s', (a, b, expected) => {
    expect(roman.sub(a, b)).toEqual(expected)
  });
})
