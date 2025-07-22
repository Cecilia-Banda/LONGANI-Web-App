import {
	Activity,
	BarChart3,
	Bell,
	Calendar,
	CheckCircle,
	Clock,
	Download,
	Edit,
	Eye,
	RefreshCw,
	Send,
	Settings,
	Shield,
	UserPlus,
	Users,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [selectedTab, setSelectedTab] = useState("overview");
	const [showNotifications, setShowNotifications] = useState(true);
	const [notifications] = useState([
		{
			id: 1,
			type: "info",
			message: "System maintenance scheduled for tonight at 2 AM",
			time: "2 hours ago",
		},
		{
			id: 2,
			type: "warning",
			message: "High login activity detected in Emergency Department",
			time: "30 minutes ago",
		},
		{
			id: 3,
			type: "success",
			message: "Monthly backup completed successfully",
			time: "1 hour ago",
		},
	]);

	const [pendingApprovals, setPendingApprovals] = useState([
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			role: "Cardiologist",
			requested: "2 hours ago",
			status: "pending",
		},
		{
			id: 2,
			name: "Mike Chen",
			role: "Nurse",
			requested: "1 day ago",
			status: "pending",
		},
		{
			id: 3,
			name: "Elizabeth Mwanza",
			role: "Nurse",
			requested: "5 days ago",
			status: "pending",
		},
	]);

	const handleApprove = (id: number) => {
		setPendingApprovals((prev) => prev.filter((user) => user.id !== id));
		// TODO: Add API call to approve user
	};

	const handleReject = (id: number) => {
		setPendingApprovals((prev) => prev.filter((user) => user.id !== id));
		// TODO: Add API call to reject user
	};

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

interface StatCardProps {
	title: string;
	value: string | number;
	change?: number;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
					{change && (
						<p
							className={`text-sm mt-1 ${
								change > 0 ? "text-green-600" : "text-red-600"
							}`}>
							{change > 0 ? "+" : ""}
							{change}% from last week
						</p>
					)}
				</div>
				<div className={`p-3 rounded-full ${color}`}>
					<Icon className="w-6 h-6 text-white" />
				</div>
			</div>
		</div>
	);

interface Activity {
	type: "success" | "warning" | "info";
	action: string;
	user: string;
	time: string;
}

