import { Container } from "reactstrap";
import "./App.css";
import Nodes from "./components/Nodes/Nodes";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import { Fragment } from "react/jsx-runtime";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

export interface SelectedNodeInterface {
  id: string;
  label: string;
}

function App() {

  const [selectedNode, setSelectedNode] = useState<SelectedNodeInterface>();

  return (
    <Fragment>
      <CustomNavbar />
      <Container fluid className="flow_container">
        <Nodes
          selectedNode={(id: string, label: string) => {
            setSelectedNode({ id, label })
          }}
          updatedNode={selectedNode}
        />
      </Container>
      <Sidebar
        updatedInputValue={(updatedVal: string) => {
          console.log(updatedVal)
          setSelectedNode({ id: selectedNode?.id || "", label: updatedVal })
        }}
        inputValue={selectedNode?.label || ""}
        nodesPanel={!(!!selectedNode)}
      />
    </Fragment>
  );
}

export default App;
