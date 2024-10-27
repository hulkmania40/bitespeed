import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";
import { SelectedNodeInterface } from "../../App";

const initialNodes = [
  { id: "1", position: { x: 0, y: 100 }, data: { label: "First" } },
  { id: "2", position: { x: 0, y: 200 }, data: { label: "Second" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

interface NodesProps {
  selectedNode: (id: string, label: string) => void;
  updatedNode: SelectedNodeInterface | undefined;
}

const Nodes = (props: NodesProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateNodeLabel = (nodes: Node[], updatedNode: SelectedNodeInterface) => {
    return nodes.map((node) => {
      if (node.id === updatedNode.id) {
        return { ...node, data: { ...node.data, label: updatedNode.label } };
      }
      return node;
    });
  };

  useEffect(() => {

    if(props.updatedNode){
      const updatedNodes = updateNodeLabel(nodes, props.updatedNode);
      setNodes(updatedNodes);
    }
  }, [props.updatedNode])
  

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      props.selectedNode(node.id, node.data.label)
    },
    [setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
    >
      <MiniMap position="bottom-left" />
      <Controls position="bottom-right" />
      <Background />
    </ReactFlow>
  );
};

export default Nodes;
