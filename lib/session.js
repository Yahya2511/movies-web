import { cookies } from "next/headers";

export async function setToken(token) {
	const cookieStore = await cookies();
	cookieStore.set("token", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24, // 1 day, same as the JWT
		path: "/",
	});
}

export async function getToken() {
	const cookieStore = await cookies();
	return cookieStore.get("token")?.value;
}

export async function clearToken() {
	const cookieStore = await cookies();
	cookieStore.delete("token");
}
