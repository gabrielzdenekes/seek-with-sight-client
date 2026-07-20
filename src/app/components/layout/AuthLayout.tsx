import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">

            {/* Brand Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <Link to="/" className="text-3xl font-black text-indigo-600 tracking-tight">
                    ShopBack
                </Link>
            </div>

            {/* Main Form Container Card */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-sm border border-slate-200/80 rounded-xl sm:px-10">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;
