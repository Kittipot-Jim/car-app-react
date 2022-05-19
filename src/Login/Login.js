import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
    return (
        <div className="container mt-5 p-3 rounded bg-light">
            <h3>สร้างบัญชีผู้ใช้งาน</h3>
            <form>
                <label class="col-sm-2 col-form-label">อีเมล์</label>
                <input className='form-control'></input>
                <label class="col-sm-2 col-form-label">รหัสผ่าน</label>
                <input className='form-control'></input>
            </form>
        </div>
    )
}