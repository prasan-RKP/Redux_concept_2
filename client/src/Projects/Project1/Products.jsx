import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TbLoader3, TbSearch, TbShoppingCart, TbStarFilled } from "react-icons/tb";
import { addCart } from '../../store/auth/authThunk.js'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Products = () => {

    const dispatch = useDispatch();
    const { cartLoading, cartError } = useSelector((state) => state.cart);

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cartId, setCartId] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state for products
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await fetch("https://dummyjson.com/products");
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch products: ${res.status}`);
                }
                
                const data = await res.json();
                setProducts(data.products);
                
            } catch (error) {
                console.log(error);
                setError(error.message || "Failed to load products");
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- Handle AddTo cart option ----
    const handleAddToCart = useCallback(async (data) => {
        if (!data) {
            toast.warning("Product not selected ❌");
            return;
        }

        try {
            let cartData = { 
                uid: data?.id, 
                desc: data?.description, 
                img: data?.images[0], 
                price: data.price, 
                qty: 1 
            }

            setCartId(data?.id);
            await dispatch(addCart(cartData)).unwrap();
            toast.success("Product added to cart! 🛒");
            setCartId(null); // Reset cart loading state after success
            
        } catch (error) {
            toast.error(error);
            console.log(error);
            setCartId(null); // Reset cart loading state on error
        }
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const navigate = useNavigate();

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <TbLoader3 className="h-12 w-12 animate-spin text-cyan-400 mx-auto mb-4" />
                    <p className="text-slate-300 text-lg">Loading amazing products...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-xl transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-10">
            {/* Heading */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Explore Products
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Discover premium collections with modern UI experience.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-[350px] flex justify-center gap-2">
                        <TbSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-md"
                        />
                        <button 
                            onClick={() => navigate("/addcart")} 
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-xl transition-all shadow-lg"
                        >
                            Cart 🛒
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-lg hover:scale-[1.02] transition-all duration-300 shadow-xl"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
                                />
                                {/* Discount Badge */}
                                <span className="absolute top-4 left-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {product.discountPercentage}% OFF
                                </span>
                            </div>

                            {/* Product Details */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-lg font-bold line-clamp-1">
                                        {product.title}
                                    </h2>
                                    <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-lg text-sm">
                                        <TbStarFilled size={14} fill="currentColor" />
                                        {product.rating}
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm mt-3 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Category */}
                                <div className="mt-4">
                                    <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-cyan-300">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mt-6">
                                    <div>
                                        <p className="text-2xl font-extrabold text-cyan-400">
                                            ₹{product.price}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Stock: {product.stock}
                                        </p>
                                    </div>

                                    {/* Add To Cart */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={cartLoading && cartId === product.id}
                                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {(cartLoading && cartId === product.id) ? (
                                            <TbLoader3 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <TbShoppingCart size={18} />
                                        )}
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Products */}
                {filteredProducts.length === 0 && !loading && (
                    <div className="flex items-center justify-center py-20">
                        <p className="text-slate-400 text-lg">
                            No products found for "{searchTerm}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;