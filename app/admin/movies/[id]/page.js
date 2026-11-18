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
		<main className="p-8 max-w-xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Edit movie</h1>
			<MovieForm movie={movie} />
		</main>
	);
}
