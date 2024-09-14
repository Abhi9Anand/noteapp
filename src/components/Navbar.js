import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import notebookimg from '../notebook.png'

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState('');
  const [user, setUser] = useState({});

  const handleUser = async () => {
    const response = await fetch(`http://localhost:5000/auth/getuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      // body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log({ json });
    if (json.success) {
      console.log("user", json.user)
      setUser(json.user)
    }
  }

  useEffect(() => {
    console.log("localstorage", localStorage.getItem('token'))
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
      handleUser();
      console.log({ isLogin })
    } else {
      setIsLogin(false);
    }
  }, [navigate])



  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate('/login');
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={notebookimg} alt="notebook" width="40" height="38" />
          </Link>
          <Link className="navbar-brand" to="/">MyNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {
              isLogin && user ?
                <div className='d-flex align-items-center gap-4'>
                  <div className='d-flex flex-column text-center'>
                    <span>{user.name} </span>
                    <span>{user.email} </span>
                  </div>
                   <span onClick={handleLogout} className="btn  mx-2" style={{ backgroundColor: " rgb(80 199 162)", color: "black" }}>Logout</span>
                </div>
                : (
                  <form className="d-flex  "  >
                    <Link className="btn  mx-2" style={{ backgroundColor: " rgb(80 199 162)", color: "black" }} to="/login" role="button">Login</Link>
                    <Link className="btn  mx-2" style={{ backgroundColor: " rgb(80 199 162)", color: "black" }} to="/signup" role="button">SignUp</Link>
                  </form>
                )
            }
          </div>
        </div>
      </nav>
    </>
  )
}
