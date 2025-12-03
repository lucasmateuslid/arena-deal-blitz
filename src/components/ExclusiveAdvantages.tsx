import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, Calendar, Users, Check, Star, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const advantages = [
  {
    icon: TrendingDown,
    title: "Preços Abaixo da FIPE",
    description: "Economia de até 40% comparado ao mercado tradicional",
    badge: "ECONOMIA",
    badgeColor: "bg-green-500"
  },
  {
    icon: ShieldCheck,
    title: "Verificação Completa",
    description: "Todos os veículos passam por checagem rigorosa",
    badge: "SEGURANÇA",
    badgeColor: "bg-blue-500"
  },
  {
    icon: Calendar,
    title: "Ofertas Diárias",
    description: "Novas oportunidades exclusivas todos os dias",
    badge: "FREQUÊNCIA",
    badgeColor: "bg-yellow-500"
  },
  {
    icon: Users,
    title: "Grupo Exclusivo",
    description: "Acesso VIP às melhores ofertas antes de todos",
    badge: "EXCLUSIVO",
    badgeColor: "bg-purple-500"
  }
];

const premiumBenefits = [
  "Sem taxas ou comissões escondidas",
  "Atendimento especializado 24/7",
  "Financiamento facilitado",
  "Garantia de procedência",
  "Suporte pós-compra dedicado",
  "Rede de parceiros confiáveis"
];

const trustIcons = [
  { icon: ShieldCheck, label: "100% Seguro" },
  { icon: Award, label: "Certificado" },
  { icon: Star, label: "+1000 Avaliações" },
  { icon: Clock, label: "Suporte 24h" }
];

export const ExclusiveAdvantages = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            COMUNIDADE PREMIUM
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Vantagens <span className="gradient-text">Exclusivas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Faça parte da maior comunidade de repasses do Brasil no WhatsApp e tenha acesso a benefícios únicos
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
              title="Arena Repasses - Como Funciona"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Placeholder overlay - remover quando tiver o vídeo real */}
            <div className="absolute inset-0 bg-card/90 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent ml-1" />
                </div>
                <p className="text-muted-foreground">Vídeo de apresentação</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Badge className={`${advantage.badgeColor} text-white mb-4 text-xs`}>
                    {advantage.badge}
                  </Badge>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Premium Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Benefícios <span className="text-primary">Premium</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {premiumBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/30"
        >
          {trustIcons.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveAdvantages;
