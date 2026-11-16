const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { getToken } from "@/lib/session";

export async function api(path, options = {}) {
	const res = await fetch(`${API_URL}${path}`, {
		cache: "no-store",
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	const data = res.status === 204 ? null : await res.json();

	if (!res.ok) {
		throw new Error(data?.message || "Request failed");
	}

	return data;
}

export async function authApi(path, options = {}) {
	const token = await getToken();

	return api(path, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${token}`,
		},
	});
}