import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ClipboardList, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/integrations/supabase/client";

interface FloatingWhatsAppProps {
  onOpenWhatsApp: () => void;
  onOpenQuote: () => void;
}

export const FloatingWhatsApp = ({ onOpenWhatsApp, onOpenQuote }: FloatingWhatsAppProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePreview = () => setShowMessage(false);

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
    setShowMessage(false);
    onOpenWhatsApp();
  };

  const handleQuoteClick = () => {
    trackButtonClick("quote", "Floating Quote Button");
    onOpenQuote();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">

      {showMessage && (
        <div
          onClick={handleWhatsAppClick}
          className="
            relative max-w-[260px] sm:max-w-[300px]
            bg-white p-3 pr-6 cursor-pointer
            shadow-xl border border-neutral-200
            rounded-2xl
            animate-in fade-in slide-in-from-bottom-3
            active:scale-95 transition-all
            flex gap-3 items-start
          "
        >
          <button
            className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 z-20"
            onClick={(e) => {
              e.stopPropagation();
              closePreview();
            }}
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className="
              w-10 h-10 rounded-full bg-gradient-to-br
              from-red-600 to-orange-500 text-white
              flex items-center justify-center font-bold shadow-sm
              shrink-0
            "
          >
            Olá
          </div>

          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold text-neutral-800">estamos te aguardando</p>
            <p className="text-xs sm:text-sm text-neutral-600">
              Tá esperando o quê?
              <br />
              <span className="font-semibold text-red-600">
                Conheça agora nossas ofertas!
              </span>
            </p>
          </div>

          {/* RABINHO DO BALÃO — apontando para o botão do WhatsApp */}
          <div className="
            absolute 
            bottom-[-6px] right-4
            w-3 h-3 bg-white 
            border-b border-r border-neutral-200 
            rotate-45
          "></div>
        </div>
      )}

      <div className="flex flex-col gap-3">

        {/* WhatsApp Button */}
        <Button
          size="icon"
          onClick={handleWhatsAppClick}
          className="
            h-14 w-14 sm:h-16 sm:w-16 rounded-full 
            bg-green-500 hover:bg-green-600 
            text-white shadow-lg hover:shadow-2xl 
            transition-all hover:scale-110 animate-pulse
          "
          title="Abrir WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />
        </Button>
      </div>

    </div>
  );
};
