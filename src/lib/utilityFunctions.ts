import { CURRENCY, GST_RATE } from "./constants";

/**
 * ============================================================================
 *  STRING UTILITIES
 * ============================================================================
 */

/**
 * Title case (capitalize each word)
 */
export function toTitleCase(str: string): string {
	return str.replace(
		/\b\w+/g,
		(w) => w[0].toUpperCase() + w.slice(1).toLowerCase(),
	);
}

/**
 * Slugify a string for URLs: lowercase, spaces → dashes, remove invalid chars
 */
export function slugify(str: string): string {
	return str
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * ============================================================================
 *  NUMBER & CURRENCY UTILITIES
 * ============================================================================
 */

/**
 * Round amount up to nearest paisa (₹0.01)
 */
export function ceilPrice(amount: number): number {
	return Math.ceil(amount * 100) / 100;
}

/**
 * Apply GST
 */
export function applyGst(amount: number, rate: number = GST_RATE): number {
	return +(amount * (1 + rate)).toFixed(2);
}

/**
 * Format number as currency with ₹ symbol
 */
export function formatCurrency(amount: number): string {
	return `${CURRENCY}${Math.ceil(amount)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * ============================================================================
 *  DATE UTILITIES
 * ============================================================================
 */

/**
 * Format date (e.g. "24 Jun 2025, 02:30 PM")
 */

/**
 * Calculate days difference between two dates
 */
export function diffDays(from: Date, to: Date = new Date()): number {
	const msPerDay = 1000 * 60 * 60 * 24;
	return Math.round((to.getTime() - from.getTime()) / msPerDay);
}

/**
 * ============================================================================
 *  ARRAY & OBJECT UTILITIES
 * ============================================================================
 */

/**
 * Remove duplicate items in array (by primitive value)
 */
export function unique<T>(arr: T[]): T[] {
	return Array.from(new Set(arr));
}

/**
 * Safely get nested property, returning default if any undefined
 */
export function get<T, U>(obj: T, path: string, defaultValue: U): unknown {
	return (
		path
			.split(".")
			.reduce<unknown>(
				(o, key) =>
					o && typeof o === "object" && key in o
						? (o as Record<string, unknown>)[key]
						: undefined,
				obj,
			) ?? defaultValue
	);
}

/**
 * Deep clone an object/array
 */
export function deepClone<T>(obj: T): T {
	return structuredClone(obj);
}

/**
 * Randomize array in-place using Durstenfeld shuffle algorithm: Complexity 0(n)
 */

export function shuffleArray<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/**
 * move priority item to front of array from name
 */
export function moveToFront<T extends { name: string }>(
	arr: T[],
	name: string,
): T[] {
	const index = arr.findIndex((item) => item.name === name);
	if (index > -1) {
		const [item] = arr.splice(index, 1);
		arr.unshift(item);
	}
	return arr;
}

/**
 * ============================================================================
 *  FUNCTION CONTROL UTILITIES
 * ============================================================================
 */

/**
 * Debounce a function (delay calls until wait ms after last invocation)
 */
export function debounce<T extends (...args: unknown[]) => void>(
	fn: T,
	wait = 300,
): T {
	let timeout: ReturnType<typeof setTimeout>;
	return ((...args: unknown[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...(args as Parameters<T>)), wait);
	}) as T;
}

/**
 * Throttle a function (calls at most once every wait ms)
 */
export function throttle<T extends (...args: unknown[]) => void>(
	fn: T,
	wait = 300,
): T {
	let inThrottle = false;
	return ((...args: unknown[]) => {
		if (!inThrottle) {
			fn(...(args as Parameters<T>));
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, wait);
		}
	}) as T;
}

/**
 * ============================================================================
 *  MISCELLANEOUS
 * ============================================================================
 */

/**
 * Generate a simple random ID (e.g. for keys)
 */
export function randomId(length = 8): string {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
}

export const getInitials = (name: string) =>
	name
		.split(" ")
		.map((word) => word.charAt(0))
		.join("")
		.toUpperCase()
		.slice(0, 2);
