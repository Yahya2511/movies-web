import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/logout/actions";

export default async function Navbar() {
	const user = await getCurrentUser();

	return (
		<nav className="flex items-center justify-between border-b px-8 py-4">
			<div className="flex gap-4">
				<Link href="/movies" className="font-bold">
					Movies
				</Link>
				{user && <Link href="/playlists">Playlists</Link>}
				{user?.role === "admin" && <Link href="/admin">Admin</Link>}
			</div>

			<div className="flex items-center gap-4">
				{user ? (
					<>
						<span>{user.name}</span>
						<form action={logoutAction}>
							<button type="submit" className="text-red-500">
								Log out
							</button>
						</form>
					</>
				) : (
					<Link href="/login">Log in</Link>
				)}
			</div>
		</nav>
	);
}
