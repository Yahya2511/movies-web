import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ProfileForms from "./ProfileForms";

export default async function ProfilePage() {
	const user = await getCurrentUser();
	if (!user) redirect("/login");

	return (
		<main className="mx-auto max-w-md p-6 md:p-8">
			<h1 className="text-3xl font-bold mb-6">My profile</h1>
			<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
				<ProfileForms user={user} />
			</div>
		</main>
	);
}
