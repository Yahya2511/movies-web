import Link from "next/link";

export default function NotFound() {
	return (
		<main className="mx-auto max-w-md p-16 text-center">
			<h1 className="text-5xl font-bold">404</h1>
			<p className="mt-3 text-gray-400">This page doesn't exist.</p>
			<Link
				href="/movies"
				className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
			>
				Back to movies
			</Link>
		</main>
	);
}
