import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
	return (
		<main className="mx-auto max-w-sm p-6 pt-16">
			<div className="rounded-2xl border border-white/10 bg-white/5 p-8">
				<h1 className="text-2xl font-bold">Create an account</h1>
				<p className="mb-6 mt-1 text-sm text-gray-400">
					Join to rate movies and build playlists.
				</p>

				<RegisterForm />

				<p className="mt-6 text-center text-sm text-gray-400">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-400 hover:text-blue-300">
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
}
