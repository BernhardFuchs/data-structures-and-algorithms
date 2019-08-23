import { bubbleSort } from "./sorting-algorithms";

var randomNumberArray = (length: number, max: number): Array<number> => {
  return Array(length)
    .fill(null)
    .map(() => Math.random() * max);
};

var randomStringArray = (
  length: number,
  maxStringLength: number
): Array<string> => {
  return Array(length)
    .fill(null)
    .map(() =>
      (Math.random().toString(36) + "00000000000000000").slice(
        2,
        maxStringLength + 2
      )
    );
};

const arrayToBeSorted = randomStringArray(25, 7);
console.log("Array to be sorted: ", arrayToBeSorted);

const bubbleSortResult = bubbleSort(arrayToBeSorted);

console.log("Bubble Sorted Array: ", bubbleSortResult.sortedArray);
console.log("Bubble Sort Steps: ", bubbleSortResult.stepsNeeded);
