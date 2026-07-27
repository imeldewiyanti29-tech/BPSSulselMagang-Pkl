import React from 'react';
import bpsSymbolLogo from '../assets/images/bps_symbol_logo_clean_1785123554734.jpg';

interface BpsLogoProps {
  className?: string;
  imgClassName?: string;
  showText?: boolean;
  textColor?: string;
}

export const BpsLogo: React.FC<BpsLogoProps> = ({
  className = 'w-10 h-10',
  imgClassName = 'w-full h-full object-contain',
  showText = false,
  textColor = 'text-white'
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative bg-white rounded-xl p-1 shadow-xs border border-slate-200/80 shrink-0 overflow-hidden flex items-center justify-center">
        <img
          src={bpsSymbolLogo}
          alt="Logo Lambang Badan Pusat Statistik (BPS)"
          className={imgClassName}
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black text-sm leading-tight tracking-wide ${textColor}`}>
            BADAN PUSAT STATISTIK
          </span>
          <span className="text-[11px] font-bold text-amber-400 tracking-wider">
            PROVINSI SULAWESI SELATAN
          </span>
        </div>
      )}
    </div>
  );
};
