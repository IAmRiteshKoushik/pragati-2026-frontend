import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import EventDetail from "@/components/EventDetail";
import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import Navbar from "@/components/Navbar";
import { useEventById } from "@/hooks/useEventById";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";
import { useStarSingleEvent } from "@/hooks/useStarSingleEvent";
import { useAuthStore } from "@/store/auth.store";

const BACKGROUND_IMAGE_URL =
	"https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA1TTlZtKwkMt4sZaGR2pLP37qUHNQlgKObDVmf";

export const Route = createFileRoute("/events/$eventId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { eventId } = Route.useParams();
	const navigate = useNavigate();
	const { user, isHydrated } = useAuthStore();
	const isAuthenticated = !!user;
	const [bgImageLoaded, setBgImageLoaded] = useState(false);

	// Preload background image
	useEffect(() => {
		const img = new Image();
		img.onload = () => setBgImageLoaded(true);
		img.onerror = () => setBgImageLoaded(false);
		img.src = BACKGROUND_IMAGE_URL;
	}, []);

	const {
		data: event,
		isLoading: isEventLoading,
		error,
	} = useEventById(eventId);
	const starMutation = useStarSingleEvent(eventId);
	const registerMutation = useRegisterEvent(eventId);

	const handleStarToggle = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		if (event) {
			starMutation.mutate(event.isStarred);
		}
	};

	const handleRegister = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		registerMutation.mutate();
	};

	const isLoading = isEventLoading || !isHydrated;

	// Helper function to get background class or style
	const getBackgroundProps = () => {
		if (bgImageLoaded) {
			return {
				className: "min-h-screen w-full relative overflow-hidden pt-20",
				style: {
					backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
				},
			};
		}
		// Fallback to gradient background using Tailwind classes
		return {
			className: "min-h-screen bg-gradient-to-b from-[#1a0a29] via-[#1a0b2e] to-black",
			style: {},
		};
	};

	if (isLoading) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div className={bgImageLoaded ? "relative z-10 container mx-auto px-4 py-8" : "container mx-auto px-4 py-8"}>
						<EventDetailSkeleton />
					</div>
				</div>
			</>
		);
	}

	if (error) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div className={bgImageLoaded ? "relative z-10 container mx-auto px-4 py-8 text-center" : "container mx-auto px-4 py-8 text-center"}>
						<h2 className="text-2xl text-red-500">Failed to load event</h2>
						<p className="text-red-400">{error.message}</p>
					</div>
				</div>
			</>
		);
	}

	if (!event) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div className={bgImageLoaded ? "relative z-10 container mx-auto px-4 py-8 text-center" : "container mx-auto px-4 py-8 text-center"}>
						<h2 className="text-2xl text-yellow-500">Event not found</h2>
					</div>
				</div>
			</>
		);
	}

	const bgProps = getBackgroundProps();
	return (
		<>
			<Navbar />
			<div className={bgProps.className} style={bgProps.style}>
				{bgImageLoaded && (
					<div className="absolute inset-0 bg-black/70 pointer-events-none" />
				)}
				<div className={bgImageLoaded ? "relative z-10 container mx-auto px-4 py-8" : "container mx-auto px-4 py-8"}>
					<EventDetail
						event={event}
						onStarToggle={handleStarToggle}
						onRegister={handleRegister}
						isLoggedIn={isAuthenticated}
						isStarLoading={starMutation.isPending}
						isRegisterLoading={registerMutation.isPending}
					/>
				</div>
			</div>
		</>
	);
}
