import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Config } from "../Utils/Config";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceSummary, setPriceSummary] = useState({});

  const { user } = useContext(AuthContext);
  const userId = user?.data?.id;

  const getCartItems = async () => {
    try {
      setLoading(true); 

      const response = await axios.get(`${Config?.get_cart_items}/${userId}`);

      if (response?.status === 200) {
        setCartItems(response?.data?.cart_items);
        setCartData(response?.data?.cart);
        setPriceSummary(response?.data?.price_summary)
      }
    } catch (error) {
      console.log(error, "Error in fetching API response!");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (userId) {
      getCartItems();
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartItems, cartData, loading, getCartItems,priceSummary }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
