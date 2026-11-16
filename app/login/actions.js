"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { setToken } from "@/lib/session";

export async function loginAction(prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	try {
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
