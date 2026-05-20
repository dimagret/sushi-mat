import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Phone, Search } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Главная', href: '#home' },
  { label: 'Наш процесс', href: '#process' },
  { label: 'Меню', href: '#menu' },
  { label: 'Доставка и оплата', href: '#delivery' },
];

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 md:px-6 md:py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-['Playfair_Display_SC'] text-lg font-bold tracking-wide gold-gradient-text md:text-2xl">
            СУШИ МАТЬ
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-[#D4A853]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-[#D4A853] md:flex"
            aria-label="Поиск"
          >
            <Search className="h-5 w-5" />
          </button>

          <a
            href="tel:+79496117127"
            className="hidden items-center gap-1.5 rounded-full border border-[#D4A853]/40 px-3 py-1.5 text-sm text-[#D4A853] transition-colors hover:bg-[#D4A853]/10 md:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+7 (949) 611-71-27</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-[#D4A853]"
            aria-label="Корзина"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#D4A853] px-1 text-[10px] font-bold text-[#0A0A0D]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-[#D4A853] lg:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="hidden border-t border-white/10 bg-[#0A0A0D]/95 px-4 py-3 backdrop-blur md:block">
          <div className="mx-auto flex max-w-md items-center gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Поиск по меню..."
              className="flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#D4A853]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val) {
                    window.location.hash = `#menu?search=${encodeURIComponent(val)}`;
                    setSearchOpen(false);
                  }
                }
              }}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-white/60 hover:text-white"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0A0A0D]/95 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-[#D4A853]"
              >
                {link.label}
              </a>
            ))}
            <div className="my-2 border-t border-white/10" />
            <a
              href="tel:+79496117127"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[#D4A853]"
              onClick={() => setMenuOpen(false)}
            >
              <Phone className="h-5 w-5" />
              +7 (949) 611-71-27
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
