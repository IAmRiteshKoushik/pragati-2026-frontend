import { EventCard } from "./EventCard";
import type { Event } from "@/types/eventTypes";
import { motion } from "framer-motion";

// Sample event data for testing
const sampleEvents: Event[] = [
	{
		event_id: "1",
		event_name: "Code Wars 2026",
		event_image_url:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
		event_description:
			"Battle it out in this intense coding competition. Solve complex algorithms and win prizes!",
		event_date: "2026-02-15",
		event_status: "open",
		event_price: 500,
		is_group: true,
		is_management: true,
		event_type: "competition",
		tags: ["Coding", "Technical", "Team"],
		is_registered: false,
		isStarred: false,
		is_full: false,
		is_filling_fast: true,
	},
	{
		event_id: "2",
		event_name: "Retro Gaming Night",
		event_image_url:
			"https://images.unsplash.com/photo-1511512578047-dfb367046420",
		event_description:
			"Nostalgic gaming session with classic arcade games and retro consoles.",
		event_date: "2026-02-20",
		event_status: "open",
		event_price: 0,
		is_group: false,
		is_management: false,
		event_type: "entertainment",
		tags: ["Gaming", "Fun"],
		is_registered: true,
		isStarred: true,
		is_full: false,
		is_filling_fast: false,
	},
	{
		event_id: "3",
		event_name: "AI/ML Workshop",
		event_image_url:
			"https://images.unsplash.com/photo-1677442136019-21780ecad995",
		event_description:
			"Learn about cutting-edge AI and Machine Learning techniques from industry experts.",
		event_date: "2026-03-01",
		event_status: "completed",
		event_price: 1000,
		is_group: false,
		is_management: true,
		event_type: "workshop",
		tags: ["AI", "ML", "Workshop"],
		is_registered: false,
		isStarred: false,
		is_full: true,
		is_filling_fast: false,
	},
	{
		event_id: "4",
		event_name: "Cyberpunk Dance Battle",
		event_image_url:
			"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
		event_description:
			"Show off your moves in this neon-lit dance competition with amazing prizes!",
		event_date: "2026-02-25",
		event_status: "open",
		event_price: 300,
		is_group: true,
		is_management: false,
		event_type: "cultural",
		tags: ["Dance", "Cultural", "Performance"],
		is_registered: false,
		isStarred: true,
		is_full: false,
		is_filling_fast: true,
	},
	{
		event_id: "5",
		event_name: "Blockchain Hackathon",
		event_image_url: null, // Testing fallback image
		event_description:
			"Build innovative blockchain solutions in this 24-hour hackathon.",
		event_date: "2026-03-10",
		event_status: "open",
		event_price: 2500,
		is_group: true,
		is_management: true,
		event_type: "hackathon",
		tags: ["Blockchain", "Web3", "Coding", "Innovation"],
		is_registered: false,
		isStarred: false,
		is_full: false,
		is_filling_fast: false,
	},
	{
		event_id: "6",
		event_name: "Neon Poetry Slam",
		event_image_url:
			"https://images.unsplash.com/photo-1519389950473-47ba0277781c",
		event_description:
			"Express yourself through poetry in this electrifying performance event.",
		event_date: "2026-02-18",
		event_status: "open",
		event_price: 0,
		is_group: false,
		is_management: false,
		event_type: "cultural",
		tags: ["Poetry", "Cultural"],
		is_registered: true,
		isStarred: false,
		is_full: false,
		is_filling_fast: false,
	},
];

