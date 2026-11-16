import { api } from "@/lib/api";
import { getToken } from "@/lib/session";

export async function getCurrentUser() {
	const token = await getToken();
	if (!token) return null;

	try {
		return await api("/auth/me", {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		return null; // token expired or invalid
	}
}
