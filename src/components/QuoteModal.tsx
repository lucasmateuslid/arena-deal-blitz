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
import { z } from "zod";

const quoteSchema = z.object({
  modelo_carro: z.string().trim().min(3, "Modelo deve ter no mínimo 3 caracteres").max(100, "Modelo muito longo"),
  nome: z.string().trim().max(100, "Nome muito longo").optional(),
  telefone: z.string().trim().max(20, "Telefone muito longo").optional(),
  mensagem: z.string().trim().max(500, "Mensagem muito longa (máximo 500 caracteres)").optional(),
});

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (model: string) => void;
}

export const QuoteModal = ({ open, onClose, onSubmit }: QuoteModalProps) => {
  const [model, setModel] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setModel("");
    setNome("");
    setTelefone("");
    setMensagem("");
  };

  const handleSubmit = async () => {
    // Validate input
    const validation = quoteSchema.safeParse({
      modelo_carro: model,
      nome: nome || undefined,
      telefone: telefone || undefined,
      mensagem: mensagem || undefined,
    });

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database with validated data
      const { error } = await supabase
        .from("quote_requests")
        .insert({
          modelo_carro: validation.data.modelo_carro,
          nome: validation.data.nome || null,
          telefone: validation.data.telefone || null,
          mensagem: validation.data.mensagem || null,
          email: null,
        });

      if (error) throw error;

      toast.success("Cotação enviada com sucesso!");
      onSubmit(validation.data.modelo_carro);
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Erro ao enviar cotação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
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
              maxLength={100}
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
              maxLength={100}
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
              maxLength={20}
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
              maxLength={500}
            />
            {mensagem.length > 0 && (
              <p className="text-xs text-muted-foreground text-right">
                {mensagem.length}/500
              </p>
            )}
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
