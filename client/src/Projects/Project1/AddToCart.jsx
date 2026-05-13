import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from '../../store/auth/authThunk.js';
import { toast } from "sonner";
import { TbLoader3, TbMinus, TbPlus, TbShoppingBag, TbTrash } from "react-icons/tb";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { carts, cartLoading, cartError } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        await dispatch(fetchCart()).unwrap();
      } catch (error) {
        console.error("Failed to load cart:", error);
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [dispatch]);

  // Show loading state
  if (loading || cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <TbLoader3 className="h-12 w-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (cartError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Cart</h2>
          <p className="text-slate-400 mb-6">{cartError}</p>
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

  // Check if carts is empty
  if (!carts || carts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-cyan-500 p-3 rounded-2xl shadow-lg">
              <ShoppingBag className="text-black" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold">Your Cart</h1>
              <p className="text-slate-400 mt-1">Review your selected products</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={80} className="text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some products to your cart to see them here</p>
            <button 
              onClick={() => window.location.href = '/products'} 
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log(carts);

  const totalAmount = carts.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-cyan-500 p-3 rounded-2xl shadow-lg">
            <TbShoppingBag className="text-black" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">Your Cart</h1>
            <p className="text-slate-400 mt-1">
              Review your selected products ({carts.length} items)
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
            {carts.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-5 shadow-xl flex flex-col md:flex-row gap-5"
              >
                {/* Product Image */}
                <div className="w-full md:w-[220px] h-[220px] rounded-2xl overflow-hidden bg-white/5">
                  <img
                    src={item.image || item.img || '/placeholder-image.jpg'}
                    alt={item.title || item.desc || 'Product'}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-bold">
                        {item.title || item.desc || 'Product'}
                      </h2>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-xl transition-all duration-300"
                      >
                        <TbTrash size={20} />
                      </button>
                    </div>
                    <p className="text-slate-400 mt-4 leading-relaxed">
                      {item.description || 'No description available'}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-6">
                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all duration-300"
                      >
                        <TbMinus size={18} />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">
                        {item.quantity || 1}
                      </span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black p-2 rounded-xl transition-all duration-300"
                      >
                        <TbPlus size={18} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Total Price</p>
                      <h3 className="text-3xl font-extrabold text-cyan-400">
                        ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl h-fit sticky top-8">
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Items ({carts.length})</span>
                <span>₹ {totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Shipping</span>
                <span>₹ 99</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex items-center justify-between">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-4xl font-extrabold text-cyan-400">
                  ₹ {(totalAmount + 99).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl text-lg">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;