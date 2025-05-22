
function lengthOfLIS(nums) {
  // If the array is empty, LIS(longest increasing subsequence) is 0
  if (nums.length === 0) return 0;

  // Initialize dp array where dp[i] will be the length of the LIS ending at index i
  const dp = new Array(nums.length).fill(1);

  // Start from the second element and build the dp array
  for (let i = 1; i < nums.length; i++) {
    // Check all elements before the current one
    for (let j = 0; j < i; j++) {
      // If nums[i] can be added to the increasing subsequence ending at nums[j]
      if (nums[i] > nums[j]) {
        // Update dp[i] with the max length
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // The longest increasing subsequence will be the max value in dp array
  return Math.max(...dp);
}

// Example usage:
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4
