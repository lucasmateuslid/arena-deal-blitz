import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
}

export const Hero = ({ onOpenWhatsApp, onOpenQuote }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/15 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 sm:space-y-8 animate-slide-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-fire rounded-full font-black text-xs sm:text-sm uppercase tracking-wider text-black">
          <span className="animate-bounce text-sm sm:text-base">🔥</span>
          <span className="hidden xs:inline">OFERTAS EXPLOSIVAS DIÁRIAS</span>
          <span className="xs:hidden">OFERTAS DIÁRIAS</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-8xl leading-[0.95] sm:leading-[0.9] tracking-tighter px-2">
          CARROS COM<br />
          <span className="gradient-text">PREÇOS QUE</span><br />
          <span className="gradient-text">DESAFIAM O MERCADO</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-medium px-4">
          Mais de <span className="text-primary font-black">1.000+ motoristas</span> já economizaram até <span className="text-accent font-black">40%</span> comprando conosco. Entre no grupo VIP agora.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 pt-2">
          <Button 
            size="lg"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto bg-gradient-fire text-black font-black text-sm sm:text-base uppercase tracking-wide px-6 sm:px-8 py-6 sm:py-7 glow-intense animate-cta"
          >
            💬 ENTRAR NO GRUPO VIP
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onOpenQuote}
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-black text-sm sm:text-base uppercase tracking-wide px-6 sm:px-8 py-6 sm:py-7 transition-all hover:scale-105"
          >
            📋 COTAR MEU CARRO
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-12 px-4">
          <div className="p-4 sm:p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">1K+</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Clientes</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">50+</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Ofertas/Dia</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">40%</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Economia</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Suporte</div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm px-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-fire border-2 border-background" />
            ))}
          </div>
          <span className="font-medium">+47 pessoas entraram hoje</span>
        </div>
      </div>
    </section>
  );
};
