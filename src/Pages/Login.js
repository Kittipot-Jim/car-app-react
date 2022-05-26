import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export default function Login({ setIsOpen }) {
  const API_URL = "http://localhost:8080/api/v1/customer/"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleAlert = () => {
    setAlertSuccess(true);
  };

  const handleChange = (e) => {
    if (e != null) {
      setErrorMessage("");
    }
    setEmail(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API_URL + "authen", {
      email, password
    })
    .then((response) => {
      if (response.data.status.code === "200") {
        handleAlert();
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      }
    })
    .catch((error) => {
      if (error.response.data.status.code === "401") {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        setEmail("");
        setPassword("");
        console.log("error", error);
      }
    });


    // fetch(API_URL + "authen", {
    //   method: "POST",
    //   headers: { "content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result["status"]["code"] === "200") {
    //       handleAlert();
    //       localStorage.setItem("token", result.data.token);
    //       window.location = "/";
    //     } else if (result["status"]["code"] === "401") {
    //       setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    //       setEmail("");
    //       setPassword("");
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    // Modal
    <>
      <Modal
        size="lg"
        centered
        show={setIsOpen}
        onHide={() => setIsOpen(false)}
      >
        <Modal.Body>
        <Modal.Title className="pt-3 pb-4 ps-5" style={{fontSize:'18px'}}>เข้าสู่ระบบ</Modal.Title>
          <Form onSubmit={handleSubmit} className="ps-5 pe-5">
            {alertSuccess ? (
              <Alert variant="success" style={{fontSize:'14px'}}>เข้าสู่ระบบสำเร็จ</Alert>
            ) : null}
            {errorMessage ? (
              <p className="text-danger text-center" style={{fontSize:'14px'}}>{errorMessage}</p>
            ) : null}
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="col-sm-2 col-form-label" style={{fontSize:'18px'}}>
                    อีเมล
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="form-control mb-3"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="col-sm-4 col-form-label" style={{fontSize:'18px'}}>
                    รหัสผ่าน
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex f-start">
              <a href="#" className="text-dark" style={{fontSize:'14px'}}>
                ลืมรหัสผ่าน
              </a>
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                style={{ width: "365px ", backgroundColor: "#9F8F7C", fontSize:'16px' }}
                className="btn fw-bold text-white"
              >
                เข้าสู่ระบบ
              </button>
            </div>
            <div className="pt-3 d-flex justify-content-between" style={{fontSize:'14px'}}>
              <p>ยังไม่มีบัญชีผู้ใช้งาน</p>
              <a href="/register" className="text-dark" style={{fontSize:'14px'}}>
                ลงทะเบียน
              </a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
