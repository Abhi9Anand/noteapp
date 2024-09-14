import React, { useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';

import notebookimg from '../notebook.png'


const Signup = (props) => {
  const [credentials , setCredentials] = useState({name: "", email:"" , password:"", Cpassword:""});
  const navigate = useNavigate();
  const handleSubmit= async (e)=>{
  e.preventDefault();
  const {name , email , password} = credentials;
  const response = await fetch(`http://localhost:5000/auth/createuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
       
      }, 
      body: JSON.stringify({name , email , password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authToken);
      navigate('/')
      props.showAlert("Account created Successfully", "success");
    }
    else{
      props.showAlert("Invalid Credentials" , "danger")
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
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input type="text"  name='name'  id = "name" onChange={onChange} className='form-control' />

                                    <label htmlFor="email" className='form-label'>Email address</label>
                                    <input type="email"  name='email'  id = "email"onChange={onChange} className='form-control' />

                                    <div className='form-text'>We'll never share your email with anyone else</div>

                                    <label htmlFor="password" className='form-label'>Create Password</label>
                                    <input type="password" name='password'   id = "" onChange={onChange} minLength={5} required className='form-control'/>
                                    <label htmlFor="Cpassword" className='form-label'> Confirm Password</label>
                                    <input type="password" name='Cpassword'   id = "" onChange={onChange} minLength={5} required className='form-control'/>
                                    <div className="text-center mt-3">
                                        <button className='btn mt-3' style={{ backgroundColor: " rgb(80 199 162)", color: "black" }} >Sign Up</button>
                                        <Link className='nav-link mt-3' to="/login">Already have an account ?</Link>
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

export default Signup
