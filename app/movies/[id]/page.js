import Link from "next/link";
import { notFound } from "next/navigation";
import { api, authApi } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import RatingForm from "./RatingForm";
import { deleteRatingAction } from "./actions";

import AddToPlaylistForm from "./AddToPlaylistForm";

export default async function MovieDetailsPage({ params }) {
	const { id } = await params;

	let movie;
	try {
		movie = await api(`/movies/${id}`);
	} catch (error) {
		notFound();
	}

	const ratings = await api(`/movies/${id}/ratings`);
	const user = await getCurrentUser();
	const myRating = user ? ratings.find((r) => r.UserId === user.id) : null;

	const playlists = user ? await authApi("/playlists") : [];

	return (
		<main className="p-8 max-w-3xl mx-auto">
			<Link href="/movies" className="text-sm text-blue-500">
				← Back to movies
			</Link>

			<h1 className="text-3xl font-bold mt-4">{movie.name}</h1>
			<p className="text-gray-500 mt-1">
				{movie.director} · {movie.lengthMin} min
			</p>
			<p className="mt-2 font-semibold">
				{movie.averageRating ? `★ ${movie.averageRating}/10` : "No ratings yet"}
			</p>
			<p className="mt-4">{movie.description}</p>
			{user && <AddToPlaylistForm movieId={id} playlists={playlists} />}

			{user ? (
				<>
					<RatingForm
						key={myRating ? "edit" : "new"}
						movieId={id}
						rating={myRating}
					/>
					{myRating && (
						<form action={deleteRatingAction.bind(null, id)} className="mt-2">
							<button type="submit" className="text-sm text-red-500">
								Delete my rating
							</button>
						</form>
					)}
				</>
			) : (
				<p className="mt-6">
					<Link href="/login" className="text-blue-500">
						Log in
					</Link>{" "}
					to rate this movie.
				</p>
			)}

			<h2 className="text-xl font-semibold mt-8 mb-3">
				Ratings ({ratings.length})
			</h2>

			{ratings.length === 0 ? (
				<p className="text-gray-500">No ratings yet.</p>
			) : (
				<ul className="space-y-3">
					{ratings.map((rating) => (
						<li key={rating.id} className="border rounded p-3">
							<p className="font-semibold">
								{rating.User?.name} · {rating.rate}/10
							</p>
							{rating.comment && (
								<p className="text-sm mt-1">{rating.comment}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
