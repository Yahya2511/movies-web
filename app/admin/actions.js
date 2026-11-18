"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/lib/api";
import { redirect } from "next/navigation";

export async function deleteMovieAction(id) {
	await authApi(`/movies/${id}`, { method: "DELETE" });
	revalidatePath("/admin");
	revalidatePath("/movies");
}

function readMovie(formData) {
	const movie = {
		name: formData.get("name"),
		director: formData.get("director"),
		description: formData.get("description"),
	};
	const length = formData.get("lengthMin");
	if (length) movie.lengthMin = Number(length);
	return movie;
}

export async function createMovieAction(prevState, formData) {
	try {
		await authApi("/movies", {
			method: "POST",
			body: JSON.stringify(readMovie(formData)),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath("/admin");
	revalidatePath("/movies");
	redirect("/admin");
}

export async function updateMovieAction(id, prevState, formData) {
	try {
		await authApi(`/movies/${id}`, {
			method: "PUT",
			body: JSON.stringify(readMovie(formData)),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath("/admin");
	revalidatePath("/movies");
	revalidatePath(`/movies/${id}`);
	redirect("/admin");
}

export async function deleteUserAction(id) {
	await authApi(`/users/${id}`, { method: "DELETE" });
	revalidatePath("/admin/users");
}