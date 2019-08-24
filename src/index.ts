import { Graph, nodeFactory } from "./graph";

const graph = new Graph();
const NODE_AMOUNT = 2;
const NUMBER_OF_EDGES = 40;
let DUPLICATES = 0;

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
