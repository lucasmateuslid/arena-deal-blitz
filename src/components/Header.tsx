import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenWhatsApp: () => void;
}

export const Header = ({ onOpenWhatsApp }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Logo Left */}
          <div className="flex items-center gap-2">
            <img 
              src="/placeholder.svg" 
              alt="Arena Repasses Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>

          {/* Title Center */}
          <div className="flex justify-center">
            <span className="font-black text-lg sm:text-2xl tracking-tighter text-center">
              <span className="gradient-text">ARENA</span>
              <span className="text-foreground"> REPASSES</span>
            </span>
          </div>

          {/* Actions Right */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenWhatsApp}
              className="hidden sm:inline-flex font-black uppercase text-xs border border-primary/20 hover:bg-primary/10"
            >
              Grupo VIP
            </Button>
            <Button
              size="sm"
              onClick={onOpenWhatsApp}
              className="bg-gradient-fire hover:opacity-90 text-black font-black uppercase text-xs px-4 sm:px-6 animate-cta"
            >
              📱 Entrar Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
