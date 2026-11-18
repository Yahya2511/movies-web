"use client";

import { useActionState } from "react";
import { renamePlaylistAction } from "../actions";

export default function RenameForm({ playlist }) {
	const [state, formAction, pending] = useActionState(
		renamePlaylistAction.bind(null, playlist.id),
		null,
	);

	return (
		<form action={formAction} className="flex gap-2 mb-6">
			<input
				name="name"
				defaultValue={playlist.name}
				required
				className="flex-1 border rounded p-2"
			/>
			<button
				type="submit"
				disabled={pending}
				className="bg-blue-600 text-white rounded px-4 disabled:opacity-50"
			>
				{pending ? "Saving..." : "Rename"}
			</button>
			{state?.error && <p className="text-red-500">{state.error}</p>}
		</form>
	);
}
