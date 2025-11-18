import { motion } from "framer-motion";
import {
  Zap,
  Tag,
  ShieldCheck,
  Smartphone,
  Car,
  Timer
} from "lucide-react";

// Lista de benefícios com ícones dentro de círculos + radial glow
const benefits = [
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <Zap className="w-6 h-6" />
      </div>
    ),
    title: "Ofertas Atualizadas",
    description: "Novas oportunidades todos os dias direto de leilões e parceiros selecionados."
  },
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <Tag className="w-6 h-6" />
      </div>
    ),
    title: "Preços Imbatíveis",
    description: "Economia real de até 40% comparado ao mercado tradicional."
  },
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <ShieldCheck className="w-6 h-6" />
      </div>
    ),
    title: "Transparência Total",
    description: "Tudo claro, simples e direto, sem complicação."
  },
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <Smartphone className="w-6 h-6" />
      </div>
    ),
    title: "Acesso VIP",
    description: "Receba as melhores ofertas antes de todo mundo."
  },
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <Car className="w-6 h-6" />
      </div>
    ),
    title: "Estoque Atualizado",
    description: "Opções para todos os gostos, estilos e necessidades."
  },
  {
    icon: (
      <div className="radial-glow w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-fire border-2 border-background flex items-center justify-center text-white">
        <Timer className="w-6 h-6" />
      </div>
    ),
    title: "Processo Rápido",
    description: "Negociações ágeis — muitas fechadas em menos de 48 horas."
  }
];

// Componente principal
export const Benefits = () => {
  return (
    <section id="benefits" className="py-12 sm:py-16 px-3 sm:px-4 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-2 sm:mb-3">
            Por Que Escolher a <span className="gradient-text">Arena?</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Tudo o que você precisa para encontrar o carro ideal pelo melhor preço.
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary hover:shadow-fire hover:-translate-y-2"
            >
              {/* Ícone */}
              <div className="mb-4 flex justify-start transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>

              {/* Título */}
              <h3 className="text-lg sm:text-xl font-black text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                {benefit.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Efeito Fire Glow ao hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-fire opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
