import Link from "next/link";
import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function MoviesPage({ searchParams }) {
	const { name, director, sort, page } = await searchParams;

	const params = new URLSearchParams();
	if (name) params.set("name", name);
	if (director) params.set("director", director);
	if (sort) params.set("sort", sort);
	if (page) params.set("page", page);

	const {
		data: movies,
		page: current,
		totalPages,
	} = await api(`/movies?${params.toString()}`);

	function pageLink(p) {
		const q = new URLSearchParams();
		if (name) q.set("name", name);
		if (director) q.set("director", director);
		if (sort) q.set("sort", sort);
		q.set("page", p);
		return `/movies?${q.toString()}`;
	}

	return (
		<main className="p-8">
			<h1 className="text-3xl font-bold mb-6">All movies</h1>

			<form className="grid gap-2 sm:grid-cols-4 mb-6">
				<input
					name="name"
					defaultValue={name ?? ""}
					placeholder="Search by name..."
					className="border rounded p-2"
				/>
				<input
					name="director"
					defaultValue={director ?? ""}
					placeholder="Director..."
					className="border rounded p-2"
				/>
				<select
					name="sort"
					defaultValue={sort ?? ""}
					className="border rounded p-2 bg-transparent"
				>
					<option value="" className="text-black">
						Default order
					</option>
					<option value="name" className="text-black">
						Name (A to Z)
					</option>
					<option value="newest" className="text-black">
						Newest added
					</option>
					<option value="length" className="text-black">
						Shortest first
					</option>
					<option value="rating" className="text-black">
						Top rated
					</option>
				</select>
				<button
					type="submit"
					className="bg-blue-600 text-white rounded px-4 py-2"
				>
					Apply
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

			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-4 mt-8">
					{current > 1 ? (
						<Link
							href={pageLink(current - 1)}
							className="border rounded px-4 py-2"
						>
							Previous
						</Link>
					) : (
						<span className="border rounded px-4 py-2 opacity-40">
							Previous
						</span>
					)}

					<span>
						Page {current} of {totalPages}
					</span>

					{current < totalPages ? (
						<Link
							href={pageLink(current + 1)}
							className="border rounded px-4 py-2"
						>
							Next
						</Link>
					) : (
						<span className="border rounded px-4 py-2 opacity-40">Next</span>
					)}
				</div>
			)}
		</main>
	);
}
