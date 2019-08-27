import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;
import { Graph } from "./graph";
import { Queue as Q } from "./queue";

const searchNextLevel = (level: number | null, qSize: number): boolean => {
  return level === null || qSize <= level;
};

const queueNotEmpty = <T>(_q: Q<Node<T>>) => _q.size !== 0;

export const searchBreadthFirst = <T>(
  graph: Graph<T>,
  startingNodeKey: T,
  searchDepth: number = null
): Node<T>[] => {
  const _visited: Map<T, boolean> = new Map();
  graph.nodes.map(node => _visited.set(node.key, false));

  const _startingNode: Node<T> = graph.findNode(startingNodeKey);
  const _q = new Q<Node<T>>();
  _q.enqueue(_startingNode);

  while (queueNotEmpty(_q)) {
    const currentNode = _q.dequeue();
    _visited.set(currentNode.key, true);

    currentNode.children
      .filter(
        childNode =>
          _visited.get(childNode.key) === false &&
          searchNextLevel(searchDepth, _q.size)
      )
      .map(childNode => _q.enqueue(childNode));
  }

  return graph.nodes.filter(node => _visited.get(node.key));
};
