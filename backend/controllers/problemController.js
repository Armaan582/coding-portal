const Problem = require('../models/Problem');

const problemsData = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to target*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
};

// Test your solution
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]
console.log(twoSum([3,2,4], 6));     // Expected: [1,2]`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass

# Test your solution
print(two_sum([2,7,11,15], 9))  # Expected: [0,1]
print(two_sum([3,2,4], 6))      # Expected: [1,2]`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums1 = {2,7,11,15};
    auto result = twoSum(nums1, 9);
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    return 0;
}`,
      java: `import java.util.Arrays;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9)));
    }
}`
    }
  },
  {
    title: 'Reverse String',
    slug: 'reverse-string',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with O(1) extra memory.`,
    difficulty: 'Easy',
    tags: ['Two Pointers', 'String'],
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: '' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: '' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Write your solution here
    
};

// Test
let s = ["h","e","l","l","o"];
reverseString(s);
console.log(s); // Expected: ["o","l","l","e","h"]`,
      python: `def reverse_string(s):
    # Write your solution here
    pass

s = ["h","e","l","l","o"]
reverse_string(s)
print(s)  # Expected: ["o","l","l","e","h"]`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
}

int main() {
    vector<char> s = {'h','e','l','l','o'};
    reverseString(s);
    for(char c : s) cout << c;
    cout << endl;
    return 0;
}`,
      java: `import java.util.Arrays;

public class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        char[] s = {'h','e','l','l','o'};
        sol.reverseString(s);
        System.out.println(Arrays.toString(s));
    }
}`
    }
  },
  {
    title: 'FizzBuzz',
    slug: 'fizzbuzz',
    description: `Given an integer \`n\`, return a string array \`answer\` (**1-indexed**) where:

- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.`,
    difficulty: 'Easy',
    tags: ['Math', 'String', 'Simulation'],
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]', explanation: '' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]', explanation: '' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', explanation: '' }
    ],
    constraints: ['1 <= n <= 10^4'],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
    // Write your solution here
    
};

console.log(fizzBuzz(15));`,
      python: `def fizz_buzz(n):
    # Write your solution here
    pass

print(fizz_buzz(15))`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> fizzBuzz(int n) {
    // Write your solution here
    return {};
}

int main() {
    auto result = fizzBuzz(15);
    for(auto& s : result) cout << s << " ";
    cout << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public List<String> fizzBuzz(int n) {
        // Write your solution here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.fizzBuzz(15));
    }
}`
    }
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: 'Easy',
    tags: ['String', 'Stack'],
    examples: [
      { input: 's = "()"', output: 'true', explanation: '' },
      { input: 's = "()[]{}"', output: 'true', explanation: '' },
      { input: 's = "(]"', output: 'false', explanation: '' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.'],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your solution here
    
};

console.log(isValid("()"));      // true
console.log(isValid("()[]{}"));  // true
console.log(isValid("(]"));      // false`,
      python: `def is_valid(s):
    # Write your solution here
    pass

print(is_valid("()"))      # True
print(is_valid("()[]{}"))  # True
print(is_valid("(]"))      # False`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

bool isValid(string s) {
    // Write your solution here
    return false;
}

int main() {
    cout << isValid("()") << endl;
    cout << isValid("()[]{}") << endl;
    cout << isValid("(]") << endl;
    return 0;
}`,
      java: `public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()"));
        System.out.println(sol.isValid("()[]{}"));
        System.out.println(sol.isValid("(]"));
    }
}`
    }
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: `Given an integer array \`nums\`, find the **subarray** with the largest sum, and return *its sum*.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    difficulty: 'Medium',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'The subarray [1] has the largest sum 1.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Write your solution here (Kadane's Algorithm hint!)
    
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubArray([5,4,-1,7,8]));              // 23`,
      python: `def max_sub_array(nums):
    # Write your solution here (Kadane's Algorithm hint!)
    pass

print(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))  # 6
print(max_sub_array([5,4,-1,7,8]))               # 23`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(nums) << endl; // 6
    return 0;
}`,
      java: `public class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // 6
    }
}`
    }
  },
  {
    title: 'Longest Common Prefix',
    slug: 'longest-common-prefix',
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.`,
    difficulty: 'Easy',
    tags: ['String', 'Trie'],
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: '' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' }
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    // Write your solution here
    
};

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""`,
      python: `def longest_common_prefix(strs):
    # Write your solution here
    pass

