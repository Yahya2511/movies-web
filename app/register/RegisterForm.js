"use client";

import { useActionState } from "react";
import { registerAction } from "./actions";

export default function RegisterForm() {
	const [state, formAction, pending] = useActionState(registerAction, null);

	return (
		<form action={formAction} className="space-y-4">
			<input
				name="name"
				placeholder="Name"
				required
				className="w-full border rounded p-2"
			/>
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
				placeholder="Password (6 to 26 characters)"
				minLength={6}
				maxLength={26}
				required
				className="w-full border rounded p-2"
			/>

			{state?.error && <p className="text-red-500">{state.error}</p>}

			<button
				type="submit"
				disabled={pending}
				className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-50"
			>
				{pending ? "Creating account..." : "Sign up"}
			</button>
		</form>
	);
}
