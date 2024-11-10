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