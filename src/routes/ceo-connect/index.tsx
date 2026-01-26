import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ceo-connect/")({
	component: CeoConnectPage,
});

function CeoConnectPage() {
	return (
		<div>
			<h1>CEO Connect</h1>
		</div>
	);
}
