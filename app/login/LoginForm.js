"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
	const [state, formAction, pending] = useActionState(loginAction, null);

	return (
		<form action={formAction} className="space-y-4">
			<input
				name="email"
				type="email"
				placeholder="Email"
				required
				className="w-full border rounded p-2"
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				required
				className="w-full border rounded p-2"
			/>

			{state?.error && <p className="text-red-500">{state.error}</p>}

			<button
				type="submit"
				disabled={pending}
				className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-50"
			>
				{pending ? "Logging in..." : "Log in"}
			</button>
		</form>
	);
}
