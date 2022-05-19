import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CheckCircle, CheckCircleFill } from "react-bootstrap-icons";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordLength, setPasswordLength] = useState(false);
  const [containsNumbers, setContainsNumber] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);

  const btnStatus =
    passwordLength && containsNumbers && isUpperCase ? false : true;

  // check for numbers
  const checkForNumbers = (string) => {
    const matches = string.match(/\d+/g);
    setContainsNumber(matches != null ? true : false);
  };

  // check for uppercase
  const checkForUpperCase = (string) => {
    const matches = string.match(/[A-Z]/) && string.match(/[a-z]/);
    setIsUpperCase(matches != null ? true : false);
  };

  // handle change
  const handleChange = (e) => {
    const targetValue = e;
    checkForNumbers(targetValue);
    checkForUpperCase(targetValue);
    setPasswordLength(targetValue.length > 7 ? true : false);
    setPassword(targetValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const RegisterSubmit = { email, password };

    fetch("http://localhost:8080/api/v1/customer/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(RegisterSubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["status"]["code"] === "200") {
          alert("SUCCESS");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container mt-5 p-4 rounded">
      <h3>สร้างบัญชีผู้ใช้งาน</h3>
      <Form>
        <Row>
          <Col xs={12} md={8}>
            <Form.Group className="mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                อีเมล์
              </Form.Label>
              <Form.Control
                type="email"
                className="form-control mb-3"
                name="email"
                value={email}
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
                onChange={(e) => handleChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="col-sm-2 col-form-label">
                ยืนยันรหัสผ่าน
              </Form.Label>
              <Form.Control
                type="password"
                className="form-control mb-3"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col
            xs={6}
            md={4}
            className="pt-5 d-flex align-self-center flex-column"
          >
            <Row>
              <Form.Text id="pasword_length">
                <div className={passwordLength ? "text-success" : null}>
                  <CheckCircle size={15} /> ต้องมีความยาว 8-30 ตัวอักษร
                </div>
              </Form.Text>
            </Row>
            <Row>
              <Form.Text id="pasword_alphabet">
                <div className={isUpperCase ? "text-success" : null}>
                  <CheckCircle size={15} />
                  ต้องประกอบด้วยอักษรภาษาอังกฤษตัวเล็กอย่างน้อย 1 ตัว
                  และตัวใหญ่อย่างน้อย 1 ตัว
                </div>
              </Form.Text>
            </Row>
            <Row>
              <Form.Text id="pasword_number">
                <div className={containsNumbers ? "text-success" : null}>
                  <CheckCircle size={15} /> ต้องประกอบด้วยตัวเลขอย่างน้อย
                </div>
              </Form.Text>
            </Row>
          </Col>
        </Row>
        <Form.Group className="mb-3 p-3">
          <Form.Check
            type="checkbox"
            id="confirm_check"
            label="*ฉันได้อ่าน ข้อกำหนดและเงื่อนไข ทั้งหมดแล้ว ฉันเข้าใจและยอมรับ นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล"
          />
          <Form.Check
            type="checkbox"
            id="email_check"
            label="ฉันต้องการได้รับข่าวสารทางอีเมล"
          />
        </Form.Group>
        <div className="text-center">
          <button
            type="submit"
            disabled={btnStatus}
            className="btn btn-secondary"
            onSubmit={handleSubmit}
          >
            <i className="bi bi-pencil-square"></i> ลงทะเบียน
          </button>
        </div>
      </Form>
    </div>
  );
}
