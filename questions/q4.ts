function isValidBrackets(str: string): boolean {
    if (!str || typeof str !== 'string') return false;
    
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