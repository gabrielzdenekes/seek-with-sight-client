import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            {/* Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-indigo-600 tracking-tight"
                    >
                        ShopBack
                    </Link>

                    {/* Nav Links */}
                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/products"
                            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Browse Products
                        </Link>
                        <Link
                            to="/cart"
                            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Cart{" "}
                            <span className="ml-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full font-semibold">
                                0
                            </span>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content Window */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ShopBack E-Commerce. All
                    rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
