import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const RegisterSubmit = { email, password };

    fetch("http://localhost:8080/api/v1/customer/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(RegisterSubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["status"]["code"] === "200") {
          alert("Login success.");
          window.location.href = "/";
        } else if (result["status"]["code"] === "500") {
          alert("Login failed.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container mt-5 p-4 rounded" style={{ width: "800px" }}>
      <h3>เข้าสู่ระบบ</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label className="col-sm-2 col-form-label">อีเมล</Form.Label>
              <Form.Control
                type="email"
                className="form-control mb-3"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
}
