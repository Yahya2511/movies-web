import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage() {
	const movies = await api("/movies");

	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-6">All movies</h1>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</main>
	);
}
