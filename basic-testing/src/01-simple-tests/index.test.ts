import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Subtract })).toBe(-2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Divide })).toBe(0.6);
    expect(simpleCalculator({ a: 3, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(
      243,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 5, action: '**' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 3, b: 's', action: Action.Subtract }),
    ).toBeNull();
    expect(simpleCalculator({ a: 'm', b: 5, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: null, b: 5, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 3, b: undefined, action: Action.Multiply }),
    ).toBeNull();
  });
});
