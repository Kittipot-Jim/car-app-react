export default function Navbar() {
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
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                  <i className="bi bi-person" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <img src="../Images/user-free-icon-font.png" alt="Avatar" />
                  <li>
                    <button className="dropdown-item" type="button">
                      ข้อมูลส่วนตัว
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      ตั้งค่าบัญชี
                    </button>
                  </li>
                  <li>
                    <div className="dropdown-divider"></div>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
