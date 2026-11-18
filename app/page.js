import Link from "next/link";
import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
	const { data: movies } = await api("/movies?sort=rating&limit=6");

	return (
		<main className="p-8 max-w-6xl mx-auto">
			<section className="mb-10">
				<h1 className="text-4xl font-bold">Discover great movies</h1>
				<p className="text-gray-500 mt-2">
					Browse, rate and save your favorites to playlists.
				</p>
				<Link
					href="/movies"
					className="inline-block mt-4 bg-blue-600 text-white rounded px-5 py-2"
				>
					Browse all movies
				</Link>
			</section>

			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-semibold">Top rated</h2>
				<Link href="/movies?sort=rating" className="text-blue-500 text-sm">
					See more
				</Link>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</main>
	);
}
