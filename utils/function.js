

export async function executeFunction() {
  try {
    // Add a 1000 ms delay
    await new Promise(resolve => setTimeout(resolve, 1000));


    return runSortingBenchmark();
  } catch (error) {
    console.error("Error executing function:", error);
    return "An error occurred while executing the function.";
  }
}

// Function to sort a list of random numbers
function sortRandomNumbers(numbers) {
  return numbers.sort((a, b) => a - b);
}

// Function to generate a list of random numbers
function generateRandomNumbers(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
}

// Function to benchmark the sorting function
function benchmarkSortFunction(sizes) {
  const results = [];

  for (const size of sizes) {
    const numbers = generateRandomNumbers(size);
    
    const start = performance.now();
    sortRandomNumbers(numbers);
    const end = performance.now();

    const timeTaken = end - start;
    results.push({ size, timeTaken });
  }

  return results;
}

// Function to run the benchmark and return results as a Shadcn table
function runSortingBenchmark() {
  const sizes = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000, 250000, 500000, 1000000];
  const benchmarkResults = benchmarkSortFunction(sizes);
  
  return `
Array Size | Time Taken (ms)
-----------|----------------
${benchmarkResults.map(result => `${result.size.toString().padEnd(10)}| ${result.timeTaken.toFixed(2)}`).join('\n')}
  `.trim();
}
