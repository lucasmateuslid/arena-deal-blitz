const testimonials = [
  {
    rating: 5,
    text: "Encontrei o carro dos meus sonhos com 35% de desconto! A Arena realmente entrega.",
    author: "Carlos M.",
    year: "2023"
  },
  {
    rating: 5,
    text: "Ofertas chegam todo dia. Peguei um veículo impecável por um preço inacreditável!",
    author: "João S.",
    year: "2024"
  },
  {
    rating: 5,
    text: "Suporte excelente! Responderam tudo e facilitaram o processo inteiro.",
    author: "Ana Silva",
    year: "2024"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-2 sm:mb-3">
            O Que Dizem <span className="gradient-text">Nossos Clientes</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Avaliações reais de quem já aproveitou
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-fire"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-accent text-lg sm:text-xl">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="text-xs sm:text-sm">
                <span className="font-black text-primary">{testimonial.author}</span>
                <span className="text-muted-foreground"> • Cliente desde {testimonial.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
