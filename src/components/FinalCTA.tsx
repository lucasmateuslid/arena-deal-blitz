import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  onOpenWhatsApp: () => void;
}

export const FinalCTA = ({ onOpenWhatsApp }: FinalCTAProps) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Message */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
          PRONTO PARA <span className="gradient-text">ECONOMIZAR</span><br className="hidden sm:block" />
          MILHARES DE REAIS?
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Junte-se a mais de 1.000 motoristas inteligentes que já estão aproveitando as melhores ofertas do Brasil. Entre no grupo VIP agora — é <span className="text-primary font-black">100% GRATUITO</span>.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Button 
            size="lg"
            onClick={onOpenWhatsApp}
            className="bg-gradient-fire hover:opacity-90 text-black font-black text-lg uppercase tracking-wide px-12 py-8 glow-intense shadow-fire hover:scale-105 transition-all"
          >
            🚀 ENTRAR NO GRUPO VIP GRATUITAMENTE
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>100% Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Ofertas Exclusivas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Acesso Imediato</span>
          </div>
        </div>
      </div>
    </section>
  );
};
