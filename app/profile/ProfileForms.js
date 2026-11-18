"use client";

import { useActionState } from "react";
import { updateProfileAction, changePasswordAction } from "./actions";

export default function ProfileForms({ user }) {
	const [profileState, profileAction, profilePending] = useActionState(
		updateProfileAction,
		null,
	);
	const [passwordState, passwordAction, passwordPending] = useActionState(
		changePasswordAction,
		null,
	);

	return (
		<div className="space-y-10">
			<form action={profileAction} className="space-y-3">
				<h2 className="text-xl font-semibold">Your details</h2>
				<p className="text-sm text-gray-500">{user.email}</p>
				<input
					name="name"
					defaultValue={user.name}
					required
					className="w-full border rounded p-2"
				/>
				{profileState?.error && (
					<p className="text-red-500">{profileState.error}</p>
				)}
				{profileState?.success && <p className="text-green-500">Saved!</p>}
				<button
					type="submit"
					disabled={profilePending}
					className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
				>
					{profilePending ? "Saving..." : "Save"}
				</button>
			</form>

			<form action={passwordAction} className="space-y-3">
				<h2 className="text-xl font-semibold">Change password</h2>
				<input
					name="currentPassword"
					type="password"
					placeholder="Current password"
					required
					className="w-full border rounded p-2"
				/>
				<input
					name="newPassword"
					type="password"
					placeholder="New password (6 to 26 characters)"
					minLength={6}
					maxLength={26}
					required
					className="w-full border rounded p-2"
				/>
				{passwordState?.error && (
					<p className="text-red-500">{passwordState.error}</p>
				)}
				{passwordState?.success && (
					<p className="text-green-500">Password changed!</p>
				)}
				<button
					type="submit"
					disabled={passwordPending}
					className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
				>
					{passwordPending ? "Changing..." : "Change password"}
				</button>
			</form>
		</div>
	);
}
