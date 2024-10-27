import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { Input } from "reactstrap";
import NodesPanel from "../NodesPanel/NodesPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  updatedInputValue: (updatedVal: string) => void;
  inputValue: string;
  nodesPanel: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const [nodesPanelFlag, setNodesPanelFlag] = useState<boolean>(false);

  const nodesPanel = props.nodesPanel || nodesPanelFlag;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>
        {nodesPanel? (
          ""
        ) : (
          <FontAwesomeIcon icon={faCircleLeft} onClick={()=>{
            setNodesPanelFlag(!nodesPanelFlag)
          }}/>
        )}
        {nodesPanel ? "NodesPanel" : "Settings Panel"}
      </h2>
      <ul className={styles.menu}>
        {nodesPanel ? (
          <NodesPanel />
        ) : (
          <Input
            value={props.inputValue}
            onChange={(e) => props.updatedInputValue(e.target.value)}
          />
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
