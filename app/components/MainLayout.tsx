"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaShoppingBag,
    FaPlus,
    FaHome
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [, setApiStatus] = useState<
        "available" | "unavailable" | "checking"
    >("checking");
    // Check if the API is available
    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                // Get API URL from environment variable or use default
                const apiUrl =
                    process.env.NEXT_PUBLIC_API_URL ||
                    "http://localhost:3000/api";

                // Try to connect to the API with a short timeout
                await axios.get(`${apiUrl}/products`, { timeout: 3000 });
                setApiStatus("available");
            } catch (error) {
                console.log("API connection check failed:", error);
                setApiStatus("unavailable");

                // Show a toast notification about API connection issue
                toast.error(
                    <div>
                        <strong>API Connection Error</strong>
                        <p className="text-xs mt-1">
                            Unable to connect to API server. Please check if the
                            server is running.
                        </p>
                    </div>,
                    {
                        autoClose: 5000,
                        position: "top-center",
                    }
                );
            }
        };

        checkApiStatus();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-primary-700 to-primary-900 shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold"
                        >
                            <FaShoppingBag />
                            <span>StyleHub</span>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <NavLink href="/" active={pathname === "/"}>
                                <FaHome className="mr-1" />
                                Home
                            </NavLink>
                            <NavLink
                                href="/products/new"
                                active={pathname === "/products/new"}
                            >
                                <FaPlus className="mr-1" />
                                Add Product
                            </NavLink>
                        </nav>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center gap-3">
                            <Link
                                href="/products/new"
                                className="bg-white text-primary-700 p-2 rounded-full hover:bg-primary-100 transition-colors"
                            >
                                <FaPlus />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 border-t border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center text-gray-600">
                        <p>
                            &copy; {new Date().getFullYear()} StyleHub. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Toast notifications container */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

// Navigation link component
function NavLink({
    href,
    children,
    active,
}: {
    href: string;
    children: React.ReactNode;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center transition-colors ${
                active
                    ? "font-semibold"
                    : "text-primary-100 hover:text-gray-500"
            }`}
        >
            {children}
        </Link>
    );
}
