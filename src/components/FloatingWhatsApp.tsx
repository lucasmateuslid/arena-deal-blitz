import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Flame, ClipboardList, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const trackButtonClick = async (buttonType: string, buttonLabel: string) => {
    try {
      await supabase.from("button_clicks").insert({
        button_type: buttonType,
        button_label: buttonLabel,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const handleWhatsAppClick = () => {
    trackButtonClick("whatsapp", "Floating WhatsApp Button");
    onOpenWhatsApp();
  };

  const handleQuoteClick = () => {
    trackButtonClick("quote", "Floating Quote Button");
    onOpenQuote();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3">
      {/* Message Bubble */}
      {showMessage && (
        <div className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full border border-border animate-slide-up shadow-intense">
          <Flame className="w-4 h-4 text-primary animate-bounce" />
          <p className="text-sm font-bold text-foreground whitespace-nowrap">
            Precisa de ajuda?
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Quote Button */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleQuoteClick}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-primary hover:bg-primary hover:text-white shadow-fire transition-all hover:scale-110"
          title="Cotar agora"
        >
          <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* WhatsApp Button */}
        <Button
          size="icon"
          onClick={handleWhatsAppClick}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-fire hover:opacity-90 text-white shadow-fire glow-intense animate-pulse-glow transition-all hover:scale-110"
          title="Abrir WhatsApp"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        </Button>
      </div>
    </div>
  );
};
