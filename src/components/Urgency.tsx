import { Button } from "@/components/ui/button";
import { useUrgencyCounter } from "@/hooks/useUrgencyCounter";
import { Clock, Flame, Zap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface UrgencyProps {
  onOpenWhatsApp: () => void;
}

export const Urgency = ({ onOpenWhatsApp }: UrgencyProps) => {
  const spots = useUrgencyCounter();

  return (
    <section className="py-14 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* CARD */}
        <div className="relative p-8 sm:p-10 lg:p-14 rounded-3xl bg-card border border-primary/30 shadow-xl overflow-hidden">

          {/* GLOW */}
          <div className="absolute inset-0 opacity-10 bg-gradient-fire" />
          <div className="absolute top-0 right-0 w-56 h-56 sm:w-72 sm:h-72 bg-primary/30 rounded-full blur-[90px] animate-pulse-glow" />

          {/* CONTENT */}
          <div className="relative z-10 text-center space-y-6">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-black text-xs tracking-wide uppercase animate-pulse">
              <Clock className="w-4 h-4" />
              Alerta de Urgência
            </div>

            {/* TITLE */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              ÚLTIMAS <span className="gradient-text">VAGAS LIBERADAS</span>
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
              As melhores ofertas costumam desaparecer rápido. Garanta sua vaga no grupo VIP enquanto ainda está disponível.
            </p>

            {/* COUNTER */}
            <div className="py-3 sm:py-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-background rounded-full border border-border shadow-soft">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
                <span className="text-2xl sm:text-3xl font-black text-primary">{spots}</span>
                <span className="uppercase text-xs sm:text-sm text-muted-foreground tracking-wide">
                  vagas restantes
                </span>
              </div>
            </div>

            {/* CTA BUTTON — AGORA VERDE */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={onOpenWhatsApp}
                className="
                  w-full sm:w-auto 
                  bg-green-500 hover:bg-green-600 text-white 
                  font-black text-sm sm:text-base uppercase 
                  tracking-wide px-10 py-6 sm:py-7
                  rounded-full shadow-lg shadow-green-500/20 
                  flex items-center justify-center gap-2 
                  transition-all hover:scale-105
                "
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                Garantir Minha Vaga
              </Button>
            </div>

            {/* SUB MESSAGE */}
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-black">O Seu carro</span>te espera no grupo VIP!
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};
