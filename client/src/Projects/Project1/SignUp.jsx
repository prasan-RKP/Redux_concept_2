import React, { useCallback, useState } from 'react'
import { signup } from '../../store/auth/authThunk';
import { useDispatch } from 'react-redux';

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: ""
  });

  const dispatch = useDispatch();

  // Handle Input Change
  const handleInputChange = useCallback((e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  }, []);

  // Handle Signup
  const handleSignUp = async (e) => {
    e.preventDefault();

    const { username, email, contact, password } = formData;

    if (!username || !email || !contact || !password) {
      alert("Please fill your all credentials");
      return;
    }

    try {
      await dispatch(signup(formData)).unwrap();
      alert("SignUp successful");
      setFormData({
        username: "",
        email: "",
        contact: "",
        password: ""
      })
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (

    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4'>

      <form
        onSubmit={handleSignUp}
        className='bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl'
      >

        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Create Account
        </h2>

        <div className='space-y-4'>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500'
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500'
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500'
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500'
          />

          <button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg'
          >
            Register
          </button>

        </div>

      </form>

    </div>
  )
}

export default SignUp;