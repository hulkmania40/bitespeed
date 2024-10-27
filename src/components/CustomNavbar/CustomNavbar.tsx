import React from 'react';
import styles from './CustomNavbar.module.scss';
import { Button } from 'reactstrap';

interface CustomNavbarProps {
  onSave: () => void;
}
// This is a reusable component appearing on the top containing the Save Button
// which lets the User know whether the Chatbot flow can be saved or not 
const CustomNavbar: React.FC<CustomNavbarProps> = ({ onSave }) => {
  return (
    <div className={styles.navbar}>
      This is custom navbar
      <Button className={styles.saveButton} onClick={onSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default CustomNavbar;
