"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/lib/api";

export async function createPlaylistAction(prevState, formData) {
	const name = formData.get("name");

	try {
		await authApi("/playlists", {
			method: "POST",
			body: JSON.stringify({ name }),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath("/playlists");
	return { error: null };
}

export async function deletePlaylistAction(id) {
	await authApi(`/playlists/${id}`, { method: "DELETE" });
	revalidatePath("/playlists");
}

export async function removeMovieAction(playlistId, movieId) {
	await authApi(`/playlists/${playlistId}/movies/${movieId}`, {
		method: "DELETE",
	});
	revalidatePath(`/playlists/${playlistId}`);
}

export async function addMovieAction(movieId, prevState, formData) {
	const playlistId = formData.get("playlistId");

	try {
		await authApi(`/playlists/${playlistId}/movies`, {
			method: "POST",
			body: JSON.stringify({ movieId: Number(movieId) }),
		});
	} catch (error) {
		return { error: error.message, success: false };
	}

	revalidatePath(`/playlists/${playlistId}`);
	return { error: null, success: true };
}

export async function renamePlaylistAction(id, prevState, formData) {
	const name = formData.get("name");

	try {
		await authApi(`/playlists/${id}`, {
			method: "PUT",
			body: JSON.stringify({ name }),
		});
	} catch (error) {
		return { error: error.message };
	}

	revalidatePath(`/playlists/${id}`);
	revalidatePath("/playlists");
	return { error: null };
}
