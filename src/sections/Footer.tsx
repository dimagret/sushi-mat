import { Phone, MapPin, Clock, MessageCircle, Mail, FileText, Shield } from 'lucide-react';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Наш процесс', href: '#process' },
  { label: 'Меню', href: '#menu' },
  { label: 'Доставка и оплата', href: '#delivery' },
];

const LEGAL_LINKS = [
  { label: 'Публичная оферта', href: '/offer.html', icon: FileText },
  { label: 'Политика конфиденциальности', href: '/privacy.html', icon: Shield },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0D]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {/* Mobile: stacked / Desktop: 3 columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {/* Brand + description + legal entity */}
          <div className="flex flex-col gap-2.5">
            <span className="font-['Playfair_Display_SC'] text-lg font-bold gold-gradient-text md:text-xl">
              СУШИ МАТЬ
            </span>
            <p className="text-xs leading-relaxed text-white/40 md:text-sm">
              Доставка роллов, пиццы, шаурмы и бургеров.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40 md:text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" />
              Ул. Урицкого 83В
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/40 md:text-sm">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" />
              09:00 – 21:00, ежедневно
            </div>
            {/* Legal entity data */}
            <div className="mt-2 rounded-lg border border-white/5 bg-[#121214] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/30 md:text-xs">Индивидуальный предприниматель</p>
              <p className="mt-1 text-xs text-white/50 md:text-sm">Дорошенко Артем Сергеевич</p>
              <p className="text-[10px] text-white/30 md:text-xs">ИНН: 931003613709 | ОГРНИП: 326930100020984</p>
            </div>
          </div>

          {/* Quick nav + legal */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60">Навигация</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-[#D4A853] md:text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <h4 className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/60">Правовая информация</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-[#D4A853] md:text-sm"
                >
                  <link.icon className="h-3 w-3" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60">Связь</h4>
            <a
              href="tel:+79496117127"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] md:text-base"
            >
              <Phone className="h-4 w-4" />
              +7 (949) 611-71-27
            </a>
            <a
              href="mailto:Artemdorochenko83@yandex.ru"
              className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-[#D4A853] md:text-sm"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" />
              Artemdorochenko83@yandex.ru
            </a>
            <div className="flex gap-3">
              <a
                href="https://t.me/sushi_mater"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-sky-500/10 px-2.5 py-1.5 text-xs text-sky-400 transition-colors hover:bg-sky-500/20"
              >
                <MessageCircle className="h-3 w-3" /> Telegram
              </a>
              <a
                href="https://wa.me/79496117127"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-3 w-3" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright + legal note */}
        <div className="mt-6 border-t border-white/5 pt-4 text-center md:mt-8">
          <p className="text-[10px] text-white/20 md:text-xs">
            © {new Date().getFullYear()} Суши Мать. Все права защищены.
          </p>
          <p className="mt-1 text-[9px] text-white/15 md:text-[10px]">
            Информация на сайте не является публичной офертой. Оформляя заказ, Вы соглашаетесь с{" "}
            <a href="/offer.html" className="text-white/25 underline hover:text-[#D4A853]">офертой</a>{" "}
            и{" "}
            <a href="/privacy.html" className="text-white/25 underline hover:text-[#D4A853]">политикой конфиденциальности</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
