interface FooterProps {
  onOpenWhatsApp: () => void;
}

export const Footer = ({ onOpenWhatsApp }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl">🚗</span>
            <span className="font-black text-2xl tracking-tighter">
              <span className="gradient-text">ARENA</span>
              <span className="text-foreground"> REPASSES</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-md mx-auto">
            Conectando você aos <span className="text-primary font-bold">preços mais agressivos</span> do mercado de carros.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a 
              href="#benefits" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Benefícios
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onOpenWhatsApp(); }}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              WhatsApp
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onOpenWhatsApp(); }}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Contato
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">Arena Repasses</span> © {currentYear} — Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
