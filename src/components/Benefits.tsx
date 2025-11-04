const benefits = [
  {
    icon: "⚡",
    title: "Ofertas em Tempo Real",
    description: "Novas oportunidades a cada minuto. Sincronização direta com leilões e revendas premium."
  },
  {
    icon: "💰",
    title: "Preços Brutais",
    description: "Negociações agressivas que fazem a diferença. Clientes economizam até 40% vs. mercado tradicional."
  },
  {
    icon: "🛡️",
    title: "Garantia Total",
    description: "100% dos veículos verificados. Documentação em dia, sem pegadinhas. Negócio limpo e seguro."
  },
  {
    icon: "🔥",
    title: "Acesso VIP Exclusivo",
    description: "Membros do grupo recebem ofertas antes de qualquer um. Vagas limitadas para os mais rápidos."
  },
  {
    icon: "🚀",
    title: "Velocidade Absurda",
    description: "Da oferta ao seu carro em menos de 48h. Processo otimizado para você não perder tempo."
  },
  {
    icon: "🤝",
    title: "Suporte Assassino",
    description: "Time especializado disponível 24/7. Acompanhamento do início ao fim do processo."
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
            POR QUE A <span className="gradient-text">ARENA REPASSES</span><br />
            DESTRÓI A CONCORRÊNCIA?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não somos mais uma revenda comum. Somos a revolução do mercado de carros no Brasil.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-card border border-border hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black mb-3 text-primary group-hover:text-accent transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
