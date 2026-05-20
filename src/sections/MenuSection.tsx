import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Plus, Eye, SlidersHorizontal, X, Flame, Star, Sparkles, Heart } from 'lucide-react';
import { MENU, TAG_LABELS, FMT, type MenuItem, type TagType } from '@/data/menu';
import { useToast } from '@/hooks/useToast';
import { useFavorites } from '@/hooks/useFavorites';
import { ToastContainer } from '@/components/ui/toast-container';
import { calcItemPrice } from '@/hooks/useCart';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, qty?: number, selectedOptions?: number[]) => void;
  onQuickView: (item: MenuItem) => void;
}

type FilterType = 'all' | 'hit' | 'new' | 'hot' | 'under400';

// Super-category group mapping — only categories that exist in menu
const CAT_GROUPS: Record<string, string[]> = {
  all: [],
  hit: [],
  hot: ['hot'],
  shawarma: ['shawarma'],
  burgers: ['burgers'],
  philly: ['philly'],
  california: ['california'],
  dragons: ['dragons'],
  maki: ['maki'],
  street: ['street'],
  rolls: ['rolls'],
  baked: ['baked'],
  fried: ['fried'],
  sets: ['sets'],
  pizza: ['pizza'],
  soups: ['soups'],
  noodles: ['noodles'],
  tyahan: ['tyahan'],
  salads: ['salads'],
  fry: ['fry'],
  shevchiki: ['shevchiki'],
};

const VISIBLE_CATS = [
  { id: 'all', label: 'Все' },
  { id: 'hit', label: 'Хиты' },
  { id: 'hot', label: 'Острое' },
  { id: 'shawarma', label: 'Шаурма' },
  { id: 'burgers', label: 'Бургеры' },
  { id: 'philly', label: 'Филадельфия' },
  { id: 'california', label: 'Калифорния' },
  { id: 'dragons', label: 'Драконы' },
  { id: 'maki', label: 'Маки' },
  { id: 'street', label: 'Стрит' },
  { id: 'rolls', label: 'Роллы' },
  { id: 'baked', label: 'Запечённые' },
  { id: 'fried', label: 'Горячие' },
  { id: 'sets', label: 'Сеты' },
  { id: 'pizza', label: 'Пицца' },
  { id: 'soups', label: 'Супы' },
  { id: 'noodles', label: 'WOK' },
  { id: 'tyahan', label: 'Тяхан' },
  { id: 'salads', label: 'Салаты' },
  { id: 'fry', label: 'Закуски' },
  { id: 'shevchiki', label: 'Шевчики' },
];

// Format item description: remove repetitive base, use bullet separators
function formatDesc(desc: string): string {
  let cleaned = desc;
  // Remove common repetitive base ingredients
  const bases = ['Рис, нори, сыр, ', 'Рис, нори, сыр ', 'рис, нори, сыр, ', 'рис, нори, сыр '];
  for (const base of bases) {
    if (cleaned.startsWith(base)) {
      cleaned = cleaned.slice(base.length);
      break;
    }
  }
  // Replace commas with centered dots for better readability
  return cleaned.replace(/, /g, ' · ');
}

// Unique visual for each item — deterministic based on id
function getItemVisual(id: number) {
  const gradients = [
    'from-orange-500/20 to-orange-600/5',
    'from-red-500/20 to-red-600/5',
    'from-pink-500/20 to-pink-600/5',
    'from-amber-500/20 to-amber-600/5',
    'from-emerald-500/20 to-emerald-600/5',
    'from-green-500/20 to-green-600/5',
    'from-teal-500/20 to-teal-600/5',
    'from-cyan-500/20 to-cyan-600/5',
    'from-sky-500/20 to-sky-600/5',
    'from-violet-500/20 to-violet-600/5',
    'from-purple-500/20 to-purple-600/5',
    'from-rose-500/20 to-rose-600/5',
  ];
  const accentColors = [
    '#F97316', '#EF4444', '#EC4899', '#F59E0B', '#10B981',
    '#22C55E', '#14B8A6', '#06B6D4', '#0EA5E9', '#8B5CF6',
    '#A855F7', '#F43F5E',
  ];
  const idx = (id - 1) % gradients.length;
  return { gradient: gradients[idx], accent: accentColors[idx] };
}

