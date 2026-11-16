import Link from "next/link";

export default function MovieCard({ movie }) {
	return (
		<Link
			href={`/movies/${movie.id}`}
			className="block border rounded p-4 hover:bg-gray-50 hover:text-black"
		>
			<h2 className="text-xl font-semibold">{movie.name}</h2>
			<p className="text-sm text-gray-500">
				{movie.director} · {movie.lengthMin} min
			</p>
			<p className="mt-2 line-clamp-2">{movie.description}</p>
		</Link>
	);
}
