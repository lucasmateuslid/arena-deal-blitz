import { Button } from "@/components/ui/button";

interface FinalCTAProps {
  onOpenWhatsApp: () => void;
}

export const FinalCTA = ({ onOpenWhatsApp }: FinalCTAProps) => {
  return (
    <section className="py-12 sm:py-20 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Main Message */}
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter leading-tight px-2">
          PRONTO PARA <span className="gradient-text">ECONOMIZAR</span><br className="hidden xs:block" />
          MILHARES DE REAIS?
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Junte-se a mais de 1.000 motoristas inteligentes que já estão aproveitando as melhores ofertas. Entre agora — é <span className="text-primary font-black">100% GRATUITO</span>.
        </p>

        {/* CTA Button */}
        <div className="pt-2 sm:pt-4 px-4">
          <Button 
            size="lg"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto hover:bg-green-800 text-base bg-green-500 font-black text-base sm:text-lg uppercase tracking-wide px-8 sm:px-12 py-6 sm:py-8 glow-intense animate-cta"
          >
            🚀 ENTRAR NO GRUPO VIP GRÁTIS
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 text-xs sm:text-sm text-muted-foreground px-4">
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg sm:text-xl">✓</span>
            <span>100% Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg sm:text-xl">✓</span>
            <span>Ofertas Exclusivas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg sm:text-xl">✓</span>
            <span>Acesso Imediato</span>
          </div>
        </div>
      </div>
    </section>
  );
};
