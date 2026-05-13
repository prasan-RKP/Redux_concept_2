import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authThunk.js';
import { TbLoader3 } from 'react-icons/tb';
import { toast } from 'sonner';

const ProfilePage = () => {

    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={"/signup"} replace />;
    }

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logout()).unwrap();
        } catch (err) {
            toast.error(err);
            console.log(err);
        }
    }, []);

    // Adding feature to test productsAPI
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const data = await res.json();
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();

    }, []);

    console.log(products);



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold shadow-lg">
                        {user.username.charAt(0).toUpperCase()}
                    </div>

                    <h1 className="text-3xl font-bold mt-4">
                        Welcome, {user.username} 👋
                    </h1>

                    <p className="text-slate-300 text-sm mt-1">
                        Your profile details
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-slate-300">Email</p>
                        <p className="font-semibold text-lg">{user.email}</p>
                    </div>

                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-slate-300">Contact</p>
                        <p className="font-semibold text-lg">{user.contact}</p>
                    </div>
                </div>

                <button onClick={handleLogout} className="w-full mt-8 bg-red-500 hover:bg-red-600 transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg">
                    {loading ? (
                        <TbLoader3 className="h-5 w-5 animate-spin" />
                    ) : (
                        "LogOut"
                    )}
                </button>
            </div>
        </div>
    )
}

export default ProfilePage;
