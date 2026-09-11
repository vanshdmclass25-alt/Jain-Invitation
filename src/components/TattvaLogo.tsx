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
    xs: 'w-6 h-6 sm:w-7 sm:h-7',
    sm: 'w-7 h-7 sm:w-9 sm:h-9',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-16 sm:h-16',
    xl: 'w-18 h-18 sm:w-24 sm:h-24',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 shrink-0 ${className}`}>
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
        <div className="flex flex-col text-left shrink-0">
          <span className="font-cinzel text-sm sm:text-lg font-bold tracking-wider text-[#2A2018] leading-none whitespace-nowrap">
            Tattva
          </span>
          <span className="font-cinzel text-[7px] min-[360px]:text-[8.5px] sm:text-[9.5px] tracking-[0.15em] sm:tracking-[0.22em] text-[#8C5D1F] font-semibold uppercase leading-tight mt-0.5 whitespace-nowrap hidden min-[320px]:block">
            PAARNA INVITATIONS
          </span>
        </div>
      )}
    </div>
  );
};
