import { ShoppingCart } from 'lucide-react';
import { FMT } from '@/data/menu';

interface MobileCartBarProps {
  count: number;
  total: number;
  onOpenCart: () => void;
}

export default function MobileCartBar({ count, total, onOpenCart }: MobileCartBarProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0E0E12]/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom)))] pt-3 backdrop-blur md:hidden">
      <button
        onClick={onOpenCart}
        className="flex w-full items-center justify-between rounded-xl gold-gradient-bg px-4 py-2.5 text-[#0A0A0D]"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-semibold">{count} {count === 1 ? 'товар' : count < 5 ? 'товара' : 'товаров'}</span>
        </div>
        <span className="text-base font-bold">{FMT(total)}</span>
      </button>
    </div>
  );
}
