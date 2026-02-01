"use client";

import { useQuery } from "@tanstack/react-query";
import { EventService } from "@/services/EventService";
import { useAuthStore } from "@/store/auth.store";
import type { Event } from "@/types/eventTypes";

const HIDDEN_EVENT_IDS = ["4c613718-fe01-45dd-a2fd-1c5885c60256"];

export function useAllEvents() {
	const user = useAuthStore((state) => state.user);
	const isHydrated = useAuthStore((state) => state.isHydrated);
	const isAuthenticated = !!user;

	const query = useQuery<Event[], Error>({
		queryKey: ["events", isAuthenticated],
		queryFn: async () => {
			const events = await EventService.getAll(isAuthenticated);
			return events.filter(
				(event) => !HIDDEN_EVENT_IDS.includes(event.event_id),
			);
		},
		enabled: isHydrated,
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: 1,
		refetchOnWindowFocus: false,
	});

	return {
		...query,
		isLoading: query.isLoading || !isHydrated,
	};
}
