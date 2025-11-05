import { Button } from "@/components/ui/button";
import { useUrgencyCounter } from "@/hooks/useUrgencyCounter";

interface UrgencyProps {
  onOpenWhatsApp: () => void;
}

export const Urgency = ({ onOpenWhatsApp }: UrgencyProps) => {
  const spots = useUrgencyCounter();

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-card border-2 border-primary/30 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-fire opacity-5" />
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          
          <div className="relative z-10 text-center space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-full font-black text-xs uppercase animate-pulse-glow">
              ⏰ ALERTA DE URGÊNCIA
            </div>

            {/* Main Message */}
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter leading-tight px-2">
              NÃO DEIXE ESSA <span className="gradient-text">OPORTUNIDADE</span><br className="hidden xs:block" /> ESCAPAR!
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto px-2">
              As melhores ofertas desaparecem em minutos. Entre no grupo VIP agora.
            </p>

            {/* Countdown */}
            <div className="py-3 sm:py-4">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-background rounded-full border border-border">
                <span className="text-xl sm:text-2xl animate-bounce">🔥</span>
                <span className="text-xl sm:text-2xl font-black text-highlight">{spots}</span>
                <span className="text-muted-foreground uppercase tracking-wide text-xs sm:text-sm">vagas restantes</span>
              </div>
            </div>

            {/* CTA */}
            <Button 
              size="lg"
              onClick={onOpenWhatsApp}
              className="w-full sm:w-auto bg-gradient-fire text-black font-black text-sm sm:text-base uppercase tracking-wide px-8 sm:px-10 py-6 sm:py-7 glow-intense animate-cta"
            >
              🚀 GARANTIR MINHA VAGA
            </Button>

            {/* Additional Urgency */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              ⚡ Últimas 24h: <span className="text-primary font-bold">87 pessoas</span> entraram no grupo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
