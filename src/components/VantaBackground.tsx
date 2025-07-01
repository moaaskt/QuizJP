import { useEffect, useRef } from 'react';

// Definição das props para o componente VantaBackground
interface VantaBackgroundProps {
  effect?: 'net' | 'globe'; // Tipo de efeito de fundo 
  children: React.ReactNode; 
}

export default function VantaBackground({ effect = 'net', children }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null); // Referência para o elemento onde o efeito será aplicado
  const vantaEffect = useRef<any>(null); // Armazena a instância do efeito Vanta

  useEffect(() => {
    if (!vantaRef.current) return;

    // Função que inicializa o efeito Vanta com base no tipo escolhido
    const initVanta = () => {


      // Se já houver um efeito ativo, destrói ele antes de criar um novo
      if (vantaEffect.current) vantaEffect.current.destroy();


      
      // Detecta o tipo de dispositivo para otimizar desempenho
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;
      
      // Inicializa o efeito Globe se for selecionado e estiver disponível
      if (effect === 'globe' && (window as any).VANTA?.GLOBE) {
        vantaEffect.current = (window as any).VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: !isMobile, // Habilita controle do mouse em desktop
          touchControls: true, // Habilita toque em dispositivos móveis
          gyroControls: false, // Não usa giroscópio
          minHeight: 200.0,
          minWidth: 200.0,
          scale: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
          scaleMobile: 0.7,
          color: 0x00f7ff, // Cor primária do efeito
          color2: 0xae00ff, // Cor secundária
          backgroundColor: 0x0e0e1a, // Cor de fundo
          size: isMobile ? 0.5 : isTablet ? 0.7 : 0.8 // Tamanho do globo
        });
      } 


      // Caso contrário, usa o efeito Net como padrão
      else if ((window as any).VANTA?.NET) {
        vantaEffect.current = (window as any).VANTA.NET({
          el: vantaRef.current,
          mouseControls: !isMobile, // Controle do mouse apenas em desktop
          touchControls: true, // Controle por toque
          gyroControls: false, // Sem uso do giroscópio
          minHeight: 200.0,
          minWidth: 200.0,
          scale: isMobile ? 0.7 : isTablet ? 0.9 : 1.0,
          scaleMobile: 0.7,
          color: 0x00f7ff, // Cor principal
          backgroundColor: 0x0e0e1a, // Fundo escuro
          points: isMobile ? 5.0 : isTablet ? 7.0 : 10.0, // Número de pontos
          maxDistance: isMobile ? 12.0 : isTablet ? 18.0 : 25.0, // Distância máxima entre pontos
          spacing: isMobile ? 10.0 : isTablet ? 13.0 : 16.0 // Espaçamento entre pontos
        });
      }
    };

    

    // Se o script do VANTA já estiver carregado, inicia o efeito imediatamente
    if ((window as any).VANTA) {
      initVanta();
    } else {
      // Senão, aguarda até que o script seja carregado
      const checkVanta = setInterval(() => {
        if ((window as any).VANTA) {
          initVanta();
          clearInterval(checkVanta);
        }
      }, 100);

      return () => clearInterval(checkVanta); // Limpa o intervalo ao sair
    }

    // Reajusta o efeito quando a janela é redimensionada
    const handleResize = () => {
      if (vantaEffect.current) {
        setTimeout(initVanta, 200); // Pequeno delay para evitar múltiplas chamadas rápidas
      }
    };

    window.addEventListener('resize', handleResize); // Escuta o evento de resize

    // Limpeza: remove eventos e destrói o efeito ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [effect]); // O efeito é recriado se o tipo mudar

  // Estrutura do layout com fundo animado e conteúdo acima dele
  return (
    <div ref={vantaRef} className="fixed inset-0 z-0">
      {/* Camada superior com o conteúdo real da página */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}