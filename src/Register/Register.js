import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CheckCircle , CheckCircleFill } from "react-bootstrap-icons";

export default function Register() {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const submitClick=(e)=>{
        e.preventDefault()
        fetch("http://localhost:8080/api/v1/customer/register",{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({email, password}
            )
        }).then(() => {
            console.log("register success");
        })
    }

    return(
        <div className="container mt-5 p-4 rounded bg-light">
            <h3>สร้างบัญชีผู้ใช้งาน</h3>
            <form>
                <Row>
                    <Col xs={12} md={8}>
                        <label className="col-sm-2 col-form-label">อีเมล์</label>
                        <input type="text" className="form-control" name="email" value={ email }
                                    onChange={(e)=>setEmail(e.target.value)} 
                                />
                        <label className="col-sm-2 col-form-label">รหัสผ่าน</label>
                        <input type="text" className="form-control" name="password" value={ password }
                                    onChange={(e)=>setPassword(e.target.value)} 
                                />
                        <label className="col-sm-2 col-form-label">ยืนยันรหัสผ่าน</label>
                        <input type="text" className="form-control" name="password_confirm" />
                    </Col>
                    <Col xs={6} md={4} style={{ alignItems: "center" }}>
                        <Row>
                            <Form.Text id="pasword_length" muted><CheckCircle size={15} /> ต้องมีความยาว 8-30 ตัวอักษร</Form.Text>
                            
                        </Row>
                        <Row>
                            <Form.Text id="pasword_alphabet" muted><CheckCircle size={15} /> ต้องประกอบด้วยอักษรภาษาอังกฤษตัวเล็กอย่างน้อย 1 ตัว และตัวใหญ่อย่างน้อย 1 ตัว</Form.Text>
                        </Row>
                        <Row>
                            <Form.Text id="pasword_number" muted><CheckCircle size={15} /> ต้องประกอบด้วยตัวเลขอย่างน้อย</Form.Text>
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
                    <button type="button" className="btn btn-secondary" onClick={submitClick}><i class="bi bi-pencil-square"></i> ลงทะเบียน</button>
                </div>
            </form>
        </div>
    )
}