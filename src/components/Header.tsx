import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

interface HeaderProps {
  onOpenWhatsApp: () => void;
}

export const Header = ({ onOpenWhatsApp }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:grid sm:grid-cols-3">
          {/* Logo Left */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img 
              src="https://arenaautonatal.com.br/wp-content/uploads/2025/06/IMG_9166-1-Photoroom.png" 
              alt="Arena Repasse Logo" 
              className="h-9 sm:w-48 sm:h-12 object-contain"
            />
          </div>

          {/* Title Center - Hidden on mobile */}
          <div className="hidden sm:flex justify-center">
            <span className="font-black text-lg sm:text-2xl tracking-tighter text-center whitespace-nowrap">
              <span className="gradient-text">ARENA</span>
              <span className="text-foreground"> REPASSE</span>
            </span>
          </div>

          {/* Actions Right */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenWhatsApp}
              className="hidden md:inline-flex font-black uppercase text-xs border border-primary/20 hover:bg-primary/10"
            >
              Grupo VIP
            </Button>
            <Button
              size="sm"
              onClick={onOpenWhatsApp}
              className="bg-gradient-fire hover:opacity-90 text-white font-black uppercase text-[10px] sm:text-xs px-3 sm:px-6 py-2 sm:py-2.5 animate-cta whitespace-nowrap flex items-center gap-1.5"
            >
              <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Entrar Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
