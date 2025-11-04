import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
}

export const Hero = ({ onOpenWhatsApp, onOpenQuote }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-fire rounded-full font-black text-sm uppercase tracking-wider text-black">
          <span className="animate-bounce">🔥</span>
          OFERTAS EXPLOSIVAS DIÁRIAS
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl leading-[0.9] tracking-tighter">
          CARROS COM<br />
          <span className="gradient-text">PREÇOS QUE</span><br />
          <span className="gradient-text">DESAFIAM O MERCADO</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Mais de <span className="text-primary font-black">1.000+ motoristas</span> já economizaram até <span className="text-accent font-black">40% comprando conosco</span>. Entre no grupo VIP e receba as ofertas mais agressivas do Brasil.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={onOpenWhatsApp}
            className="bg-gradient-fire hover:opacity-90 text-black font-black text-base uppercase tracking-wide px-8 py-7 glow-intense shadow-fire hover:scale-105 transition-all"
          >
            💬 ENTRAR NO GRUPO VIP AGORA
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onOpenQuote}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-black text-base uppercase tracking-wide px-8 py-7"
          >
            📋 COTAR MEU CARRO
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          <div className="p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-4xl font-black gradient-text mb-1">1.000+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Clientes Felizes</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-4xl font-black gradient-text mb-1">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Ofertas Diárias</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-4xl font-black gradient-text mb-1">40%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Economia Média</div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border hover-lift">
            <div className="text-4xl font-black gradient-text mb-1">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Suporte Ativo</div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-fire border-2 border-background" />
            ))}
          </div>
          <span className="font-medium">+47 pessoas entraram no grupo hoje</span>
        </div>
      </div>
    </section>
  );
};
