import { useState, Fragment, useEffect } from "react";
import { Container } from "reactstrap";
import "./App.css";
import Nodes from "./components/Nodes/Nodes";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Edge, Node } from "reactflow";

export interface SelectedNodeInterface {
  id: string;
  label: string;
}

function App() {
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInterface>();
  const [showNodesPanel, setShowNodesPanel] = useState<boolean>(true);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [submitMsg, setSubmitMsg] = useState<boolean | null>(null);

  // Resets the onSubmit message wheneevr any side change happens
  useEffect(() => {
    setSubmitMsg(null)
  }, [selectedNode,showNodesPanel,edges,allNodes])
  

  // If all the nodes are either in the source/target of the edge then that node is connected, else it's not
  function areAllNodesConnected(nodes: Node[], edges: Edge[]): boolean {
    const nodeIds = new Set(nodes.map((node) => node.id));

    const connectedIds = new Set<string>();
    edges.forEach((edge) => {
      connectedIds.add(edge.source);
      connectedIds.add(edge.target);
    });

    return Array.from(nodeIds).every((id) => connectedIds.has(id));
  }

  const handleSave = () => {
    const flag = areAllNodesConnected(allNodes, edges);
    setSubmitMsg(flag)
  };

  return (
    <Fragment>
      <CustomNavbar onSave={handleSave} submitMsg={submitMsg}/>
      <Container fluid className="flow_container">
        <Nodes
          selectedNode={(id: string, label: string) => {
            setSelectedNode({ id, label });
            setShowNodesPanel(false);
          }}
          updatedNode={selectedNode}
          onEdgesChange={(newEdges: Edge[]) => {
            console.log(newEdges);
            setEdges(newEdges);
          }}
          currentNodes={(allNodes: Node[]) => {
            setAllNodes(allNodes);
          }}
        />
      </Container>
      <Sidebar
        updatedInputValue={(updatedVal: string) => {
          setSelectedNode({ id: selectedNode?.id || "", label: updatedVal });
        }}
        inputValue={selectedNode?.label || ""}
        nodesPanel={showNodesPanel}
        toggleNodesPanel={() => setShowNodesPanel(!showNodesPanel)}
      />
    </Fragment>
  );
}

export default App;
