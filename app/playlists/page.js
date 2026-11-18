import Link from "next/link";
import { redirect } from "next/navigation";
import { authApi } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { deletePlaylistAction } from "./actions";

export default async function PlaylistsPage() {
	const user = await getCurrentUser();
	if (!user) redirect("/login");

	const playlists = await authApi("/playlists");

	return (
		<main className="p-8 max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">My playlists</h1>

			<CreatePlaylistForm />

			{playlists.length === 0 ? (
				<p className="text-gray-500">No playlists yet.</p>
			) : (
				<ul className="space-y-3">
					{playlists.map((playlist) => (
						<li
							key={playlist.id}
							className="flex items-center justify-between border rounded p-4"
						>
							<Link
								href={`/playlists/${playlist.id}`}
								className="font-semibold"
							>
								{playlist.name}
							</Link>
							<form action={deletePlaylistAction.bind(null, playlist.id)}>
								<button type="submit" className="text-sm text-red-500">
									Delete
								</button>
							</form>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
