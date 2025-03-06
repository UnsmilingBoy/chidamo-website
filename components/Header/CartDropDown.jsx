import { useCart } from "@/context/CartContext";
import { toPersianNumber, toPersianPrice } from "@/utils/toPersianNumber";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CartDropDown() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <button onClick={() => setIsOpen((prev) => !prev)} className="relative">
        <ShoppingCart color="#666666" size="35" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {toPersianNumber(
              cart.reduce((total, item) => total + item.quantity, 0)
            )}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg shadow-[#7a7a7a] rounded-lg p-4 z-10">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">سبد خرید خالی است.</p>
          ) : (
            <>
              <ul className="max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {toPersianPrice(item.price)} تومان ×{" "}
                        {toPersianNumber(item.quantity)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>

              {/* View Cart Button */}
              <Link
                href="/cart"
                className="block text-center mt-3 bg-primary text-white py-2 rounded-lg"
              >
                ثبت سفارش
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
