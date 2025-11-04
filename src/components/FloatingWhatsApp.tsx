import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FloatingWhatsAppProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
}

export const FloatingWhatsApp = ({ onOpenWhatsApp, onOpenQuote }: FloatingWhatsAppProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Message Bubble */}
      {showMessage && (
        <div className="hidden sm:block glass px-4 py-2 rounded-full border border-border animate-slide-up shadow-intense">
          <p className="text-sm font-bold text-foreground whitespace-nowrap">
            🔥 Precisa de ajuda? Fale conosco!
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        {/* Quote Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={onOpenQuote}
          className="h-14 w-14 rounded-full border-2 border-primary hover:bg-primary hover:text-white shadow-fire"
          title="Cotar agora"
        >
          <span className="text-2xl">📋</span>
        </Button>

        {/* WhatsApp Button */}
        <Button
          size="icon"
          onClick={onOpenWhatsApp}
          className="h-16 w-16 rounded-full bg-gradient-fire hover:opacity-90 text-black shadow-fire glow-intense animate-pulse-glow"
          title="Abrir WhatsApp"
        >
          <span className="text-3xl">💬</span>
        </Button>
      </div>
    </div>
  );
};
