import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authThunk";
import { TbLoader3 } from "react-icons/tb";
import {toast} from 'sonner';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

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

        const { email, password } = formData;
        if (!email || !password) {
            toast.warning("Fill your all credentials");
            return;
        }

        try {
            await dispatch(login(formData)).unwrap();
            toast.success("Login SuccessFul");
            setFormData({
                email: "",
                password: ""
            });
            navigate("/profile");

        } catch (error) {
            console.log(error);
            toast.error(error?.message);
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
                        type="email"
                        name="email"
                        placeholder="John Doe@gmail.com"
                        value={formData.email}
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
                        className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg flex justify-center items-center"
                    >
                        {loading ? (
                            <TbLoader3 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default Login;