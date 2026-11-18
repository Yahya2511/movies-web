import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { authApi } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { removeMovieAction } from "../actions";
import RenameForm from "./RenameForm";

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
		<main className="mx-auto max-w-4xl p-6 md:p-8">
			<Link
				href="/playlists"
				className="text-sm text-blue-400 hover:text-blue-300"
			>
				← Back to playlists
			</Link>

			<h1 className="mb-4 mt-4 text-3xl font-bold">{playlist.name}</h1>
			<RenameForm playlist={playlist} />

			{playlist.Movies.length === 0 ? (
				<p className="text-gray-400">
					No movies yet. Open a movie and use "Add to playlist".
				</p>
			) : (
				<ul className="grid gap-3 sm:grid-cols-2">
					{playlist.Movies.map((movie) => (
						<li
							key={movie.id}
							className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
						>
							{movie.posterUrl && (
								<img
									src={movie.posterUrl}
									alt={movie.name}
									className="h-24 w-16 rounded object-cover"
								/>
							)}
							<div className="flex-1">
								<Link
									href={`/movies/${movie.id}`}
									className="font-semibold hover:underline"
								>
									{movie.name}
								</Link>
								<p className="text-sm text-gray-400">{movie.director}</p>
							</div>
							<form
								action={removeMovieAction.bind(null, playlist.id, movie.id)}
							>
								<button
									type="submit"
									className="text-sm text-red-400 hover:text-red-300"
								>
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
