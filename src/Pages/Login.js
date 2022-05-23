import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

export default function Login({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    if (e != null) {
      setErrorMessage("");
    }
    setEmail(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/customer/authen", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["status"]["code"] === "200") {
          alert("เข้าสู่ระบบสำเร็จ");
          localStorage.setItem("token", result.data.token);
          window.location = "/";
        } else if (result["status"]["code"] === "401") {
          setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => console.log("error", error));
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
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="p-3">
            {errorMessage ? (
              <p className="text-danger text-center">{errorMessage}</p>
            ) : null}
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
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
                  <Form.Label className="col-sm-2 col-form-label">
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
              <a href="#" className="text-dark">
                ลืมรหัสผ่าน
              </a>
            </div>
            <div className="text-center">
              <button
                type="submit"
                style={{ width: "365px " }}
                className="btn btn-secondary mt-3"
              >
                <i className="bi bi-pencil-square"></i> เข้าสู่ระบบ
              </button>
            </div>
            <div className="pt-3 d-flex justify-content-between">
              <p>ยังไม่มีบัญชีผู้ใช้งาน</p>
              <a href="/register" className="text-dark">
                ลงทะเบียน
              </a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
