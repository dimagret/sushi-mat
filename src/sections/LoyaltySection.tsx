import { useState, useEffect, useRef } from 'react';
import { Gift, Cake, Copy, Check, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BDAY_PROMO_KEY = 'sushi-bday-promo';
const BDAY_DATE_KEY = 'sushi-bday-date';

function generatePromo(date: string): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `BDAY${day}${month}`;
}

export default function LoyaltySection() {
  const [birthday, setBirthday] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedDate = localStorage.getItem(BDAY_DATE_KEY);
    const savedPromo = localStorage.getItem(BDAY_PROMO_KEY);
    if (savedDate && savedPromo) {
      setBirthday(savedDate);
      setPromoCode(savedPromo);
    }
  }, []);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.loyalty-card');
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const activateBirthday = () => {
    if (!birthday) return;
    const code = generatePromo(birthday);
    setPromoCode(code);
    localStorage.setItem(BDAY_DATE_KEY, birthday);
    localStorage.setItem(BDAY_PROMO_KEY, code);
  };

  const copyPromo = () => {
    if (!promoCode) return;
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="loyalty" ref={sectionRef} className="scroll-mt-20 border-y border-white/5 bg-[#0E0E12] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-[#D4A853]">Выгода</span>
          <h2 className="font-['Playfair_Display_SC'] text-3xl font-bold md:text-4xl">Акции и лояльность</h2>
          <p className="mt-2 text-white/50">Больше заказов — больше выгоды</p>
        </div>

        <div className="mx-auto grid max-w-lg gap-6 md:max-w-2xl">
          {/* Birthday discount */}
          <div className="loyalty-card rounded-2xl border border-[#D4A853]/15 bg-gradient-to-br from-[#D4A853]/[0.05] to-transparent p-6 transition-all duration-300 hover:border-[#D4A853]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,168,83,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A853]/10">
              <Cake className="h-6 w-6 text-[#D4A853]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Скидка 10% в день рождения</h3>
            <p className="mt-2 text-sm text-white/60">
              Укажите дату — мы сгенерируем персональный промокод со скидкой 10%. Примените при оформлении заказа.
            </p>

            {!promoCode ? (
              <div className="mt-4 flex gap-2">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  aria-label="Дата рождения для получения скидки 10%"
                  className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#D4A853]"
                />
                <button
                  onClick={activateBirthday}
                  disabled={!birthday}
                  aria-label="Получить промокод на скидку 10%"
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                    birthday
                      ? 'bg-[#D4A853] text-[#0A0A0D] hover:bg-[#E5B964]'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Gift className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-dashed border-[#D4A853]/30 bg-[#D4A853]/5 px-4 py-3">
                  <span className="text-lg font-mono font-bold tracking-wider text-[#D4A853]">{promoCode}</span>
                  <button
                    onClick={copyPromo}
                    className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Скопировано' : 'Копировать'}
                  </button>
                </div>
                <p className="text-xs text-emerald-400">
                  Промокод активирован! Примените его при оформлении заказа для получения скидки 10%.
                </p>
                <button
                  onClick={() => {
                    setPromoCode('');
                    setBirthday('');
                    localStorage.removeItem(BDAY_DATE_KEY);
                    localStorage.removeItem(BDAY_PROMO_KEY);
                  }}
                  className="text-xs text-white/30 underline hover:text-white/50"
                >
                  Сбросить и ввести другую дату
                </button>
              </div>
            )}
          </div>

          {/* Telegram promo */}
          <div className="loyalty-card rounded-2xl border border-sky-500/10 bg-gradient-to-br from-sky-500/[0.05] to-transparent p-6 text-center transition-all duration-300 hover:border-sky-500/25 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.1)]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
              <Send className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Эксклюзивные акции</h3>
            <p className="mt-2 text-sm text-white/60">
              Скидки и спецпредложения только для подписчиков Telegram. Будьте первым!
            </p>
            <a
              href="https://t.me/Sushimother1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <Send className="h-4 w-4" />
              Подписаться в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
