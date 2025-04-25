"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children, useApi = false, userId = null }) {
  const [initialized, setInitialized] = useState(false);

  // Initialize cart from localStorage if possible (client-side only)
  const [cart, setCart] = useState(() => {
    // Only run in the browser, not during SSR
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Add loading states for different cart operations
  const [loadingStates, setLoadingStates] = useState({
    initialLoad: false,
    addToCart: false,
    removeFromCart: false,
    updateQuantity: false,
    clearCart: false,
    productLoading: null, // For tracking individual product loading state
  });

  const baseUrl = "https://chidamo.com/wp-json";

  // Modified initialization effect
  useEffect(() => {
    if (typeof window !== "undefined" && !initialized) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart && !useApi) {
        setCart(JSON.parse(savedCart));
      }
      setInitialized(true);
    }
  }, [initialized, useApi]);

  // Load cart from API if useApi is true and userId is provided
  useEffect(() => {
    async function handleCartTransition() {
      if (useApi && userId && initialized) {
        // First, try to migrate any existing localStorage cart
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          if (parsedCart.length > 0) {
            await migrateCartToApi(parsedCart);
            localStorage.removeItem("cart");
          }
        }

        // Then load the cart from API
        try {
          setLoadingStates((prev) => ({ ...prev, initialLoad: true }));
          const response = await fetch(`${baseUrl}/api/cart?user_id=${userId}`);
          const data = await response.json();
          setCart(data.items || []);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        } finally {
          setLoadingStates((prev) => ({ ...prev, initialLoad: false }));
        }
      }
    }

    handleCartTransition();
  }, [useApi, userId, initialized]);

  async function addToCart(product) {
    // Set loading state for this specific product
    setLoadingStates((prev) => ({
      ...prev,
      addToCart: true,
      productLoading: product.id,
    }));

    try {
      if (useApi && userId) {
        // Include user_id in the product object for the API
        const productWithUserId = {
          ...product,
          user_id: userId,
        };

        const response = await fetch(`${baseUrl}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productWithUserId),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
        }
      } else {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === product.id);
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      // Clear loading state
      setLoadingStates((prev) => ({
        ...prev,
        addToCart: false,
        productLoading: null,
      }));
    }
  }

  async function removeFromCart(productId) {
    setLoadingStates((prev) => ({
      ...prev,
      removeFromCart: true,
      productLoading: productId,
    }));

    try {
      if (useApi && userId) {
        const response = await fetch(`${baseUrl}/api/cart/remove`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId, user_id: userId }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
        }
      } else {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        removeFromCart: false,
        productLoading: null,
      }));
    }
  }

  async function updateQuantity(productId, quantity) {
    setLoadingStates((prev) => ({
      ...prev,
      updateQuantity: true,
      productLoading: productId,
    }));

    try {
      if (useApi && userId) {
        const response = await fetch(`${baseUrl}/api/cart/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId, quantity, user_id: userId }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
        }
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        updateQuantity: false,
        productLoading: null,
      }));
    }
  }

  async function clearCart() {
    setLoadingStates((prev) => ({ ...prev, clearCart: true }));

    try {
      if (useApi && userId) {
        const response = await fetch(
          `${baseUrl}/api/cart/clear?user_id=${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, clearCart: false }));
    }
  }

  // Function to migrate local cart to API when needed
  async function migrateCartToApi(localCart = null, newUserId = null) {
    // Use provided newUserId, or fall back to the context userId
    const userIdToUse = newUserId || userId;

    if (!userIdToUse) {
      console.error("Cannot migrate cart: No user ID provided");
      return false;
    }

    const cartToMigrate =
      localCart || JSON.parse(localStorage.getItem("cart") || "[]");

    if (cartToMigrate.length > 0) {
      try {
        const response = await fetch(`${baseUrl}/api/cart/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartToMigrate,
            user_id: userIdToUse,
          }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
          // Clear localStorage after successful migration
          localStorage.removeItem("cart");
          return true;
        }
      } catch (error) {
        console.error("Error migrating cart:", error);
      }
    }
    return false;
  }

  // Helper function to check if a specific product is loading
  function isProductLoading(productId) {
    return loadingStates.productLoading === productId;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        migrateCartToApi,
        useApi,
        userId,
        isLoading: {
          ...loadingStates,
          isProductLoading,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
