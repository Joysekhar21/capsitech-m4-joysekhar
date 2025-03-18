import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { Input, Button, Field, Text } from '@fluentui/react-components';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('Login values:', values);
    },
  });

  const handleLogin= async(e)=>{
    e.preventDefault();
    if(!validateEmail){
      setError(formik.errors.email);
      return;
    }
    if(!password){
      setError(formik.errors.password);
      return;
    }
    setError("")
    //Login Api
    try {
      const response = await axiosInstance.post("/api/user/login",{
        email: email,
        password: password
      });
      
      if(response.data && response.data.token){
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An Unexpected Error ,Please Try Later")
      }
    }
  }
  

  return (
    <>
      
      <div className='flex items-center justify-center min-h-screen px-4 bg-gray-300'>
        <div className='w-full max-w-md border rounded-lg bg-white px-7 py-10 shadow-lg'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl font-semibold mb-7 text-center text-gray-800'>Login</h4>
            <Field label='Email' required>
              <Input
                placeholder='Enter your email'
                className='w-full mb-2'
                name='email'
                value={formik.values.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <Text className='text-red-500 text-sm'>{formik.errors.email}</Text>
              )}
            </Field>
            <Field label='Password' required>
              <PasswordInput
                value={formik.values.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                name='password'
                placeholder='Enter your password'
              />
              {formik.touched.password && formik.errors.password && (
                <Text className='text-red-500 text-sm'>{formik.errors.password}</Text>
              )}
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            </Field>
            <Button type='submit' appearance='primary' className='w-full text-sm p-3 my-3 font-semibold'>
              Login
            </Button>
            <p className='text-sm text-center mt-4 text-gray-600'>
              Not registered yet?{' '}
              <Link to='/signUp' className='font-medium text-[#2B85FF] underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
