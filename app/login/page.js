import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
	return (
		<main className="mx-auto max-w-sm p-6 pt-16">
			<div className="rounded-2xl border border-white/10 bg-white/5 p-8">
				<h1 className="text-2xl font-bold">Welcome back</h1>
				<p className="mb-6 mt-1 text-sm text-gray-400">
					Log in to rate movies and manage your playlists.
				</p>

				<LoginForm />

				<p className="mt-6 text-center text-sm text-gray-400">
					No account?{" "}
					<Link href="/register" className="text-blue-400 hover:text-blue-300">
						Sign up
					</Link>
				</p>
			</div>
		</main>
	);
}
