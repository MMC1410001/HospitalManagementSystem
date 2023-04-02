import {
  Container,
  Toast,
  Button,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import ResetPasswordModal from "../components/passwordResetModal";
import useDate from "react-use-date";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdTaskAlt, MdUnpublished } from "react-icons/md";
import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router";
const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const { date, time, wish } = useDate();
  const [dataCorrectFlag, setDataCorrectFlag] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //to check if email exist
  const [uniqueEmail, setUniqueEmail] = useState("");
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectSecurityAnswerFlag,setIncorrectSecurityAnswerFlag]=useState(true);
  const [securityAnswerToggleFlag,setSecurityAnswerToggleFlag]= useState(false);
  // check if email is valid or not
  //check on server if email exists
  //to navigate to sign in page
  const navigate=useNavigate();
  const CheckForEmailDupicacyOnServer = () => {
    const body = {
      email,
    };
    const url = `${URL}/user/emailExists`;
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success"&&result.data=="DUPLICATE_EMAIL") {
        setSecurityAnswerToggleFlag(true)
        setUniqueEmail(result.data);
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
//check if security answer is correct
const checkSecurityAnswerOnServer=()=>{
 

  const body = {
    securityAnswer,
    email
  };
  const url = `${URL}/user/validateSecurityAnswer`;
  axios.post(url, body).then((res) => {
    const result = res.data;
    console.log(result);
    if (result.status == "success" && result.data=="VALID") {
     setIncorrectSecurityAnswerFlag(false)
     setDataCorrectFlag(true)
     toast.success("correct security answer")
    }else{
     
    }
  }).catch(err=>{
    navigate("/error");
});
}
  const changePassword = () => {
    const body = {
      securityAnswer,
      email,password
    };
    const url = `${URL}/user/updatePassword`;
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success" && result.data=="PASSWORD_CHANGED") {
        navigate("/");
       setIncorrectSecurityAnswerFlag(true)
       setDataCorrectFlag(false)
       toast.success("password changed")
      }else{
        toast.warning("password not changed")
      }
    }).catch(err=>{
      navigate("/error");
  });
  };

  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          {/* ===============================email===================================== */}
          <hr />
          <div style={{ border: "solid", borderRadius: "10px" }}>
            <div className="form-group needs-validation">
              <label className="form-label">
                <h4>Email</h4>
              </label>
              <input
                style={{ margin: "auto" }}
                onFocus={CheckForEmailDupicacyOnServer}
                onBlur={CheckForEmailDupicacyOnServer}
                onChange={(e) => {
                  setUniqueEmail("");
                  console.log(email);

                  setEmail(e.target.value);
                  CheckForEmailDupicacyOnServer();
                }}
                type="email"
                className="form-control"
              />
              {email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
              email.endsWith(".com") &&
              uniqueEmail == "DUPLICATE_EMAIL" ? (
                <div className=""> </div>
              ) : (
                <h6 className="emptyFieldWarning">*enter valid email</h6>
              )}
              {/* ======================checking if email is unique==== */}

              {uniqueEmail == "DUPLICATE_EMAIL" &&
              email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
              email.endsWith(".com") ? (
                <div>
                  <MdTaskAlt style={{ color: "green" }} />
                  <h6 style={{ color: "green" }}>available</h6>
                </div>
              ) : (
                <div></div>
              )}
              {/* ---------------------security answer-------------- */}
              {
                securityAnswerToggleFlag ?   <div>
                <label className="form-label">
                  <h4>security answer</h4>
                </label>
                <input
                onFocus={checkSecurityAnswerOnServer}
                onBlur={checkSecurityAnswerOnServer}
                  onChange={(e) => {
                    setSecurityAnswer(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="enter your pet name"
                  required
                />
                {securityAnswer == "" ? (
                  <h6 className="emptyFieldWarning">*answer cannot be empty</h6>
                ) : (
                  <div></div>
                )}

                {dataCorrectFlag ? (
                  <div>
                    <div className="form-group needs-validation">
                      <label className="form-label">password</label>
                      <input
                        
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        placeholder="enter password"
                        required
                      />
                      {password.length < 4 && incorrectSecurityAnswerFlag ? (
                        <h6 className="emptyFieldWarning">
                          *cannot be empty min length 4
                        </h6>
                      ) : (
                        <div style={{color:"green"}}>sucurity answer is correct</div>
                      )}
                    </div>
                  </div>
                ):<div></div>}
              </div>
              :<div></div>
                
              
              }
              
            </div>
            <div>
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => {
                  changePassword();
                }}
                variant="success"
                size="sm"
              >
                Submit
              </Button>
              <div style={{ marginTop: "10px" }}>
                <Link to="/">SignIn </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>

     
    </div>
  );
};
export default ResetPassword;
