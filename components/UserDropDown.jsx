"use client";
import { ChevronDown, ChevronLeft, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

async function handleLogout() {
  await fetch("/api/logout", { method: "POST" });
  window.location.reload(); // Refresh to clear auth state
}

export default function UserDropdown({ user }) {
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon */}
      <button onClick={() => setIsOpen((prev) => !prev)} className="">
        <div className="flex flex-row items-center gap-1">
          <UserRound color="#666666" size={32} />
          <ChevronDown size={15} color="#666666" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg shadow-[#4e4e4e] rounded-lg p-2 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <div className="flex gap-1 justify-between">
              <p className="font-medium">{user["first_name"]}</p>
              <ChevronLeft size={20} />
            </div>
          </Link>
          <div className="h-[1px] w-full bg-gray-200 my-1"></div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <div className="flex flex-row items-center text-red-700 gap-2">
              <LogOut size={20} />
              <p>خروج از حساب کاربری</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
