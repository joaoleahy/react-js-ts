function findDuplicates<T>(array: T[]): T[] {
    const occurrences: { [key: string]: number } = {};
    const duplicates: T[] = [];

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const key = typeof item === 'object' ? JSON.stringify(item) : String(item);
        
        if (occurrences[key] === 1) {
            duplicates.push(item);
        }
        
        occurrences[key] = (occurrences[key] || 0) + 1;
    }

    return duplicates;
}

// Test cases

// Test case 1: Array with duplicate numbers
const numbers = [1, 2, 3, 4, 5, 1, 2, 6];
console.log(findDuplicates(numbers)); // Expected output: [1, 2]

// Test case 2: Array with duplicate strings
const strings = ["apple", "banana", "apple", "orange", "banana"];
console.log(findDuplicates(strings)); // Expected output: ["apple", "banana"]

// Test case 3: Array with duplicate objects
const objects = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }];
console.log(findDuplicates(objects)); // Expected output: [{ id: 1 }]

// Test case 4: Array with mixed types
const mixed = [1, "1", 2, "2", 1, "1"];
console.log(findDuplicates(mixed)); // Expected output: [1, "1"]

// Test case 5: Array with no duplicates
const unique = [1, 2, 3, 4, 5];
console.log(findDuplicates(unique)); // Expected output: []

// Test case 6: Empty array
const empty: number[] = [];
console.log(findDuplicates(empty)); // Expected output: []

// Test case 7: Array with nested objects
const nestedObjects = [{ a: { b: 1 } }, { a: { b: 1 } }, { a: { b: 2 } }];
console.log(findDuplicates(nestedObjects)); // Expected output: [{ a: { b: 1 } }]