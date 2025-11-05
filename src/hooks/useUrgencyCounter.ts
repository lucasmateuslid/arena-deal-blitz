import { useState, useEffect } from "react";

/**
 * Hook que gerencia contador de vagas baseado no dia
 * - Valor inicial baseado no dia do ano (40-60 vagas)
 * - Reduz 1-3 vagas a cada 15 minutos
 * - Mínimo de 3 vagas
 */
export const useUrgencyCounter = () => {
  const getInitialSpots = () => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const intervals = Math.floor(minutesSinceMidnight / 15);
    
    // Valor base entre 40-60 baseado no dia
    const baseSpots = 40 + (dayOfYear % 21);
    
    // Reduz 1-3 vagas por intervalo de 15 min
    const reduction = intervals * (1 + (dayOfYear % 3));
    
    return Math.max(3, baseSpots - reduction);
  };

  const [spots, setSpots] = useState(getInitialSpots);

  useEffect(() => {
    // Atualiza a cada 15 minutos
    const interval = setInterval(() => {
      setSpots(prev => {
        if (prev > 5 && Math.random() < 0.4) {
          return Math.max(3, prev - Math.floor(Math.random() * 3) - 1);
        }
        return prev;
      });
    }, 15 * 60 * 1000); // 15 minutos

    return () => clearInterval(interval);
  }, []);

  return spots;
};
