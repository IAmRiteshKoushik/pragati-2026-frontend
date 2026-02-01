import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { EventService } from "@/services/EventService";

export const useStarEvent = (eventId: string, initialIsStarred: boolean) => {
	const [isStarred, setIsStarred] = useState(initialIsStarred);
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();

	const serverStateRef = useRef(initialIsStarred);
	const currentStateRef = useRef(initialIsStarred);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setIsStarred(initialIsStarred);
		serverStateRef.current = initialIsStarred;
		currentStateRef.current = initialIsStarred;
	}, [initialIsStarred]);

	const toggleStar = useCallback(async () => {
		const newState = !currentStateRef.current;

		setIsStarred(newState);
		currentStateRef.current = newState;

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		debounceTimerRef.current = setTimeout(async () => {
			const finalState = currentStateRef.current;

			if (finalState === serverStateRef.current) {
				return;
			}

			setIsLoading(true);
			try {
				if (finalState) {
					await EventService.starEvent(eventId);
					toast.success("Event added to favourites");
				} else {
					await EventService.unstarEvent(eventId);
					toast.success("Event removed from favourites");
				}

				serverStateRef.current = finalState;

				queryClient.setQueryData(["event", eventId], (old: any) =>
					old ? { ...old, isStarred: finalState } : old,
				);

				queryClient.setQueriesData({ queryKey: ["events"] }, (old: any) => {
					if (!old) return old;

					if (Array.isArray(old)) {
						return old.map((e: any) =>
							e.event_id === eventId || e.id === eventId
								? { ...e, isStarred: finalState }
								: e,
						);
					}

					return old;
				});
			} catch (error) {
				const originalState = serverStateRef.current;
				setIsStarred(originalState);
				currentStateRef.current = originalState;

				toast.error("Failed to update favourite status");
				console.error("Star event error:", error);
			} finally {
				setIsLoading(false);
			}
		}, 500);
	}, [eventId, queryClient]);

	return {
		isStarred,
		toggleStar,
		isLoading,
	};
};