print(longest_common_prefix(["flower","flow","flight"]))  # "fl"
print(longest_common_prefix(["dog","racecar","car"]))      # ""`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    // Write your solution here
    return "";
}

int main() {
    vector<string> strs = {"flower","flow","flight"};
    cout << longestCommonPrefix(strs) << endl;
    return 0;
}`,
      java: `public class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Write your solution here
        return "";
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.longestCommonPrefix(new String[]{"flower","flow","flight"}));
    }
}`
    }
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search'],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Write your binary search solution here
    
};

console.log(search([-1,0,3,5,9,12], 9));  // 4
console.log(search([-1,0,3,5,9,12], 2));  // -1`,
      python: `def search(nums, target):
    # Write your binary search solution here
    pass

print(search([-1,0,3,5,9,12], 9))  # 4
print(search([-1,0,3,5,9,12], 2))  # -1`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> nums = {-1,0,3,5,9,12};
    cout << search(nums, 9) << endl;
    cout << search(nums, 2) << endl;
    return 0;
}`,
      java: `public class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.search(new int[]{-1,0,3,5,9,12}, 9));
        System.out.println(sol.search(new int[]{-1,0,3,5,9,12}, 2));
    }
}`
    }
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.`,
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '' },
      { input: 'list1 = [], list2 = []', output: '[]', explanation: '' },
      { input: 'list1 = [], list2 = [0]', output: '[0]', explanation: '' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50]', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
    starterCode: {
      javascript: `class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Write your solution here
    
};

// Helper to create list from array
function makeList(arr) {
    let dummy = new ListNode(0);
    let cur = dummy;
    for(let v of arr) { cur.next = new ListNode(v); cur = cur.next; }
    return dummy.next;
}

// Helper to print list
function printList(head) {
    let res = [];
    while(head) { res.push(head.val); head = head.next; }
    console.log(res);
}

printList(mergeTwoLists(makeList([1,2,4]), makeList([1,3,4])));`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    # Write your solution here
    pass

def make_list(arr):
    dummy = ListNode(0)
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def print_list(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    print(res)

print_list(merge_two_lists(make_list([1,2,4]), make_list([1,3,4])))`,
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    // Write your solution here
    return nullptr;
}

int main() {
    // Test setup omitted for brevity
    return 0;
}`,
      java: `public class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`
    }
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    difficulty: 'Easy',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top. 1. 1 step + 1 step. 2. 2 steps.' },
      { input: 'n = 3', output: '3', explanation: 'There are three ways: 1+1+1, 1+2, 2+1.' }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // Write your solution here (hint: think Fibonacci!)
    
};

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8`,
      python: `def climb_stairs(n):
    # Write your solution here (hint: think Fibonacci!)
    pass

print(climb_stairs(2))  # 2
print(climb_stairs(3))  # 3
print(climb_stairs(5))  # 8`,
      cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << climbStairs(2) << endl; // 2
    cout << climbStairs(5) << endl; // 8
    return 0;
}`,
      java: `public class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.climbStairs(2)); // 2
        System.out.println(sol.climbStairs(5)); // 8
    }
}`
    }
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

A **substring** is a contiguous non-empty sequence of characters within a string.`,
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your solution here (hint: Sliding Window!)
    
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
      python: `def length_of_longest_substring(s):
    # Write your solution here (hint: Sliding Window!)
    pass

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))      # 1
print(length_of_longest_substring("pwwkew"))     # 3`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // 3
    cout << lengthOfLongestSubstring("bbbbb") << endl;    // 1
    return 0;
}`,
      java: `public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.lengthOfLongestSubstring("abcabcbb")); // 3
    }
}`
    }
  }
];

// Seed problems into DB
const seedProblems = async () => {
  try {
    const count = await Problem.countDocuments();
    if (count === 0) {
      await Problem.insertMany(problemsData);
      console.log('✅ Problems seeded successfully');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

// @desc    Get all problems
// @route   GET /api/problems
const getProblems = async (req, res) => {
  try {
    await seedProblems();
    const problems = await Problem.find({}, 'title slug difficulty tags');
    res.json({ problems });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:slug
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }
    res.json({ problem });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getProblems, getProblem };
