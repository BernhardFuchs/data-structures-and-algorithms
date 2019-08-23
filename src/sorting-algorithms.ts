interface SortResult {
  sortedArray: Array<number | string>;
  stepsNeeded: number;
}

export const bubbleSort = (array: Array<number | string>): SortResult => {
  let numberOfSteps = 0;
  let unsortedUntilIndex = array.length - 1;
  let sorted: boolean = false;

  while (!sorted) {
    sorted = true;
    for (let index = 0; index < array.length; index++) {
      if (array[index] > array[index + 1]) {
        sorted = false;
        [array[index], array[index + 1]] = [array[index + 1], array[index]]
        numberOfSteps++;
      }
    }
    unsortedUntilIndex = unsortedUntilIndex - 1;
  }
  return { sortedArray: array, stepsNeeded: numberOfSteps };
};
