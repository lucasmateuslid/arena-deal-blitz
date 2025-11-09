import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CarDeal {
  id: string;
  titulo: string;
  preco_original: number;
  preco_venda: number;
  imagem_url: string;
  created_at: string;
}

export const SocialProof = () => {
  const [deals, setDeals] = useState<CarDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase
        .from("car_deals")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error("Erro ao carregar ofertas:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSavings = (original: number, sale: number) => {
    const savingsAmount = original - sale;
    const savingsPercent = ((savingsAmount / original) * 100).toFixed(0);
    return { savingsAmount, savingsPercent };
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando ofertas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (deals.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/20 text-accent border-accent/30">
            🔥 NEGÓCIOS FECHADOS
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-2 sm:mb-3">
            Ofertas Que Nossos <span className="gradient-text">Clientes Aproveitaram</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Veja as economias reais que nossos clientes conseguiram
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {deals.map((deal) => {
            const { savingsAmount, savingsPercent } = calculateSavings(
              deal.preco_original,
              deal.preco_venda
            );

            return (
              <Card
                key={deal.id}
                className="overflow-hidden border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-fire group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={deal.imagem_url}
                    alt={deal.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-accent text-accent-foreground font-black text-xs sm:text-sm px-2 sm:px-3 py-1">
                      -{savingsPercent}%
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-black text-foreground mb-3">
                    {deal.titulo}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground line-through">
                        R$ {deal.preco_original.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-accent font-black text-base sm:text-lg">
                        R$ {deal.preco_venda.toLocaleString("pt-BR")}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Economia de{" "}
                        <span className="text-accent font-black">
                          R$ {savingsAmount.toLocaleString("pt-BR")}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
