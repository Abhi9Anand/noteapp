import React, { useState} from 'react'
import notebookimg from '../notebook.png'
import { Link, useNavigate  } from 'react-router-dom'

const Login = (props) => {
    
const [credentials , setCredentials] = useState({email:"" , password:""});
const navigate = useNavigate();
const handleSubmit= async (e)=>{
e.preventDefault();
const response = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
     
    }, 
    body: JSON.stringify({email:credentials.email , password:credentials.password})
  });
  const json = await response.json();
  console.log({json});
  if(json.success){
    console.log("token", json.authToken )
    localStorage.setItem('token', json.authToken);
    navigate('/');
    // window.location.reload();
    props.showAlert("Logged in Successfully", "success");
    
}
else{
      props.showAlert("Invalid credentials", "danger");
    
  }


}
const onChange= (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
    
    return (
        <>
        <section >
            <div className="container mt-5 pt-5 ">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 m-auto">
                        <div className="card border-0 shadow ">
                            <div className="card-body">
                                <div className='d-flex justify-content-center  '>

                                <img style={{width: "50px" , height : "50px"}} src={notebookimg} alt="" />
                                </div>
                                <form onSubmit={handleSubmit} action=" ">
                                    <label htmlFor="email" className='form-label'>Email address</label>
                                    <input type="email" value={credentials.email} name='email' onChange={onChange} id = "email" className='form-control' />
                                    <div className='form-text'>We'll never share your email with anyone else</div>
                                    <label htmlFor="password" className='form-label'>Password</label>
                                    <input type="text" name='password' value={credentials.password}  onChange={onChange} id = "" className='form-control'/>
                                    <div className="text-center mt-3">
                                        <button className='btn mt-3' style={{ backgroundColor: " rgb(80 199 162)", color: "black" }} >Login</button>
                                        <Link className='nav-link mt-3' to="/signup">New to MyNoteBook ?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login
