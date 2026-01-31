import { createFileRoute } from "@tanstack/react-router";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const Route = createFileRoute("/profile/")({
	component: ProfilePage,
});

function ProfilePage() {
	return <ProfileForm />;
}
