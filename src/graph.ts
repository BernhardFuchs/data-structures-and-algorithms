import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;
import Edge = GraphEntities.Edge;
import { Queue } from "./queue";

export class GraphSearch<T> {
  private foundNodes = new Array<Node<T>>();
  constructor(private graph: Graph<T>) {}

  // TODO: find more intuitive way for searchDepth parameter
  // Breadth First Search
  public searchNetwork(
    startingNodeKey: T,
    searchDepth: number = null
  ): Array<Node<T>> {
    const _visited: Map<T, boolean> = new Map();
    this.graph.nodes.forEach(node => {
      _visited.set(node.key, false);
    });

    const _startingNode: Node<T> = this.graph.findNode(startingNodeKey);
    const _queue = new Queue<Node<T>>();
    _queue.enqueue(_startingNode);

    while (_queue.size !== 0) {
      const currentNode = _queue.dequeue();
      _visited.set(currentNode.key, true);

      currentNode.children.forEach(childNode => {
        if (
          _visited.get(childNode.key) === false &&
          this.searchNextLevel(searchDepth, _queue.size)
        ) {
          _queue.enqueue(childNode);
        }
      });
    }

    this.graph.nodes.forEach(node => {
      if (_visited.get(node.key)) this.foundNodes.push(node);
    });

    return this.foundNodes;
  }

  private searchNextLevel(level: number | null, queueSize: number): boolean {
    return level === null || queueSize <= level;
  }
}

export class Graph<T> {
  private _nodes: Array<Node<T>>;
  private _edges: Array<Edge<T>>;

  constructor(private isDirected: boolean = false) {
    this._nodes = new Array<Node<T>>();
    this._edges = new Array<Edge<T>>();
  }

  public get nodes(): Array<Node<T>> {
    return this._nodes;
  }

  public get edges(): Array<Edge<T>> {
    return this._edges;
  }

  public addNode(node: Node<T>): void {
    this._nodes.push(node);
  }

  public findNode(key: T): Node<T> {
    return this._nodes.find(n => n.key === key);
  }

  public addEdge(node1Key: T, node2Key: T) {
    const node1 = this.findNode(node1Key);
    const node2 = this.findNode(node2Key);

    node1.children.push(node2);

    if (!this.isDirected) {
      node2.children.push(node1);
    }

    this._edges.push({ node1Key, node2Key });
  }
}
