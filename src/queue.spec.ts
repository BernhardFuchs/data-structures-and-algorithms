import { Queue } from "./queue";

test("should enqueue and dequeue items correct", () => {
  const queue = new Queue();
  const numberOfItems = 10;
  for (let i = 0; i < numberOfItems; i++) {
    const item = `item${i}`;
    queue.enqueue(item);
    expect(queue.size).toBe(i + 1);
  }

  for (let i = 0; i < numberOfItems; i++) {
    const item = `item${i}`;
    expect(queue.dequeue()).toEqual(item);
    expect(queue.size).toBe(numberOfItems - (i + 1));
  }
});
