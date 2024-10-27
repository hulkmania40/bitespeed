import React, { useEffect, useState } from "react";
import styles from "./CustomNavbar.module.scss";
import { Button, Col, Row } from "reactstrap";
import classNames from "classnames";

interface CustomNavbarProps {
  onSave: () => void;
  submitMsg: boolean | null;
}
// This is a reusable component appearing on the top containing the Save Button
// which lets the User know whether the Chatbot flow can be saved or not
const CustomNavbar: React.FC<CustomNavbarProps> = ({
  onSave,
  submitMsg = null,
}) => {
  const [submitMessage, setSubmitMessage] = useState<boolean | null>(submitMsg);

  useEffect(() => {
    setSubmitMessage(submitMsg);
  }, [submitMsg]);

  return (
    <Row className={styles.navbar}>
      <Col md={10} className={styles.navbar_message}>
        {submitMessage != null && (
          <div
            className={classNames(
              styles.navbar_badge,
              submitMessage
                ? styles.navbar_badge_success
                : styles.navbar_badge_danger
            )}
          >
            {submitMessage ? "Flow Saved Successfully" : "Cannot Save Flow"}
          </div>
        )}
      </Col>
      <Col md={2} className={styles.navbar_button}>
        <Button onClick={onSave}>Save Changes</Button>
      </Col>
    </Row>
  );
};

export default CustomNavbar;
