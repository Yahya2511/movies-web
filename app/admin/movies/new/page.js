import MovieForm from "../../MovieForm";

export default function NewMoviePage() {
	return (
		<main className="p-8 max-w-xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Add movie</h1>
			<MovieForm />
		</main>
	);
}
