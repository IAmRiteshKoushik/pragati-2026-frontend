import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Event } from "@/types/eventTypes";
import { EventCard } from "./EventCard";

interface DropdownProps {
	label: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	items: string[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

interface RadioPairProps {
	a: string;
	b: string;
	value: string | null;
	setValue: React.Dispatch<React.SetStateAction<any>>;
}

/* ---------------- SAMPLE EVENT DATA ---------------- */
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
		event_image_url: null,
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

/* ---------------- COMPONENT ---------------- */
export const EventCardDemo = () => {
	/* LOCAL EVENTS STATE */
	const [events, setEvents] = useState<Event[]>(sampleEvents);

	/* SEARCH */
	const [search, setSearch] = useState("");

	/* FILTER VISIBILITY */
	const [showFilters, setShowFilters] = useState(false);

	/* DROPDOWNS */
	const [tagsOpen, setTagsOpen] = useState(false);
	const [daysOpen, setDaysOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	/* MUTUAL GROUPS */
	const [eventType, setEventType] = useState<"workshop" | "event" | null>(null);
	const [teamType, setTeamType] = useState<"individual" | "group" | null>(null);
	const [techType, setTechType] = useState<
		"technical" | "non-technical" | null
	>(null);
	const [regType, setRegType] = useState<
		"registered" | "not-registered" | null
	>(null);

	/* STAR TOGGLE */
	const handleStarToggle = (eventId: string) => {
		setEvents((prev) =>
			prev.map((ev) =>
				ev.event_id === eventId ? { ...ev, isStarred: !ev.isStarred } : ev,
			),
		);
	};

	/* CLEAR ALL */
	const clearAll = () => {
		setSearch("");
		setSelectedTags([]);
		setSelectedDays([]);
		setEventType(null);
		setTeamType(null);
		setTechType(null);
		setRegType(null);
	};

	/* SEARCH FILTER */
	const filteredEvents = useMemo(() => {
		if (!search.trim()) return events;
		const q = search.toLowerCase();
		return events.filter(
			(e) =>
				e.event_name.toLowerCase().includes(q) ||
				e.tags?.some((t) => t.toLowerCase().includes(q)),
		);
	}, [search, events]);

	return (
		<div className="min-h-screen w-full bg-black relative overflow-hidden">
			<div className="relative z-10 p-4 md:p-8">
				{/* HEADER */}
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-10"
				>
					<h1 className="font-jersey15 text-5xl md:text-7xl lg:text-8xl text-retro-yellow mb-6">
						ALL EVENTS
					</h1>

					<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search events..."
							className="flex-1 px-4 py-2 bg-black/70 border border-gray-600 rounded-md text-gray-200 font-vcr text-base"
						/>

						<select className="px-4 py-2 bg-black/70 border border-gray-600 rounded-md text-gray-200 font-vcr text-base">
							<option>Relevance</option>
							<option>Date (Earliest)</option>
							<option>Date (Latest)</option>
						</select>

						<button
							type="button"
							onClick={() => setShowFilters((v) => !v)}
							className="px-4 py-2 border border-retro-yellow/60 text-retro-yellow font-vcr text-base rounded-md"
						>
							{showFilters ? "Hide Filters" : "Show Filters"}
						</button>
					</div>

					{/* FILTERS */}
					{showFilters && (
						<div className="mt-4 max-w-6xl mx-auto bg-black/60 border border-gray-700 rounded-lg p-4 flex flex-wrap gap-3 justify-center">
							<Dropdown
								label="Tags"
								open={tagsOpen}
								setOpen={setTagsOpen}
								items={["Coding", "Gaming", "AI", "Cultural"]}
								selected={selectedTags}
								setSelected={setSelectedTags}
							/>

							<Dropdown
								label="Event Days"
								open={daysOpen}
								setOpen={setDaysOpen}
								items={["Day 1", "Day 2", "Day 3"]}
								selected={selectedDays}
								setSelected={setSelectedDays}
							/>

							<RadioPair
								a="Workshop"
								b="Event"
								value={eventType}
								setValue={setEventType}
							/>
							<RadioPair
								a="Individual"
								b="Group"
								value={teamType}
								setValue={setTeamType}
							/>
							<RadioPair
								a="Technical"
								b="Non-Technical"
								value={techType}
								setValue={setTechType}
							/>
							<RadioPair
								a="Registered"
								b="Not Registered"
								value={regType}
								setValue={setRegType}
							/>

							<button
								type="button"
								onClick={clearAll}
								className="px-4 py-2 border border-red-500/60 text-red-400 font-vcr text-sm rounded-md"
							>
								Clear All
							</button>
						</div>
					)}
				</motion.div>

				{/* EVENT GRID */}
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{filteredEvents.map((event) => (
						<EventCard
							key={event.event_id}
							event={event}
							onStarToggle={handleStarToggle}
						/>
					))}
				</div>

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

/* ---------------- HELPER FUNCTIONS TO ABOVE ---------------- */

const Dropdown = ({
	label,
	open,
	setOpen,
	items,
	selected,
	setSelected,
}: DropdownProps) => (
	<div className="relative">
		<button
			type="button"
			onClick={() => setOpen(!open)}
			className="px-4 py-2 bg-black/60 border border-gray-600 text-gray-300 font-vcr text-sm rounded-md"
		>
			{label} ▾
		</button>
		{open && (
			<div className="absolute z-20 mt-2 bg-black border border-gray-600 rounded-md p-3 space-y-2">
				{items.map((item: string) => (
					<label
						key={item}
						className="flex gap-2 text-gray-300 font-vcr text-sm"
					>
						<input
							type="checkbox"
							checked={selected.includes(item)}
							onChange={() =>
								setSelected((prev: string[]) =>
									prev.includes(item)
										? prev.filter((i) => i !== item)
										: [...prev, item],
								)
							}
						/>
						{item}
					</label>
				))}
			</div>
		)}
	</div>
);

const RadioPair = ({ a, b, value, setValue }: RadioPairProps) => (
	<div className="flex gap-2">
		{[a, b].map((label) => {
			const v = label.toLowerCase().replace(" ", "-");
			return (
				<button
					type="button"
					key={label}
					onClick={() => setValue(value === v ? null : v)}
					className={`px-4 py-2 border rounded-md font-vcr text-sm ${
						value === v
							? "border-retro-cyan text-retro-cyan"
							: "border-gray-600 text-gray-300"
					}`}
				>
					{label}
				</button>
			);
		})}
	</div>
);
