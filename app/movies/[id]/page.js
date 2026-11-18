import Link from "next/link";
import { notFound } from "next/navigation";
import { api, authApi } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import RatingForm from "./RatingForm";
import AddToPlaylistForm from "./AddToPlaylistForm";
import { deleteRatingAction } from "./actions";

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
		<main className="mx-auto max-w-5xl p-6 md:p-8">
			<Link
				href="/movies"
				className="text-sm text-blue-400 hover:text-blue-300"
			>
				← Back to movies
			</Link>

			<div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
				<div>
					{movie.posterUrl ? (
						<img
							src={movie.posterUrl}
							alt={movie.name}
							className="w-full rounded-xl border border-white/10"
						/>
					) : (
						<div className="aspect-[2/3] w-full rounded-xl bg-gray-800" />
					)}
				</div>

				<div>
					<h1 className="text-4xl font-bold">{movie.name}</h1>
					<p className="mt-2 text-gray-400">
						{movie.director} · {movie.lengthMin} min
					</p>

					<p className="mt-3 text-lg font-semibold text-amber-400">
						{movie.averageRating
							? `★ ${movie.averageRating}/10`
							: "No ratings yet"}
					</p>

					{movie.Genres?.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
							{movie.Genres.map((g) => (
								<Link
									key={g.id}
									href={`/movies?genre=${g.id}`}
									className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
								>
									{g.name}
								</Link>
							))}
						</div>
					)}

					<p className="mt-6 leading-relaxed text-gray-300">
						{movie.description}
					</p>

					{user ? (
						<AddToPlaylistForm movieId={id} playlists={playlists} />
					) : (
						<p className="mt-6 text-sm text-gray-400">
							<Link href="/login" className="text-blue-400">
								Log in
							</Link>{" "}
							to rate this movie or add it to a playlist.
						</p>
					)}
				</div>
			</div>

			{user && (
				<section className="mt-10 max-w-xl">
					<RatingForm
						key={myRating ? "edit" : "new"}
						movieId={id}
						rating={myRating}
					/>
					{myRating && (
						<form action={deleteRatingAction.bind(null, id)} className="mt-2">
							<button type="submit" className="text-sm text-red-400">
								Delete my rating
							</button>
						</form>
					)}
				</section>
			)}

			<section className="mt-10">
				<h2 className="mb-4 text-2xl font-semibold">
					Ratings ({ratings.length})
				</h2>

				{ratings.length === 0 ? (
					<p className="text-gray-400">No ratings yet.</p>
				) : (
					<ul className="grid gap-3 md:grid-cols-2">
						{ratings.map((rating) => (
							<li
								key={rating.id}
								className="rounded-xl border border-white/10 bg-white/5 p-4"
							>
								<p className="font-semibold">
									{rating.User?.name}{" "}
									<span className="text-amber-400">★ {rating.rate}/10</span>
								</p>
								{rating.comment && (
									<p className="mt-1 text-sm text-gray-300">{rating.comment}</p>
								)}
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
