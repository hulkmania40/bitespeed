import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";
import { SelectedNodeInterface } from "../../App";
import CustomNode from "../CustomNode/CustomNode";

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 100 },
    data: { label: "First" },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 200, y: 100 },
    data: { label: "Second" },
  },
];

const initialEdges = [{ id: "reactflow__edge-1-2", source: "1", target: "2" }];

interface NodesProps {
  selectedNode: (id: string, label: string) => void;
  updatedNode: SelectedNodeInterface | undefined;
  onEdgesChange: (edges: Edge[]) => void;
  currentNodes: (allNodes: Node[]) => void;
}

const Nodes = (props: NodesProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateNodeLabel = (
    nodes: Node[],
    updatedNode: SelectedNodeInterface
  ) => {
    return nodes.map((node) => {
      if (node.id === updatedNode.id) {
        return { ...node, data: { ...node.data, label: updatedNode.label } };
      }
      return node;
    });
  };

  useEffect(() => {
    props.onEdgesChange(edges); // Update edges in App whenever edges change
    props.currentNodes(nodes);
  }, [edges, nodes]);

  useEffect(() => {
    if (props.updatedNode) {
      const updatedNodes = updateNodeLabel(nodes, props.updatedNode);
      setNodes(updatedNodes);
    }
  }, [props.updatedNode]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      props.selectedNode(node.id, node.data.label);
    },
    [props]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        position,
        data: { label: `New Message` },
        type: "customNode",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      nodeTypes={nodeTypes}
    >
      <MiniMap position="bottom-left" />
      <Controls position="bottom-right" />
      <Background />
    </ReactFlow>
  );
};

export default Nodes;
