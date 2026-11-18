"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/lib/api";

export async function updateProfileAction(prevState, formData) {
	try {
		await authApi("/auth/me", {
			method: "PUT",
			body: JSON.stringify({ name: formData.get("name") }),
		});
	} catch (error) {
		return { error: error.message, success: false };
	}

	revalidatePath("/", "layout"); // refresh the name in the navbar too
	return { error: null, success: true };
}

export async function changePasswordAction(prevState, formData) {
	try {
		await authApi("/auth/me/password", {
			method: "PUT",
			body: JSON.stringify({
				currentPassword: formData.get("currentPassword"),
				newPassword: formData.get("newPassword"),
			}),
		});
	} catch (error) {
		return { error: error.message, success: false };
	}

	return { error: null, success: true };
}
