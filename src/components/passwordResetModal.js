import { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const ResetPasswordModal = (props) => {
  const { show, setShow, handleClose, handleShow } = props;
 const [badge,setBagde]=useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ValidatePassword = () => {
    if (password != "" && password == confirmPassword) {
      toast.success("password matched", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      
      setBagde(true)
      toast.warning("password did not match to confirm password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  /**==================================================================== */
  return (
    <div className="">
      {/* <Button variant="primary" onClick={handleShow}>
      Launch static backdrop modal
    </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group needs-validation">
            <label className="form-label">Enter Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="confirm password"
            />
            
          </div>
          <div className="form-group needs-validation">
            <label className="form-label">Confirm Password</label>
            <input
              onChange={(e) => {
                setBagde(false)
                setConfirmPassword(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="confirm password"
            />
             { badge &&  <div><Badge bg="danger">password mismatch</Badge> <Badge bg="light" text="dark"></Badge></div> }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button size="sm" variant="warning" onClick={handleClose}>
              Go back
            </Button>
          </div>

          <Button size="sm" variant="success" onClick={ValidatePassword}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ResetPasswordModal;
