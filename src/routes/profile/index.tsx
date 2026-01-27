import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
	component: ProfilePage,
});

function ProfilePage() {
	return (
		<div>
			<h1>Profile</h1>
		</div>
	);
}
