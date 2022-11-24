const { sum, multiply, subtract, divide } = require('../index.js');

describe('test calculations', () => {
  it('should sum two numbers', () => {
    const result = sum(1, 2);
    expect(result).toEqual(3);
  });

  it('should multiply two numbers', () => {
    const result = multiply(2, 2);
    expect(result).toEqual(4);
  });

  it('should subtract two numbers', () => {
    const result = subtract(1, 2);
    expect(result).toEqual(-1);
  });

  it('should divide two numbers', () => {
    const result = divide(1, 2);
    expect(result).toEqual(0.5);
  });

  it('should divide two sums', () => {
    const result = divide(sum(9, 1), sum(2, 3));
    expect(result).toEqual(2);
  });
});
