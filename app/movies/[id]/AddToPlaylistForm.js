"use client";

import { useActionState } from "react";
import { addMovieAction } from "@/app/playlists/actions";

export default function AddToPlaylistForm({ movieId, playlists }) {
	const [state, formAction, pending] = useActionState(
		addMovieAction.bind(null, movieId),
		null,
	);

	if (playlists.length === 0) {
		return (
			<p className="mt-4 text-sm text-gray-500">Create a playlist first.</p>
		);
	}

	return (
		<form action={formAction} className="mt-4 flex items-center gap-2">
			<select name="playlistId" className="border rounded p-2 bg-transparent">
				{playlists.map((p) => (
					<option key={p.id} value={p.id} className="text-black">
						{p.name}
					</option>
				))}
			</select>
			<button
				type="submit"
				disabled={pending}
				className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
			>
				{pending ? "Adding..." : "Add to playlist"}
			</button>
			{state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
			{state?.success && <p className="text-green-500 text-sm">Added!</p>}
		</form>
	);
}
