import { Graph } from "./graph";
import { search } from "./graph.search";
import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;

const graph = new Graph(true);
const NODE_AMOUNT = 20;
const NUMBER_OF_EDGES = 40;
let DUPLICATES = 0;

const nodeFactory = <T>(key: T): Node<T> => {
  return { key, children: new Array<Node<T>>() };
};

for (let i = 0; i < NODE_AMOUNT; i++) {
  const node = nodeFactory(`x0${i}`);
  graph.addNode(node);
}

const createRandomKeys = (): { key1: number; key2: number } => {
  let key1: number;
  let key2: number;
  do {
    DUPLICATES++;
    key1 = Math.floor(Math.random() * NODE_AMOUNT);
    key2 = Math.floor(Math.random() * NODE_AMOUNT);
  } while (key1 === key2);
  return { key1, key2 };
};

const randomEdges = (numberOfEdges: number = NODE_AMOUNT): void => {
  for (let i = 0; i < numberOfEdges; i++) {
    const { key1, key2 } = createRandomKeys();
    graph.addEdge(`x0${key1}`, `x0${key2}`);
  }
};

randomEdges(NUMBER_OF_EDGES);
console.log(graph.nodes);
console.log(graph.edges);
console.log("Duplicate keys: ", DUPLICATES - NUMBER_OF_EDGES);

const parentNode = "x012";
const searchDepth = 2;
const foundNodes = search(graph, parentNode, { level: searchDepth });

console.log("Network size ", foundNodes.length);
console.log("Found network for ", parentNode);
foundNodes.forEach(childNode => {
  console.log("Network member", childNode);
});