export const EventCardDemo = () => {
	const handleStarToggle = (eventId: string) => {
		console.log("Star toggled for event:", eventId);
	};

	const handleCardClick = (eventId: string) => {
		console.log("Card clicked for event:", eventId);
	};

	return (
		<div className="min-h-screen w-full bg-black relative overflow-hidden">
			{/* Animated background grid */}
			<div className="absolute inset-0 opacity-20">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)",
						backgroundSize: "50px 50px",
					}}
				/>
			</div>

			{/* Neon corner decorations */}
			<div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-retro-cyan opacity-50" />
			<div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-retro-pink opacity-50" />
			<div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-retro-pink opacity-50" />
			<div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-retro-cyan opacity-50" />

			<div className="relative z-10 p-4 md:p-8">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12 md:mb-16"
				>
					{/* Retro scanlines effect on header */}
					<div
						className="absolute inset-x-0 top-0 h-48 pointer-events-none opacity-10"
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,255,0.1) 2px, rgba(255,0,255,0.1) 4px)",
						}}
					/>

					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h1 className="font-jersey15 text-5xl md:text-7xl lg:text-8xl text-retro-yellow mb-4 drop-shadow-[0_0_20px_rgba(244,208,63,0.8)]">
							EVENT CARDS DEMO
						</h1>
						<div className="flex items-center justify-center gap-4 mb-4">
							<div className="h-0.5 w-16 md:w-24 bg-retro-cyan shadow-[0_0_10px_currentColor]" />
							<p className="font-vcr text-retro-cyan text-xs md:text-sm tracking-widest">
								SHOWCASING DIFFERENT CARD STATES
							</p>
							<div className="h-0.5 w-16 md:w-24 bg-retro-cyan shadow-[0_0_10px_currentColor]" />
						</div>
					</motion.div>

					{/* Decorative elements */}
					<div className="flex justify-center gap-2 mt-6">
						{["a", "b", "c", "d", "e"].map((id, i) => (
							<motion.div
								key={`deco-${id}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: [0.3, 1, 0.3] }}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									delay: i * 0.2,
								}}
								className="w-2 h-2 bg-retro-pink shadow-[0_0_10px_currentColor]"
							/>
						))}
					</div>
				</motion.div>

				{/* Main Grid Container with Outer Design */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="max-w-7xl mx-auto mb-16"
				>
					{/* Outer frame with retro styling */}
					<div className="relative p-1 bg-gradient-to-br from-retro-cyan/20 via-retro-purple/20 to-retro-pink/20">
						{/* Corner accents on outer frame */}
						<div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-retro-cyan" />
						<div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-retro-pink" />
						<div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-retro-pink" />
						<div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-retro-cyan" />

						{/* Inner container */}
						<div className="bg-black/90 backdrop-blur-sm border-2 border-retro-purple/40 p-6 md:p-8">
							{/* Grid of EventCards */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
								{sampleEvents.map((event, idx) => (
									<motion.div
										key={event.event_id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: 0.6 + idx * 0.1,
										}}
									>
										<EventCard
											event={event}
											onStarToggle={handleStarToggle}
											onCardClick={handleCardClick}
											isStarLoading={false}
										/>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</motion.div>

				{/* Legend Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.2 }}
					className="max-w-5xl mx-auto mb-12"
				>
					<div className="relative">
						{/* Decorative top border */}
						<div className="flex items-center gap-4 mb-6">
							<div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-retro-pink to-transparent" />
							<h2 className="font-jersey15 text-2xl md:text-4xl text-retro-pink text-center drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
								CARD STATES LEGEND
							</h2>
							<div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-retro-pink to-transparent" />
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-vcr text-xs md:text-sm">
							{[
								{
									num: "1",
									desc: "Open event • Team event • Filling fast badge",
									color: "border-retro-cyan",
								},
								{
									num: "2",
									desc: "Registered • Starred • Free event",
									color: "border-retro-pink",
								},
								{
									num: "3",
									desc: "Closed (completed) • Full • Workshop",
									color: "border-gray-500",
								},
								{
									num: "4",
									desc: "Starred • Team • Filling fast • Cultural",
									color: "border-retro-yellow",
								},
								{
									num: "5",
									desc: "Fallback image • 4 tags • Hackathon",
									color: "border-retro-cyan",
								},
								{
									num: "6",
									desc: "Registered • Free • Solo event",
									color: "border-retro-pink",
								},
							].map((item, idx) => (
								<motion.div
									key={item.num}
									initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 1.4 + idx * 0.1 }}
									className={`bg-black/80 border-2 ${item.color}/50 p-4 backdrop-blur-sm relative overflow-hidden group hover:${item.color} hover:shadow-[0_0_20px_currentColor] transition-all duration-300`}
								>
									{/* Card number badge */}
									<div className="flex items-start gap-3">
										<div
											className={`shrink-0 w-8 h-8 flex items-center justify-center border-2 ${item.color} bg-black/50 font-bold`}
										>
											{item.num}
										</div>
										<p className="text-gray-300 leading-relaxed">{item.desc}</p>
									</div>

									{/* Hover effect */}
									<div
										className={`absolute inset-0 bg-gradient-to-r ${item.color.replace("border-", "from-")}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
									/>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Instructions */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 2 }}
					className="text-center font-vcr space-y-2"
				>
					<div className="flex items-center justify-center gap-2 text-retro-cyan/70 text-xs">
						<div className="w-2 h-2 bg-retro-cyan animate-pulse" />
						<p>HOVER OVER CARDS (DESKTOP) TO SEE OVERLAY EFFECTS</p>
						<div className="w-2 h-2 bg-retro-cyan animate-pulse" />
					</div>
					<p className="text-retro-pink/70 text-xs">
						CLICK STAR TO TOGGLE • CLICK CARD TO NAVIGATE
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default EventCardDemo;
