import React, { useState } from "react";
import { LogOut, Bell, User, Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
	const { user, logout } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const getPageTitle = () => {
		const path = window.location.pathname;
		if (path.includes("dashboard")) return "Dashboard";
		if (path.includes("patients/register")) return "Patient Registration";
		if (path.includes("patients")) return "Patient Details";
		return "My Hospital App";
	};

	return (
		<header className="bg-white border-b border-gray-200 shadow-sm relative z-50">
			<div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				{/* Left side - Logo/Title and Mobile Menu Button */}
				<div className="flex items-center">
					<button
						onClick={toggleMobileMenu}
						className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						aria-label="Toggle menu">
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>

					<div className="ml-2 md:ml-0">
						<h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
							{getPageTitle()}
						</h1>
					</div>
				</div>

				{/* Right side - Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-4">
					<button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
						<Bell size={20} />
					</button>

					<div className="flex items-center space-x-3">
						<div className="flex flex-col items-end">
							<span className="text-sm font-medium text-gray-900">
								{user?.name}
							</span>
							<span className="text-xs text-gray-500 capitalize">
								{user?.role?.replace("_", " ")}
							</span>
						</div>
						<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
							<User size={18} />
						</div>
					</div>

					<button
						onClick={logout}
						className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
						title="Logout">
						<LogOut size={20} />
					</button>
				</div>

				{/* Mobile - User Avatar and Notifications */}
				<div className="md:hidden flex items-center space-x-2">
					<button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
						<Bell size={20} />
					</button>
					<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
						<User size={18} />
					</div>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
					<div className="px-4 py-4 space-y-4">
						{/* User Info */}
						<div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
							<div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
								<User size={20} />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-medium text-gray-900">
									{user?.name}
								</span>
								<span className="text-xs text-gray-500 capitalize">
									{user?.role?.replace("_", " ")}
								</span>
							</div>
						</div>

						{/* Navigation Links */}
						<div className="space-y-2">
							<a
								href="/dashboard"
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}>
								Dashboard
							</a>
							<a
								href="/patients"
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}>
								Patients
							</a>
							<a
								href="/patients/register"
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}>
								Register Patient
							</a>
						</div>

						{/* Actions */}
						<div className="pt-4 border-t border-gray-200">
							<button
								onClick={() => {
									logout();
									setIsMobileMenuOpen(false);
								}}
								className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors">
								<LogOut size={20} />
								<span>Logout</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Mobile Menu Backdrop */}
			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</header>
	);
};

export default Navbar;
