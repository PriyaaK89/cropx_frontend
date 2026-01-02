import { useState, useCallback } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Config } from "../components/Utils/Config";


const useCartQuantityManager = ({
  userId,
  product,
  cartData,
  getCartItems,
  onLoginModalOpen,
}) => {
  const [quantities, setQuantities] = useState({});
  const toast = useToast();

  // 🔁 Sync quantities from cart
  const syncQuantitiesFromCart = useCallback(() => {
    const productId = product?.id ?? product?.product_id;
    const item = cartData?.find((p) => p.product_id === productId);

    if (!item) {
      setQuantities({});
      return;
    }

    let q = {};

    item.single_packs?.forEach((sp) => {
      q[`single_${sp.variant_id}`] = sp.cart_quantity;
    });

    item.multi_packs?.forEach((mp) => {
      q[`multi_${mp.multipack_id}`] = mp.cart_quantity;
    });

    setQuantities(q);
  }, [cartData, product]);

  // ➕ Increase
  const handleIncrease = async ({ variant_id, multipack_id }) => {
    const key = multipack_id ? `multi_${multipack_id}` : `single_${variant_id}`;

    if (!userId) {
      toast({
        description: "Please login first to add items to cart!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onLoginModalOpen();
      return;
    }

    try {
      const payload = {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
        variant_id: variant_id || null,
        multipack_id: multipack_id || null,
      };

      const response = await axios.post(Config.Add_to_cart, payload);

      if (response.status === 200) {
        setQuantities((prev) => ({
          ...prev,
          [key]: (prev[key] || 0) + 1,
        }));
        getCartItems();
        toast({
          description: "Item added to cart",
          status: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ➖ Decrease
  const handleDecrease = async ({ variant_id, multipack_id }) => {
    const key = multipack_id ? `multi_${multipack_id}` : `single_${variant_id}`;

    try {
      const response = await axios.post(Config.decrease_item, {
        user_id: userId,
        product_id: product.id,
        variant_id,
        multipack_id,
      });

      if (response.status === 200) {
        setQuantities((prev) => ({
          ...prev,
          [key]: Math.max((prev[key] || 1) - 1, 0),
        }));
        getCartItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    quantities,
    setQuantities,
    handleIncrease,
    handleDecrease,
    syncQuantitiesFromCart,
  };
};

export default useCartQuantityManager;
