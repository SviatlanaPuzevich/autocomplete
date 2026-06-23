// Uncomment the code below and write your tests
// import { generateLinkedList } from './index';
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedResult = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };

    expect(generateLinkedList([1, 2, 3])).toStrictEqual(expectedResult);
  });

  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];

    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});
