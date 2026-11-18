"use client";

import { useActionState } from "react";
import { createPlaylistAction } from "./actions";

export default function CreatePlaylistForm() {
	const [state, formAction, pending] = useActionState(
		createPlaylistAction,
		null,
	);

	return (
		<form action={formAction} className="flex gap-2 mb-6">
			<input
				name="name"
				placeholder="New playlist name"
				required
				className="flex-1 border rounded p-2"
			/>
			<button
				type="submit"
				disabled={pending}
				className="bg-blue-600 text-white rounded px-4 disabled:opacity-50"
			>
				{pending ? "Creating..." : "Create"}
			</button>
			{state?.error && <p className="text-red-500">{state.error}</p>}
		</form>
	);
}
