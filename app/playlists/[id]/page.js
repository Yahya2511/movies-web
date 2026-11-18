import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { authApi } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { removeMovieAction } from "../actions";

export default async function PlaylistDetailsPage({ params }) {
	const { id } = await params;

	const user = await getCurrentUser();
	if (!user) redirect("/login");

	let playlist;
	try {
		playlist = await authApi(`/playlists/${id}`);
	} catch (error) {
		notFound();
	}

	return (
		<main className="p-8 max-w-2xl mx-auto">
			<Link href="/playlists" className="text-sm text-blue-500">
				← Back to playlists
			</Link>

			<h1 className="text-3xl font-bold mt-4 mb-6">{playlist.name}</h1>

			{playlist.Movies.length === 0 ? (
				<p className="text-gray-500">No movies in this playlist yet.</p>
			) : (
				<ul className="space-y-3">
					{playlist.Movies.map((movie) => (
						<li
							key={movie.id}
							className="flex items-center justify-between border rounded p-4"
						>
							<Link href={`/movies/${movie.id}`} className="font-semibold">
								{movie.name}
							</Link>
							<form
								action={removeMovieAction.bind(null, playlist.id, movie.id)}
							>
								<button type="submit" className="text-sm text-red-500">
									Remove
								</button>
							</form>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
