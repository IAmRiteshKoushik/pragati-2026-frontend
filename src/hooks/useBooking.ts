"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookingService } from "@/services/BookingService";
import type {
	BookingResponse,
	GroupBookingPayload,
} from "@/types/bookingTypes";

/**
 * Hook for individual event booking
 * CSRF token is fetched internally by the service for security (short-lived tokens)
 * Returns booking response with payment data
 */
export function useBookIndividualEvent() {
	return useMutation({
		mutationFn: async (eventId: string): Promise<BookingResponse> => {
			return BookingService.bookIndividualEvent(eventId);
		},
		onSuccess: () => {
			// Show success message from booking
			toast.loading("Booking initiated! Redirecting to payment...");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to register for event");
		},
	});
}

/**
 * Hook for group event booking
 * CSRF token is fetched internally by the service for security (short-lived tokens)
 * Returns booking response with payment data
 */
export function useBookGroupEvent() {
	return useMutation({
		mutationFn: async ({
			eventId,
			payload,
		}: {
			eventId: string;
			payload: GroupBookingPayload;
		}): Promise<BookingResponse> => {
			return BookingService.bookGroupEvent(eventId, payload);
		},
		onSuccess: () => {
			// Show success message from booking
			toast.loading("Booking initiated! Redirecting to payment...");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to register team");
		},
	});
}
