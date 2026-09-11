import React from 'react';

interface PriceTagBadgeProps {
  price?: string;
  period?: string;
  className?: string;
  rotated?: boolean;
}

export const PriceTagBadge: React.FC<PriceTagBadgeProps> = ({
  price = '₹499',
  period = 'ONE-TIME',
  className = '',
  rotated = true,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#F0C670] via-[#E5B760] to-[#D8A444] text-[#301E13] border border-[#B88A30]/50 shadow-md shadow-amber-950/20 z-20 pointer-events-none select-none ${
        rotated ? 'transform -rotate-8 hover:scale-105' : ''
      } transition-transform duration-300 ${className}`}
    >
      {/* Tag Hole / String Eyelet Punch */}
      <div className="w-2 h-2 rounded-full bg-[#FAF8EE] border border-[#9E7320]/60 shadow-inner shrink-0" />
      
      {/* Price Number */}
      <span className="font-poppins font-black text-xs sm:text-sm tracking-tight text-[#2A1D13] leading-none">
        {price}
      </span>

      {/* Period Label */}
      <span className="font-poppins font-extrabold text-[9px] text-[#5C4524] uppercase tracking-wider leading-none ml-0.5">
        {period}
      </span>
    </div>
  );
};
