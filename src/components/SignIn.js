import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignIn(){
    let navigate = useNavigate()
    let handleSignin = async(e)=>{
        e.preventDefault()
        //console.log(e)
        // console.log(e.target)
        // console.log(e.target.name)
        //console.log(e.target.name.value) // its writen input value in console
        let data ={
            email:e.target.email.value,
            password:e.target.password.value,
        }
        //console.log(data)

        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`,data)
            if(res.status===200)
            {
                toast.success(res.data.message)
                sessionStorage.setItem('token',res.data.token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error || error.response.data.message )
        }
    }
    return <div className='container'>
    <h1 className='title'>Sign In</h1>
    <div className='signup-wraper'> 
        <Form onSubmit={handleSignin}>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password"/>
            </Form.Group>
            <div className='button-sty'>
            <Button variant="primary" type="submit">SignIn</Button>
            &nbsp;
            &nbsp;
            <Button variant="primary" type="submit" onClick={()=>navigate("/sign-up")}>SignUp</Button>
            </div>
        </Form>
    </div>
</div>
}

export default SignIn