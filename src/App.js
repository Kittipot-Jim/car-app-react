import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import Home from './Register/Home';
import Login from './Register/Login';

export default function App() {
    return (
        <Router>
        	<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}