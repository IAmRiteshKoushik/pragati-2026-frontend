import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Noise from "@/components/sponsors/Noise";
import {
	type AccommodationPayload,
	AccommodationService,
	type AccommodationStatus,
} from "@/services/AccommodationService";

export const Route = createFileRoute("/accommodation/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [eligibility, setEligibility] = useState<
		AccommodationStatus | "LOADING" | "ERROR"
	>("LOADING");
	const [step, setStep] = useState<1 | 2>(1);
	const [submitting, setSubmitting] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);

	useEffect(() => {
		AccommodationService.checkExists()
			.then((status) => setEligibility(status))
			.catch(() => setEligibility("ERROR"));
	}, []);

	// Form fields
	const [gender, setGender] = useState<"male" | "female" | null>(null);
	const [isAmritaCampus, setIsAmritaCampus] = useState<boolean | null>(null);
	const [collegeName, setCollegeName] = useState("");
	const [collegeRollNumber, setCollegeRollNumber] = useState("");
	const [checkInDate, setCheckInDate] = useState("");
	const [checkInTime, setCheckInTime] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [checkOutTime, setCheckOutTime] = useState("");

	const handleAmritaToggle = (value: boolean) => {
		setIsAmritaCampus(value);
		if (value) {
			setCollegeName("Amrita Vishwa Vidyapeetham");
		} else {
			setCollegeName("");
		}
	};

	const isFormValid =
		gender !== null &&
		isAmritaCampus !== null &&
		collegeName.trim() !== "" &&
		collegeRollNumber.trim() !== "" &&
		checkInDate !== "" &&
		checkInTime !== "" &&
		checkOutDate !== "" &&
		checkOutTime !== "";

	const handleProceedToTerms = (e: React.FormEvent) => {
		e.preventDefault();
		if (isFormValid) {
			setStep(2);
		}
	};

	const handleFinalSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!termsAccepted || !isFormValid) return;

		const payload: AccommodationPayload = {
			is_male: gender === "male",
			is_hosteller: false,
			is_amrita_campus: isAmritaCampus === true,
			college_name: collegeName.trim(),
			college_roll_number: collegeRollNumber.trim(),
			room_preference: "4 sharing",
			check_in_date: checkInDate,
			check_in_time: checkInTime,
			check_out_date: checkOutDate,
			check_out_time: checkOutTime,
		};

		setSubmitting(true);
		try {
			const res = await AccommodationService.submit(payload);
			toast.success(res.message || "Form submitted successfully!");
			router.navigate({ to: "/" });
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Submission failed";
			toast.error(message);
		} finally {
			setSubmitting(false);
		}
	};

	// Shared button style helpers
	const toggleBtnClass = (active: boolean) =>
		`px-6 py-2 border-2 border-cyan-400 text-xl font-jersey tracking-wide transition-all duration-300 ${
			active
				? "bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-105"
				: "text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee66]"
		}`;

	return (
		<section className="bg-black w-screen min-h-screen">
			<div className="relative z-10 w-full min-h-screen bg-black/50 backdrop-blur-[5px] backdrop-saturate-130 flex flex-col items-center gap-5 pb-10">
				<motion.button
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					onClick={() => router.navigate({ to: "/" })}
					className="hidden sm:flex absolute top-4 left-4 z-30 items-center gap-2 px-4 py-2 bg-black/60 border-2 border-cyan-400/50 text-cyan-400 text-sm font-jersey tracking-wider hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-[0_0_10px_#22d3ee66] transition-all duration-300"
				>
					← HOME
				</motion.button>

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
					className="z-20 text-zinc-200 text-8xl mt-10 font-jersey
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
						{eligibility === "ELIGIBLE" && step === 1
							? "Choose your Accommodation preferences"
							: eligibility === "ELIGIBLE" && step === 2
								? "Terms & Conditions"
								: "Accommodation"}
					</p>

					{eligibility === "LOADING" && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center gap-6 py-16 text-shadow-none"
						>
							<div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
							<span className="text-xl text-zinc-400 font-sans">
								Checking eligibility...
							</span>
						</motion.div>
					)}

					{eligibility === "ERROR" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex flex-col items-center gap-6 py-16 text-shadow-none"
						>
							<span className="text-6xl">⚠️</span>
							<p className="text-xl text-red-400 font-sans text-center max-w-md">
								Something went wrong. Please try again later.
							</p>
						</motion.div>
					)}

					{eligibility === "NOT_REGISTERED" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="flex flex-col items-center gap-6 py-16 text-shadow-none"
						>
							<span className="text-6xl">🎟️</span>
							<p className="text-xl text-yellow-300 font-sans text-center max-w-md leading-relaxed">
								You need to register for at least <strong>one event</strong>{" "}
								before you can apply for accommodation.
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => router.navigate({ to: "/events" })}
								className="px-8 py-3 text-xl font-jersey tracking-wider border-2 bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)] transition-all duration-300"
							>
								BROWSE EVENTS
							</motion.button>
						</motion.div>
					)}

					{eligibility === "FILLED_ACCOMMODATION" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="flex flex-col items-center gap-6 py-16 text-shadow-none"
						>
							<span className="text-6xl">✅</span>
							<p className="text-xl text-green-400 font-sans text-center max-w-md leading-relaxed">
								You have already submitted your accommodation form. See you at
								PRAGATI '26!
							</p>
						</motion.div>
					)}

					{eligibility === "ELIGIBLE" && step === 1 ? (
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
										className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${
											gender === "male"
												? "scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] filter brightness-110"
												: "opacity-60 hover:opacity-100 hover:scale-105"
										}`}
										onClick={() => setGender("male")}
									>
										<img
											src="/accomodation/male-avatar.png"
											alt="Male"
											className="w-28 h-28 object-contain"
										/>
										<span className="text-xl tracking-wider">MALE</span>
									</motion.div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${
											gender === "female"
												? "scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] filter brightness-110"
												: "opacity-60 hover:opacity-100 hover:scale-105"
										}`}
										onClick={() => setGender("female")}
									>
										<img
											src="/accomodation/female-avatar.png"
											alt="Female"
											className="w-28 h-28 object-contain"
										/>
										<span className="text-xl tracking-wider">FEMALE</span>
									</motion.div>
								</div>
							</motion.div>

							{/* Amrita Campus Toggle */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
								className="flex flex-col items-center gap-4"
							>
								<span className="text-2xl">From Amrita Campus?</span>
								<div className="flex gap-6">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										type="button"
										onClick={() => handleAmritaToggle(true)}
										className={toggleBtnClass(isAmritaCampus === true)}
									>
										Yes
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										type="button"
										onClick={() => handleAmritaToggle(false)}
										className={toggleBtnClass(isAmritaCampus === false)}
									>
										No
									</motion.button>
								</div>
							</motion.div>

							{/* College Name */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.75 }}
								className="flex flex-col items-center gap-3 w-full max-w-md"
							>
								<span className="text-2xl">College Name</span>
								<input
									type="text"
									value={collegeName}
									onChange={(e) => setCollegeName(e.target.value)}
									placeholder="Enter your college name"
									disabled={isAmritaCampus === true}
									className={`w-full px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                    placeholder:text-zinc-500 focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                    outline-none transition-all duration-300 text-shadow-none ${isAmritaCampus === true ? "opacity-60 cursor-not-allowed" : ""}`}
								/>
							</motion.div>

							{/* College Roll Number */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.8 }}
								className="flex flex-col items-center gap-3 w-full max-w-md"
							>
								<span className="text-2xl">College Roll Number</span>
								<input
									type="text"
									value={collegeRollNumber}
									onChange={(e) => setCollegeRollNumber(e.target.value)}
									placeholder="Enter your roll number"
									className="w-full px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                    placeholder:text-zinc-500 focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                    outline-none transition-all duration-300 text-shadow-none"
								/>
							</motion.div>

							{/* Availability Warning */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.83 }}
								className="flex items-center gap-3 w-full max-w-md bg-yellow-500/10 border border-yellow-500/40 rounded-lg px-4 py-3 text-shadow-none"
							>
								<svg
									className="w-6 h-6 text-yellow-400 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<title>Warning</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v2m0 4h.01M10.29 3.86l-8.58 14.88A1 1 0 002.58 20h18.84a1 1 0 00.87-1.26L13.71 3.86a1 1 0 00-1.42 0z"
									/>
								</svg>
								<span className="text-yellow-300 text-sm font-sans leading-snug">
									Accommodation is available from{" "}
									<strong>19th Feb, 6:00 PM</strong> to{" "}
									<strong>22nd Feb, 10:00 AM</strong> only.
								</span>
							</motion.div>

							{/* Expected Check-in Date & Time */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.85 }}
								className="flex flex-col items-center gap-3 w-full max-w-md"
							>
								<span className="text-2xl">Expected Check-in</span>
								<div className="flex gap-4 w-full max-sm:flex-col">
									<input
										type="date"
										value={checkInDate}
										min="2026-02-19"
										max="2026-02-22"
										onChange={(e) => setCheckInDate(e.target.value)}
										className="flex-1 px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                      focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                      outline-none transition-all duration-300 text-shadow-none"
									/>
									<input
										type="time"
										value={checkInTime}
										onChange={(e) => setCheckInTime(e.target.value)}
										className="flex-1 px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                      focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                      outline-none transition-all duration-300 text-shadow-none"
									/>
								</div>
							</motion.div>

							{/* Expected Check-out Date & Time */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.9 }}
								className="flex flex-col items-center gap-3 w-full max-w-md"
							>
								<span className="text-2xl">Expected Check-out</span>
								<div className="flex gap-4 w-full max-sm:flex-col">
									<input
										type="date"
										value={checkOutDate}
										min="2026-02-19"
										max="2026-02-22"
										onChange={(e) => setCheckOutDate(e.target.value)}
										className="flex-1 px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                      focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                      outline-none transition-all duration-300 text-shadow-none"
									/>
									<input
										type="time"
										value={checkOutTime}
										onChange={(e) => setCheckOutTime(e.target.value)}
										className="flex-1 px-4 py-2 bg-black/40 border-2 border-cyan-400/50 text-zinc-200 text-lg font-sans
                      focus:border-cyan-400 focus:shadow-[0_0_10px_#22d3ee66]
                      outline-none transition-all duration-300 text-shadow-none"
									/>
								</div>
							</motion.div>

							<motion.button
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 1.05, type: "spring" }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								disabled={!isFormValid}
								className={`mt-4 px-10 py-3 text-2xl font-jersey tracking-wider border-2 transition-all duration-300 transform ${
									!isFormValid
										? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
										: "bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)]"
								}`}
							>
								PROCEED
							</motion.button>
						</form>
					) : eligibility === "ELIGIBLE" && step === 2 ? (
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
									className={`w-6 h-6 border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 ${
										termsAccepted
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

							{/* Navigation Buttons */}
							<div className="flex gap-4 mt-2">
								<motion.button
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type="button"
									onClick={() => setStep(1)}
									className="px-8 py-3 text-xl font-jersey tracking-wider border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
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
									disabled={!termsAccepted || submitting}
									className={`px-8 py-3 text-xl font-jersey tracking-wider border-2 transition-all duration-300 transform ${
										!termsAccepted || submitting
											? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
											: "bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)]"
									}`}
								>
									{submitting ? "SUBMITTING..." : "SUBMIT"}
								</motion.button>
							</div>
						</form>
					) : null}
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
