import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { FaWhatsapp, FaUser, FaCarSide, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
}

/* ------------------------- Função de Contador ----------------------- */

function useVisitorsCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("visitors");

    if (saved) {
      const updated = Number(saved) + 1;
      localStorage.setItem("visitors", String(updated));
      setCount(updated);
    } else {
      const initial = Math.floor(Math.random() * 25) + 1;
      localStorage.setItem("visitors", String(initial));
      setCount(initial);
    }
  }, []);

  return count;
}

/* ------------------------- Components Reutilizáveis ----------------------- */

const GlowBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/15 rounded-full blur-[80px] sm:blur-[100px]" />
  </div>
);

const Badge = () => (
  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-fire rounded-full font-black text-xs sm:text-sm uppercase tracking-wider text-white">
    <Flame className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
    <span className="hidden xs:inline">OFERTAS EXPLOSIVAS DIÁRIAS</span>
    <span className="xs:hidden">OFERTAS DIÁRIAS</span>
  </div>
);

const CTAButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size="lg"
    onClick={onClick}
    className="w-full sm:w-auto hover:bg-green-800 text-base bg-green-500 font-black text-sm sm:text-base uppercase tracking-wide px-6 sm:px-8 py-6 sm:py-7 glow-intense animate-cta flex items-center gap-2"
  >
    <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    ENTRAR AGORA NO GRUPO VIP
  </Button>
);

/* --------- StatCard com efeito 3D + glow --------- */

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="p-4 sm:p-6 rounded-xl bg-card border border-border stat-3d-card text-center">
    <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
      {label}
    </div>
  </div>
);

/* ----------------------------- Hero Component ----------------------------- */

export const Hero = ({ onOpenWhatsApp }: HeroProps) => {
  const stats = [
    { value: "1200+", label: "Clientes" },
    { value: "20+", label: "Ofertas/Dia" },
    { value: "Até 40%", label: "Economia" },
    { value: "Todo dia", label: "Carros Novos" },
  ];

  const visitors = useVisitorsCount();

  // ícones em círculos → versão react-icons
  const icons = [
    { id: 1, icon: <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 2, icon: <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 3, icon: <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 4, icon: <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20 overflow-hidden">
      <GlowBackground />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 sm:space-y-8 animate-slide-up">

        <Badge />

        <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-8xl leading-[0.95] sm:leading-[0.9] tracking-tighter px-2">
          CARROS COM<br />
          <span className="gradient-text">PREÇOS QUE</span><br />
          <span className="gradient-text">DESAFIAM O MERCADO</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-medium px-4">
          Mais de <span className="text-primary font-black">1200+ motoristas</span> já economizaram até{" "}
          <span className="text-accent font-black">40%</span> comprando conosco. Entre no grupo VIP agora.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 pt-2">
          <CTAButton onClick={onOpenWhatsApp} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-12 px-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* ----------- CONTADOR REAL + ÍCONES + RADIAL GLOW -------------- */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm px-4">

          <div className="relative flex -space-x-3">
            {/* Radial Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-orange-500/40 via-transparent to-transparent blur-2xl rounded-full" />

            {/* Ícones - versão React Icons */}
            {icons.map((item) => (
              <div
                key={item.id}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-white shadow-lg flex items-center justify-center"
              >
                {item.icon}
              </div>
            ))}
          </div>

          <span className="font-medium">
            +{visitors ?? "..."} pessoas entraram hoje
          </span>
        </div>

      </div>
    </section>
  );
};
