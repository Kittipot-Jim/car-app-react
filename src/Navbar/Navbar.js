import React, { useState } from "react";
import Login from "../Pages/Login";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <a className="navbar-brand" href="/">
              <i className="bi bi-house" /> LOGO
            </a>
            <ul className="navbar-nav me-auto">
              <li className="nav-item nav-link">ซื้อรถยนต์</li>
              <li className="nav-item nav-link">ขายรถยนต์</li>
              <li className="nav-item nav-link">เกี่ยวกับเรา</li>
            </ul>
            {token ? (
              // Navbar with token
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item">
                  <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <i className="bi bi-person" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ width: "285px" }}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src="https://cdn-icons.flaticon.com/png/512/552/premium/552848.png?token=exp=1653040471~hmac=f46a1090cd8db821fc32e01961e06280"
                        alt="Avatar"
                        className="d-flex justify-content-center p-3"
                        style={{ width: "134px" }}
                      />
                    </div>
                    <li>
                      <a className="dropdown-item" src="#">
                        ข้อมูลส่วนตัว
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" src="#">
                        ตั้งค่าบัญชี
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              // Navbar without token
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item">
                  <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <i className="bi bi-person" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ width: "285px" }}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src="https://cdn-icons.flaticon.com/png/512/552/premium/552848.png?token=exp=1653040471~hmac=f46a1090cd8db821fc32e01961e06280"
                        alt="Avatar"
                        className="d-flex justify-content-center p-3"
                        style={{ width: "134px" }}
                      />
                    </div>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setIsOpen(true)}
                      >
                        เข้าสู่ระบบ
                      </button>
                      {isOpen && <Login setIsOpen={setIsOpen} />}
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/register">
                        สมัครสมาชิก
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
