import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schedule/")({
	component: SchedulePage,
});

function SchedulePage() {
	return (
		<div>
			<h1>Schedule</h1>
		</div>
	);
}
