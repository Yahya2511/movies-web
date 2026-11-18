import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage({ searchParams }) {
	const { name } = await searchParams;
	const query = name ? `?name=${encodeURIComponent(name)}` : "";
	const movies = await api(`/movies${query}`);

	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-6">All movies</h1>

			<form className="flex gap-2 mb-6">
				<input
					name="name"
					defaultValue={name ?? ""}
					placeholder="Search movies..."
					className="flex-1 border rounded p-2"
				/>
				<button type="submit" className="bg-blue-600 text-white rounded px-4">
					Search
				</button>
			</form>

			{movies.length === 0 ? (
				<p className="text-gray-500">No movies found.</p>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</main>
	);
}
