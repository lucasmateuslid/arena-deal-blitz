import { motion } from "framer-motion";
import { Users, Search, MessageCircle, CheckCircle, Shield, Clock, Award, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  onOpenWhatsApp: () => void;
}

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Entre no Grupo",
    description: "Clique no botão e seja redirecionado para nosso grupo exclusivo no WhatsApp",
    color: "bg-blue-500"
  },
  {
    number: "02",
    icon: Search,
    title: "Explore as Ofertas",
    description: "Navegue por centenas de veículos com preços muito abaixo da FIPE",
    color: "bg-purple-500"
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Negocie Direto",
    description: "Converse diretamente com vendedores verificados e tire suas dúvidas",
    color: "bg-yellow-500"
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Finalize sua Compra",
    description: "Complete a compra com total segurança e suporte da nossa equipe",
    color: "bg-green-500"
  }
];

const trustBadges = [
  { icon: Shield, label: "Compra Segura" },
  { icon: Clock, label: "Processo Rápido" },
  { icon: Award, label: "Garantia Total" }
];

export const HowItWorks = ({ onOpenWhatsApp }: HowItWorksProps) => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
            PROCESSO SIMPLES E SEGURO
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Como <span className="gradient-text">Funciona</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Em apenas 4 passos simples você terá acesso às melhores ofertas de veículos do Brasil
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection line - desktop only */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-yellow-500 to-green-500" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="flex flex-col items-center text-center">
                  {/* Number Circle */}
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-6 relative z-10 shadow-lg`}>
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 border border-yellow-500/30 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para <span className="text-yellow-400">Economizar</span>?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Junte-se a mais de 1.000 pessoas que já economizaram comprando pelo nosso grupo exclusivo
            </p>
            
            <Button
              onClick={onOpenWhatsApp}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-green-500/30 animate-cta-pulse"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              COMEÇAR AGORA - É GRÁTIS
            </Button>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-yellow-500/20">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                  <badge.icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
