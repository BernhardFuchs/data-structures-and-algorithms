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
