"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/lib/api";

export async function rateAction(movieId, prevState, formData) {
	const rate = Number(formData.get("rate"));
	const comment = formData.get("comment");

	try {
		await authApi(`/movies/${movieId}/ratings`, {
			method: "POST",
			body: JSON.stringify({ rate, comment }),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath(`/movies/${movieId}`);
	return { error: null };
}

export async function updateRatingAction(movieId, prevState, formData) {
	const rate = Number(formData.get("rate"));
	const comment = formData.get("comment");

	try {
		await authApi(`/movies/${movieId}/ratings`, {
			method: "PUT",
			body: JSON.stringify({ rate, comment }),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath(`/movies/${movieId}`);
	return { error: null };
}

export async function deleteRatingAction(movieId) {
	await authApi(`/movies/${movieId}/ratings`, { method: "DELETE" });
	revalidatePath(`/movies/${movieId}`);
}
