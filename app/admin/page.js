import Link from "next/link";
import { api } from "@/lib/api";
import { deleteMovieAction } from "./actions";

export default async function AdminPage() {
	const { data: movies } = await api("/movies?limit=50");

	return (
		<main className="p-8 max-w-3xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Manage movies</h1>
				<div className="flex gap-3">
					<Link href="/admin/users" className="border rounded px-4 py-2">
						Users
					</Link>
					<Link
						href="/admin/movies/new"
						className="bg-blue-600 text-white rounded px-4 py-2"
					>
						Add movie
					</Link>
				</div>
			</div>

			<ul className="space-y-3">
				{movies.map((movie) => (
					<li
						key={movie.id}
						className="flex items-center justify-between border rounded p-4"
					>
						<span className="font-semibold">{movie.name}</span>
						<div className="flex items-center gap-4 text-sm">
							<Link
								href={`/admin/movies/${movie.id}`}
								className="text-blue-500"
							>
								Edit
							</Link>
							<form action={deleteMovieAction.bind(null, movie.id)}>
								<button type="submit" className="text-red-500">
									Delete
								</button>
							</form>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
