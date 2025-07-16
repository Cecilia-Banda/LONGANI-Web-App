import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	Shield,
	ArrowRight,
	Heart,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [role, setRole] = useState<import("../contexts/AuthContext").UserRole>('admin');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (!isLogin && password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

			try {
				if (isLogin) {
					await login(email, password, role);
					navigate("/dashboard");
				} else {
					// Handle signup logic here
					console.log("Signup:", { fullName, email, password, role });
					// For now, just switch to login
					setIsLogin(true);
					setError("");
				}
			} catch (err) {
				setError(
					isLogin
						? "Invalid email or password"
						: "Signup failed. Please try again."
				);
			} finally {
				setLoading(false);
			}
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setError("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setFullName("");
	};

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Background Design */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Gradient Orbs */}
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
				<div className="absolute top-40 left-40 w-60 h-60 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

				{/* Geometric Shapes */}
				<div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
				<div className="absolute bottom-20 left-20 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-bounce delay-500"></div>
				<div className="absolute top-1/2 right-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-bounce delay-1000"></div>

				{/* Grid Pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 w-full max-w-md mx-4">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
						<Heart className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						{isLogin ? "Welcome Back" : "Join Our Team"}
					</h1>
					<p className="text-gray-600">
						{isLogin
							? "Sign in to access your Longani dashboard"
							: "Create your account to get started"}
					</p>
				</div>

				{/* Form Container */}
				<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Role Selection */}
						<div>
							<label
								htmlFor="role"
								className="block text-sm font-semibold text-gray-700 mb-2">
								<Shield className="inline w-4 h-4 mr-2" />
								Select Role
							</label>
			<select
				id="role"
				value={role || ''}
				onChange={(e) => setRole(e.target.value as import("../contexts/AuthContext").UserRole)}
				className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
				<option value="admin">Admin</option>
				<option value="record officer">Record Officer</option>
				<option value="nurse">Nurse</option>
				<option value="doctor">Doctor</option>
			</select>
						</div>

						{/* Full Name (Signup only) */}
						{!isLogin && (
							<div>
								<label
									htmlFor="fullName"
									className="block text-sm font-semibold text-gray-700 mb-2">
									<User className="inline w-4 h-4 mr-2" />
									Full Name
								</label>
								<input
									id="fullName"
									type="text"
									required
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
									placeholder="Enter your full name"
								/>
							</div>
						)}

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-semibold text-gray-700 mb-2">
								<Mail className="inline w-4 h-4 mr-2" />
								Email Address
							</label>
							<input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
								placeholder="Enter your email"
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-gray-700 mb-2">
								<Lock className="inline w-4 h-4 mr-2" />
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{/* Confirm Password (Signup only) */}
						{!isLogin && (
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-semibold text-gray-700 mb-2">
									<Lock className="inline w-4 h-4 mr-2" />
									Confirm Password
								</label>
								<div className="relative">
									<input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										placeholder="Confirm your password"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
										{showConfirmPassword ? (
											<EyeOff size={20} />
										) : (
											<Eye size={20} />
										)}
									</button>
								</div>
							</div>
						)}

						{/* Remember Me & Forgot Password (Login only) */}
						{isLogin && (
							<div className="flex items-center justify-between">
								<label className="flex items-center text-sm text-gray-700">
									<input
										type="checkbox"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<span className="ml-2">Remember me</span>
								</label>
								<Link
									to="/forgot-password"
									className="text-sm text-blue-600 hover:text-blue-700 font-medium">
									Forgot password?
								</Link>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center ${
								loading ? "opacity-50 cursor-not-allowed" : ""
							}`}>
							{loading ? (
								<div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							) : (
								<>
									{isLogin ? "Sign In" : "Create Account"}
									<ArrowRight className="ml-2 w-4 h-4" />
								</>
							)}
						</button>
					</form>

					{/* Error Message */}
					{error && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
							<p className="text-red-600 text-sm text-center">{error}</p>
						</div>
					)}

					{/* Toggle Mode */}
					<div className="mt-6 text-center">
						<p className="text-gray-600 text-sm">
							{isLogin ? "Don't have an account?" : "Already have an account?"}
							<button
								type="button"
								onClick={toggleMode}
								className="ml-1 text-blue-600 hover:text-blue-700 font-semibold">
								{isLogin ? "Sign up" : "Sign in"}
							</button>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center space-y-4">
					<p className="text-gray-500 text-sm italic">
						Authorized users only. All actions are logged and monitored for
						security and compliance.
					</p>
					<p className="text-sm text-gray-600">
						Need help?{" "}
						<a
							href="mailto:support@healthsystem.com"
							className="text-blue-600 hover:text-blue-700 font-medium">
							Contact Support
						</a>
					</p>
				</div>
			</div>

			{/* Custom CSS for grid pattern */}
			<style>{`
				.bg-grid-pattern {
					background-image: linear-gradient(
							rgba(0, 0, 0, 0.1) 1px,
							transparent 1px
						),
						linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
					background-size: 20px 20px;
				}
			`}</style>
		</div>
	);
};

export default Login;
