import React from "react";
import styles from "./NodesPanel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

// This componenet is used to add a new message node
// Can be extended too to support further modifications in future
const NodesPanel = () => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("application/reactflow", "default");
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.nodesPanel}>
      <div
        className={styles.draggableNode}
        onDragStart={handleDragStart}
        draggable
      >
        <FontAwesomeIcon icon={faMessage} />
        <span>Message</span>
      </div>
    </div>
  );
};

export default NodesPanel;
