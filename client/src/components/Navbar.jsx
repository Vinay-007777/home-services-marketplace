import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, Settings } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [state, setState] = useState("bookingservice");
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600">
                            HomeServices
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className={`text-gray-500 hover:text-gray-700 inline-flex items-center px-1 ${state === "bookingservice" ? "border-blue-500 text-gray-900" : ""} pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium `} onClick={() => { setState("bookingservice") }}>
                                <Home className={`w-4 h-4 mr-2 `} />
                                Book Service
                            </Link>
                            <Link to="/dashboard" className={`text-gray-500 hover:text-gray-700 inline-flex items-center px-1 ${state === "dashboard" ? "border-blue-500 text-gray-900" : ""} pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium `} onClick={() => { setState("dashboard") }}>
                                <LayoutDashboard className={`w-4 h-4 mr-2 `} />
                                Dashboard
                            </Link>
                            <Link to="/admin" className={`text-gray-500 hover:text-gray-700 inline-flex items-center px-1 ${state === "admin" ? "border-blue-500 text-gray-900" : ""} pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium `} onClick={() => { setState("admin") }}>
                                <Settings className={`w-4 h-4 mr-2 `} />
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
