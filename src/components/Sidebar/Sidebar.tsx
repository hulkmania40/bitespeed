import React, { Fragment, useState } from "react";
import styles from "./Sidebar.module.scss";
import { Input, Label } from "reactstrap";
import NodesPanel from "../NodesPanel/NodesPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

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
      <h2 className={styles.sidebar_title}>
        {props.nodesPanel ? (
          ""
        ) : (
          <FontAwesomeIcon
            className={classNames("mr-3",styles.sidebar_icon)}
            icon={faCircleLeft}
            onClick={props.toggleNodesPanel} // Toggle nodes panel on click
          />
        )}
        {props.nodesPanel ? "Nodes Panel" : "Settings Panel"}
      </h2>
      <ul className={styles.sidebar_menu}>
        {props.nodesPanel ? (
          <NodesPanel />
        ) : (<Fragment>
          <Label>Text</Label>
          <Input
            value={props.inputValue}
            onChange={(e) => props.updatedInputValue(e.target.value)}
          />
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
