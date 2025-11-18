import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

interface HeaderProps {
  onOpenWhatsApp: () => void;
}

export const Header = ({ onOpenWhatsApp }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 relative">

          {/* MOBILE: TÍTULO À ESQUERDA */}
          <span className="lg:hidden font-black text-xl tracking-tight">
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              ARENA
            </span>{" "}
            <span className="text-foreground">REPASSE</span>
          </span>

          {/* LEFT AREA */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* DESKTOP LOGO ARENA AUTO */}
            <img
              src="https://arenaautonatal.com.br/wp-content/uploads/2025/06/IMG_9166-1-Photoroom.png"
              alt="Arena Auto Logo"
              className="hidden lg:block h-10 w-auto object-contain"
            />
          </div>

          {/* DESKTOP/TABLET: TÍTULO CENTRALIZADO */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <span className="font-black text-2xl tracking-tight">
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                ARENA
              </span>{" "}
              <span className="text-foreground">REPASSE</span>
            </span>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0 ml-auto">

            {/* Desktop only */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenWhatsApp}
              className="
                hidden md:inline-flex font-black uppercase text-xs 
                border border-primary/20 hover:bg-primary/10
                transition-all duration-200
              "
            >
              Grupo VIP
            </Button>

            {/* CTA principal */}
            <Button
              size="sm"
              onClick={onOpenWhatsApp}
              className="
                bg-green-500 hover:bg-green-600 active:scale-95 
                text-white font-black uppercase 
                text-[10px] sm:text-xs px-3 sm:px-6 py-2 sm:py-2.5 
                flex items-center gap-1.5 whitespace-nowrap
                transition-all duration-200 shadow-md hover:shadow-lg
              "
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
