import { motion } from "framer-motion";
import { Calendar, CheckCircle, Lock, Star, Users, Zap } from "lucide-react";
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
					  {/* minimal overlay - removed colorful hover overlay for subtle look */}
			<div
				className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-retro-cyan/40 z-20 transition-all duration-300 
				md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-retro-yellow/35 z-20 transition-all duration-300 
				md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-retro-yellow/35 z-20 transition-all duration-300 
				md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-retro-cyan/40 z-20 transition-all duration-300 
				md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>

			<div className="absolute top-3 left-3 z-30 md:hidden">
				{is_registered ? (
					<div className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border-2 border-teal-300/80 text-teal-300 flex items-center gap-1.5 text-xs font-vcr">
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
					bg-linear-to-br from-slate-900 via-slate-800/80 to-slate-900 backdrop-blur-sm
					border-2 transition-all duration-300 ease-out
					${
								isHovered
									? "border-retro-cyan/50 shadow-lg"
									: "border-gray-600/30 shadow-sm md:border-gray-600/40"
							}
					${isEventClosed ? "opacity-60 grayscale" : ""}
				`}
				style={{
					boxShadow: isHovered
						? "0 10px 30px rgba(0,0,0,0.6), inset 0 0 8px rgba(255,255,255,0.02)"
						: "0 6px 18px rgba(0,0,0,0.5), inset 0 0 6px rgba(255,255,255,0.01)",
				}}
			>
				<div className="relative w-full h-[75%] overflow-hidden bg-linear-to-b from-orange-900/8 via-slate-800/20 to-slate-900/60">
					<div
						className={`
                            absolute inset-0 bg-cover bg-top origin-top transition-all duration-500 ease-out
                            ${isHovered ? "scale-105 brightness-110" : "scale-100"}
                        `}
						style={{ backgroundImage: `url(${displayImageUrl})` }}
					/>

					<div
						className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
							isHovered ? "opacity-30" : "opacity-12"
						}`}
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px)",
						}}
					/>

					<div
						className={`absolute inset-0 bg-linear-to-t from-retro-cyan/10 via-retro-yellow/5 to-transparent transition-opacity duration-500 ease-out opacity-0 md:group-hover:opacity-100`}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

					{is_filling_fast && !is_full && (
						<div className="absolute bottom-3 right-3 z-40">
							<div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-red-800/70 border border-red-500/30 text-xs font-vcr text-red-200">
								<Zap className="w-3 h-3 text-red-200" />
								FILLING FAST
							</div>
						</div>
					)}
				</div>

				<div
					className={`
						absolute top-0 left-0 right-0 h-[80%] 
						bg-linear-to-b from-black/95 via-gray-950/93 to-black/95 backdrop-blur-md
						flex flex-col justify-center items-center p-6 border-2 border-orange-500/40
						transition-opacity duration-300 ease-out md:flex
						${isHovered ? "opacity-95" : "opacity-0 pointer-events-none"}
					`}
				>
					{is_registered ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-retro-cyan/30 text-retro-cyan/90 flex items-center gap-2 text-sm font-vcr backdrop-blur-sm">
							<CheckCircle className="h-4 w-4" />
							REGISTERED
						</div>
					) : isEventClosed ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-gray-500 text-gray-400 flex items-center gap-2 text-sm font-vcr backdrop-blur-sm">
							<Lock className="w-4 h-4" />
							CLOSED
						</div>
					) : (
						<button
							className="px-6 py-3 font-vcr text-sm bg-black/80 border-2 border-retro-yellow/30 text-retro-yellow/90 
								hover:bg-retro-yellow/6 transition-all duration-200 backdrop-blur-sm uppercase"
						>
							REGISTER NOW
						</button>
					)}
				</div>

				<button
					type="button"
					disabled={isEventClosed || isStarLoading}
					onClick={handleStarToggle}
					className={
						`absolute top-3 right-3 z-30 p-2 backdrop-blur-md
						border-2 transition-all duration-200 
						${
							isEventClosed
								? "cursor-default opacity-50"
								: "hover:scale-105 cursor-pointer"
						}
						${
							isStarred
								? "bg-retro-yellow/10 border-retro-yellow/40"
								: `bg-black/70 border-gray-500 ${isEventClosed ? "" : "hover:bg-black/85 hover:border-retro-yellow/40"}`
						}
					`}
				>
						<Star
							className={`w-4 h-4 transition-all duration-200 ${
								isStarred
									? "text-retro-yellow/95"
									: "text-gray-400 hover:text-retro-yellow/80"
							}`}
						/>
				</button>

				<div className="relative flex-1 w-full bg-linear-to-b from-slate-900/95 via-slate-800/90 to-slate-900/98 border-t-2 border-orange-500/30 shadow-[inset_0_4px_20px_rgba(249,115,22,0.06),inset_0_2px_10px_rgba(236,72,153,0.02)] p-4 flex flex-col justify-between z-10">
					<div className="flex items-start justify-between mb-3">
						<h3 className="font-jersey15 text-xl md:text-2xl bg-linear-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent leading-tight flex-1 pr-5 tracking-tight uppercase">
							{event_name}
						</h3>
						<div className="text-right shrink-0">
							<div className="font-vcr text-base text-retro-cyan/90">
								{event_price > 0 ? formatCurrency(event_price) : "FREE"}
							</div>
							{event_price > 0 && (
								<div className="text-xs text-gray-400 font-vcr">+ GST</div>
							)}
						</div>
					</div>

					<div className="flex items-center gap-4 mb-3 text-sm text-white/90 font-vcr">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4 text-retro-cyan" />
							<span>{formatDateOnly(event_date)}</span>
						</div>
						{is_group && (
							<div className="flex items-center gap-1">
								<Users className="w-4 h-4 text-retro-yellow" />
								<span className="text-white/90">TEAM</span>
							</div>
						)}
					</div>

					{tags && tags.length > 0 && (
						<div className="flex items-center gap-2 overflow-hidden">
							{tags.slice(0, 2).map((tag) => (
								<span
									key={`${event_id}-${tag}`}
									className="text-xs px-2 py-1 bg-retro-cyan/10 backdrop-blur-sm border border-retro-cyan/40 text-retro-cyan whitespace-nowrap font-vcr uppercase"
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
