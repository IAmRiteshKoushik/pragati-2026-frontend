import { apiGet, apiPost } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";

export interface AccommodationPayload {
	is_male: boolean;
	is_hosteller: boolean;
	is_amrita_campus: boolean;
	college_name: string;
	college_roll_number: string;
	room_preference: string;
	check_in_date: string;
	check_in_time: string;
	check_out_date: string;
	check_out_time: string;
}

export const AccommodationService = {
	/**
	 * Check if the user has already submitted an accommodation form
	 */
	checkExists: async (): Promise<{ message: string }> => {
		return apiGet<{ message: string }>(API_ROUTES.ACCOMMODATION.ELIGIBILITY_CHECK);
	},

	/**
	 * Submit the accommodation form.
	 * Fetches a CSRF token internally (short-lived) before POSTing.
	 */
	submit: async (
		payload: AccommodationPayload,
	): Promise<{ message: string }> => {
		try {
			// 1. Fetch CSRF token via GET
			const csrfData = await apiGet<{ key: string }>(
				API_ROUTES.ACCOMMODATION.SUBMIT,
			);
			if (!csrfData?.key) {
				throw new Error("Unable to fetch CSRF token for accommodation");
			}
			const csrfToken = csrfData.key;

			// 2. POST form data with CSRF header
			const res = await apiPost<{ message: string }>(
				API_ROUTES.ACCOMMODATION.SUBMIT,
				payload,
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			return res;
			// biome-ignore lint/suspicious/noExplicitAny: allowed any
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"Failed to submit accommodation form";
			throw new Error(message);
		}
	},
};
