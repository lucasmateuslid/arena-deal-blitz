import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (model: string) => void;
}

export const QuoteModal = ({ open, onClose, onSubmit }: QuoteModalProps) => {
  const [model, setModel] = useState("");

  const handleSubmit = () => {
    onSubmit(model);
    setModel("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black gradient-text">
            COTAR MEU CARRO
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Digite o modelo do carro que você quer e nosso time responde em minutos pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Input
            placeholder="Ex: Honda Civic 2020, Toyota Corolla..."
            value={model}
            onChange={(e) => setModel(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-fire hover:opacity-90 text-black font-black"
            >
              📱 Enviar e Abrir WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
