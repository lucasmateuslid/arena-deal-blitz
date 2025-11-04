import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Urgency } from "@/components/Urgency";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { QuoteModal } from "@/components/QuoteModal";
import { Helmet } from "react-helmet";

const Index = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  
  // ⚠️ IMPORTANTE: Substitua pelo seu número real (código do país + número, sem + ou hífens)
  const PHONE = '5599999999999';
  const GROUP_MESSAGE = 'Olá! Quero entrar no grupo VIP de ofertas da Arena Repasses.';

  const openWhatsApp = (isGroup = true) => {
    const message = isGroup 
      ? GROUP_MESSAGE 
      : 'Olá! Gostaria de falar com o time da Arena Repasses sobre as ofertas.';
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  };

  const handleQuoteSubmit = (model: string) => {
    const message = model 
      ? `Olá! Quero cotar: ${model}` 
      : 'Olá! Quero cotar um veículo.';
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
    setQuoteModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Arena Repasses - Carros com Preços que Desafiam o Mercado | Ofertas VIP</title>
        <meta 
          name="description" 
          content="Mais de 1.000 clientes economizaram até 40% comprando conosco. Entre no grupo VIP e receba as ofertas mais agressivas do Brasil. Acesso exclusivo e gratuito." 
        />
        <meta 
          name="keywords" 
          content="carros, repasses, ofertas agressivas, preços baixos, carros usados, economia, Arena Repasses, grupo VIP" 
        />
        <meta property="og:title" content="Arena Repasses - Preços que Desafiam o Mercado" />
        <meta 
          property="og:description" 
          content="1.000+ clientes satisfeitos! Economize até 40% nas melhores ofertas de carros. Entre no grupo VIP agora!" 
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header onOpenWhatsApp={() => openWhatsApp(true)} />
        
        <main>
          <Hero 
            onOpenWhatsApp={() => openWhatsApp(true)} 
            onOpenQuote={() => setQuoteModalOpen(true)}
          />
          <Benefits />
          <Urgency onOpenWhatsApp={() => openWhatsApp(true)} />
          <Testimonials />
          <FinalCTA onOpenWhatsApp={() => openWhatsApp(true)} />
        </main>

        <Footer onOpenWhatsApp={() => openWhatsApp(true)} />

        <FloatingWhatsApp 
          onOpenWhatsApp={() => openWhatsApp(true)}
          onOpenQuote={() => setQuoteModalOpen(true)}
        />

        <QuoteModal 
          open={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          onSubmit={handleQuoteSubmit}
        />
      </div>
    </>
  );
};

export default Index;
