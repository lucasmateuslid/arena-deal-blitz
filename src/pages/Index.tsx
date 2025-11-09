import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Helmet } from "react-helmet";

// Lazy load components não críticos
const Benefits = lazy(() => import("@/components/Benefits").then(m => ({ default: m.Benefits })));
const Urgency = lazy(() => import("@/components/Urgency").then(m => ({ default: m.Urgency })));
const SocialProof = lazy(() => import("@/components/SocialProof").then(m => ({ default: m.SocialProof })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const FinalCTA = lazy(() => import("@/components/FinalCTA").then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const FloatingWhatsApp = lazy(() => import("@/components/FloatingWhatsApp").then(m => ({ default: m.FloatingWhatsApp })));
const QuoteModal = lazy(() => import("@/components/QuoteModal").then(m => ({ default: m.QuoteModal })));

const Index = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  
  // Link do Canal/Grupo VIP do WhatsApp
  const VIP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb6nvHz1HspvY1SrS91F';
  const PHONE = '5584996850030'; // Para cotações individuais

  const openWhatsApp = (isGroup = true) => {
    if (isGroup) {
      // Abre o canal VIP diretamente
      window.open(VIP_CHANNEL_URL, '_blank', 'noopener');
    } else {
      // Mensagem para cotação individual
      const message = 'Olá! Gostaria de falar com o time da Arena Repasses sobre as ofertas.';
      const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    }
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
          
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <Benefits />
            <Urgency onOpenWhatsApp={() => openWhatsApp(true)} />
            <SocialProof />
            <Testimonials />
            <FinalCTA onOpenWhatsApp={() => openWhatsApp(true)} />
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
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
