import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface UrgencyProps {
  onOpenWhatsApp: () => void;
}

export const Urgency = ({ onOpenWhatsApp }: UrgencyProps) => {
  const [spots, setSpots] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => {
        if (prev > 5 && Math.random() < 0.35) {
          return Math.max(3, prev - Math.floor(Math.random() * 3) - 1);
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-card border-2 border-primary/30 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-fire opacity-5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          
          <div className="relative z-10 text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-black text-xs uppercase animate-pulse-glow">
              ⏰ ALERTA DE URGÊNCIA
            </div>

            {/* Main Message */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-tight">
              NÃO DEIXE ESSA <span className="gradient-text">OPORTUNIDADE</span><br className="hidden sm:block" /> ESCAPAR!
            </h3>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              As melhores ofertas desaparecem em minutos. Entre no grupo VIP agora e seja o primeiro a receber as ofertas mais agressivas.
            </p>

            {/* Countdown */}
            <div className="py-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-background rounded-full border border-border">
                <span className="text-2xl animate-bounce">🔥</span>
                <span className="text-2xl font-black text-highlight">{spots}</span>
                <span className="text-muted-foreground uppercase tracking-wide text-sm">vagas restantes</span>
              </div>
            </div>

            {/* CTA */}
            <Button 
              size="lg"
              onClick={onOpenWhatsApp}
              className="bg-gradient-fire hover:opacity-90 text-black font-black text-base uppercase tracking-wide px-10 py-7 glow-intense shadow-fire hover:scale-105 transition-all"
            >
              🚀 GARANTIR MINHA VAGA AGORA
            </Button>

            {/* Additional Urgency */}
            <p className="text-xs text-muted-foreground">
              ⚡ Últimas 24h: <span className="text-primary font-bold">87 pessoas</span> entraram no grupo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
