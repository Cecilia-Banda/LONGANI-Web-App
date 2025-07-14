import {
	Activity,
	BarChart3,
	Calendar,
	ChevronLeft,
	ChevronRight,
	ClipboardCheck,
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	Shield,
	Stethoscope,
	UserCheck,
	UserPlus,
	X,
	Users,
	Bell,
	RefreshCcw,
	Lock,
	Pill,
	TestTube,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar: React.FC = () => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};
	const toggleMobileSidebar = () => {
		setIsMobileOpen(!isMobileOpen);
	};

	// Define navigation items based on user role
	const getNavItems = () => {
		const items = [
			{
				name: "Dashboard",
				icon: <LayoutDashboard size={20} />,
				href: "/dashboard/admin",
				allowedRoles: ["admin"],
			},
			{
				name: "User Management",
				icon: <Users size={20} />,
				href: "/users",
				allowedRoles: ["admin"],
			},
			{
				name: "System Settings",
				icon: <Settings size={20} />,
				href: "/settings",
				allowedRoles: ["admin"],
			},
			{
				name: "Reports & Logs",
				icon: <ClipboardList size={20} />,
				href: "/reports-logs",
				allowedRoles: ["admin"],
			},
			{
				name: "Role Permissions",
				icon: <Lock size={20} />,
				href: "/role-permissions",
				allowedRoles: ["admin"],
			},
			{
				name: "Facility Configuration",
				icon: <Activity size={20} />,
				href: "/facility-configuration",
				allowedRoles: ["admin"],
			},
			// Nurse specific items
			{
				name: "Patient Records",
				icon: <ClipboardList size={20} />,
				href: "/patients",
				allowedRoles: ["nurse"],
			},
			{
				name: "Today’s Queue",
				icon: <ClipboardCheck size={20} />,
				href: "/nurse/queue",
				allowedRoles: ["nurse"],
			},
			{
				name: "Update Vitals",
				icon: <Activity size={20} />,
				href: "/vitals-recording",
				allowedRoles: ["nurse"],
			},
			{
				name: "Profile & Settings",
				icon: <Settings size={20} />,
				href: "/settings",
				allowedRoles: ["nurse"],
			},
			// Doctor specific items
			{
				name: "Dashboard",
				icon: <LayoutDashboard size={20} />,
				href: user?.role ? `/dashboard/${user.role}` : "/dashboard",
				allowedRoles: ["doctor"],
			},
			{
				name: "Patient Records",
				icon: <ClipboardList size={20} />,
				href: "/patients",
				allowedRoles: ["doctor"],
			},
			{
				name: "Appointments",
				icon: <Calendar size={20} />,
				href: "/appointments",
				allowedRoles: ["doctor"],
			},
			{
				name: "Prescriptions",
				icon: <Pill size={20} />,
				href: "/prescriptions",
				allowedRoles: ["doctor"],
			},
			{
				name: "Lab Requests",
				icon: <TestTube size={20} />,
				href: "/lab-requests",
				allowedRoles: ["doctor"],
			},
			{
				name: "Profile & Settings",
				icon: <Settings size={20} />,
				href: "/settings",
				allowedRoles: ["doctor"],
			},
			// Keep other roles' items unchanged
			// Removed duplicate Dashboard item at the end of the sidebar
			{
				name: "Register Patient",
				icon: <UserPlus size={20} />,
				href: "/patients/register",
				allowedRoles: ["record officer"],
			},
			{
				name: "Patient Records",
				icon: <ClipboardList size={20} />,
				href: "/patients",
				allowedRoles: ["Record officer"],
			},
			{
				name: "Schedule Appointments",
				icon: <Calendar size={20} />,
				href: "/appointments",
				allowedRoles: ["record officer"],
			},
		];
		return items
			.filter((item) => user?.role && item.allowedRoles.includes(user.role))
			.filter((item) => {
				if (user?.role === "admin") {
					return (
						item.name !== "Register Patient" &&
						item.name !== "Vitals Recording" &&
						item.name !== "Medical Diagnosis"
					);
				}
				return true;
			});
	};

	const navItems = getNavItems();

	return (
		<>
			{/* Mobile toggle button */}
			<div className="md:hidden fixed top-4 left-4 z-70">
				<button
					onClick={toggleMobileSidebar}
					className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border border-gray-300 bg-white shadow-sm"
					aria-label="Toggle mobile sidebar">
					{isMobileOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			{/* Sidebar overlay for mobile */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-60"
					onClick={toggleMobileSidebar}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar container */}
			<div
				className={`fixed inset-y-0 left-0 z-70 flex flex-col ${
					user?.role === "doctor" ? "bg-gray-50" : "bg-white"
				} border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out
			${
				isMobileOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 md:static md:inset-auto md:flex md:w-auto md:flex-col md:z-60 ${
					isCollapsed ? "md:w-16" : "md:w-80"
				}`}>
				<div className="flex flex-col flex-grow pt-5 relative">
					{/* Header with Logo and Toggle */}
					<div className="flex items-center justify-center flex-shrink-0 px-4 mb-5 relative">
						<div className="flex items-center">
{!isCollapsed && (
	<div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
		<span className="text-white font-bold">L</span>
	</div>
)}
{!isCollapsed && (
	<h1 className="ml-2 text-xl font-bold text-gray-900 whitespace-nowrap">
		Longani
	</h1>
)}
						</div>

						{/* Toggle Button - Smaller arrow only */}
						<button
							onClick={toggleSidebar}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
							aria-label="Toggle sidebar">
							{isCollapsed ? (
								<ChevronRight size={14} />
							) : (
								<ChevronLeft size={14} />
							)}
						</button>
					</div>

					{/* Navigation */}
					<div className="mt-5 flex-1 flex flex-col">
						<nav className="flex-1 px-2 pb-4 space-y-1">
{navItems.map((item) => {
	const isActive = location.pathname.startsWith(item.href);
	return (
		<Link
			key={item.name}
			to={item.href}
			className={`
				group flex items-center rounded-md transition-all duration-200
				${isCollapsed ? "px-2 py-3 justify-center" : "px-2 py-2"}
				${
					isActive
						? "bg-blue-50 text-blue-700"
						: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
				}
			`}
			title={isCollapsed ? item.name : undefined}>
			<div
				className={`flex-shrink-0 ${isCollapsed ? "" : "mr-3"} ${
					isActive ? "text-blue-700" : "text-gray-500"
				}`}>
				{item.icon}
			</div>
			{!isCollapsed && (
				<span className="text-sm font-medium truncate">
					{item.name}
				</span>
			)}
		</Link>
	);
})}
						</nav>
					</div>

					{/* Footer Section */}
					{!isCollapsed && user && (
						<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
							<div className="flex items-center">
								<div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
									<span className="uppercase font-bold">
										{user.firstName ? user.firstName.charAt(0) : "U"}
									</span>
								</div>
								<div className="ml-3">
									<div className="text-sm font-medium text-gray-900 truncate">
										{user.firstName} {user.lastName}
									</div>
									<div className="text-xs text-gray-500 capitalize truncate">
										{user.role?.replace("_", " ")}
									</div>
								</div>
							</div>
							<button
								onClick={logout}
								className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
								title="Logout">
								<LogOut size={20} />
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
