import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password/")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	return (
		<div>
			<h1>Forgot Password</h1>
		</div>
	);
}
