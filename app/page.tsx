import { redirect } from "next/navigation";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const user = await getAuthenticatedUser();

    if (user) {
      redirect("/clients");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY") {
      // The public landing page remains available when Supabase is not configured locally.
    } else {
      throw error;
    }
  }

  return (
    <main className="landing-page">
      <LandingHeader />

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-eyebrow">Gestão simples para fotógrafos</div>
        <h1 id="landing-title">
          Organize seus clientes com o <span>FrameFlow Studio</span>
        </h1>
        <p>
          Centralize os dados dos seus clientes em um ambiente privado, simples e
          preparado para acompanhar a rotina do seu trabalho fotográfico.
        </p>

        <div className="landing-actions">
          <Link className="landing-action landing-action-primary" href="/signup">
            Criar conta
          </Link>
          <Link className="landing-action landing-action-secondary" href="/login">
            Entrar
          </Link>
        </div>
      </section>
    </main>
  );
}
