const benefits = [
  {
    icon: "⚡",
    title: "Ofertas Atualizadas",
    description: "Novas oportunidades todos os dias direto de leilões e parceiros verificados."
  },
  {
    icon: "💰",
    title: "Preços Imbatíveis",
    description: "Economia real de até 40% comparado ao mercado tradicional."
  },
  {
    icon: "🛡️",
    title: "Garantia Total",
    description: "Veículos verificados com documentação 100% em dia e transparente."
  },
  {
    icon: "📱",
    title: "Acesso VIP",
    description: "Membros recebem ofertas em primeira mão antes de todos."
  },
  {
    icon: "🤝",
    title: "Suporte Dedicado",
    description: "Equipe pronta para guiar você em cada etapa da compra."
  },
  {
    icon: "🚀",
    title: "Processo Rápido",
    description: "Muitas negociações fechadas em menos de 48 horas."
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-12 sm:py-16 px-3 sm:px-4 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-2 sm:mb-3">
            Por Que Escolher a <span className="gradient-text">Arena?</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Tudo o que você precisa para encontrar o carro dos seus sonhos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary hover:shadow-fire hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-black text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-fire opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
