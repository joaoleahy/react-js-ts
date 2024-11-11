function isValidBrackets(str: string): boolean {
    if (typeof str !== 'string') return false;
    if (str === '') return true;
    
    const stack: string[] = [];
    const bracketPairs: Record<string, string> = {
        '}': '{',
        ']': '[',
        ')': '('
    };
    
    for (const char of str) {
        if (!bracketPairs[char]) {
            stack.push(char);
            continue;
        }
        
        if (stack.pop() !== bracketPairs[char]) {
            return false;
        }
    }
    return stack.length === 0;
}

// Test cases
const testCases2 = [
    // Valid cases
    { input: "{[]}", expected: true },           // Simple nested brackets
    { input: "(){}", expected: true },           // Sequential pairs
    { input: "{()[]}", expected: true },         // Multiple nested types
    { input: "{{[[(())]]}}", expected: true },   // Deep nesting
    { input: "", expected: true },               // Empty string
    
    // Invalid cases
    { input: "{(]}", expected: false },          // Incorrect closing
    { input: "{([)]}", expected: false },        // Incorrect order
    { input: "((())", expected: false },         // Not closed
    { input: "()}", expected: false },           // Extra closing bracket
    { input: "{", expected: false },             // Only opening
    { input: "}", expected: false },             // Only closing
    
    // Invalid cases
    { input: "{a[]}", expected: false },         // With letter
    { input: null as any, expected: false },     // Input null
    { input: undefined as any, expected: false }, // Input undefined
    { input: "123", expected: false },           // Only numbers
    { input: " ", expected: false }              // Only space
];

// Função para executar os testes
function runTests4() {
    console.log("Running bracket validation tests...\n");
    
    testCases2.forEach((test, index) => {
        const result = isValidBrackets(test.input);
        const passed = result === test.expected;
        
        console.log(`Test #${index + 1}`);
        console.log(`Input: "${test.input}"`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}`);
        console.log("-------------------\n");
    });
}

// Executar os testes
runTests4();