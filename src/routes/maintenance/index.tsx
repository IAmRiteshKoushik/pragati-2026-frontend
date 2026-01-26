import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maintenance/")({
	component: MaintenancePage,
});

function MaintenancePage() {
	return (
		<div>
			<h1>Maintenance</h1>
		</div>
	);
}
