import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import MovieForm from "../../MovieForm";

export default async function EditMoviePage({ params }) {
	const { id } = await params;

	let movie;
	try {
		movie = await api(`/movies/${id}`);
	} catch (error) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-xl p-6 md:p-8">
			<Link href="/admin" className="text-sm text-blue-400 hover:text-blue-300">
				← Back to movies
			</Link>
			<h1 className="mb-6 mt-4 text-3xl font-bold">Edit movie</h1>
			<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
				<MovieForm movie={movie} />
			</div>
		</main>
	);
}
