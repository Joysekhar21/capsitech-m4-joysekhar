import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Field, Text } from '@fluentui/react-components';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      password: password,
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Name must contain only letters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('Signup values:', values);
    },
  });

  const handleSignUp = async(e)=>{
    e.preventDefault();
    if(!validateEmail){
      setError(formik.errors.email);
      return;
    }
    if(!password){
      setError(formik.errors.password)
      return;
    }
    setError("")
    //Signup api
    try {
      const response = await axiosInstance.post("/api/user/create-account",{
        name: name,
        email: email,
        password: password
      });
      
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

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
      <div className='flex items-center justify-center min-h-screen px-4 bg-gray-300 '>
        <div className='w-full max-w-md border rounded-lg bg-white px-7 py-10 shadow-lg'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl font-semibold mb-7 text-center text-gray-800'>Sign Up</h4>
            <Field label='Name' required>
              <Input
                placeholder='Enter your name'
                className='w-full mb-2'
                name='name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <Text className='text-red-500 text-sm'>{formik.errors.name}</Text>
              )}
            </Field>
            <Field label='Email' required>
              <Input
                placeholder='Enter your email'
                className='w-full mb-2'
                name='email'
                value={email}
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
                value={password}
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
            </Field>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <Button type='submit' appearance='primary' className='w-full text-sm p-3 my-3 font-semibold'>
              Create Account
            </Button>
            <p className='text-sm text-center mt-4 text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='font-medium text-[#2B85FF] underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;