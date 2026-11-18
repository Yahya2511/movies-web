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
		<main className="mx-auto max-w-2xl p-6 md:p-8">
			<h1 className="mb-6 text-3xl font-bold">My playlists</h1>

			<CreatePlaylistForm />

			{playlists.length === 0 ? (
				<p className="text-gray-400">
					No playlists yet. Create your first one above.
				</p>
			) : (
				<ul className="space-y-3">
					{playlists.map((playlist) => (
						<li
							key={playlist.id}
							className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
						>
							<Link
								href={`/playlists/${playlist.id}`}
								className="flex-1 font-semibold"
							>
								{playlist.name}
							</Link>
							<form action={deletePlaylistAction.bind(null, playlist.id)}>
								<button
									type="submit"
									className="text-sm text-red-400 hover:text-red-300"
								>
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
