import { Graph } from "./graph";
import { GraphEntities } from "./graph.entities";
import { searchBreadthFirst } from "./graph.search";
import Node = GraphEntities.Node;

const nodeFactory = <T>(key: T): Node<T> => {
  return { key, children: new Array<Node<T>>() };
};

const graphFactory = (
  numberOfNodes: number,
  isDirected: boolean
): Graph<number> => {
  const graph = new Graph<number>(isDirected);
  for (let i = 0; i < numberOfNodes; i++) {
    const node: Node<number> = nodeFactory(i);
    graph.addNode(node);
  }
  return graph;
};

const edgeFactory = (graph: Graph<number>) => {
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
};

describe("Non directed Graph search", () => {
  const nonDirectedGraph = graphFactory(4, false);
  edgeFactory(nonDirectedGraph);

  test("should return correct nodes for infinite depth", () => {
    const network: Node<number>[] = searchBreadthFirst(nonDirectedGraph, 0);

    expect(network).toContain(nonDirectedGraph.findNode(0));
    expect(network).toContain(nonDirectedGraph.findNode(1));
    expect(network).toContain(nonDirectedGraph.findNode(2));
    expect(network).toContain(nonDirectedGraph.findNode(3));
  });

  test.skip("should return correct nodes for 0 depth", () => {});

  test.skip("should return correct nodes for 1 depth", () => {});
});

xdescribe("Directed Graph search", () => {
  const directedGraph = new Graph(true);

  test("should return correct nodes for infinite depth", () => {});

  test("should return correct nodes for 0 depth", () => {});

  test("should return correct nodes for 1 depth", () => {});
});

describe("Direction Agnostic Tests", () => {
  test("should create a non directed graph by default", () => {});
  test("should create graph with complex data type", () => {
    type NodeWithData<T> = Node<T> & {
      accountNumber: number;
      transactions: Array<string>;
    };
    const complexNode1: NodeWithData<number> = {
      key: 0,
      children: [],
      accountNumber: 123,
      transactions: ["trx1", "trx2"]
    };
    const complexNode2: NodeWithData<number> = {
      key: 1,
      children: [],
      accountNumber: 456,
      transactions: ["trx3", "trx4"]
    };

    const graph = new Graph<number>();
    graph.addNode(complexNode1);
    graph.addNode(complexNode2);
    graph.addEdge(complexNode1.key, complexNode2.key);

    expect(graph.nodes.length).toBe(2);
    expect(graph.edges.length).toBe(1);
    expect(graph.findNode(complexNode1.key)).toBe(complexNode1);
    expect(graph.findNode(complexNode2.key)).toBe(complexNode2);
    const foundNode1 = <NodeWithData<number>>graph.findNode(complexNode1.key);
    expect(foundNode1.accountNumber).toBe(complexNode1.accountNumber);
    expect(foundNode1.transactions).toBe(complexNode1.transactions);
    const foundNode2 = <NodeWithData<number>>graph.findNode(complexNode2.key);
    expect(foundNode2.accountNumber).toBe(complexNode2.accountNumber);
    expect(foundNode2.transactions).toBe(complexNode2.transactions);
  });
});
