import Link from "next/link";

export default function MovieCard({ movie }) {
	return (
		<Link
			href={`/movies/${movie.id}`}
			className="block border rounded p-4 hover:bg-gray-50 hover:text-black"
		>
			{movie.posterUrl ? (
				<img
					src={movie.posterUrl}
					alt={movie.name}
					className="w-full aspect-[2/3] object-cover rounded mb-3"
				/>
			) : (
				<div className="w-full aspect-[2/3] bg-gray-800 rounded mb-3" />
			)}

			<h2 className="text-xl font-semibold">{movie.name}</h2>
			<p className="text-sm text-gray-500">
				{movie.director} · {movie.lengthMin} min
			</p>
			<p className="text-sm mt-1">
				{movie.averageRating ? `★ ${movie.averageRating}/10` : "No ratings yet"}
			</p>
			<p className="mt-2 line-clamp-2">{movie.description}</p>
		</Link>
	);
}
