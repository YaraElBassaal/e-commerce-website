import React from 'react'
import './Form.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  const schema = z.object({

    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password ≥ 8 chars, includes at least one [A-Z] and one[a-z] and one number'),
    email: z.string().email("Invalid email format"),
  })


  const { register, handleSubmit, formState: { errors } }= useForm({
    resolver: zodResolver(schema)
  })

  function save(e) {
    console.log(e)
    if(localStorage.getItem("data")){
      const data = JSON.parse(localStorage.getItem("data"))
      if(e.email == data.email && e.password == data.password){
        navigate("/")
      }else{
        alert("Invalid data!")
      }
    }
  }
  return (
    <>
        <div className='body'>
            <div className="form-container">
                <h2>🌸 Your Account 🌸</h2>
                <form onSubmit={handleSubmit(save)}>
                    
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} type="email" id="email" placeholder="Enter your email" />
                        {errors.email&& <small style={{color: 'red'}}>{errors.email.message}</small>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input {...register("password")} type="password" id="password" placeholder="Enter your password" />
                        {errors.password&& <small style={{color: 'red'}}>{errors.password.message}</small>}
                    </div>

                    <button type="submit" className="submit-btn">Login</button>
                    <p>Don't have account? <Link to={"/signup"}>Register</Link></p>
                </form>
            </div>
        </div>


    </>
  )
}

export default Login
