import { ChevronLeft, ChevronRight, QrCode, User, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import type { Ticket } from "@/types/ticketTypes";

interface TicketSectionProps {
	data: Ticket[] | undefined;
	isLoading: boolean;
	error: Error | null;
}

export default function TicketSection({
	data,
	isLoading,
	error,
}: TicketSectionProps) {
	const { user } = useAuthStore();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [qrModal, setQrModal] = useState<{
		scheduleId: string;
		scheduleIndex: number;
	} | null>(null);

	const handlePrevious = () => {
		if (!data) return;
		setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
	};

	const handleNext = () => {
		if (!data) return;
		setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
	};

	if (isLoading) {
		return (
			<div className="text-center py-12">
				<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#a855f7] border-t-transparent"></div>
				<p className="mt-4 text-white/70 font-vcr text-sm">
					Loading tickets...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-400 font-vcr">
					Unable to load Registered Events: {error.message}
				</p>
				<p className="text-white/70 text-sm mt-2 font-vcr">
					Please try again later
				</p>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="max-w-3xl mx-auto px-4">
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
					<div className="text-center text-white/50">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/40 border border-[#a855f7]/30 flex items-center justify-center">
							<svg
								className="w-8 h-8 text-[#a855f7]/50"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-label="No tickets icon"
							>
								{" "}
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v1a2 2 0 012 2v1a2 2 0 01-2 2v1a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2zM16 12a1 1 0 11-2 0 1 1 0 012 0zM16 16a1 1 0 11-2 0 1 1 0 012 0z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-bold text-retro-cyan mb-2 font-vcr tracking-wider">
							NO TICKETS FOUND
						</h3>
						<p className="font-vcr text-sm">
							You haven't registered for any events yet.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const currentTicket = data[currentIndex];
	const ticketNumber = String(currentIndex + 1).padStart(8, "0");

	return (
		<div className="max-w-3xl mx-auto px-4">
			{/* Title */}
			<h2 className="text-3xl md:text-5xl font-bold text-center mb-8 font-jersey15 text-white drop-shadow-[2px_2px_0px_#a855f7]">
				YOUR TICKETS
			</h2>

			{/* Carousel */}
			<div className="relative">
				{/* Left Arrow Wrapper */}
				<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10">
					<button
						type="button"
						onClick={handlePrevious}
						disabled={data.length <= 1}
						className="w-10 h-10 md:w-12 md:h-12 bg-[#7c3aed] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed group"
					>
						<ChevronLeft className="w-6 h-6 text-white" />
					</button>
				</div>

				{/* Right Arrow Wrapper */}
				<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10">
					<button
						type="button"
						onClick={handleNext}
						disabled={data.length <= 1}
						className="w-10 h-10 md:w-12 md:h-12 bg-[#7c3aed] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed group"
					>
						<ChevronRight className="w-6 h-6 text-white" />
					</button>
				</div>

				{/* ========== TICKET CARD ========== */}
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-6 md:p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
					<div className="relative rounded-xl overflow-visible">
						{/* Outer shadow & border for ticket itself */}
						<div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#a855f7]/20 border border-[#a855f7]/40">
							{/* ---- HEADER BAR ---- */}
							<div className="relative bg-[#1a0033] px-6 py-4 flex items-center justify-between border-b border-[#a855f7]/20">
								{/* Event name and team */}
								<div className="flex-1 mr-4">
									<h3 className="text-base md:text-xl font-bold text-white font-vcr uppercase tracking-widest truncate">
										{currentTicket.event_name}
									</h3>
									<p className="text-xs md:text-sm text-retro-cyan/70 font-vcr uppercase tracking-wider mt-1">
										<User className="w-4 h-4 inline-block mr-2" />
										{currentTicket.team_name}
									</p>
								</div>

								{/* Price badge */}
								<div className="px-3 py-1 bg-[#16a34a] border border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex-shrink-0">
									<span className="text-white font-bold font-vcr text-xs tracking-widest uppercase">
										₹{currentTicket.price}
									</span>
								</div>
							</div>

							{/* ---- PUNCH NOTCHES (semicircles on left & right between header and body) ---- */}
							<div className="relative bg-[#1a0033]">
								{/* Left notch */}
								<div
									className="absolute -left-3 -top-3 w-6 h-6 rounded-full z-10 bg-black/80"
									style={{
										boxShadow: "inset 2px 0 4px rgba(0,0,0,0.5)",
									}}
								></div>
								{/* Right notch */}
								<div
									className="absolute -right-3 -top-3 w-6 h-6 rounded-full z-10 bg-black/80"
									style={{
										boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5)",
									}}
								></div>

								{/* Divider Line */}
								<div className="border-t-2 border-dashed border-[#a855f7]/30 mx-4"></div>
							</div>

							{/* ---- BODY ---- */}
							<div className="bg-[#0f001f]/95 px-6 py-4">
								{/* SCHEDULES - Conditional rendering based on count */}
								{currentTicket.schedules.length > 1 ? (
									<>
										<div className="mb-3">
											<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest">
												Multiple Sessions:
											</span>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{currentTicket.schedules.map((schedule, idx) => (
												<div
													key={schedule.schedule_id}
													className="bg-[#1a0033]/50 border border-[#a855f7]/20 rounded-lg p-3"
												>
													<div className="text-[10px] text-retro-cyan/50 font-vcr uppercase tracking-widest mb-2 pb-2 border-b border-[#a855f7]/10">
														Session {idx + 1}
													</div>
													{/* DATE row */}
													<div className="flex items-center py-1.5">
														<span className="text-retro-cyan/70 font-vcr text-[10px] uppercase tracking-widest min-w-[60px]">
															Date:
														</span>
														<span className="text-white font-vcr text-xs md:text-sm font-bold">
															{new Date(
																schedule.event_date,
															).toLocaleDateString()}
														</span>
													</div>

													{/* TIME row */}
													<div className="flex items-center py-1.5">
														<span className="text-retro-cyan/70 font-vcr text-[10px] uppercase tracking-widest min-w-[60px]">
															Time:
														</span>
														<span className="text-white font-vcr text-xs md:text-sm font-bold">
															{new Date(
																schedule.start_time,
															).toLocaleTimeString()}{" "}
															-{" "}
															{new Date(schedule.end_time).toLocaleTimeString()}
														</span>
													</div>

													{/* VENUE row */}
													<div className="flex items-center py-1.5">
														<span className="text-retro-cyan/70 font-vcr text-[10px] uppercase tracking-widest min-w-[60px]">
															Venue:
														</span>
														<span className="text-white font-vcr text-xs md:text-sm">
															{schedule.venue}
														</span>
													</div>

													{/* QR Code Button */}
													<button
														type="button"
														onClick={() =>
															setQrModal({
																scheduleId: schedule.schedule_id || "",
																scheduleIndex: idx + 1,
															})
														}
														className="mt-3 w-full py-2 bg-[#7c3aed] border border-[#a855f7]/40 rounded-lg flex items-center justify-center gap-2 text-white font-vcr text-xs uppercase tracking-wider hover:bg-[#6d28d9] transition-colors"
													>
														<QrCode className="w-4 h-4" />
														Show QR Code
													</button>
												</div>
											))}
										</div>
									</>
								) : (
									<>
										{/* Single session - normal layout */}
										{/* DATE row */}
										<div className="flex items-center py-3">
											<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
												Date:
											</span>
											<span className="text-white font-vcr text-sm md:text-base font-bold">
												{new Date(
													currentTicket.schedules[0].event_date,
												).toLocaleDateString()}
											</span>
										</div>

										{/* TIME row */}
										<div className="flex items-center py-3 border-t border-dashed border-[#a855f7]/20">
											<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
												Time:
											</span>
											<span className="text-white font-vcr text-sm md:text-base font-bold">
												{new Date(
													currentTicket.schedules[0].start_time,
												).toLocaleTimeString()}{" "}
												-{" "}
												{new Date(
													currentTicket.schedules[0].end_time,
												).toLocaleTimeString()}
											</span>
										</div>

										{/* VENUE row */}
										<div className="flex items-center py-3 border-t border-dashed border-[#a855f7]/20">
											<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
												Venue:
											</span>
											<span className="text-white font-vcr text-sm md:text-base">
												{currentTicket.schedules[0].venue}
											</span>
										</div>

										{/* QR Code Button - Single Session */}
										<button
											type="button"
											onClick={() =>
												setQrModal({
													scheduleId:
														currentTicket.schedules[0].schedule_id || "",
													scheduleIndex: 1,
												})
											}
											className="mt-4 w-full py-3 bg-[#7c3aed] border border-[#a855f7]/40 rounded-lg flex items-center justify-center gap-2 text-white font-vcr text-sm uppercase tracking-wider hover:bg-[#6d28d9] transition-colors"
										>
											<QrCode className="w-5 h-5" />
											Show QR Code
										</button>
									</>
								)}

								{/* TICKET NO row */}
								<div className="flex items-center justify-center py-4 mt-2 border-t-2 border-white/10">
									<div className="text-center">
										<span className="text-white/40 font-vcr text-[0.6rem] uppercase tracking-widest block mb-1">
											Ticket No.
										</span>
										<span className="text-retro-cyan font-vcr text-sm md:text-lg tracking-widest">
											{ticketNumber}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Counter & Dots */}
				<div className="text-center mt-6">
					<p className="text-retro-cyan text-sm font-vcr mb-3">
						Ticket <span className="text-white">{currentIndex + 1}</span> of{" "}
						<span className="text-white">{data.length}</span>
					</p>
					<div className="flex justify-center gap-2">
						{data.map((_, index) => (
							<button
								type="button"
								key={data[index].event_id}
								onClick={() => setCurrentIndex(index)}
								className={`h-2 rounded-none transition-all duration-300 ${
									index === currentIndex
										? "bg-[#a855f7] w-8 border border-black shadow-[1px_1px_0_#fff]"
										: "bg-white/20 w-2 hover:bg-white/40"
								}`}
							/>
						))}
					</div>
				</div>

				{qrModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<button
							type="button"
							className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
							onClick={() => setQrModal(null)}
							aria-label="Close QR code modal"
						/>
						<div className="relative bg-[#1a0033] border-2 border-[#a855f7] rounded-xl p-6 md:p-8 max-w-sm w-full shadow-[0_0_30px_rgba(168,85,247,0.4)]">
							<button
								type="button"
								onClick={() => setQrModal(null)}
								className="absolute top-3 right-3 p-2 text-white/60 hover:text-white transition-colors"
								aria-label="Close"
							>
								<X className="w-6 h-6" />
							</button>
							<div className="text-center">
								<h3 className="text-white font-vcr text-lg md:text-xl uppercase tracking-widest mb-2">
									Session {qrModal?.scheduleIndex} QR
								</h3>
								<p className="text-retro-cyan/60 font-vcr text-xs mb-4">
									{currentTicket.event_name}
								</p>
								<div className="bg-white p-4 rounded-lg inline-block">
									<QRCodeSVG
										value={`${user?.student_id || "unknown"}:${qrModal?.scheduleId || ""}`}
										size={180}
										level="M"
										includeMargin={false}
									/>
								</div>
								<p className="text-white/50 font-vcr text-[10px] mt-4 uppercase tracking-widest">
									Scan at venue
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
