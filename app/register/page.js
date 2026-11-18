import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
	return (
		<main className="p-8 max-w-sm mx-auto">
			<h1 className="text-3xl font-bold mb-6">Sign up</h1>
			<RegisterForm />
			<p className="mt-4 text-sm">
				Already have an account?{" "}
				<Link href="/login" className="text-blue-500">
					Log in
				</Link>
			</p>
		</main>
	);
}
