import Link from "next/link";
import MovieForm from "../../MovieForm";

export default function NewMoviePage() {
	return (
		<main className="mx-auto max-w-xl p-6 md:p-8">
			<Link href="/admin" className="text-sm text-blue-400 hover:text-blue-300">
				← Back to movies
			</Link>
			<h1 className="mb-6 mt-4 text-3xl font-bold">Add movie</h1>
			<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
				<MovieForm />
			</div>
		</main>
	);
}
