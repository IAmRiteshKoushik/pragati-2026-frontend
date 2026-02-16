import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import Noise from "@/components/sponsors/Noise";

export const Route = createFileRoute("/accommodation/")({
	component: RouteComponent,
});

// Type Declaration for form Payload
interface TFormPayload {
	is_amrita_campus: boolean;
	is_male: boolean;
	is_hosteller: boolean;
	room_preference: "single" | "4 sharing" | "dormitory";
	check_in_date: string;
	check_in_time: string;
	check_out_date: string;
	check_out_time: string;
	college_name: string;
	college_roll_number: string;
}

function RouteComponent() {
	const [step, setStep] = useState<1 | 2>(1);
	const [gender, setGender] = useState<"male" | "female" | null>(null);
	const [accommodationType, setAccommodationType] = useState<"shared" | null>(
		null,
	);
	const [rollNumber, setRollNumber] = useState("");
	const [collegeName, setCollegeName] = useState("");
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	// Helper function to check if college is Amrita campus
	const isAmritaCampus = (college: string): boolean => {
		return college.toLowerCase().includes("amrita");
	};

	// Helper function to transform form data to API payload
	const transformFormData = () => {
		// Split datetime-local format (YYYY-MM-DDTHH:MM) into date and time
		const [checkInDatePart, checkInTimePart] = checkInDate.split("T");
		const [checkOutDatePart, checkOutTimePart] = checkOutDate.split("T");

		const isAmrita = isAmritaCampus(collegeName);

		const payload: TFormPayload = {
			is_amrita_campus: isAmrita,
			is_male: gender === "male",
			is_hosteller: false,
			room_preference: "4 sharing",
			check_in_date: checkInDatePart,
			check_in_time: checkInTimePart,
			check_out_date: checkOutDatePart,
			check_out_time: checkOutTimePart,
			college_name: collegeName,
			college_roll_number: rollNumber,
		};

		return payload;
	};

	const handleProceedToTerms = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			gender &&
			accommodationType &&
			rollNumber &&
			collegeName &&
			checkInDate &&
			checkOutDate
		) {
			setStep(2);
		}
	};

	const handleFinalSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!termsAccepted) {
			return;
		}

		// Reset previous states
		setSubmitError(null);
		setSubmitSuccess(false);
		setIsSubmitting(true);

		try {
			// Transform form data to API payload
			const payload = transformFormData();

			// API request
			const response = await fetch("/api/v1/accommodation/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || `Server error: ${response.status}`,
				);
			}

			const _data = await response.json();

			// Set success state
			setSubmitSuccess(true);
			setSubmitError(null);

			// Optional: Reset form or redirect after success
			// You can add navigation logic here if needed
		} catch (error) {
			console.error("Submission error:", error);
			setSubmitError(
				error instanceof Error
					? error.message
					: "Failed to submit accommodation request. Please try again.",
			);
			setSubmitSuccess(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="bg-black w-screen h-screen max-sm:h-[110vh] overflow-scroll">
			<div className="relative z-10 w-full min-h-screen max-sm:h-[110vh] bg-black/50 backdrop-blur-[5px] backdrop-saturate-130 flex flex-col items-center gap-5 overflow-scroll">
				<Noise
					patternSize={50}
					patternScaleX={10}
					patternScaleY={10}
					patternRefreshInterval={2}
					patternAlpha={25}
				/>

				<motion.h1
					initial={{ translateY: 120, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
					className="z-20 text-zinc-200 text-8xl mt-5 font-jersey
              text-shadow-[-2px_-2px_0px_var(--color-red-400),2px_2px_0px_var(--color-blue-400)] max-sm:text-6xl"
				>
					Accommodation
				</motion.h1>

				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
					className="relative bg-black/50 flex flex-col justify-center items-center w-4/6 max-md:w-10/12 max-sm:w-11/12 backdrop-blur-2xl text-zinc-200 text-4xl font-jersey
              text-shadow-[2px_2px_0px_var(--color-blue-400)] py-10 border-3 border-purple-500 shadow-[0px_0px_10px_0px_var(--color-purple-500)]"
				>
					<Noise
						patternSize={50}
						patternScaleX={10}
						patternScaleY={10}
						patternRefreshInterval={2}
						patternAlpha={10}
					/>

					<span className="absolute top-0 left-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
					<span className="absolute top-0 right-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
					<span className="absolute bottom-0 left-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
					<span className="absolute bottom-0 right-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>

					<p className="text-center text-shadow-[2px_2px_0px_var(--color-blue-400)]">
						{step === 1
							? "Choose your Accommodation preferences"
							: "Terms & Conditions"}
					</p>

					{step === 1 ? (
						<form
							onSubmit={handleProceedToTerms}
							className="flex flex-col justify-center items-center gap-8 w-full p-6 pb-2"
						>
							{/* Gender Selection */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
								className="flex flex-col items-center gap-4"
							>
								<span className="text-2xl text-shadow-[1px_1px_0px_var(--color-blue-400)]">
									Select Gender
								</span>
								<div className="flex gap-12 justify-center">
									<motion.div
										whileHover={{ scale: 1.05 }}
										className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${gender === "male"
											? "scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] filter brightness-110"
											: "opacity-60 hover:opacity-100 hover:scale-105"
											}`}
										onClick={() => setGender("male")}
									>
										<img
											src="/accomodation/male-avatar.webp"
											alt="Male"
											className="w-28 h-28 object-contain"
										/>
										<span className="text-xl tracking-wider">MALE</span>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${gender === "female"
											? "scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] filter brightness-110"
											: "opacity-60 hover:opacity-100 hover:scale-105"
											}`}
										onClick={() => setGender("female")}
									>
										<img
											src="/accomodation/female-avatar.webp"
											alt="Female"
											className="w-28 h-28 object-contain"
										/>
										<span className="text-xl tracking-wider">FEMALE</span>
									</motion.div>
								</div>
							</motion.div>

							{/* Accommodation Type */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.8 }}
								className="flex flex-col items-center gap-4 w-full"
							>
								<span className="text-2xl">Select Type</span>
								<div className="flex gap-6 max-sm:flex-col items-center">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										type="button"
										onClick={() => setAccommodationType("shared")}
										className={`px-6 py-2 border-2 border-cyan-400 text-xl font-jersey tracking-wide transition-all duration-300 ${accommodationType === "shared"
											? "bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-105"
											: "text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee66]"
											}`}
									>
										4 Sharing
									</motion.button>
								</div>
							</motion.div>

							{/* Roll Number Input */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.0 }}
								className="flex flex-col items-center gap-4 w-full max-w-md"
							>
								<span className="text-2xl">College Roll Number</span>
								<input
									type="text"
									value={rollNumber}
									onChange={(e) => setRollNumber(e.target.value)}
									placeholder="Enter your roll number"
									className="w-full px-4 py-2 bg-black/50 border-2 border-cyan-400 text-zinc-200 text-lg font-sans placeholder-zinc-500 focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition-all duration-300"
									required
								/>
							</motion.div>

							{/* College Name Input */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.2 }}
								className="flex flex-col items-center gap-4 w-full max-w-md"
							>
								<span className="text-2xl">College Name</span>
								<input
									type="text"
									value={collegeName}
									onChange={(e) => setCollegeName(e.target.value)}
									placeholder="Enter your college name"
									className="w-full px-4 py-2 bg-black/50 border-2 border-cyan-400 text-zinc-200 text-lg font-sans placeholder-zinc-500 focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition-all duration-300"
									required
								/>
							</motion.div>

							{/* Check-in Date & Time */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.4 }}
								className="flex flex-col items-center gap-4 w-full max-w-md"
							>
								<span className="text-2xl">Check-in Date & Time</span>
								<input
									type="datetime-local"
									value={checkInDate}
									onChange={(e) => setCheckInDate(e.target.value)}
									className="w-full px-4 py-2 bg-black/50 border-2 border-cyan-400 text-zinc-200 text-lg font-sans focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition-all duration-300"
									required
								/>
								<p className="text-sm text-zinc-400 text-center text-shadow-none">
									Check-in available from 1 evening prior at 6:00 PM
								</p>
							</motion.div>

							{/* Check-out Date/Time */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 1.6 }}
								className="flex flex-col items-center gap-4 w-full max-w-md"
							>
								<span className="text-2xl">Check-out Date & Time</span>
								<input
									type="datetime-local"
									value={checkOutDate}
									onChange={(e) => setCheckOutDate(e.target.value)}
									className="w-full px-4 py-2 bg-black/50 border-2 border-cyan-400 text-zinc-200 text-lg font-sans focus:outline-none focus:shadow-[0_0_15px_#22d3ee] transition-all duration-300"
									required
								/>
								<p className="text-sm text-zinc-400 text-center text-shadow-none">
									Check-out available till 1 day extra at 7:00 AM
								</p>
							</motion.div>

							<motion.button
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 1.8, type: "spring" }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								disabled={
									!gender ||
									!accommodationType ||
									!rollNumber ||
									!collegeName ||
									!checkInDate ||
									!checkOutDate
								}
								className={`mt-4 px-10 py-3 text-2xl font-jersey tracking-wider border-2 transition-all duration-300 transform ${!gender ||
									!accommodationType ||
									!rollNumber ||
									!collegeName ||
									!checkInDate ||
									!checkOutDate
									? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
									: "bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)]"
									}`}
							>
								PROCEED
							</motion.button>
						</form>
					) : (
						<form
							onSubmit={handleFinalSubmit}
							className="flex flex-col justify-center items-center gap-6 w-full p-6 pb-2"
						>
							{/* Terms and Conditions Content */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								className="w-full text-shadow-none max-w-3xl bg-black/30 border border-cyan-400/30 rounded-lg p-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent"
							>
								<div className="text-zinc-300 text-base font-sans leading-relaxed space-y-3">
									<h3 className="text-xl font-bold text-cyan-400 mb-4">
										PRAGATI '26 - Accommodation Terms & Conditions
									</h3>
									<ul className="list-disc list-inside space-y-2">
										<li>
											Accommodation is available only for registered PRAGATI '26
											participants and is subject to availability.
										</li>
										<li>
											Accommodation will be provided within campus hostel
											facilities, with separate arrangements for boys and girls.
										</li>
										<li>
											Accommodation will be available from 19th February, 6:00
											PM and will conclude by 7:00 AM on 22nd February. No
											extension of stay is permitted.
										</li>
										<li>
											Food is not included and will be available on campus on a
											paid basis.
										</li>
										<li>
											Participants must book accommodation individually, even
											for group events.
										</li>
										<li>
											A valid college ID and PRAGATI '26 ID card must be
											produced at check-in and worn at all times on campus.
										</li>
										<li>
											Participants must strictly adhere to hostel rules,
											timings, and discipline.
										</li>
										<li>
											Alcohol, smoking, drugs, and prohibited substances are
											strictly prohibited within the campus.
										</li>
										<li>
											Any damage to hostel or campus property will be charged to
											the concerned participant.
										</li>
										<li>
											The institution and organizers are not responsible for
											loss or theft of personal belongings.
										</li>
										<li>
											Violation of these terms may result in cancellation of
											accommodation, disqualification from events, and removal
											from campus.
										</li>
									</ul>
									<p className="mt-4 text-cyan-300 font-semibold">
										By proceeding with accommodation booking, the participant
										confirms acceptance of the above Terms & Conditions.
									</p>
									<div className="mt-6 pt-4 border-t border-cyan-400/30">
										<p className="font-semibold text-cyan-400 mb-2">
											Student Representative (Girls)
										</p>
										<p>Athulya A: 8304937106</p>
										<p>M Gayathri: 97892 31097</p>
										<p className="font-semibold text-cyan-400 mt-4 mb-2">
											Student Representative (Boys)
										</p>
										<p>Sabarinathan B: 9342452717</p>
										<p>Sri Ganeshram: 9500530956</p>
									</div>
								</div>
							</motion.div>

							{/* Acceptance Checkbox */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
								className="flex items-center gap-3 cursor-pointer"
								onClick={() => setTermsAccepted(!termsAccepted)}
							>
								<div
									className={`w-6 h-6 border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 ${termsAccepted
										? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
										: "bg-transparent"
										}`}
								>
									{termsAccepted && (
										<svg
											className="w-4 h-4 text-black"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<title>Terms and Conditions</title>
											<path d="M5 13l4 4L19 7"></path>
										</svg>
									)}
								</div>
								<span className="text-lg text-zinc-300 select-none text-shadow-none">
									I accept the Terms & Conditions
								</span>
							</motion.div>

							{/* Error Message */}
							{submitError && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="w-full max-w-md px-4 py-3 bg-red-500/20 border border-red-500 text-red-300 text-center text-shadow-none rounded"
								>
									{submitError}
								</motion.div>
							)}

							{/* Success Message */}
							{submitSuccess && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="w-full max-w-md px-4 py-3 bg-green-500/20 border border-green-500 text-green-300 text-center text-shadow-none rounded"
								>
									Accommodation request submitted successfully!
								</motion.div>
							)}

							{/* Navigation Buttons */}
							<div className="flex gap-4 mt-2">
								<motion.button
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type="button"
									onClick={() => {
										setStep(1);
										setSubmitError(null);
										setSubmitSuccess(false);
									}}
									disabled={isSubmitting}
									className="px-8 py-3 text-xl font-jersey tracking-wider border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									BACK
								</motion.button>
								<motion.button
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type="submit"
									disabled={!termsAccepted || isSubmitting}
									className={`px-8 py-3 text-xl font-jersey tracking-wider border-2 transition-all duration-300 transform ${!termsAccepted || isSubmitting
										? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
										: "bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)]"
										}`}
								>
									{isSubmitting ? "SUBMITTING..." : "SUBMIT"}
								</motion.button>
							</div>
						</form>
					)}
				</motion.div>
			</div>

			<video
				className="hidden lg:block fixed inset-0 z-0 w-screen h-screen object-cover"
				autoPlay
				loop
				muted
			>
				<source src="accomodation/bg.webm" type="video/webm" />
			</video>

			<video
				className="lg:hidden fixed inset-0 z-0 w-screen h-screen object-cover"
				autoPlay
				loop
				muted
			>
				<source src="accomodation/bg-small.webm" type="video/webm" />
			</video>
		</section>
	);
}
