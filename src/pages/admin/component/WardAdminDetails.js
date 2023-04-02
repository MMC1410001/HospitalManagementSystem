import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { URL } from "../../../config";

const WardAdminDetails = (props) => {
  const { ward, togleDataFlag } = props;
  const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  //to set defaults of axios header
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //delete ward on server
  const removeWard = () => {
    const url = `${URL}/ward/removeWard/${ward.wardId}`;
    axios
      .get(url)
      .then((res) => {
        const result = res.data;
        console.log(result);
        if (result.status == "success") {
          if(result.data == "WARD_REMOVED")
          toast.success("ward removed success");
          else 
          toast.warning("ward not removed");
        } else {
          toast.warning("ward not removed");
        }
      })
      .catch((err) => {
        navigate("/error");
      });
    togleDataFlag();
  };

  return (
    <tr>
      <td>{ward.type}</td>
      <td>{ward.maxCapacity}</td>
      <Button
        size="sm"
        variant="danger"
        onClick={removeWard}
        style={{ margin: "6px" }}
      >
        Remove
      </Button>
    </tr>
  );
};
export default WardAdminDetails;
