import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/logout/actions";

const linkClass = "text-sm text-gray-300 hover:text-white";

export default async function Navbar() {
	const user = await getCurrentUser();

	return (
		<nav className="sticky top-0 z-10 border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-6">
					<Link href="/" className="text-lg font-bold text-white">
						🎬 Movies
					</Link>
					<Link href="/movies" className={linkClass}>
						Browse
					</Link>
					{user && (
						<Link href="/playlists" className={linkClass}>
							Playlists
						</Link>
					)}
					{user?.role === "admin" && (
						<Link href="/admin" className={linkClass}>
							Admin
						</Link>
					)}
				</div>

				<div className="flex items-center gap-4">
					{user ? (
						<>
							<Link href="/profile" className={linkClass}>
								{user.name}
							</Link>
							<form action={logoutAction}>
								<button
									type="submit"
									className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/10"
								>
									Log out
								</button>
							</form>
						</>
					) : (
						<>
							<Link href="/login" className={linkClass}>
								Log in
							</Link>
							<Link
								href="/register"
								className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
							>
								Sign up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
