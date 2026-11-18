"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { setToken } from "@/lib/session";

export async function registerAction(prevState, formData) {
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
		});

		const { token } = await api("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		await setToken(token);
	} catch (error) {
		return { error: error.message };
	}

	redirect("/movies");
}
