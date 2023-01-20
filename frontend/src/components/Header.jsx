import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import style from "../css/styles.css";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <>
            <div className="container">
                <nav>
                    <h1 className="logo">
                        <Link to="/">EzQuizy</Link>
                    </h1>
                    <ul>
                        {user ? (
                            <>
                                <li className="logo">
                                    <Link to="/chat">Chat</Link>
                                </li>
                                <li className="logo">
                                    <Link to="/exams">Exams</Link>
                                </li>
                                {user.role !== "student" ? (
                                    <>
                                        <li className="logo">
                                            <Link to="/add-exam">Add Exam</Link>
                                        </li>
                                        <li className="logo">
                                            <Link to="/users">Users</Link>
                                        </li>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                        <li className="logo">
                            <Link to="/about">About</Link>
                        </li>
                        {user ? (
                            <li>
                                <button
                                    onClick={onLogout}
                                    className="btn btn-block"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <FaSignInAlt /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <FaUser /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
}
