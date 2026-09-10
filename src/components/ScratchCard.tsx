import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Eye, Gift, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';

interface ScratchCardProps {
  title?: string;
  hiddenMessage: string;
  template: TemplateDefinition;
  className?: string;
  language?: SupportedLanguage;
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  title,
  hiddenMessage,
  template,
  className = '',
  language = 'gu',
  onRevealed,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.gu;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Storage key for persistent revealed state
  const storageKey = `jain_parna_scratch_revealed_${encodeURIComponent((hiddenMessage || 'default').slice(0, 30))}`;

  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem(storageKey) === 'true';
      }
    } catch {
      // noop
    }
    return false;
  });

  const [scratchedPercent, setScratchedPercent] = useState(isRevealed ? 100 : 0);
  const [isDrawing, setIsDrawing] = useState(false);
  const colors = template?.colors || ({} as any);

  const cardTitle = title || t.scratchDefaultTitle;

  // Initialize Canvas with Rich Golden Shimmer Foil
  const initCanvas = useCallback((forceReset = false) => {
    if (isRevealed && !forceReset) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 280);
    const height = Math.max(rect.height, 140);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic foil gradient specific to template
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const stops = template?.colors.foilGradient || ['#B8860B', '#E5C07B', '#FFF6CC', '#D4AF37', '#AA771C', '#8C6215'];
    stops.forEach((stop, idx) => {
      gradient.addColorStop(idx / (stops.length - 1), stop);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle ornate jali diamond pattern on gold foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1;
    const step = 20;
    for (let x = 0; x < width + step; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - height, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - height, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Outer inner border on the foil
    ctx.strokeStyle = '#6E490D';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);
    ctx.strokeStyle = '#FFEAA8';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Localized Calligraphy / Text on Gold Foil
    ctx.fillStyle = '#4A3008';
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.scratchFoilInstruction1, width / 2, height / 2 - 12);

    ctx.font = '600 11px sans-serif';
    ctx.fillStyle = '#5C3C0B';
    ctx.fillText(t.scratchFoilInstruction2, width / 2, height / 2 + 12);

    if (forceReset) {
      setIsRevealed(false);
      setScratchedPercent(0);
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // noop
      }
    }
  }, [t, isRevealed, storageKey]);

  useEffect(() => {
    if (!isRevealed) {
      initCanvas();
    }
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Calculate percentage of area scratched
  const calculateScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      // Sample every 8th pixel for speed
      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] < 128) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / (totalPixels / 8)) * 100);
      setScratchedPercent(percent);

      if (percent >= 42 && !isRevealed) {
        revealAll();
      }
    } catch {
      // Ignore cross-origin context issues if any
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width ? canvas.width / rect.width : 1;
    const scaleY = rect.height ? canvas.height / rect.height : 1;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22 * scaleX, 0, Math.PI * 2);
    ctx.fill();

    calculateScratched();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const revealAll = () => {
    setIsRevealed(true);
    setScratchedPercent(100);
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(storageKey, 'true');
      }
    } catch {
      // noop
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E5C07B', '#F3E5AB', '#FFF'],
      });
    } catch {
      // noop
    }
    if (onRevealed) onRevealed();
  };

  return (
    <div className={`w-full max-w-md mx-auto my-4 text-center ${className}`}>
      {/* Title Header */}
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <Sparkles className="w-3.5 h-3.5" style={{ color: colors.accentGold }} />
        <span 
          className="text-xs uppercase font-cinzel tracking-widest font-semibold"
          style={{ color: colors.subtext }}
        >
          {cardTitle}
        </span>
      </div>

      {/* Main Scratch Box Container */}
      <div
        ref={containerRef}
        className={`relative min-h-[140px] rounded-2xl overflow-hidden border shadow-md flex items-center justify-center p-5 select-none ${
          !isRevealed ? 'touch-none' : ''
        }`}
        style={{
          background: template?.colors.sectionBg,
          borderColor: isRevealed ? colors.accentGold : template?.colors.sectionBorder || `${colors.accentGold}70`,
          boxShadow: isRevealed ? `0 0 20px ${colors.accentGold}25` : undefined,
        }}
      >
        {/* UNDERNEATH: THE SECRET REVEALED MESSAGE */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-2 text-center animate-in fade-in duration-300">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 border shadow-xs"
            style={{
              backgroundColor: `${colors.accentGold}20`,
              borderColor: `${colors.accentGold}60`,
              color: colors.accentGold,
            }}
          >
            <Gift className="w-4 h-4" />
          </div>

          <span 
            className="font-hindi text-xs sm:text-sm font-bold tracking-wider block mb-1.5"
            style={{ color: colors.accentGold }}
          >
            {isRevealed ? `🌸 ${t.scratchRevealedStatus}` : t.scratchBadge}
          </span>

          <p 
            className="font-cormorant text-sm sm:text-base italic leading-relaxed whitespace-pre-line max-w-sm font-medium"
            style={{ color: colors.text }}
          >
            "{hiddenMessage || t.scratchDefaultMessage}"
          </p>
        </div>

        {/* OVERLAY: SCRATCHABLE CANVAS (Only rendered/active if NOT yet revealed) */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 z-20 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 touch-none"
            title="Scratch softly with your finger or mouse to reveal"
          />
        )}
      </div>

      {/* Scratch Helper / Quick Reveal Controls */}
      <div className="mt-2 flex items-center justify-between px-2 text-[11px]">
        <span style={{ color: colors.subtext }}>
          {isRevealed ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              ✨ {language === 'gu' ? 'સંદેશ સુંદર રીતે પ્રગટ થયેલ છે' : language === 'hi' ? 'संदेश सुंदरता से प्रकट हुआ है' : 'Blessing message revealed'}
            </span>
          ) : (
            <span>{language === 'gu' ? `સ્ક્રેચ: ${scratchedPercent}%` : language === 'hi' ? `स्क्रैच: ${scratchedPercent}%` : `Scratched: ${scratchedPercent}%`}</span>
          )}
        </span>

        {!isRevealed ? (
          <button
            type="button"
            onClick={revealAll}
            className="inline-flex items-center gap-1 font-medium hover:underline cursor-pointer"
            style={{ color: colors.accentGold }}
          >
            <Eye className="w-3 h-3" />
            <span>{t.scratchRevealBtn}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => initCanvas(true)}
            className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-600 cursor-pointer text-[10px]"
            title="Reset scratch to replay animation"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{language === 'gu' ? 'ફરીથી સ્ક્રેચ કરો' : language === 'hi' ? 'पुनः स्क्रैच करें' : 'Replay scratch'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
