import { Link } from "react-router"
import { Button } from "./ui";
import { useAuthContext } from "../context/AuthProvider";

export default function NavBar() {
    const { user, logout } = useAuthContext();
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <Button variant="ghost" className="btn-circle" tabIndex={0} role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </Button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Homepage</a></li>
                        {
                            user ? (
                                <div>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/rooms/status">Room Status</Link></li>
                                    <li><Button onClick={logout}>Logout</Button></li>
                                </div>
                            ) : (
                                <li><Link to="/login">Login</Link></li>
                            )
                        }
                        {
                            user?.role == "admin" && (
                                <div>
                                    <li><Link to="/permissions">Permissions</Link></li>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Button variant="ghost" className="text-xl">daisyUI</Button>
            </div>
            <div className="navbar-end">
                <Button variant="ghost" className="btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </Button>
                <Button variant="ghost" className="btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Button>
            </div>
        </div>
    )
}