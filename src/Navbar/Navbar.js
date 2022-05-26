import React, { useState, useEffect } from "react";
import axios from "axios";
import decode from "jwt-decode";
import Login from "../Pages/Login";
import Image from "react-bootstrap/Image";
import icon from "../Images/user-free-icon-font.png";
import profile from "../Images/profile.png";

export default function Navbar() {
  const API_URL = "http://localhost:8080/api/v1/customer/";

  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  
   useEffect(() => {
    if (token != null) {
      const decodedToken = decode(token);

      if ((decodedToken.exp * 1000) - 1200000 < new Date().getTime()) {
        axios
          .get(API_URL + "refresh-token", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.status.code === "200") {
              localStorage.setItem("token", response.data.data.token);
            } else if (response.data.status.code === "401") {
              localStorage.removeItem("token");
              window.location.reload();
            }
          })
          .catch((error) => console.log("error", error));
      }
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand navbar-dark bg-dark"
        style={{ height: "100px" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <a
              className="navbar-brand text-dark text-center bg-white"
              href="/"
              style={{ width: "180px", height: "39px" }}
            >
              <i className="bi bi-house" /> LOGO
            </a>
            <ul className="navbar-nav me-auto" style={{ fontSize: "20px" }}>
              <li className="nav-item nav-link fw-bold text-white" style={{ paddingLeft: "91px"}}>
                ซื้อรถยนต์
              </li>
              <li className="nav-item nav-link fw-bold text-white" style={{ paddingLeft: "111px"}}>
                ขายรถยนต์
              </li>
              <li className="nav-item nav-link fw-bold text-white" style={{ paddingLeft: "111px"}}>
                เกี่ยวกับเรา
              </li>
            </ul>
            {token ? (
              // Navbar with token
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item">
                  <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <Image
                      src={icon}
                      alt="nav-icon"
                      style={{ width: "23.15px", height: "25px" }}
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ width: "335px" }}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={profile}
                        alt="Avatar"
                        className="d-flex justify-content-center p-3 mb-2"
                        style={{ width: "134px", height: "131px" }}
                      />
                    </div>
                      <li>
                        <a className="dropdown-item ps-4" src="#">
                          ข้อมูลส่วนตัว
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item ps-4" src="#">
                          ตั้งค่าบัญชี
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <button className="dropdown-item ps-4" onClick={handleLogout}>
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
                    <Image
                      src={icon}
                      alt="nav-icon"
                      style={{ width: "23.15px", height: "25px" }}
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ width: "335px" }}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={profile}
                        alt="Avatar"
                        className="d-flex justify-content-center p-3 mb-2"
                        style={{ width: "134px", height: "131px" }}
                      />
                    </div>
                    <li>
                      <button
                        className="dropdown-item ps-4"
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
                      <a className="dropdown-item ps-4" href="/register">
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
