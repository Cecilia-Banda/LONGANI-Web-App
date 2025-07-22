import React, { useState } from "react";
import {
	Calendar,
	Clock,
	User,
	FileText,
	Bell,
	Activity,
	Plus,
	Search,
	Filter,
	AlertTriangle,
	CheckCircle,
	Users,
	TrendingUp,
	Stethoscope,
	Pill,
	TestTube,
} from "lucide-react";

type PatientRecord = {
	id: number;
	name: string;
	age: number;
	lastVisit: string;
	condition: string;
	vitals: { bp: string; hr: string; temp: string };
};

const DoctorDashboard = () => {
	const [activeTab, setActiveTab] = useState("appointments");
	const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
	const [notifications, setNotifications] = useState(3);

	// Sample data
	const todaysAppointments = [
		{
			id: 1,
			time: "09:00",
			patient: "Johnson Kamboe",
			age: 34,
			condition: "Routine Checkup",
			status: "waiting",
			urgent: false,
		},
		
		{
			id: 3,
			time: "10:00",
			patient: "Emmaculate Walasa",
			age: 28,
			condition: "Chest Pain",
			status: "scheduled",
			urgent: true,
		},
		{
			id: 4,
			time: "10:30",
			patient: "Robert Davis",
			age: 52,
			condition: "Diabetes Review",
			status: "scheduled",
			urgent: false,
		},
	];

	const patientRecords = [
		{
			id: 1,
			name: "Sarah Johnson",
			age: 34,
			lastVisit: "2024-06-15",
			condition: "Healthy",
			vitals: { bp: "120/80", hr: "72", temp: "98.6°F" },
		},
		{
			id: 2,
			name: "Michael Chen",
			age: 45,
			lastVisit: "2024-06-20",
			condition: "Hypertension",
			vitals: { bp: "140/90", hr: "78", temp: "98.4°F" },
		},
		{
			id: 3,
			name: "Emma Williams",
			age: 28,
			lastVisit: "2024-06-18",
			condition: "Anxiety",
			vitals: { bp: "118/75", hr: "88", temp: "98.7°F" },
		},
	];

	const alerts = [
		{
			id: 1,
			type: "urgent",
			message: "Patient William Nundu reporting severe chest pain",
			time: "08:45",
		},
		{
			id: 2,
			type: "lab",
			message: "Lab results ready for Michael Chen",
			time: "08:30",
		},
		{
			id: 3,
			type: "follow-up",
			message: "Follow-up reminder for Robert Davis",
			time: "08:15",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "waiting":
				return "bg-yellow-100 text-yellow-800";
			case "in-progress":
				return "bg-blue-100 text-blue-800";
			case "scheduled":
				return "bg-gray-100 text-gray-800";
			case "completed":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getAlertColor = (type: string) => {
		switch (type) {
			case "urgent":
				return "bg-red-50 border-red-200 text-red-800";
			case "lab":
				return "bg-blue-50 border-blue-200 text-blue-800";
			case "follow-up":
				return "bg-yellow-50 border-yellow-200 text-yellow-800";
			default:
				return "bg-gray-50 border-gray-200 text-gray-800";
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
								Doctor Dashboard
							</h1>
							<p className="text-sm text-gray-600">
								Welcome back, Doctor!
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-right">
								<p className="text-sm font-medium text-gray-900">
									{new Date().toLocaleTimeString()}
								</p>
								<p className="text-xs text-gray-500">
									{new Date().toLocaleDateString()}
								</p>
							</div>
							<div className="relative">
								<Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
								{notifications > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{notifications}
									</span>
								)}
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
							{
								id: "appointments",
								label: "📅 Today's Appointments",
								icon: Calendar,
							},
							{ id: "patients", label: "👤 Patient Records", icon: User },
							{
								id: "consultation",
								label: "📝 Consultation Tools",
								icon: FileText,
							},
							{ id: "alerts", label: "🔔 Alerts & Notifications", icon: Bell },
							{ id: "activity", label: "📊 Activity Summary", icon: Activity },
						].map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								onClick={() => setActiveTab(id)}
								className={`flex items-center space-x-2 px-4 py-3 border rounded-md font-medium text-sm ${
									activeTab === id
										? "border-blue-500 text-blue-600 bg-white shadow"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-white"
								}`}>
								<Icon className="w-4 h-4" />
								<span>{label}</span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Today's Appointments */}
				{activeTab === "appointments" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-900">
								Today's Appointments
							</h2>
							<div className="flex space-x-2">
								<button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
									<Filter className="h-4 w-4" />
									<span>Filter</span>
								</button>
								<button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
									<Plus className="h-4 w-4" />
									<span>Add Appointment</span>
								</button>
							</div>
						</div>

						<div className="grid gap-4">
							{todaysAppointments.map((appointment) => (
								<div
									key={appointment.id}
									className="bg-white rounded-lg shadow-sm border p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="flex items-center space-x-2">
												<Clock className="h-5 w-5 text-gray-400" />
												<span className="font-medium text-gray-900">
													{appointment.time}
												</span>
											</div>
											<div>
												<h3 className="font-medium text-gray-900">
													{appointment.patient}
												</h3>
												<p className="text-sm text-gray-600">
													Age: {appointment.age} • {appointment.condition}
												</p>
											</div>
											{appointment.urgent && (
												<AlertTriangle className="h-5 w-5 text-red-500" />
											)}
										</div>
										<div className="flex items-center space-x-3">
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
													appointment.status
												)}`}>
												{appointment.status.replace("-", " ")}
											</span>
											<button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
												Start Consultation
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Patient Records */}
				{activeTab === "patients" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-900">
								Patient Records
							</h2>
							<div className="flex space-x-2">
								<div className="relative">
									<Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										placeholder="Search patients..."
										className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>
						</div>

						<div className="grid gap-4">
							{patientRecords.map((patient) => (
								<div
									key={patient.id}
									className="bg-white rounded-lg shadow-sm border p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
												<User className="h-6 w-6 text-blue-600" />
											</div>
											<div>
												<h3 className="font-medium text-gray-900">
													{patient.name}
												</h3>
												<p className="text-sm text-gray-600">
													Age: {patient.age} • Last Visit: {patient.lastVisit}
												</p>
												<p className="text-sm text-gray-600">
													Condition: {patient.condition}
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-6">
											<div className="text-sm">
												<div className="text-gray-600">Vitals:</div>
												<div className="text-gray-900">
													BP: {patient.vitals.bp}
												</div>
												<div className="text-gray-900">
													HR: {patient.vitals.hr}
												</div>
												<div className="text-gray-900">
													Temp: {patient.vitals.temp}
												</div>
											</div>
											<button
												onClick={() => setSelectedPatient(patient)}
												className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
												View Full Record
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Consultation Tools */}
				{activeTab === "consultation" && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-900">
							Consultation Tools
						</h2>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<FileText className="h-6 w-6 text-blue-600" />
									<h3 className="font-medium text-gray-900">Add Diagnosis</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Update patient diagnosis and medical conditions
								</p>
								<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
									Add Diagnosis
								</button>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<Pill className="h-6 w-6 text-green-600" />
									<h3 className="font-medium text-gray-900">
										Prescribe Medication
									</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Add new prescriptions and manage medications
								</p>
								<button className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
									Prescribe
								</button>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<TestTube className="h-6 w-6 text-purple-600" />
									<h3 className="font-medium text-gray-900">Request Tests</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Order lab tests and imaging studies
								</p>
								<button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700">
									Request Tests
								</button>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<Activity className="h-6 w-6 text-orange-600" />
									<h3 className="font-medium text-gray-900">Update Vitals</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Record patient vital signs and measurements
								</p>
								<button className="w-full px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
									Update Vitals
								</button>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<FileText className="h-6 w-6 text-gray-600" />
									<h3 className="font-medium text-gray-900">Clinical Notes</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Add consultation notes and observations
								</p>
								<button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700">
									Add Notes
								</button>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-4">
									<Calendar className="h-6 w-6 text-indigo-600" />
									<h3 className="font-medium text-gray-900">Follow-up Care</h3>
								</div>
								<p className="text-sm text-gray-600 mb-4">
									Schedule follow-up appointments and reminders
								</p>
								<button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
									Schedule Follow-up
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Alerts & Notifications */}
				{activeTab === "alerts" && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-900">
							Alerts & Notifications
						</h2>

						<div className="space-y-4">
							{alerts.map((alert) => (
								<div
									key={alert.id}
									className={`rounded-lg border p-4 ${getAlertColor(
										alert.type
									)}`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											{alert.type === "urgent" && (
												<AlertTriangle className="h-5 w-5" />
											)}
											{alert.type === "lab" && <TestTube className="h-5 w-5" />}
											{alert.type === "follow-up" && (
												<Calendar className="h-5 w-5" />
											)}
											<div>
												<p className="font-medium">{alert.message}</p>
												<p className="text-sm opacity-75">{alert.time}</p>
											</div>
										</div>
										<button className="text-sm underline hover:no-underline">
											View Details
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Activity Summary */}
				{activeTab === "activity" && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-900">
							Activity Summary
						</h2>

						<div className="grid md:grid-cols-3 gap-6">
							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-2">
									<Users className="h-6 w-6 text-blue-600" />
									<h3 className="font-medium text-gray-900">Patients Today</h3>
								</div>
								<div className="text-3xl font-bold text-gray-900">8</div>
								<p className="text-sm text-gray-600">5 completed, 3 remaining</p>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-2">
									<TrendingUp className="h-6 w-6 text-green-600" />
									<h3 className="font-medium text-gray-900">Weekly Average</h3>
								</div>
								<div className="text-3xl font-bold text-gray-900">32</div>
								<p className="text-sm text-gray-600">patients per week</p>
							</div>

							<div className="bg-white rounded-lg shadow-sm border p-6">
								<div className="flex items-center space-x-3 mb-2">
									<Activity className="h-6 w-6 text-purple-600" />
									<h3 className="font-medium text-gray-900">
										Common Conditions
									</h3>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Hypertension</span>
										<span className="font-medium">25%</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Diabetes</span>
										<span className="font-medium">18%</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Routine Checkup</span>
										<span className="font-medium">30%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Patient Detail Modal */}
			{selectedPatient && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold text-gray-900">
									Patient Record
								</h2>
								<button
									onClick={() => setSelectedPatient(null)}
									className="text-gray-400 hover:text-gray-600">
									×
								</button>
							</div>

							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
										<User className="h-8 w-8 text-blue-600" />
									</div>
									<div>
										<h3 className="text-lg font-medium text-gray-900">
											{selectedPatient.name}
										</h3>
										<p className="text-gray-600">Age: {selectedPatient.age}</p>
										<p className="text-gray-600">
											Last Visit: {selectedPatient.lastVisit}
										</p>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-medium text-gray-900 mb-3">
											Current Vitals
										</h4>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-gray-600">Blood Pressure:</span>
												<span className="font-medium">
													{selectedPatient.vitals.bp}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Heart Rate:</span>
												<span className="font-medium">
													{selectedPatient.vitals.hr}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Temperature:</span>
												<span className="font-medium">
													{selectedPatient.vitals.temp}
												</span>
											</div>
										</div>
									</div>

									<div>
										<h4 className="font-medium text-gray-900 mb-3">
											Medical History
										</h4>
										<div className="space-y-2">
											<div className="text-sm">
												<span className="text-gray-600">
													Current Condition:
												</span>
												<span className="ml-2 font-medium">
													{selectedPatient.condition}
												</span>
											</div>
											<div className="text-sm">
												<span className="text-gray-600">Allergies:</span>
												<span className="ml-2">None reported</span>
											</div>
											<div className="text-sm">
												<span className="text-gray-600">Medications:</span>
												<span className="ml-2">See prescription history</span>
											</div>
										</div>
									</div>
								</div>

								<div className="flex space-x-3">
									<button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
										Update Record
									</button>
									<button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
										Print Summary
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DoctorDashboard;
