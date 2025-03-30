import React from 'react'
import './Form.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'


function Form() {
    
  const schema = z.object({

    user: z.string().min(5, 'must be more than 4').max(15, 'must be less than 16'),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password ≥ 8 chars, includes at least one [A-Z] and one[a-z] and one number'),
    email: z.string().email("Invalid email format"),
    confirmPassword: z.string(),
    city: z.string().min(1, "Please select an option")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


  const { register, handleSubmit, formState: { errors } }= useForm({
    resolver: zodResolver(schema)
  })

  function save(e) {
    console.log(e)
    localStorage.setItem("data", JSON.stringify(e))
    window.location.reload()
    window.location.href = "/login"
    
  }
  return (
    <>
        <div className='body'>
            <div className="form-container">
                <h2>🌸 Create an Account 🌸</h2>
                <form onSubmit={handleSubmit(save)}>
                    <div className="input-group">
                        <label htmlFor="username">Full Name</label>
                        <input {...register("user")} type="text" id="username" placeholder="Enter your username" />
                        {errors.user&& <small style={{color: 'red'}}>{errors.user.message}</small>}
                    </div>

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

                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input {...register("confirmPassword")} type="password" id="confirm-password" placeholder="Confirm your password" />
                        {errors.confirmPassword&& <small style={{color: 'red'}}>{errors.confirmPassword.message}</small>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="city">City</label>
                        <select {...register("city")} id="city">
                            <option value="">Select your city</option>
                            <option value="cairo">Cairo</option>
                            <option value="alexandria">Alexandria</option>
                            <option value="giza">Giza</option>
                            <option value="luxor">Luxor</option>
                            <option value="aswan">Aswan</option>
                        </select>
                        {errors.city&& <small style={{color: 'red'}}>{errors.city.message}</small>}
                    </div>

                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>


    </>
  )
}

export default Form
