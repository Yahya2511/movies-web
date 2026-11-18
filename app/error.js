"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function Error({ reset }) {
	const router = useRouter();

	function retry() {
		startTransition(() => {
			router.refresh(); // fetch the page data again from the server
			reset(); // clear the error screen
		});
	}

	return (
		<main className="p-8 max-w-md mx-auto text-center">
			<h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
			<p className="text-gray-500 mb-4">
				The server may be down. Please try again.
			</p>
			<button
				onClick={retry}
				className="bg-blue-600 text-white rounded px-4 py-2"
			>
				Try again
			</button>
		</main>
	);
}
