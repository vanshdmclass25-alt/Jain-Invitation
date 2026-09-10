import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Clock, Heart, Sparkles, Droplets } from 'lucide-react';
import { AshtamangalaRow } from './JainTempleAccents';

interface ParnaVidhiGuideProps {
  accentColor?: string;
  textColor?: string;
  isDark?: boolean;
  sectionBg?: string;
  sectionBorder?: string;
}

export const ParnaVidhiGuide: React.FC<ParnaVidhiGuideProps> = ({
  accentColor = '#C29B38',
  textColor = '#2C1810',
  isDark = false,
  sectionBg,
  sectionBorder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl border p-4 sm:p-5 shadow-xs select-none transition-all"
      style={{
        background: sectionBg || (isDark ? 'rgba(15, 30, 51, 0.6)' : '#FFFDF9'),
        borderColor: sectionBorder || `${accentColor}40`,
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-hindi text-sm sm:text-base font-bold" style={{ color: textColor }}>
              પારણા વિધિ અને પાવન મર્યાદા (Parna Ritual & Etiquette)
            </h4>
            <p className="text-[11px] opacity-75 font-hindi" style={{ color: textColor }}>
              તપસ્વીના પારણા સમયે ધ્યાનમાં રાખવાની આવશ્યક પવિત્ર બાબતો
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-1 rounded-full text-stone-500 hover:text-stone-900 transition"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-3 border-t space-y-3 font-hindi text-xs sm:text-sm" style={{ borderColor: `${accentColor}25` }}>
          
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <div>
              <span className="font-bold block" style={{ color: textColor }}>
                નવકારશી મુહૂર્ત (Navkarsi Muhurat):
              </span>
              <span className="opacity-85 leading-relaxed" style={{ color: textColor }}>
                સૂર્યોદય બાદ ૪૮ મિનિટ પછી નવકારશી મુહૂર્તમાં જ તપસ્વીના પારણાનો પ્રારંભ થાય છે. સર્વે સ્નેહીજનોને સમયસર પધારવા વિનંતી.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Droplets className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
            <div>
              <span className="font-bold block" style={{ color: textColor }}>
                પ્રથમ આહાર શુદ્ધિ (Parna Nectar):
              </span>
              <span className="opacity-85 leading-relaxed" style={{ color: textColor }}>
                તપસ્વીને સર્વપ્રથમ ઉકાળેલું મગનું પાણી, બદામનું દૂધ અથવા સાકરનું પાવન નિર્દોષ જળ ગ્રહણ કરાવવામાં આવે છે.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Heart className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <div>
              <span className="font-bold block" style={{ color: textColor }}>
                પાવન અનુમોદના ભાવ (Pure Devotion):
              </span>
              <span className="opacity-85 leading-relaxed" style={{ color: textColor }}>
                તપસ્વીને સ્પર્શ કરતી વખતે અથવા પારણું કરાવતી વખતે "સુખ સાતા" પૂછી અંતઃકરણથી નવકાર મંત્રનું સ્મરણ કરવું.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="max-w-xs mx-auto py-1">
              <AshtamangalaRow color={accentColor} />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
