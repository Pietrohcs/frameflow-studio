import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="landing-header">
      <Link className="landing-brand" href="/" aria-label="FrameFlow Studio — página inicial">
        FrameFlow
        <span>Studio</span>
      </Link>

      <nav className="landing-nav" aria-label="Acesso à plataforma">
        <Link className="landing-nav-link landing-nav-link-secondary" href="/login">
          Entrar
        </Link>
        <Link className="landing-nav-link landing-nav-link-primary" href="/signup">
          Criar conta
        </Link>
      </nav>
    </header>
  );
}
