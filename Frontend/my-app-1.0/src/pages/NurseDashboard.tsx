import React, { useState, useEffect } from "react";
import {
	Clock,
	User,
	AlertCircle,
	CheckCircle,
	Activity,
	FileText,
	Bell,
	Users,
	TrendingUp,
	Heart,
	Thermometer,
	Calendar,
	Search,
	Filter,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const OPDNurseDashboard = () => {
	const [activeTab, setActiveTab] = useState("queue");

	type Patient = {
		id: number;
		name: string;
		age: number;
		arrivalTime: string;
		status: string;
		priority: string;
		complaint: string;
		vitals: {
			temperature: string | null;
			bloodPressure: string | null;
			heartRate: string | null;
			oxygen: string | null;
		};
		lastUpdated: string | null;
	};

	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

	type Notification = {
		id: number;
		type: "reassignment" | "vitals-request" | "system" | "success";
		message: string;
		time: string;
		read: boolean;
	};

	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [currentTime, setCurrentTime] = useState(new Date());

	// Sample data - in real app, this would come from API
	const [patients, setPatients] = useState<Patient[]>([
		{
			id: 1,
			name: "James Kamboe",
			age: 34,
			arrivalTime: "08:30",
			status: "waiting",
			priority: "normal",
			complaint: "Headache and fever",
			vitals: {
				temperature: null,
				bloodPressure: null,
				heartRate: null,
				oxygen: null,
			},
			lastUpdated: null,
		},
		{
			id: 3,
			name: "Emmaculate Walasa",
			age: 28,
			arrivalTime: "09:45",
			status: "sent-to-doctor",
			priority: "normal",
			complaint: "Skin rash",
			vitals: {
				temperature: "99.2°F",
				bloodPressure: "120/80",
				heartRate: "72 bpm",
				oxygen: "98%",
			},
			lastUpdated: "11:15 AM",
		},
	]);

	const [vitalsForm, setVitalsForm] = useState({
		temperature: "",
		bloodPressure: "",
		heartRate: "",
		oxygen: "",
		notes: "",
	});

	// Update current time every minute
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);
		return () => clearInterval(timer);
	}, []);

	// Initialize notifications
	useEffect(() => {
		setNotifications([
			{
				id: 1,
				type: "reassignment",
				message: "Patient Michael Chen reassigned to you",
				time: "10:30 AM",
				read: false,
			},
			{
				id: 2,
				type: "vitals-request",
				message: "Dr. Smith requests vitals update for Sarah Johnson",
				time: "11:00 AM",
				read: false,
			},
			{
				id: 3,
				type: "system",
				message: "Incomplete vitals form for James Brown",
				time: "11:15 AM",
				read: true,
			},
		]);
	}, []);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "waiting":
				return "bg-yellow-100 text-yellow-800";
			case "in-progress":
				return "bg-blue-100 text-blue-800";
			case "sent-to-doctor":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "urgent":
				return "bg-red-500";
			case "high":
				return "bg-orange-500";
			case "normal":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	const filteredPatients = patients.filter((patient) => {
		const matchesSearch =
			patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			patient.complaint.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter =
			filterStatus === "all" || patient.status === filterStatus;
		return matchesSearch && matchesFilter;
	});

	const handleVitalsSubmit = () => {
		if (selectedPatient) {
			const updatedPatients = patients.map((p) => {
				if (p.id === selectedPatient.id) {
					return {
						...p,
						vitals: {
							temperature: vitalsForm.temperature || p.vitals.temperature,
							bloodPressure: vitalsForm.bloodPressure || p.vitals.bloodPressure,
							heartRate: vitalsForm.heartRate || p.vitals.heartRate,
							oxygen: vitalsForm.oxygen || p.vitals.oxygen,
						},
						status: "in-progress",
						lastUpdated: currentTime.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						}),
					};
				}
				return p;
			});
			setPatients(updatedPatients);
			setVitalsForm({
				temperature: "",
				bloodPressure: "",
				heartRate: "",
				oxygen: "",
				notes: "",
			});

			// Add success notification
			const newNotification: Notification = {
				id: Date.now(),
				type: "success",
				message: `Vitals updated for ${selectedPatient.name}`,
				time: currentTime.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				read: false,
			};
			setNotifications((prev) => [newNotification, ...prev]);
		}
	};

	const updatePatientStatus = (patientId: number, newStatus: string) => {
		const updatedPatients = patients.map((p) => {
			if (p.id === patientId) {
				return { ...p, status: newStatus };
			}
			return p;
		});
		setPatients(updatedPatients);
	};

	const unreadNotifications = notifications.filter((n) => !n.read).length;

	const todaysStats = {
		totalPatients: patients.length,
		vitalsEntered: patients.filter((p) => p.vitals.temperature).length,
		inProgress: patients.filter((p) => p.status === "in-progress").length,
		completed: patients.filter((p) => p.status === "sent-to-doctor").length,
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-gray-50 shadow-none border-none">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Nurse Dashboard
							</h1>
							<p className="text-sm text-gray-600">
								Welcome back, Nurse!
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
								<Bell
									className="w-6 h-6 text-gray-600 cursor-pointer"
									onClick={() => setActiveTab("notifications")}
								/>
								{unreadNotifications > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
										{unreadNotifications}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<Users className="w-8 h-8 text-blue-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">
									Total Patients
								</p>
								<p className="text-2xl font-bold text-gray-900">
									{todaysStats.totalPatients}
								</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<Activity className="w-8 h-8 text-green-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">
									Vitals Entered
								</p>
								<p className="text-2xl font-bold text-gray-900">
									{todaysStats.vitalsEntered}
								</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<Clock className="w-8 h-8 text-orange-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">In Progress</p>
								<p className="text-2xl font-bold text-gray-900">
									{todaysStats.inProgress}
								</p>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<CheckCircle className="w-8 h-8 text-blue-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Completed</p>
								<p className="text-2xl font-bold text-gray-900">
									{todaysStats.completed}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="bg-white rounded-lg shadow mb-6">
					<div className="border-b border-gray-200">
						<nav className="flex space-x-8 px-6">
							<button
								onClick={() => setActiveTab("queue")}
								className={`py-4 text-sm font-medium border-b-2 ${
									activeTab === "queue"
										? "border-blue-600 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700"
								}`}>
								📋 Patient Queue
							</button>
							<button
								onClick={() => setActiveTab("records")}
								className={`py-4 text-sm font-medium border-b-2 ${
									activeTab === "records"
										? "border-blue-600 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700"
								}`}>
								📁 Patient Records
							</button>
							<button
								onClick={() => setActiveTab("vitals")}
								className={`py-4 text-sm font-medium border-b-2 ${
									activeTab === "vitals"
										? "border-blue-600 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700"
								}`}>
								📝 Vitals & Assessment
							</button>
							<button
								onClick={() => setActiveTab("notifications")}
								className={`py-4 text-sm font-medium border-b-2 ${
									activeTab === "notifications"
										? "border-blue-600 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700"
								}`}>
								🔔 Notifications{" "}
								{unreadNotifications > 0 && `(${unreadNotifications})`}
							</button>
						</nav>
					</div>

					{/* Tab Content */}
					<div className="p-6">
						{/* Patient Queue Tab */}
						{activeTab === "queue" && (
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-lg font-semibold text-gray-900">
										🗓️ Today's Patient Queue
									</h2>
									<div className="flex space-x-2">
										<div className="relative">
											<Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
											<input
												type="text"
												placeholder="Search patients..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<select
											value={filterStatus}
											onChange={(e) => setFilterStatus(e.target.value)}
											className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
											<option value="all">All Status</option>
											<option value="waiting">Waiting</option>
											<option value="in-progress">In Progress</option>
											<option value="sent-to-doctor">Sent to Doctor</option>
										</select>
									</div>
								</div>

								<div className="space-y-4">
									{filteredPatients.map((patient) => (
										<div
											key={patient.id}
											className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4">
													<div
														className={`w-3 h-3 rounded-full ${getPriorityColor(
															patient.priority
														)}`}></div>
													<div>
														<h3 className="font-medium text-gray-900">
															{patient.name}
														</h3>
														<p className="text-sm text-gray-500">
															Age: {patient.age} • Arrived:{" "}
															{patient.arrivalTime}
														</p>
														<p className="text-sm text-gray-600 mt-1">
															Complaint: {patient.complaint}
														</p>
													</div>
												</div>
												<div className="flex items-center space-x-3">
													<span
														className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
															patient.status
														)}`}>
														{patient.status.replace("-", " ").toUpperCase()}
													</span>
													<select
														value={patient.status}
														onChange={(e) =>
															updatePatientStatus(patient.id, e.target.value)
														}
														className="text-sm border border-gray-300 rounded px-2 py-1">
														<option value="waiting">Waiting</option>
														<option value="in-progress">In Progress</option>
														<option value="sent-to-doctor">
															Sent to Doctor
														</option>
													</select>
													<button
														onClick={() => {
															setSelectedPatient(patient);
															setActiveTab("vitals");
														}}
														className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
														Record Vitals
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Patient Records Tab */}
						{activeTab === "records" && (
							<div>
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									📁 Patient Records
								</h2>
								<div className="space-y-4">
									{patients.map((patient) => (
										<div
											key={patient.id}
											className="border border-gray-200 rounded-lg p-4">
											<div className="flex justify-between items-start">
												<div className="flex-1">
													<h3 className="font-medium text-gray-900">
														{patient.name}
													</h3>
													<p className="text-sm text-gray-500">
														Age: {patient.age} • ID: {patient.id}
													</p>
													<p className="text-sm text-gray-600 mt-2">
														Chief Complaint: {patient.complaint}
													</p>

													<div className="mt-4 grid grid-cols-2 gap-4">
														<div>
															<h4 className="font-medium text-gray-700 mb-2">
																Current Vitals
															</h4>
															<div className="space-y-1 text-sm">
																<div className="flex justify-between">
																	<span>Temperature:</span>
																	<span
																		className={
																			patient.vitals.temperature
																				? "text-green-600"
																				: "text-red-500"
																		}>
																		{patient.vitals.temperature ||
																			"Not recorded"}
																	</span>
																</div>
																<div className="flex justify-between">
																	<span>Blood Pressure:</span>
																	<span
																		className={
																			patient.vitals.bloodPressure
																				? "text-green-600"
																				: "text-red-500"
																		}>
																		{patient.vitals.bloodPressure ||
																			"Not recorded"}
																	</span>
																</div>
																<div className="flex justify-between">
																	<span>Heart Rate:</span>
																	<span
																		className={
																			patient.vitals.heartRate
																				? "text-green-600"
																				: "text-red-500"
																		}>
																		{patient.vitals.heartRate || "Not recorded"}
																	</span>
																</div>
																<div className="flex justify-between">
																	<span>Oxygen Saturation:</span>
																	<span
																		className={
																			patient.vitals.oxygen
																				? "text-green-600"
																				: "text-red-500"
																		}>
																		{patient.vitals.oxygen || "Not recorded"}
																	</span>
																</div>
															</div>
														</div>
														<div>
															<h4 className="font-medium text-gray-700 mb-2">
																Record Status
															</h4>
															<p className="text-sm text-gray-600">
																Last Updated: {patient.lastUpdated || "Never"}
															</p>
															<div className="mt-2">
																<span
																	className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
																		patient.status
																	)}`}>
																	{patient.status
																		.replace("-", " ")
																		.toUpperCase()}
																</span>
															</div>
														</div>
													</div>
												</div>
												<div className="ml-4">
													<button
														onClick={() => {
															setSelectedPatient(patient);
															setActiveTab("vitals");
														}}
														className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
														Update Vitals
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Vitals & Assessment Tab */}
						{activeTab === "vitals" && (
							<div>
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									📝 Vitals & Assessment
								</h2>

								{selectedPatient ? (
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<div>
											<h3 className="font-medium text-gray-900 mb-3">
												Patient Information
											</h3>
											<div className="bg-gray-50 p-4 rounded-lg">
												<p>
													<strong>Name:</strong> {selectedPatient.name}
												</p>
												<p>
													<strong>Age:</strong> {selectedPatient.age}
												</p>
												<p>
													<strong>Complaint:</strong>{" "}
													{selectedPatient.complaint}
												</p>
												<p>
													<strong>Status:</strong>{" "}
													<span
														className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
															selectedPatient.status
														)}`}>
														{selectedPatient.status
															.replace("-", " ")
															.toUpperCase()}
													</span>
												</p>
											</div>
										</div>

										<div>
											<h3 className="font-medium text-gray-900 mb-3">
												Enter Vitals
											</h3>
											<div className="space-y-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Temperature (°F)
													</label>
													<input
														type="text"
														value={vitalsForm.temperature}
														onChange={(e) =>
															setVitalsForm({
																...vitalsForm,
																temperature: e.target.value,
															})
														}
														placeholder="e.g., 98.6"
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Blood Pressure (mmHg)
													</label>
													<input
														type="text"
														value={vitalsForm.bloodPressure}
														onChange={(e) =>
															setVitalsForm({
																...vitalsForm,
																bloodPressure: e.target.value,
															})
														}
														placeholder="e.g., 120/80"
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Heart Rate (bpm)
													</label>
													<input
														type="text"
														value={vitalsForm.heartRate}
														onChange={(e) =>
															setVitalsForm({
																...vitalsForm,
																heartRate: e.target.value,
															})
														}
														placeholder="e.g., 72"
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Oxygen Saturation (%)
													</label>
													<input
														type="text"
														value={vitalsForm.oxygen}
														onChange={(e) =>
															setVitalsForm({
																...vitalsForm,
																oxygen: e.target.value,
															})
														}
														placeholder="e.g., 98"
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Triage Notes
													</label>
													<textarea
														value={vitalsForm.notes}
														onChange={(e) =>
															setVitalsForm({
																...vitalsForm,
																notes: e.target.value,
															})
														}
														placeholder="Additional observations or notes..."
														rows={3}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>
												<button
													onClick={handleVitalsSubmit}
													className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
													Update Vitals & Forward to Doctor
												</button>
											</div>
										</div>
									</div>
								) : (
									<div className="text-center py-8">
										<User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
										<p className="text-gray-500">
											Select a patient from the queue to record their vitals
										</p>
										<button
											onClick={() => setActiveTab("queue")}
											className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
											Go to Patient Queue
										</button>
									</div>
								)}
							</div>
						)}

						{/* Notifications Tab */}
						{activeTab === "notifications" && (
							<div>
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									🔔 Notifications
								</h2>
								<div className="space-y-3">
									{notifications.map((notification) => (
										<div
											key={notification.id}
											className={`p-4 rounded-lg border ${
												notification.read
													? "bg-gray-50 border-gray-200"
													: "bg-blue-50 border-blue-200"
											}`}>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<p
														className={`text-sm ${
															notification.read
																? "text-gray-600"
																: "text-gray-900 font-medium"
														}`}>
														{notification.message}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														{notification.time}
													</p>
												</div>
												<div className="flex items-center space-x-2">
													{notification.type === "reassignment" && (
														<User className="w-4 h-4 text-blue-600" />
													)}
													{notification.type === "vitals-request" && (
														<Activity className="w-4 h-4 text-green-600" />
													)}
													{notification.type === "system" && (
														<AlertCircle className="w-4 h-4 text-orange-600" />
													)}
													{notification.type === "success" && (
														<CheckCircle className="w-4 h-4 text-green-600" />
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OPDNurseDashboard;
<NavLink to="/appointments" className="flex items-center gap-2">
	<Calendar className="h-5 w-5" />
	Schedule Appointments
</NavLink>;
