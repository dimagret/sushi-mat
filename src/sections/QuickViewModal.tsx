import { useState } from 'react';
import { X, ShoppingCart, Flame, Star, Sparkles } from 'lucide-react';
import { FMT, TAG_LABELS, type MenuItem } from '@/data/menu';
import { calcItemPrice } from '@/hooks/useCart';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface QuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (item: MenuItem, qty: number, selectedOptions?: number[]) => void;
}

export default function QuickViewModal({ item, onClose, onAdd }: QuickViewModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  if (!item) return null;

  // Reset options when item changes, and force crust to 0 if 50cm selected
  const sizeOptIdx = item.options?.findIndex((o) => o.name === 'Размер') ?? -1;
  const crustOptIdx = item.options?.findIndex((o) => o.name === 'Бортик') ?? -1;
  const is50cm = sizeOptIdx >= 0 && (selectedOptions[sizeOptIdx] ?? 0) > 0;

  const currentOptions = selectedOptions.length === (item.options?.length ?? 0)
    ? selectedOptions
    : (item.options?.map(() => 0) ?? []);

  // Force crust to 0 when 50cm is selected
  const finalOptions = [...currentOptions];
  if (sizeOptIdx >= 0 && crustOptIdx >= 0 && (finalOptions[sizeOptIdx] ?? 0) > 0) {
    finalOptions[crustOptIdx] = 0;
  }

  const setOption = (optIdx: number, choiceIdx: number) => {
    const updated = [...currentOptions];
    updated[optIdx] = choiceIdx;
    // If switching to 50cm, reset crust
    if (optIdx === sizeOptIdx && choiceIdx > 0 && crustOptIdx >= 0) {
      updated[crustOptIdx] = 0;
    }
    setSelectedOptions(updated);
  };

  const effectivePrice = calcItemPrice(item, finalOptions);

  const handleAdd = () => {
    onAdd(item, 1, finalOptions);
    onClose();
  };

  const tagColor = item.tag === 'hot' ? 'text-red-400 bg-red-500/10 border-red-500/20' : item.tag === 'new' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  const TagIcon = item.tag === 'hot' ? Flame : item.tag === 'new' ? Sparkles : Star;
  const catIcon = item.cats.includes('shawarma') ? '🌯' : item.cats.includes('burgers') ? '🍔' : item.cats.includes('rolls') ? '🍣' : item.cats.includes('baked') ? '🔥' : item.cats.includes('pizza') ? '🍕' : item.cats.includes('wok') ? '🍜' : item.cats.includes('sets') ? '🍱' : item.cats.includes('snacks') ? '🍟' : item.cats.includes('soups') ? '🥗' : '🍽';

  return (
    <Dialog open={!!item} onOpenChange={(open) => { if (!open) { onClose(); setSelectedOptions([]); } }}>
      <DialogContent className="max-w-md border-white/10 bg-[#121214] p-0 text-white overflow-hidden">
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        
        {/* Visual header */}
        <div className={`relative flex aspect-square items-center justify-center overflow-hidden ${item.image ? 'bg-[#1A1A1D]' : 'bg-gradient-to-br from-[#D4A853]/10 to-[#B8923E]/5'}`}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4A853]/20 bg-[#D4A853]/10 text-5xl">
              {catIcon}
            </div>
          )}
          <button
            onClick={() => { onClose(); setSelectedOptions([]); }}
            className="absolute right-3 top-3 z-10 rounded-full bg-[#0A0A0D]/60 p-2 text-white/70 backdrop-blur hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          {item.tag && (
            <div className="absolute left-3 top-3 z-10">
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold flex items-center gap-1 ${tagColor}`}>
                <TagIcon className="h-3 w-3" /> {TAG_LABELS[item.tag]}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
          {item.weight && (
            <p className="mt-2 text-sm text-white/40">Вес: {item.weight}</p>
          )}

          {/* Options */}
          {item.options && item.options.length > 0 && (
            <div className="mt-4 space-y-3">
              {item.options.map((opt, optIdx) => {
                const selIdx = finalOptions[optIdx] ?? 0;
                // Hide Бортик option when 50 см is selected
                if (opt.name === 'Бортик' && is50cm) return null;
                return (
                  <div key={opt.name}>
                    <span className="text-xs font-medium uppercase tracking-wider text-white/40">{opt.name}</span>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {opt.choices.map((choice, chIdx) => (
                        <button
                          key={choice.label}
                          onClick={() => setOption(optIdx, chIdx)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            selIdx === chIdx
                              ? 'bg-[#D4A853]/20 text-[#D4A853] ring-1 ring-[#D4A853]/30'
                              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                          }`}
                        >
                          {choice.label}
                          {choice.priceDelta > 0 && <span className="ml-1 text-white/30">+{FMT(choice.priceDelta)}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-[#D4A853]">{FMT(effectivePrice)}</span>
            <button onClick={handleAdd} className="btn-primary-gold gap-2">
              <ShoppingCart className="h-4 w-4" /> В корзину
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
