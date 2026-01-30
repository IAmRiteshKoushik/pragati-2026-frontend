import { createFileRoute } from "@tanstack/react-router";
import EventCardDemo from "@/components/events/EventCardDemo";

export const Route = createFileRoute("/events/demo")({
	component: EventCardDemoPage,
});

function EventCardDemoPage() {
	return <EventCardDemo />;
}
