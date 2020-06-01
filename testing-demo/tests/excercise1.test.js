const fizzBuzz = require('../exercise1');

describe('FizzBuzz', () => {
    it('should throw if string is sent', () => {
        expect(() => {fizzBuzz.fizzBuzz('4');}).toThrow();
        expect(() => {fizzBuzz.fizzBuzz(null);}).toThrow();
        expect(() => {fizzBuzz.fizzBuzz(undefined);}).toThrow();
        expect(() => {fizzBuzz.fizzBuzz({});}).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = fizzBuzz.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is only divisible by 3', () => {
        const result = fizzBuzz.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is only divisible by 5', () => {
        const result = fizzBuzz.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return the input if is not divisible by 3 or 5', () => {
        const result = fizzBuzz.fizzBuzz(1);
        expect(result).toBe(1);
    });
});