import Link from "next/link";
import { api } from "@/lib/api";
import { deleteMovieAction } from "./actions";

export default async function AdminPage() {
	const { data: movies, total } = await api("/movies?limit=50");

	return (
		<main className="mx-auto max-w-4xl p-6 md:p-8">
			<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-3xl font-bold">Manage movies</h1>
					<p className="text-sm text-gray-400">{total} movies</p>
				</div>
				<div className="flex gap-3">
					<Link
						href="/admin/users"
						className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
					>
						Users
					</Link>
					<Link
						href="/admin/movies/new"
						className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
					>
						Add movie
					</Link>
				</div>
			</div>

			<ul className="space-y-2">
				{movies.map((movie) => (
					<li
						key={movie.id}
						className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
					>
						{movie.posterUrl && (
							<img
								src={movie.posterUrl}
								alt={movie.name}
								className="h-16 w-11 rounded object-cover"
							/>
						)}
						<div className="flex-1">
							<p className="font-semibold">{movie.name}</p>
							<p className="text-sm text-gray-400">{movie.director}</p>
						</div>
						<Link
							href={`/admin/movies/${movie.id}`}
							className="text-sm text-blue-400 hover:text-blue-300"
						>
							Edit
						</Link>
						<form action={deleteMovieAction.bind(null, movie.id)}>
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
		</main>
	);
}
