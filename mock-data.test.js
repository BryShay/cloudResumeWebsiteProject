// Import the function to be tested
const { generateRandomNumber } = require('./generateRandNum');

// Describe block for organizing tests
describe('generateRandomNumber function', () => {
  // Test case to check if the function generates a random number within the specified range
  test('should generate a random number within the specified range', () => {
    const min = 1;
    const max = 10;
    const randomNumber = generateRandomNumber(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
