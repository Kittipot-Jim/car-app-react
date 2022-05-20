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
    setPasswordLength(
      targetValue.length > 7 && targetValue.length <= 30 ? true : false
    );
    setPassword(e);
  };

  // check confirm password
  const handleChangePasswordConfirm = (e) => {
    const targetValue = e;
    if (targetValue !== password)
      setErrorMessage("Password and Confirm Password does not match.");
    else {
      setErrorMessage("");
    }
    setPasswordConfirm(e);
  };

  const handleSubmit = (e) => {
    if (password !== passwordConfirm) {
      alert("Password and Confirm Password does not match.");
    }
    e.preventDefault();
    const RegisterSubmit = { email, password, passwordConfirm };
    console.log(passwordConfirm);

    fetch("http://localhost:8080/api/v1/customer/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(RegisterSubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["status"]["code"] === "200") {
          alert("Register success.");
          window.location.href = "/";
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container mt-5 p-4 rounded">
      <h3>สร้างบัญชีผู้ใช้งาน</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={8}>
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
                required
                onChange={(e) => handleChangePasswordConfirm(e.target.value)}
              />
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
            </Form.Group>
          </Col>
          <Col
            xs={6}
            md={4}
            className="pt-5 d-flex align-self-center flex-column"
          >
            <Row>
              <Form.Text id="pasword_length">
                <div className={passwordLength ? "text-dark" : null}>
                  {passwordLength ? (
                    <CheckCircleFill size={15} className="text-dark" />
                  ) : (
                    <CheckCircle size={15} />
                  )}
                  <span> ต้องมีความยาว 8-30 ตัวอักษร</span>
                </div>
              </Form.Text>
            </Row>
            <Row>
              <Form.Text id="pasword_alphabet">
                <div className={isUpperCase ? "text-dark" : null}>
                  {isUpperCase ? (
                    <CheckCircleFill size={15} className="text-dark" />
                  ) : (
                    <CheckCircle size={15} />
                  )}
                  <span>
                    {" "}
                    ต้องประกอบด้วยอักษรภาษาอังกฤษตัวเล็กอย่างน้อย 1
                    ตัวและตัวใหญ่อย่างน้อย 1 ตัว
                  </span>
                </div>
              </Form.Text>
            </Row>
            <Row>
              <Form.Text id="pasword_number">
                <div className={containsNumbers ? "text-dark" : null}>
                  {containsNumbers ? (
                    <CheckCircleFill size={15} className="text-dark" />
                  ) : (
                    <CheckCircle size={15} />
                  )}
                  <span> ต้องประกอบด้วยตัวเลขอย่างน้อย</span>
                </div>
              </Form.Text>
            </Row>
          </Col>
        </Row>
        <Form.Group className="mb-3 p-3">
          <Form.Check
            type="checkbox"
            id="confirm_check"
            required
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
            style={{ width: "365px " }}
            className="btn btn-secondary"
          >
            <i className="bi bi-pencil-square"></i> ลงทะเบียน
          </button>
        </div>
      </Form>
    </div>
  );
}
