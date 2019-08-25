export class Queue<T> {
  private _data: Map<number, T> = new Map();
  private _nextEnqueuedIndex = 0;
  private _lastDequeuedIndex = 0;

  enqueue(item: T): void {
    this._data.set(this._nextEnqueuedIndex, item);
    this._nextEnqueuedIndex++;
  }

  dequeue(): T | undefined {
    if (this._lastDequeuedIndex !== this._nextEnqueuedIndex) {
      const dequeued = this._data.get(this._lastDequeuedIndex);
      this._data.delete(this._lastDequeuedIndex);
      this._lastDequeuedIndex++;
      return dequeued;
    }
  }

  public get size(): number {
    return this._data.size;
  }
}
