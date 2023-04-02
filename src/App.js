import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCorosol from "./components/corosol";
import FullScreen from "./components/fullscreenBackground";
import Header from "./components/header/Header";

import Admin from "./pages/AdminEmployeeDetails";
import PatientDetails from "./pages/pateintDetails";
import ReceptionistHome from "./pages/receptionist";
import ResetPassword from "./pages/resetPassword";
import SignIn from "./pages/signIn";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DoctorHome from "./pages/doctor/doctor";
import PatientDetailsDoctor from "./pages/doctor/component/PatientDetailsDoctor";
import PatientDetailsReception from "./components/patient/PatientDetailsReception";
import Accountant from "./pages/accountant/Accountant";
import PatientDetailsAccountant from "./pages/accountant/patientDetailsAccountant";
import ErrorHandle, { Error } from "./pages/errorHandling/ErrorHandle";
import InvalidPage from "./pages/errorHandling/InvalidPage";
function App() {
  // const {location}=useLocation()
  // console.log(location.pathname)

  return (
    <div style={{ width: "100%" }} className="appJS">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/createCorosol" element={<CreateCorosol />} />
          <Route path="/patientDetails" element={<PatientDetails />} />
          <Route path="/reception" element={<ReceptionistHome />} />
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/error" element={<ErrorHandle />} />

          <Route
            path="/doctor/patientDetails"
            element={<PatientDetailsDoctor />}
          />
          <Route
            path="/reception/patientDetails"
            element={<PatientDetailsReception />}
          />
          <Route
            path="/accountant/patientDetails"
            element={<PatientDetailsAccountant />}
          />
          <Route path='*' element={<InvalidPage/>} />
        </Routes>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </div>
  );
}

export default App;
