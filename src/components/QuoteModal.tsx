import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (model: string) => void;
}

export const QuoteModal = ({ open, onClose, onSubmit }: QuoteModalProps) => {
  const [model, setModel] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setModel("");
    setNome("");
    setTelefone("");
    setEmail("");
    setMensagem("");
  };

  const handleSubmit = async () => {
    if (!model.trim()) {
      toast.error("Por favor, informe o modelo do carro");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from("quote_requests")
        .insert({
          modelo_carro: model,
          nome: nome || null,
          telefone: telefone || null,
          email: email || null,
          mensagem: mensagem || null,
        });

      if (error) throw error;

      toast.success("Cotação enviada com sucesso!");
      onSubmit(model);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Erro ao enviar cotação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-black gradient-text">
            COTAR MEU CARRO
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            Preencha os dados abaixo e nosso time responde em minutos pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Modelo do Carro - Obrigatório */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-foreground font-bold">
              Modelo do Carro *
            </Label>
            <Input
              id="model"
              placeholder="Ex: Honda Civic 2020, Toyota Corolla..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              autoFocus
              required
            />
          </div>

          {/* Nome - Opcional */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-foreground font-bold">
              Seu Nome
            </Label>
            <Input
              id="nome"
              placeholder="João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Telefone - Opcional */}
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-foreground font-bold">
              Telefone/WhatsApp
            </Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(84) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Email - Opcional */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-bold">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Mensagem - Opcional */}
          <div className="space-y-2">
            <Label htmlFor="mensagem" className="text-foreground font-bold">
              Mensagem Adicional
            </Label>
            <Textarea
              id="mensagem"
              placeholder="Conte mais sobre o que você procura..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[80px] resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 order-2 sm:order-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 order-1 sm:order-2 bg-gradient-fire hover:opacity-90 text-white font-black"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {isSubmitting ? "Enviando..." : "Enviar e Abrir WhatsApp"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
