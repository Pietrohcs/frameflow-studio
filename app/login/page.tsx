import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  try {
    const user = await getAuthenticatedUser();

    if (user) {
      redirect("/clients");
    }
  } catch (error) {
    if (!(error instanceof Error && error.message === "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")) {
      throw error;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        <Link className="mb-8 inline-block text-xl font-black tracking-tight text-slate-950" href="/">
          FrameFlow <span className="text-sky-700">Studio</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Entrar</h1>
        <p className="mb-6 mt-2 text-sm leading-6 text-slate-600">
          Acesse sua área privada de clientes.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
