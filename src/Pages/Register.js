import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { CheckCircle, CheckCircleFill } from "react-bootstrap-icons";

export default function Register() {
  const API_URL = "http://localhost:8080/api/v1/customer/";

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordLength, setPasswordLength] = useState(false);
  const [containsNumbers, setContainsNumber] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);

  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleAlertSuccess = () => {
    setAlertSuccess(true);
  };

  const handleAlertError = () => {
    setAlertError(true);
  };

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
    setPasswordConfirm("");
  };

  // check confirm password
  const handleChangePasswordConfirm = (e) => {
    const targetValue = e;
    if (targetValue !== password)
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
    else {
      setErrorMessage("");
    }
    setPasswordConfirm(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL + "register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password, passwordConfirm }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["status"]["code"] === "200") {
          handleAlertSuccess();
          window.location.href = "/";
        } else if (result["status"]["code"] === "500") {
          handleAlertError();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div
        className="container bg-form-register p-5"
        style={{ marginTop: "100px" }}
      >
        {alertSuccess ? (
          <Alert variant="success">สมัครสมาชิกสำเร็จ</Alert>
        ) : null}
        {alertError ? (
          <Alert
            variant="danger"
            onClose={() => setAlertError(false)}
            dismissible
          >
            อีเมลนี้มีอยู่ในระบบแล้ว หรือ รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน
          </Alert>
        ) : null}
        <h5 className="fw-bold pb-3" style={{ fontSize: "20px" }}>
          สร้างบัญชีผู้ใช้งาน
        </h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={8} md={9}>
              <Form.Group className="mb-3">
                <Form.Label
                  className="col-sm-2 col-form-label"
                  style={{ fontSize: "18px" }}
                >
                  อีเมล<span className="text-danger">*</span>
                </Form.Label>
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
                <Form.Label
                  className="col-sm-2 col-form-label"
                  style={{ fontSize: "18px" }}
                >
                  รหัสผ่าน<span className="text-danger">*</span>
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
                <Form.Label
                  className="col-sm-3 col-form-label"
                  style={{ fontSize: "18px" }}
                >
                  ยืนยันรหัสผ่าน<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  className="form-control mb-3"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  required
                  onChange={(e) => handleChangePasswordConfirm(e.target.value)}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : (
                  <br />
                )}
              </Form.Group>
            </Col>
            <Col
              xs={4}
              md={3}
              className="pt-5 d-flex align-self-center flex-column"
            >
              <Row>
                <Form.Text id="pasword_length">
                  <div
                    className={passwordLength ? "text-dark" : null}
                    style={{ fontSize: "12px" }}
                  >
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
                  <div
                    className={isUpperCase ? "text-dark" : null}
                    style={{ fontSize: "12px" }}
                  >
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
                  <div
                    className={containsNumbers ? "text-dark" : null}
                    style={{ fontSize: "12px" }}
                  >
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
          <Form.Group className="mb-3">
            <Form.Text id="pasword_length">
              <Form.Check className="pb-3">
                <Form.Check.Input type="checkbox" id="confirm_check" required />
                <Form.Check.Label
                  style={{ fontSize: "16px", color: "#000000" }}
                >
                  <span className="text-danger">*</span>ฉันได้อ่าน <a href="#" className="text-dark">ข้อกำหนดและเงื่อนไข</a> ทั้งหมดแล้ว ฉันเข้าใจและยอมรับ <a href="#" className="text-dark">นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล</a>
                </Form.Check.Label>
              </Form.Check>
            </Form.Text>
            <Form.Check
              type="checkbox"
              id="email_check"
              style={{ fontSize: "16px" }}
              label="ฉันต้องการได้รับข่าวสารทางอีเมล"
            />
          </Form.Group>
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={btnStatus}
              style={{
                width: "365px ",
                backgroundColor: "#9F8F7C",
                fontSize: "16px",
              }}
              className="btn fw-bold text-white mb-4"
            >
              ลงทะเบียน
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
