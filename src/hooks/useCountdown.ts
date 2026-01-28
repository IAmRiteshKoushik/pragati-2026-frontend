import { useCallback, useEffect, useState } from "react";
import type { TimeLeft } from "../types/comingSoonTypes";

export const useCountdown = (targetDate: string): TimeLeft => {
	const calculateTimeLeft = useCallback((): TimeLeft => {
		const difference = +new Date(targetDate) - Date.now();

		if (difference > 0) {
			return {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}, [targetDate]);

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [calculateTimeLeft]);

	return timeLeft;
};
