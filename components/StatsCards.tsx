
import React from 'react';
import { Users, Map as MapIcon, Globe } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  provinces: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ total, provinces }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-2">
      <div className="bg-white/50 p-4 rounded-3xl border border-white/40 flex items-center gap-4 transition-all hover:bg-white/80">
        <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">联络总数</p>
          <p className="text-xl font-semibold text-[#1d1d1f]">{total}</p>
        </div>
      </div>
      
      <div className="bg-white/50 p-4 rounded-3xl border border-white/40 flex items-center gap-4 transition-all hover:bg-white/80">
        <div className="w-10 h-10 rounded-2xl bg-[#1d1d1f]/5 flex items-center justify-center text-[#1d1d1f]">
          <MapIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">覆盖省份</p>
          <p className="text-xl font-semibold text-[#1d1d1f]">{provinces}</p>
        </div>
      </div>

      <div className="hidden sm:flex bg-white/50 p-4 rounded-3xl border border-white/40 items-center gap-4 transition-all hover:bg-white/80">
        <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">版图比例</p>
          <p className="text-xl font-semibold text-[#1d1d1f]">
            {Math.round((provinces / 34) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
};
