import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Navbar() {
	return (
		<header>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container-fluid">
					<div className="collapse navbar-collapse">
                        <a className="navbar-brand" href="/">
                            <i className="bi bi-house"/> LOGO
                        </a>
						<ul className="navbar-nav me-auto">
                            <li className="nav-item nav-link">ซื้อรถยนต์</li>
							<li className="nav-item nav-link">ขายรถยนต์</li>
							<li className="nav-item nav-link">เกี่ยวกับเรา</li>
						</ul>
                        <ul className="navbar-nav d-flex flex-row">
							<li className="nav-item nav-link"><i className="bi bi-person" /></li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}
