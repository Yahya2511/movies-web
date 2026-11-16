"use client";

import { useActionState } from "react";
import { rateAction, updateRatingAction } from "./actions";

export default function RatingForm({ movieId, rating }) {
	const action = rating ? updateRatingAction : rateAction;
	const [state, formAction, pending] = useActionState(
		action.bind(null, movieId),
		null,
	);

	return (
		<form action={formAction} className="space-y-3 border rounded p-4 mt-6">
			<h3 className="font-semibold">
				{rating ? "Edit your rating" : "Rate this movie"}
			</h3>

			<input
				name="rate"
				type="number"
				min="1"
				max="10"
				placeholder="1 to 10"
				defaultValue={rating?.rate}
				required
				className="w-full border rounded p-2"
			/>
			<textarea
				name="comment"
				placeholder="Comment (optional)"
				defaultValue={rating?.comment ?? ""}
				className="w-full border rounded p-2"
			/>

			{state?.error && <p className="text-red-500">{state.error}</p>}

			<button
				type="submit"
				disabled={pending}
				className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
			>
				{pending ? "Sending..." : rating ? "Save changes" : "Submit rating"}
			</button>
		</form>
	);
}
