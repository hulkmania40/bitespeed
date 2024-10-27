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
  toggleNodesPanel: () => void;
}

// This componenet controls what needs to be displayed 
// when a Node is selected and when it isn't
const Sidebar = (props: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>
        {props.nodesPanel ? (
          ""
        ) : (
          <FontAwesomeIcon
            icon={faCircleLeft}
            onClick={props.toggleNodesPanel} // Toggle nodes panel on click
          />
        )}
        {props.nodesPanel ? "Nodes Panel" : "Settings Panel"}
      </h2>
      <ul className={styles.menu}>
        {props.nodesPanel ? (
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
