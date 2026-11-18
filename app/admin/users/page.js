import { authApi } from "@/lib/api";
import { deleteUserAction } from "../actions";

export default async function AdminUsersPage() {
	const users = await authApi("/users");

	return (
		<main className="p-8 max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Users</h1>

			{users.length === 0 ? (
				<p className="text-gray-500">No users yet.</p>
			) : (
				<ul className="space-y-3">
					{users.map((user) => (
						<li
							key={user.id}
							className="flex items-center justify-between border rounded p-4"
						>
							<div>
								<p className="font-semibold">{user.name}</p>
								<p className="text-sm text-gray-500">{user.email}</p>
							</div>
							<form action={deleteUserAction.bind(null, user.id)}>
								<button type="submit" className="text-sm text-red-500">
									Delete
								</button>
							</form>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