export default function MenuSection({ onAddToCart, onQuickView }: MenuSectionProps) {
  const { toasts, addToast, removeToast } = useToast();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [addedId, setAddedId] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [expanded, setExpanded] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  // Track selected options per item: { [itemId]: [choiceIdx, choiceIdx, ...] }
  const [itemOptions, setItemOptions] = useState<Record<number, number[]>>({});

  const checkArrows = () => {
    const el = tabsRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkArrows();
    const el = tabsRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkArrows, { passive: true });
    const resize = () => checkArrows();
    window.addEventListener('resize', resize);
    return () => {
      el.removeEventListener('scroll', checkArrows);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Reset expanded when category/search/filter changes
  useEffect(() => {
    setExpanded(false);
  }, [activeCat, search, activeFilter]);

  // GSAP card entrance
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [activeCat, search, activeFilter]);

  const filtered = useMemo(() => {
    let items = MENU;
    if (activeCat !== 'all') {
      if (activeCat === 'hit') items = items.filter((i) => i.tag === 'hit');
      else {
        const group = CAT_GROUPS[activeCat];
        if (group) items = items.filter((i) => i.cats.some((c) => group.includes(c)));
      }
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }
    if (activeFilter === 'hit') items = items.filter((i) => i.tag === 'hit');
    if (activeFilter === 'new') items = items.filter((i) => i.tag === 'new');
    if (activeFilter === 'hot') items = items.filter((i) => i.tag === 'hot');
    if (activeFilter === 'under400') items = items.filter((i) => i.price <= 400);
    return items;
  }, [activeCat, search, activeFilter]);

  // Show 10 items initially, expand on click
  const INITIAL_COUNT = 10;
  const visibleItems = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visibleItems.length;

  const getSelectedOptions = (item: MenuItem): number[] => {
    const opts = itemOptions[item.id] || (item.options?.map(() => 0) ?? []);
    // If 50cm is selected, force crust to "Обычный бортик" (index 0)
    const sizeOptIdx = item.options?.findIndex((o) => o.name === 'Размер') ?? -1;
    const crustOptIdx = item.options?.findIndex((o) => o.name === 'Бортик') ?? -1;
    if (sizeOptIdx >= 0 && crustOptIdx >= 0 && opts[sizeOptIdx] > 0) {
      const forced = [...opts];
      forced[crustOptIdx] = 0;
      return forced;
    }
    return opts;
  };

  const setOption = (itemId: number, optionIdx: number, choiceIdx: number) => {
    setItemOptions((prev) => {
      const current = prev[itemId] || [];
      const updated = [...current];
      updated[optionIdx] = choiceIdx;
      return { ...prev, [itemId]: updated };
    });
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item, 1, getSelectedOptions(item));
    setAddedId(item.id);
    addToast(`${item.name} добавлен в корзину`, 'success');
    setTimeout(() => setAddedId(null), 1200);
  };

  const TagBadge = ({ tag }: { tag: TagType }) => {
    if (!tag) return null;
    if (tag === 'hot') return <span className="hot-tag gap-1"><Flame className="h-3 w-3" />{TAG_LABELS.hot}</span>;
    if (tag === 'new') return <span className="new-tag gap-1"><Sparkles className="h-3 w-3" />{TAG_LABELS.new}</span>;
    return <span className="gold-tag gap-1"><Star className="h-3 w-3" />{TAG_LABELS.hit}</span>;
  };

  const scrollTabs = (dir: 'left' | 'right') => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    <section id="menu" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A853]">Ассортимент</span>
          <h2 className="font-['Playfair_Display_SC'] text-3xl font-bold md:text-4xl">Меню</h2>
          <p className="mt-2 text-white/50">80+ блюд на любой вкус</p>
        </div>

        {/* Search + filter bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по меню..."
              className="w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#D4A853]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 rounded-lg border-[3px] px-4 py-2.5 text-sm font-semibold transition-all ${
              activeFilter !== 'all'
                ? 'border-[#D4A853] bg-[#D4A853]/10 text-[#D4A853]'
                : 'border-white/15 text-white/60 hover:border-[#D4A853]/50 hover:text-[#D4A853]'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
            {activeFilter !== 'all' && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A853] text-[10px] font-bold text-[#0A0A0D]">1</span>
            )}
          </button>
        </div>

        {/* Filter chips */}
        {filterOpen && (
          <div className="mb-6 flex flex-wrap gap-2">
            {([
              { id: 'all', label: 'Все' },
              { id: 'hit', label: 'Хиты' },
              { id: 'new', label: 'Новинки' },
              { id: 'hot', label: 'Острое' },
              { id: 'under400', label: 'До 400 ₽' },
            ] as {id: FilterType; label: string}[]).map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === f.id
                    ? 'bg-[#D4A853] text-[#0A0A0D]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Category tabs with arrows */}
        <div className="relative mb-8">
          {showLeftArrow && (
            <button onClick={() => scrollTabs('left')} className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#0A0A0D]/80 p-1.5 text-white/70 shadow-lg backdrop-blur hover:text-white">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {showRightArrow && (
            <button onClick={() => scrollTabs('right')} className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#0A0A0D]/80 p-1.5 text-white/70 shadow-lg backdrop-blur hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          <div ref={tabsRef} className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-1">
            {VISIBLE_CATS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCat === cat.id
                    ? 'gold-gradient-bg text-[#0A0A0D] shadow-md'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-white/40">
          Найдено: {filtered.length} {filtered.length === 1 ? 'позиция' : filtered.length < 5 ? 'позиции' : 'позиций'}
        </div>

        {/* Menu grid — clean cards with color coding */}
        <div ref={gridRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => {
            const visual = getItemVisual(item.id);
            return (
              <div
                key={item.id}
                className="menu-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#121214] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A853]/50 hover:shadow-[0_8px_30px_rgba(212,168,83,0.15)]"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Visual header — photo or colored gradient */}
                <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden ${item.image ? 'bg-[#1A1A1D]' : `bg-gradient-to-br ${visual.gradient}`}`}>
                  {/* Accent line at top */}
                  <div className="absolute left-0 right-0 top-0 h-1 z-10" style={{ background: visual.accent, opacity: 0.6 }} />
                  
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      {/* Large item number */}
                      <span className="text-6xl font-bold opacity-10 md:text-7xl" style={{ color: visual.accent }}>
                        {item.id}
                      </span>
                      
                      {/* Center logo icon */}
                      <div className="absolute flex flex-col items-center gap-1">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                          style={{ background: `${visual.accent}15`, border: `1px solid ${visual.accent}30`, color: visual.accent }}
                        >
                          СМ
                        </div>
                      </div>
                    </>
                  )}

                  {/* Tag badge */}
                  {item.tag && (
                    <div className="absolute left-3 top-3 z-10">
                      <TagBadge tag={item.tag} />
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); addToast(isFavorite(item.id) ? `${item.name} удалён из избранного` : `${item.name} добавлен в избранное`, 'info'); }}
                    className="absolute left-3 top-3 z-10 rounded-full bg-[#0A0A0D]/60 p-2 opacity-0 backdrop-blur transition-all group-hover:opacity-100 hover:bg-[#0A0A0D]/80"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(item.id) ? 'fill-red-500 text-red-500' : 'text-white/70 hover:text-red-400'}`} />
                  </button>
                  {/* Quick view button */}
                  <button
                    onClick={() => onQuickView(item)}
                    className="absolute right-3 top-3 z-10 rounded-full bg-[#0A0A0D]/60 p-2 text-white/70 opacity-0 backdrop-blur transition-all group-hover:opacity-100 hover:bg-[#0A0A0D]/80 hover:text-[#D4A853]"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="RUB" />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  <h3 className="text-sm font-semibold text-white" itemProp="name">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/60" itemProp="description">{formatDesc(item.desc)}</p>
                  {item.weight && (
                    <span className="mt-1.5 text-[11px] text-white/30">{item.weight}</span>
                  )}

                  {/* Option selectors */}
                  {item.options && item.options.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {item.options.map((opt, optIdx) => {
                        const selIdx = getSelectedOptions(item)[optIdx] ?? 0;
                        // Hide Бортик option when 50 см is selected
                        const sizeOptIdx = item.options!.findIndex((o) => o.name === 'Размер');
                        const is50cm = sizeOptIdx >= 0 && (getSelectedOptions(item)[sizeOptIdx] ?? 0) > 0;
                        if (opt.name === 'Бортик' && is50cm) return null;
                        return (
                          <div key={opt.name}>
                            <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">{opt.name}</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {opt.choices.map((choice, chIdx) => (
                                <button
                                  key={choice.label}
                                  onClick={() => setOption(item.id, optIdx, chIdx)}
                                  className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                                    selIdx === chIdx
                                      ? 'bg-[#D4A853]/20 text-[#D4A853] ring-1 ring-[#D4A853]/30'
                                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                                  }`}
                                >
                                  {choice.label}
                                  {choice.priceDelta > 0 && <span className="ml-0.5 text-white/30">+{FMT(choice.priceDelta)}</span>}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-lg font-bold text-[#D4A853]" itemProp="price" content={String(calcItemPrice(item, getSelectedOptions(item)))}>{FMT(calcItemPrice(item, getSelectedOptions(item)))}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      className={`btn-cart flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-semibold transition-all ${
                        addedId === item.id
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-[#D4A853] text-[#0A0A0D] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,168,83,0.35)] hover:bg-[#E5C06B]'
                      }`}
                      aria-label={`Добавить ${item.name} в корзину`}
                    >
                      {addedId === item.id ? '✓ Добавлено' : <><Plus className="h-3.5 w-3.5" /> В корзину</>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/40">
            <Search className="mx-auto mb-3 h-10 w-10" />
            <p>Ничего не найдено. Попробуйте другой запрос.</p>
          </div>
        )}

      </div>

      {/* Show more / Show less — outside grid for consistent spacing */}
      {hiddenCount > 0 && !expanded && (
        <div className="mx-auto mt-10 flex max-w-7xl justify-center px-4 md:px-6">
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 rounded-full border-[3px] border-[#D4A853]/50 px-6 py-3 text-sm font-semibold text-[#D4A853] transition-all hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#0A0A0D] hover:shadow-[0_0_25px_rgba(212,168,83,0.3)]"
          >
            Показать ещё <span className="text-white/50 hover:text-[#0A0A0D]/50">({hiddenCount})</span>
          </button>
        </div>
      )}
      {expanded && filtered.length > INITIAL_COUNT && (
        <div className="mx-auto mt-10 flex max-w-7xl justify-center px-4 md:px-6">
          <button
            onClick={() => setExpanded(false)}
            className="flex items-center gap-2 rounded-full border-[3px] border-white/15 px-6 py-3 text-sm font-semibold text-white/50 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            Скрыть
          </button>
        </div>
      )}
    </section>
  </>
  );
}
