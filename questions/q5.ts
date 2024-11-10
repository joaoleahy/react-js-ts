function findHighestFloor(floors: number): number {
    const highestFloor = Math.ceil((-1 + Math.sqrt(1 + 8 * floors)) / 2);
    return highestFloor;
}

console.log(findHighestFloor(100)); // 14
console.log(findHighestFloor(50));  // 10
console.log(findHighestFloor(10));  // 4