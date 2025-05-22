
function twoSum(nums, target) {
  // Check if the input is a valid array and has at least two elements
  if (!Array.isArray(nums) || nums.length < 2) {
    throw new Error("Input must be an array with at least two numbers.");
  }

  // Check if target is a valid number
  if (typeof target !== 'number') {
    throw new Error("Target must be a number.");
  }

  // Create a Map to store the value and its index
  const numMap = new Map();

  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    // Check if the complement of the current number exists in the map
    if (numMap.has(complement)) {
      // If found, return the indices
      return [numMap.get(complement), i];
    }

    // Otherwise, store the current number with its index
    numMap.set(current, i);
  }

  // If no solution is found, throw an error
  throw new Error("No two sum solution found.");
}

// Example usage:
try {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);
  console.log("Indices of elements that sum to target:", result); // Output: [0, 1]
} catch (error) {
  console.error("Error:", error.message);
}
