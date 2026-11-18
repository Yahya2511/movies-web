import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
	return (
		<main className="p-8 max-w-sm mx-auto">
			<h1 className="text-3xl font-bold mb-6">Log in</h1>
			<LoginForm />
			<p className="mt-4 text-sm">
				No account?{" "}
				<Link href="/register" className="text-blue-500">
					Sign up
				</Link>
			</p>
		</main>
	);
}
