import React from 'react';

interface TattvaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const TattvaLogo: React.FC<TattvaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Circular Brand Emblem */}
      <div className={`relative ${sizeMap[size]} rounded-full overflow-hidden shrink-0 shadow-xs border border-[#C98A3E]/40 bg-[#FFFDF9]`}>
        <img
          src="/logo.png"
          alt="Tattva Paarna Invitations"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to SVG if PNG fails
            const target = e.target as HTMLImageElement;
            if (target.src !== '/logo.svg') {
              target.src = '/logo.svg';
            }
          }}
        />
      </div>

      {/* Brand Name & Subheading Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-[#2A2018] leading-none">
            Tattva
          </span>
          <span className="font-cinzel text-[8.5px] sm:text-[9.5px] tracking-[0.22em] text-[#8C5D1F] font-semibold uppercase leading-tight mt-1">
            PAARNA INVITATIONS
          </span>
        </div>
      )}
    </div>
  );
};
