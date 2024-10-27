import { Handle, Position, NodeProps } from "reactflow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CustomNode.module.scss";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const CustomNode = (props: NodeProps) => {
  return (
    <div className={styles.custom_node}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <div className={styles.custom_node_common_top}>
        <FontAwesomeIcon icon={faMessage} className="mr-3" />
        Send Message
      </div>
      <div>
        <span className={styles.custom_node_label}>{props.data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default CustomNode;
