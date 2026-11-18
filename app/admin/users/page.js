import Link from "next/link";
import { authApi } from "@/lib/api";
import { deleteUserAction } from "../actions";

export default async function AdminUsersPage() {
	const users = await authApi("/users");

	return (
		<main className="mx-auto max-w-3xl p-6 md:p-8">
			<Link href="/admin" className="text-sm text-blue-400 hover:text-blue-300">
				← Back to movies
			</Link>
			<h1 className="mb-6 mt-4 text-3xl font-bold">Users</h1>

			{users.length === 0 ? (
				<p className="text-gray-400">No users yet.</p>
			) : (
				<ul className="space-y-2">
					{users.map((user) => (
						<li
							key={user.id}
							className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
						>
							<div>
								<p className="font-semibold">{user.name}</p>
								<p className="text-sm text-gray-400">{user.email}</p>
							</div>
							<form action={deleteUserAction.bind(null, user.id)}>
								<button
									type="submit"
									className="text-sm text-red-400 hover:text-red-300"
								>
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
