import { Calendar, CheckCircle, Lock, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Event } from "@/types/eventTypes";

const formatDateOnly = (dateInput: string | Date | undefined) => {
	if (!dateInput) return "";
	const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
	if (Number.isNaN(d.getTime())) return String(dateInput);
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatCurrency = (amount: number) => {
	return `₹${amount.toLocaleString("en-IN")}`;
};

interface EventCardProps {
	event: Event;
	onStarToggle?: (eventId: string) => void;
	onCardClick?: (eventId: string) => void;
	isStarLoading?: boolean;
}

export const EventCard = ({
	event,
	onStarToggle,
	onCardClick,
	isStarLoading = false,
}: EventCardProps) => {
	const {
		event_id,
		event_image_url,
		event_name,
		event_status,
		event_date,
		is_group,
		is_filling_fast,
		tags,
		event_price,
		is_registered,
		isStarred,
		is_full,
	} = event;

	// Use fallback image if event_image_url is null, empty, or invalid
	const displayImageUrl =
		event_image_url && event_image_url.trim() !== ""
			? event_image_url
			: "/Images/comingsoon.jpg";

	const isEventClosed =
		!is_registered && (event_status.toLowerCase() === "completed" || is_full);

	const [isHovered, setIsHovered] = useState(false);

	const handleStarToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isEventClosed && onStarToggle) {
			onStarToggle(event_id);
		}
	};

	const handleCardClick = () => {
		if (!isEventClosed && onCardClick) {
			onCardClick(event_id);
		}
	};

	const getTagLabel = (tag: string) => tag || "";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={`group relative w-full aspect-3/5 ${
				isEventClosed ? "cursor-not-allowed" : "cursor-pointer"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
		>
			<div
				className={`absolute -inset-2 bg-linear-to-br from-retro-cyan/20 via-retro-purple/10 to-retro-pink/20 rounded blur-xl transition-opacity duration-500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			/>

			<div
				className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-retro-cyan shadow-[0_0_10px_currentColor] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-retro-pink shadow-[0_0_10px_currentColor] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-retro-pink shadow-[0_0_10px_currentColor] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-retro-cyan shadow-[0_0_10px_currentColor] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>

			<div className="absolute top-3 left-3 z-30 md:hidden">
				{is_registered ? (
					<div className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border-2 border-retro-cyan/80 text-retro-cyan flex items-center gap-1.5 text-xs font-vcr shadow-lg shadow-retro-cyan/30">
						<CheckCircle className="h-3 w-3" />
						REGISTERED
					</div>
				) : isEventClosed ? (
					<div className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border-2 border-gray-500/80 text-gray-400 flex items-center gap-1.5 text-xs font-vcr shadow-lg">
						<Lock className="w-3 h-3" />
						CLOSED
					</div>
				) : null}
			</div>

			<div
				className={`
                    relative w-full h-full rounded-none overflow-hidden flex flex-col
                    bg-linear-to-br from-purple-950/80 via-black/90 to-indigo-950/80 backdrop-blur-md
                    border-2 transition-all duration-300 ease-out
                    ${
						isHovered
							? "border-retro-cyan shadow-[0_0_30px_rgba(34,211,238,0.6),0_0_60px_rgba(34,211,238,0.3)]"
							: "border-retro-purple/60 shadow-[0_0_15px_rgba(123,58,236,0.3)] md:border-gray-600/40"
					}
                    ${isEventClosed ? "opacity-60 grayscale" : ""}
                `}
				style={{
					boxShadow: isHovered
						? "0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.3), inset 0 0 40px rgba(34,211,238,0.15)"
						: "0 0 15px rgba(123,58,236,0.3), inset 0 0 30px rgba(123,58,236,0.1)",
				}}
			>
				<div className="relative w-full h-[75%] overflow-hidden bg-linear-to-b from-purple-950/30 to-black/50">
					<div
						className={`
                            absolute inset-0 bg-cover bg-top origin-top transition-all duration-500 ease-out
                            ${isHovered ? "scale-105 brightness-110" : "scale-100"}
                        `}
						style={{ backgroundImage: `url(${displayImageUrl})` }}
					/>

					<div
						className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
							isHovered ? "opacity-40" : "opacity-25"
						}`}
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.05) 2px, rgba(34,211,238,0.05) 4px)",
						}}
					/>

					<div
						className={`
                            absolute inset-0 bg-linear-to-t from-retro-cyan/15 via-retro-purple/5 to-retro-pink/10
                            transition-opacity duration-500 ease-out
                            opacity-0 md:group-hover:opacity-100
                        `}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

					{is_filling_fast && !is_full && (
						<div className="absolute bottom-3 right-3 z-40">
							<motion.div
								animate={{
									boxShadow: [
										"0 0 10px rgba(239,68,68,0.5)",
										"0 0 20px rgba(239,68,68,0.8)",
										"0 0 10px rgba(239,68,68,0.5)",
									],
								}}
								transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
								className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-red-900/80 backdrop-blur-md border-2 border-red-500 text-xs font-vcr text-red-200"
							>
								<Zap className="w-3 h-3 text-red-200" />
								FILLING FAST
							</motion.div>
						</div>
					)}
				</div>

				<div
					className={`
                        absolute top-0 left-0 right-0 h-[80%] 
                        bg-linear-to-b from-black/95 via-retro-purple/90 to-black/95 backdrop-blur-md
                        flex flex-col justify-center items-center p-6 border-2 border-retro-cyan/50
                        shadow-[inset_0_0_60px_rgba(34,211,238,0.2)]
                        transition-opacity duration-300 ease-out md:flex
                        ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
				>
					{is_registered ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-retro-cyan text-retro-cyan flex items-center gap-2 text-sm font-vcr backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.5)]">
							<CheckCircle className="h-4 w-4" />
							REGISTERED
						</div>
					) : isEventClosed ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-gray-500 text-gray-400 flex items-center gap-2 text-sm font-vcr backdrop-blur-sm">
							<Lock className="w-4 h-4" />
							CLOSED
						</div>
					) : (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-6 py-3 font-vcr text-sm bg-black/80 border-2 border-retro-pink text-retro-pink 
                                hover:bg-retro-pink/20 hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] 
                                transition-all duration-300 backdrop-blur-sm uppercase"
						>
							REGISTER NOW
						</motion.button>
					)}
				</div>

				<button
					type="button"
					disabled={isEventClosed || isStarLoading}
					onClick={handleStarToggle}
					className={`
                        absolute top-3 right-3 z-30 p-2 backdrop-blur-md
                        border-2 transition-all duration-300 
                        ${
                            isEventClosed
                                ? "cursor-default opacity-50"
                                : "hover:scale-110 cursor-pointer"
                            }
                        ${
                            isStarred
                                ? "bg-retro-yellow/20 border-retro-yellow shadow-[0_0_15px_rgba(244,208,63,0.6)]"
                                : `bg-black/70 border-gray-500 ${isEventClosed ? "" : "hover:bg-black/90 hover:border-retro-yellow"}`
                        }
                    `}
				>
					<Star
						className={`w-4 h-4 transition-all duration-300 ${
							isStarred
								? "text-retro-yellow fill-retro-yellow drop-shadow-[0_0_5px_rgba(244,208,63,0.8)]"
								: "text-gray-400 hover:text-retro-yellow"
						}`}
					/>
				</button>

				<div className="relative flex-1 w-full bg-linear-to-b from-black/95 via-purple-950/90 to-black/95 border-t-2 border-retro-purple/60 shadow-[inset_0_4px_20px_rgba(123,58,236,0.2)] p-4 flex flex-col justify-between z-10">
					<div className="flex items-start justify-between mb-3">
						<h3 className="font-jersey15 text-xl md:text-2xl text-retro-yellow leading-tight flex-1 pr-5 drop-shadow-[0_0_5px_rgba(244,208,63,0.5)]">
							{event_name}
						</h3>
						<div className="text-right shrink-0">
							<div className="font-vcr text-base text-retro-cyan drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
								{event_price > 0 ? formatCurrency(event_price) : "FREE"}
							</div>
							{event_price > 0 && (
								<div className="text-xs text-gray-500 font-vcr">+ GST</div>
							)}
						</div>
					</div>


					<div className="flex items-center gap-4 mb-3 text-sm text-retro-cyan/80 font-vcr">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4 text-retro-cyan" />
							<span>{formatDateOnly(event_date)}</span>
						</div>
						{is_group && (
							<div className="flex items-center gap-1">
								<Users className="w-4 h-4 text-retro-pink" />
								<span className="text-retro-pink/80">TEAM</span>
							</div>
						)}
					</div>

					{tags && tags.length > 0 && (
						<div className="flex items-center gap-2 overflow-hidden">
							{tags.slice(0, 2).map((tag) => (
									<span
										key={`${event_id}-${tag}`}
										className="text-xs px-2 py-1 bg-retro-purple/50 backdrop-blur-sm border border-retro-pink/40 text-retro-pink whitespace-nowrap font-vcr uppercase"
									>
										{getTagLabel(tag)}
									</span>
								))}
							{tags.length > 2 && (
								<span className="text-xs px-2 py-1 bg-black/60 backdrop-blur-sm border border-gray-600 text-gray-400 font-vcr">
									+{tags.length - 2}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
