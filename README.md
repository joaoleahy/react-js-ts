# React JS/TS Project

This repository contains a collection of TypeScript exercises and React applications, including implementations of algorithmic problems and interactive visualizations.

## Project Structure

```
react-js-ts/
├── questions/         # TypeScript algorithm exercises
├── react/            # React applications
│   ├── q3/          # Layout Grid Demo
│   └── q6/          # Zeno's Paradox Visualization
└── package.json
```

## Setup and Installation

1. Make sure you have Node.js >=18 installed
2. Clone the repository
3. Install dependencies:
```bash
npm run setup
```

## Running the Applications

### React Applications

#### Q3: Layout Grid Demo
```bash
npm run q3:dev
```
This will start the development server on port 3001.

#### Q6: Zeno's Paradox
```bash
npm run q6:dev
```
This will start the development server on port 3002.

## TypeScript Exercises (questions/)

After installing the project dependencies, you can run the algorithm exercises using:

```base
ts-node questions/q1.ts  # To run question 1
ts-node questions/q2.ts  # To run question 2
# ... and so on
```

Make sure you're in the project root directory.

### Q1: Find Duplicates
Implementation of a generic function that finds duplicate elements in an array.

### Q2: Exponential Delay Progress
Implements an async function that processes array items with exponential delays and shows progress.

### Q4: Valid Brackets
Validates if a string contains properly matched brackets.

### Q5: Highest Floor Problem
Solves the mathematical problem of finding the highest floor achievable with a given number of steps.

### Q7: Carrot Value Optimization
Implements an algorithm to maximize value in a capacity-constrained scenario.


## Detailed React Applications

### Q3: Interactive Layout Grid
A responsive layout demonstration using Tailwind CSS, featuring:
- Header and footer sections
- Main content area with nested grid layouts
- Custom color scheme
- Responsive design patterns

The layout uses custom Tailwind configurations for specific color schemes and spacing utilities. 

![Screenshot 2024-11-10 at 18 20 26](https://github.com/user-attachments/assets/6bcbf212-8c12-4a97-b395-216f62e2a50e)

### Q6: Zeno's Paradox Visualization

An interactive visualization of the famous philosophical paradox where Achilles races against a tortoise. The application demonstrates:

#### Key Features:
- Animated race between Achilles and the Tortoise
- Interactive controls (Start/Pause/Reset)
- Visual representation of the paradox
- Responsive design
- Smooth animations and transitions

#### Technical Implementation:
- Uses React hooks for state management
- Implements requestAnimationFrame for smooth animations
- Custom CSS animations for character movements
- Intersection Observer for performance optimization

![Screenshot 2024-11-10 at 23 07 57](https://github.com/user-attachments/assets/1b8e2013-07f4-457c-8e68-3ef4f527ae14)


#### About Zeno's Paradox
The visualization demonstrates the famous philosophical paradox where Achilles, despite being faster, theoretically never catches up to the tortoise due to the infinite division of space. In the visualization:
- The tortoise starts ahead
- Achilles moves faster but never truly catches up
- The animation shows how the distance between them becomes increasingly smaller

## Technologies Used

- React 18.3
- TypeScript 5.6
- Tailwind CSS 3.4
- Vite 5.0
- Various React hooks and modern JavaScript features

## Development

The project uses Vite for development with hot module replacement. Each React application is configured with its own:
- TypeScript configuration
- Tailwind CSS setup
- PostCSS processing
- Development server

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is open-source and available under the MIT License.
