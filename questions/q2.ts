async function writeWithExponentialDelayAndProgress<T>(array: T[]): Promise<void> {
    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    for (let i = 0; i < array.length; i++) {
        const delayInSeconds = Math.pow(2, i);
        const delayInMs = delayInSeconds * 1000;
        const progress = ((i + 1) / array.length) * 100;
        
        console.log(`Item: ${array[i]} - Progress: ${progress.toFixed(1)}%`);
        await sleep(delayInMs);
    }
}

// Test cases
const testArrays = [
    ["a", "b", "c", "d"],                    // Basic test with letters
    [1, 2, 3, 4, 5],                         // Test with numbers
    ["hello", "world"],                      // Test with two words
    [],                                      // Test with empty array
    ["single"]                               // Test with a single element
];

async function runTests2() {
    console.log("Starting tests...\n");
    
    for (let i = 0; i < testArrays.length; i++) {
        console.log(`Test #${i + 1} with array:`, testArrays[i]);
        await writeWithExponentialDelayAndProgress(testArrays[i].map(String));
        console.log("\n-------------------\n");
    }
    
    console.log("All tests completed!");
}

runTests2();