const testimonials = [
  {
    rating: 5,
    text: "ABSURDO! Consegui um Civic 2020 com 38% de desconto. A Arena Repasses não brinca em serviço.",
    author: "Carlos Mendes",
    role: "Cliente desde 2023"
  },
  {
    rating: 5,
    text: "Ofertas chegam TODO DIA. Peguei meu sonho de carro por um preço que nunca imaginei ser possível!",
    author: "João Santos", 
    role: "Cliente desde 2024"
  },
  {
    rating: 5,
    text: "Suporte TOP! Responderam todas minhas dúvidas em minutos e facilitaram TUDO. Recomendo demais!",
    author: "Ana Silva",
    role: "Cliente desde 2024"
  },
  {
    rating: 5,
    text: "Comprei 2 carros pelo grupo. Economia real de mais de R$ 35 mil. Melhor decisão que tomei!",
    author: "Pedro Costa",
    role: "Cliente desde 2023"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
            O QUE NOSSOS <span className="gradient-text">CLIENTES</span><br className="hidden sm:block" /> ESTÃO DIZENDO?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de quem já está economizando milhares com a Arena Repasses
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-gradient-card border border-border hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-highlight text-xl">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <div className="font-black text-primary">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full">
            <span className="text-2xl">✓</span>
            <span className="font-bold">Avaliação média: <span className="text-highlight">4.9/5.0</span> baseado em 1.000+ avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};
