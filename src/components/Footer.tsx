interface FooterProps {
  onOpenWhatsApp: () => void;
}

export const Footer = ({ onOpenWhatsApp }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl sm:text-3xl">🚗</span>
            <span className="font-black text-lg sm:text-xl tracking-tighter">
              <span className="gradient-text">ARENA</span>
              <span className="text-foreground"> REPASSES</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
            Conectando você aos melhores preços em carros de repasse. Economia real, ofertas verificadas.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <button onClick={onOpenWhatsApp} className="text-primary hover:text-primary-foreground transition-colors font-bold">
              Grupo VIP
            </button>
            <button onClick={onOpenWhatsApp} className="text-primary hover:text-primary-foreground transition-colors font-bold">
              WhatsApp
            </button>
          </div>

          {/* Copyright */}
          <div className="pt-4 sm:pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {currentYear} <span className="font-bold text-primary">Arena Repasses</span> — Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
