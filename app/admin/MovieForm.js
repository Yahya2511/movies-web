"use client";

import { useActionState } from "react";
import { createMovieAction, updateMovieAction } from "./actions";

export default function MovieForm({ movie }) {
	const action = movie
		? updateMovieAction.bind(null, movie.id)
		: createMovieAction;
	const [state, formAction, pending] = useActionState(action, null);

	return (
		<form action={formAction} className="space-y-4">
			<input
				name="name"
				placeholder="Name"
				defaultValue={movie?.name}
				required
				className="w-full border rounded p-2"
			/>
			<input
				name="director"
				placeholder="Director"
				defaultValue={movie?.director ?? ""}
				className="w-full border rounded p-2"
			/>
			<input
				name="lengthMin"
				type="number"
				min="1"
				placeholder="Length in minutes"
				defaultValue={movie?.lengthMin ?? ""}
				className="w-full border rounded p-2"
			/>
			<textarea
				name="description"
				placeholder="Description"
				defaultValue={movie?.description ?? ""}
				className="w-full border rounded p-2"
			/>

			{state?.error && <p className="text-red-500">{state.error}</p>}

			<button
				type="submit"
				disabled={pending}
				className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
			>
				{pending ? "Saving..." : movie ? "Save changes" : "Create movie"}
			</button>
		</form>
	);
}
