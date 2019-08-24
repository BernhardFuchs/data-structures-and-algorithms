// TODO: add namespace and remove I-prefix
interface INode {
  key: string;
  children: Array<INode>;
}

export const nodeFactory = (key: string): INode => {
  return { key, children: new Array<INode>() };
};

interface IEdge {
  node1Key: string;
  node2Key: string;
}

export class Graph {
  private _nodes: Array<INode>;
  private _edges: Array<IEdge>;

  constructor(private isDirected: boolean = false) {
    this._nodes = new Array<INode>();
    this._edges = new Array<IEdge>();
  }

  public get nodes(): Array<INode> {
    return this._nodes;
  }

  public get edges(): Array<IEdge> {
    return this._edges;
  }

  public addNode(node: INode): void {
    this._nodes.push(node);
  }

  public findNode(key: string): INode {
    return this._nodes.find(n => n.key === key);
  }

  public addEdge(node1Key: string, node2Key: string) {
    const node1 = this.findNode(node1Key);
    const node2 = this.findNode(node2Key);

    node1.children.push(node2);

    if (!this.isDirected) {
      node2.children.push(node1);
    }

    this._edges.push({ node1Key, node2Key });
  }
}
