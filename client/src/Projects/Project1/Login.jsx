import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authThunk";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();

    // Handle Input Change
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    }, []);

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = formData;
        if (!username || !password) {
            alert("Fill your all credentials");
            return;
        }

        try {
            await dispatch(login(formData)).unwrap();
            alert("Login SuccessFul");
            setFormData({
                username: "",
                password: ""
            })
        } catch (error) {
             console.log(error);
             alert(error?.message);
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-4">

            <form
                onSubmit={handleLogin}
                className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl"
            >

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back
                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
                    >
                        Login
                    </button>

                </div>

            </form>

        </div>
    );
};

export default Login;