interface ActivityLogProps {
	activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Recent Activity
			</h3>
			<div className="space-y-3">
				{activities.map((activity, index) => (
					<div
						key={index}
						className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
						<div
							className={`w-2 h-2 rounded-full ${
								activity.type === "success"
									? "bg-green-500"
									: activity.type === "warning"
									? "bg-yellow-500"
									: "bg-blue-500"
							}`}></div>
						<div className="flex-1">
							<p className="text-sm text-gray-900">{activity.action}</p>
							<p className="text-xs text-gray-500">
								{activity.user} • {activity.time}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const UserManagement = () => (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-gray-900">User Management</h2>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
					<UserPlus className="w-4 h-4" />
					<span>Add User</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<StatCard
					title="Doctors"
					value="42"
					change={5}
					icon={Users}
					color="bg-blue-500"
				/>
				<StatCard
					title="Nurses"
					value="128"
					change={12}
					icon={Users}
					color="bg-green-500"
				/>
				<StatCard
					title="Record Officers"
					value="24"
					change={-2}
					icon={Users}
					color="bg-purple-500"
				/>
				<StatCard
					title="Data Managers"
					value="8"
					change={0}
					icon={Users}
					color="bg-orange-500"
				/>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Pending Approvals
				</h3>
				<div className="space-y-3">
					{pendingApprovals.map((user, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div>
								<p className="font-medium text-gray-900">{user.name}</p>
								<p className="text-sm text-gray-500">
									{user.role} • Requested {user.requested}
								</p>
							</div>
							<div className="flex space-x-2">
								<button
									onClick={() => handleApprove(user.id)}
									className="text-green-600 hover:text-green-700 p-1"
									title="Approve">
									<CheckCircle className="w-5 h-5" />
								</button>
								<button
									onClick={() => handleReject(user.id)}
									className="text-red-600 hover:text-red-700 p-1"
									title="Reject">
									<XCircle className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const SecurityLogs = () => (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">
				Security & Access Logs
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<StatCard
					title="Successful Logins"
					value="1,247"
					change={15}
					icon={CheckCircle}
					color="bg-green-500"
				/>
				<StatCard
					title="Failed Attempts"
					value="23"
					change={-30}
					icon={XCircle}
					color="bg-red-500"
				/>
				<StatCard
					title="Active Sessions"
					value="89"
					change={8}
					icon={Eye}
					color="bg-blue-500"
				/>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Recent Login Attempts
				</h3>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-gray-50">
							<tr>
								<th className="text-left p-3">User</th>
								<th className="text-left p-3">IP Address</th>
								<th className="text-left p-3">Time</th>
								<th className="text-left p-3">Status</th>
								<th className="text-left p-3">Location</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									user: "Dr. Smith",
									ip: "192.168.1.100",
									time: "14:23",
									status: "success",
									location: "Emergency Dept",
								},
								{
									user: "Nurse Johnson",
									ip: "192.168.1.105",
									time: "14:20",
									status: "success",
									location: "ICU",
								},
								{
									user: "Unknown",
									ip: "203.45.67.89",
									time: "14:18",
									status: "failed",
									location: "External",
								},
								{
									user: "Dr. Williams",
									ip: "192.168.1.102",
									time: "14:15",
									status: "success",
									location: "Surgery",
								},
							].map((log, index) => (
								<tr key={index} className="border-t">
									<td className="p-3 font-medium">{log.user}</td>
									<td className="p-3 text-gray-600">{log.ip}</td>
									<td className="p-3 text-gray-600">{log.time}</td>
									<td className="p-3">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												log.status === "success"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}>
											{log.status}
										</span>
									</td>
									<td className="p-3 text-gray-600">{log.location}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);

	const QuickTools = () => (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">Quick Admin Tools</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<UserPlus className="w-8 h-8 text-blue-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">Create User</h3>
					<p className="text-sm text-gray-600">
						Add new staff members to the system
					</p>
				</button>

				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<Edit className="w-8 h-8 text-green-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">Edit Roles</h3>
					<p className="text-sm text-gray-600">
						Modify user permissions and access levels
					</p>
				</button>

				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<Send className="w-8 h-8 text-purple-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">
						Broadcast Message
					</h3>
					<p className="text-sm text-gray-600">
						Send announcements to all staff
					</p>
				</button>

				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<Download className="w-8 h-8 text-orange-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">Generate Reports</h3>
					<p className="text-sm text-gray-600">
						Create system and usage reports
					</p>
				</button>

				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<Settings className="w-8 h-8 text-gray-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">System Settings</h3>
					<p className="text-sm text-gray-600">Configure system preferences</p>
				</button>

				<button className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left">
					<RefreshCw className="w-8 h-8 text-red-600 mb-3" />
					<h3 className="font-semibold text-gray-900 mb-2">System Backup</h3>
					<p className="text-sm text-gray-600">
						Manual backup and restore options
					</p>
				</button>
			</div>
		</div>
	);

	const renderContent = () => {
		switch (selectedTab) {
			case "users":
				return <UserManagement />;
			case "security":
				return <SecurityLogs />;
			case "tools":
				return <QuickTools />;
			default:
				return (
					<div className="space-y-6">
						{/* Main Overview Stats */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<StatCard
								title="Total Users"
								value="202"
								change={8}
								icon={Users}
								color="bg-blue-500"
							/>
							<StatCard
								title="Active Sessions"
								value="89"
								change={15}
								icon={Activity}
								color="bg-green-500"
							/>
							<StatCard
								title="Patients Today"
								value="156"
								change={-5}
								icon={Calendar}
								color="bg-purple-500"
							/>
							<StatCard
								title="System Uptime"
								value="99.9%"
								change={0}
								icon={Clock}
								color="bg-orange-500"
							/>
						</div>

						{/* Activity and Performance */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<ActivityLog
								activities={[
									{
										action: "User Dr. Smith logged in",
										user: "System",
										time: "2 minutes ago",
										type: "success",
									},
									{
										action: "New patient registered",
										user: "Record keeping",
										time: "5 minutes ago",
										type: "info",
									},
									{
										action: "Failed login attempt detected",
										user: "Security",
										time: "10 minutes ago",
										type: "warning",
									},
									{
										action: "Database backup completed",
										user: "System",
										time: "1 hour ago",
										type: "success",
									},
								]}
							/>

							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Department Activity
								</h3>
								<div className="space-y-4">
									{[
										{
											dept: "Emergency",
											patients: 42,
											staff: 12,
											status: "high",
										},
										{ dept: "ICU", patients: 18, staff: 8, status: "normal" },
										{ dept: "Surgery", patients: 6, staff: 15, status: "low" },
										{
											dept: "Pediatrics",
											patients: 28,
											staff: 6,
											status: "normal",
										},
									].map((dept, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
											<div>
												<p className="font-medium text-gray-900">{dept.dept}</p>
												<p className="text-sm text-gray-500">
													{dept.patients} patients • {dept.staff} staff
												</p>
											</div>
											<div
												className={`w-3 h-3 rounded-full ${
													dept.status === "high"
														? "bg-red-500"
														: dept.status === "normal"
														? "bg-green-500"
														: "bg-yellow-500"
												}`}></div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-gray-50 shadow-none border-none">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Admin Dashboard
							</h1>
							<p className="text-sm text-gray-600">
								Welcome back, Administrator!
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-right">
								<p className="text-sm font-medium text-gray-900">
									{currentTime.toLocaleTimeString()}
								</p>
								<p className="text-xs text-gray-500">
									{currentTime.toLocaleDateString()}
								</p>
							</div>
							<div className="relative">
								<button
									onClick={() => setShowNotifications(!showNotifications)}
									className="p-2 text-gray-600 hover:text-gray-900 relative">
									<Bell className="w-5 h-5" />
									<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
										{notifications.length}
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<div className="bg-gray-50 shadow-none">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex space-x-4 mt-4">
						{[
							{ id: "overview", label: "📊 Overview", icon: BarChart3 },
							{ id: "users", label: "👥 Users", icon: Users },
							{ id: "security", label: "🛡️ Security", icon: Shield },
							{ id: "tools", label: "🗂️ Tools", icon: Settings },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setSelectedTab(tab.id)}
								className={`flex items-center space-x-2 px-4 py-3 border rounded-md font-medium text-sm ${
									selectedTab === tab.id
										? "border-blue-500 text-blue-600 bg-white shadow"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-white"
								}`}>
								<tab.icon className="w-4 h-4" />
								<span>{tab.label}</span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{renderContent()}
			</div>

			{/* Notifications Panel */}
			{showNotifications && (
				<div className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
					<div className="flex items-center justify-between mb-3">
						<h3 className="font-semibold text-gray-900">🔔 Notifications</h3>
						<button
							onClick={() => setShowNotifications(false)}
							className="text-gray-400 hover:text-gray-600">
							<XCircle className="w-4 h-4" />
						</button>
					</div>
					<div className="space-y-2 max-h-60 overflow-y-auto">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className={`p-3 rounded-lg border-l-4 ${
									notification.type === "success"
										? "border-green-500 bg-green-50"
										: notification.type === "warning"
										? "border-yellow-500 bg-yellow-50"
										: "border-blue-500 bg-blue-50"
								}`}>
								<p className="text-sm text-gray-900">{notification.message}</p>
								<p className="text-xs text-gray-500 mt-1">
									{notification.time}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
