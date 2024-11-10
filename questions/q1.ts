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