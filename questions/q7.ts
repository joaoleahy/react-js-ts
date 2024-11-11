type CarrotType = {
    kg: number;
    price: number;
};

function getMaxValue(carrotTypes: CarrotType[], capacity: number): number {
    if (!carrotTypes.length || capacity <= 0) return 0;
    
    carrotTypes.sort((a, b) => (b.price / b.kg) - (a.price / a.kg));
    
    let remainingCapacity = capacity;
    let totalValue = 0;
    
    for (const carrot of carrotTypes) {
        if (remainingCapacity <= 0) break;
        
        const maxCarrots = Math.floor(remainingCapacity / carrot.kg);
        totalValue += maxCarrots * carrot.price;
        remainingCapacity -= maxCarrots * carrot.kg;
    }
    
    return totalValue;
}

// Test cases
const testCases = [
  {
    carrotTypes: [
      { kg: 5, price: 100 },
      { kg: 7, price: 150 },
      { kg: 3, price: 70 },
    ],
    capacity: 36,
  },
  {
    carrotTypes: [
      { kg: 2, price: 100 },
      { kg: 1, price: 30 },
      { kg: 3, price: 120 },
    ],
    capacity: 10,
  },
];

function runTests() {
  testCases.forEach((test, index) => {
    console.log(`\nTest #${index + 1}:`);
    console.log("Carrot Types:", test.carrotTypes);
    console.log("Capacity:", test.capacity);
    console.log("Max Value:", getMaxValue(test.carrotTypes, test.capacity));
  });
}

runTests();
