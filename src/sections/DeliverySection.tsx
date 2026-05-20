import { useEffect, useRef, useState } from 'react';
import { MapPin, Truck, Clock, Package, ChevronDown, ChevronUp, Navigation } from 'lucide-react';
import { FMT, DELIVERY_ZONES } from '@/data/menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DeliverySection() {
  const [calcAddress, setCalcAddress] = useState('');
  const [calcResult, setCalcResult] = useState<{zone: string; price: number; freeFrom?: number; time: string} | null>(null);
  const [expandedZone, setExpandedZone] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.delivery-card');
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const calculateDelivery = () => {
    const addr = calcAddress.toLowerCase();
    if (addr.includes('урицк') || addr.includes('83')) {
      setCalcResult({ zone: 'Ул. Урицкого 83В', price: 0, time: '45 мин' });
    } else if (addr.includes('ильич') || addr.includes('черёмушки')) {
      setCalcResult({ zone: 'Ильичёвский район', price: 250, freeFrom: 2000, time: '60 мин' });
    } else if (addr.includes('мирный')) {
      setCalcResult({ zone: 'пос. Мирный', price: 250, freeFrom: 3000, time: '70 мин' });
    } else if (addr.includes('центр') || addr.includes('город')) {
      setCalcResult({ zone: 'Центр города', price: 250, freeFrom: 1500, time: '50 мин' });
    } else {
      setCalcResult({ zone: 'Уточняйте у оператора', price: -1, time: '—' });
    }
  };

  return (
    <section id="delivery" ref={sectionRef} className="scroll-mt-20 border-y border-white/5 bg-[#0E0E12] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4A853] md:text-xs md:tracking-[0.25em]">Условия</span>
          <h2 className="font-['Playfair_Display_SC'] text-2xl font-bold md:text-3xl lg:text-4xl">Доставка и оплата</h2>
          <p className="mt-2 text-sm text-white/50 md:text-base">Быстро, удобно и выгодно</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* LEFT: zones + calculator */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Calculator */}
            <div className="delivery-card rounded-2xl border border-[#D4A853]/15 bg-[#121214] p-4 transition-all duration-300 hover:border-[#D4A853]/30 md:p-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#D4A853] md:mb-4 md:text-lg">
                <Navigation className="h-4 w-4 md:h-5 md:w-5" /> Калькулятор доставки
              </h3>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={calcAddress}
                  onChange={(e) => setCalcAddress(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && calculateDelivery()}
                  placeholder="Введите адрес или район..."
                  className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853] md:px-4 md:py-2.5"
                />
                <button
                  onClick={calculateDelivery}
                  className="rounded-lg bg-[#D4A853] px-4 py-2 text-sm font-semibold text-[#0A0A0D] transition-all hover:bg-[#E5B964] hover:shadow-lg hover:shadow-[#D4A853]/20 md:py-2.5"
                >
                  Рассчитать
                </button>
              </div>
              {calcResult && (
                <div className="mt-3 rounded-lg border border-[#D4A853]/10 bg-[#D4A853]/5 p-3 md:mt-4 md:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 md:text-sm">Район</span>
                    <span className="text-xs font-semibold text-white md:text-sm">{calcResult.zone}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-white/60 md:text-sm">Стоимость</span>
                    <span className="text-xs font-semibold text-[#D4A853] md:text-sm">
                      {calcResult.price === -1 ? 'Уточните' : calcResult.price === 0 ? 'Бесплатно' : `${FMT(calcResult.price)} (бесплатно от ${FMT(calcResult.freeFrom || 0)})`}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-white/60 md:text-sm">Время</span>
                    <span className="text-xs font-semibold text-white md:text-sm">{calcResult.time}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Zones list */}
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-sm font-semibold text-white md:text-lg">Зоны доставки</h3>
              {DELIVERY_ZONES.filter(z => !z.isSelf).map((zone) => (
                <div
                  key={zone.id}
                  className="delivery-card rounded-xl border border-white/5 bg-[#121214] p-3 transition-all duration-300 hover:border-[#D4A853]/10 md:p-4"
                >
                  <button
                    onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                    className="flex w-full items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4A853]/10 md:h-9 md:w-9">
                        <MapPin className="h-3.5 w-3.5 text-[#D4A853] md:h-4 md:w-4" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="truncate text-sm font-semibold text-white">{zone.name}</div>
                        <div className="text-[11px] text-white/40 md:text-xs">
                          {zone.price === 0 ? 'Бесплатно' : FMT(zone.price)} · Бесплатно от {FMT(zone.freeFrom)}
                        </div>
                      </div>
                    </div>
                    {expandedZone === zone.id ? <ChevronUp className="h-4 w-4 shrink-0 text-white/40" /> : <ChevronDown className="h-4 w-4 shrink-0 text-white/40" />}
                  </button>
                  {expandedZone === zone.id && (
                    <div className="mt-2 border-t border-white/5 pt-2 text-xs text-white/50 md:mt-3 md:pt-3 md:text-sm">
                      <p>Время доставки: от 45 минут до 70 минут в зависимости от загруженности кухни и дорог.</p>
                      <p className="mt-1">Минимальный заказ: 500 ₽</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="delivery-card rounded-xl border border-[#D4A853]/20 bg-[#D4A853]/5 p-3 md:p-4">
                <div className="flex items-center gap-2.5 md:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4A853]/10 md:h-9 md:w-9">
                    <Package className="h-3.5 w-3.5 text-[#D4A853] md:h-4 md:w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#D4A853]">Самовывоз</div>
                    <div className="text-[11px] text-white/40 md:text-xs">Адрес: Ул. Урицкого 83В</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: payment + map */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Payment methods */}
            <div className="delivery-card rounded-2xl border border-white/5 bg-[#121214] p-4 md:p-6">
              <h3 className="mb-3 text-sm font-semibold text-white md:mb-4 md:text-lg">Способы оплаты</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3">
                {[
                  { title: 'Наличными', desc: 'Курьеру при получении', icon: '💵' },
                  { title: 'Картой', desc: 'МИР', icon: '💳' },
                  { title: 'Онлайн', desc: 'Банковской картой', icon: '📱' },
                ].map((p) => (
                  <div key={p.title} className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-[#1A1A1D] p-3 transition-all hover:border-white/10 md:gap-3 md:p-4">
                    <span className="text-xl md:text-2xl">{p.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="mt-0.5 text-[11px] text-white/40 md:text-xs">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              <div className="delivery-card rounded-xl border border-white/5 bg-[#121214] p-4 transition-all hover:border-[#D4A853]/10 md:p-5">
                <Clock className="mb-2 h-5 w-5 text-[#D4A853] md:mb-3 md:h-6 md:w-6" />
                <div className="text-sm font-semibold text-white">Время доставки</div>
                <div className="mt-1 text-xs text-white/50 md:text-sm">45–70 минут в зависимости от района.</div>
              </div>
              <div className="delivery-card rounded-xl border border-white/5 bg-[#121214] p-4 transition-all hover:border-[#D4A853]/10 md:p-5">
                <Truck className="mb-2 h-5 w-5 text-[#D4A853] md:mb-3 md:h-6 md:w-6" />
                <div className="text-sm font-semibold text-white">Условия доставки</div>
                <div className="mt-1 text-xs text-white/50 md:text-sm">Минимальный заказ 500 ₽. Бесплатно от 1000 ₽.</div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
