import { createFileRoute, Link } from "@tanstack/react-router";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
// Import your success animation
import animationData from "../../../../public/lotties/transactionSuccess.json";

export const Route = createFileRoute("/transactions/success/")({
	component: PaymentSuccess,
});

function PaymentSuccess() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="flex items-center justify-center mb-6">
				<Lottie
					animationData={animationData}
					loop={false}
					autoplay
					rendererSettings={{
						preserveAspectRatio: "xMidYMid slice",
					}}
					className="h-50 w-50"
				/>
			</div>

			<h1 className="text-3xl font-bold text-foreground mb-2">
				Payment Successful!
			</h1>

			<p className="text-muted-foreground mb-6">
				Your transaction has been completed successfully.
			</p>

			<div className="space-y-3 pb-6">
				<Link to="/profile" className="block">
					<Button variant="outline" className="w-full">
						View Ticket
					</Button>
				</Link>

				<Link to="/" className="block">
					<Button className="w-full btn-primary-enhanced">Back to Home</Button>
				</Link>
			</div>
		</main>
	);
}
