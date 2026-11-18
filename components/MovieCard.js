import Link from "next/link";

export default function MovieCard({ movie }) {
	return (
		<Link
			href={`/movies/${movie.id}`}
			className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
		>
			<div className="relative">
				{movie.posterUrl ? (
					<img
						src={movie.posterUrl}
						alt={movie.name}
						className="aspect-[2/3] w-full object-cover"
					/>
				) : (
					<div className="aspect-[2/3] w-full bg-gray-800" />
				)}

				{movie.averageRating && (
					<span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-amber-400">
						★ {movie.averageRating}
					</span>
				)}
			</div>

			<div className="p-4">
				<h2 className="font-semibold leading-tight">{movie.name}</h2>
				<p className="mt-1 text-sm text-gray-400">
					{movie.director} · {movie.lengthMin} min
				</p>
				<p className="mt-2 line-clamp-2 text-sm text-gray-300">
					{movie.description}
				</p>
			</div>
		</Link>
	);
}
