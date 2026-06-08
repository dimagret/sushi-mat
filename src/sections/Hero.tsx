import { useEffect, useRef } from 'react';
import { Clock, MapPin, ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const els = textRef.current.querySelectorAll('.hero-anim');
      gsap.fromTo(
        els,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.15 }
      );
    }
    gsap.fromTo(
      photoRef.current,
      { opacity: 0, scale: 0.92, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section id="home" className="scroll-mt-20 relative flex min-h-[85vh] items-center overflow-hidden bg-[#0A0A0D] pb-16 md:pb-8">
      {/* Ambient glow */}
      <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#D4A853]/6 blur-[80px] md:h-[400px] md:w-[400px]" />
      <div className="absolute -bottom-20 -left-20 h-[200px] w-[200px] rounded-full bg-[#D4A853]/4 blur-[60px] md:h-[300px] md:w-[300px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl flex-1 items-center gap-8 px-4 pt-20 md:grid-cols-2 md:gap-14 md:px-6 md:pt-24">
        {/* LEFT: Text content */}
        <div ref={textRef} className="flex flex-col gap-4 md:gap-5">
          <div className="hero-anim inline-flex w-fit items-center gap-2 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-3 py-1.5 text-xs text-[#D4A853] md:px-4 md:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Принимаем заказы: 09:00 – 21:00
          </div>

          <h1 className="hero-anim text-left font-['Playfair_Display_SC'] text-[1.85rem] font-bold leading-[1.05] sm:text-[2.3rem] md:text-[2.9rem]">
            Вкусно.
            <br />
            Быстро.
            <br />
            <span className="gold-gradient-text">Свежо.</span>
          </h1>

          <p className="hero-anim -mt-1 text-base font-semibold tracking-wide text-white/80 md:text-lg">
            Доставка роллов, пиццы и шаурмы в Мариуполе
          </p>

          <p className="hero-anim -mt-1 max-w-lg text-sm font-extralight leading-relaxed tracking-wider text-white/50 md:text-base">
            80+ блюд: Филадельфия, Калифорния, Дракон, запечённые роллы, пицца 30 и 50 см.
            Доставляем от 45 минут, от 250 ₽. Работаем ежедневно с 09:00 до 21:00.
          </p>

          <div className="hero-anim flex flex-wrap gap-3 md:gap-4">
            <a href="#menu" className="btn-primary-gold gap-2 text-xs md:text-sm group">
              Смотреть меню
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="tel:+79496117127" className="btn-outline-gold gap-2 text-xs md:text-sm">
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>

          <div className="hero-anim mt-1 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50 md:gap-x-6 md:text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#D4A853] md:h-4 md:w-4" />
              Доставка от 45 мин · от 250 ₽
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#D4A853] md:h-4 md:w-4" />
              Ул. Урицкого 83В
            </span>
          </div>
        </div>

        {/* RIGHT: Pizza circle */}
        <div className="relative flex items-center justify-center">
          {/* Glow */}
          <div className="absolute h-[220px] w-[220px] rounded-full bg-[#D4A853]/10 blur-[40px] sm:h-[280px] sm:w-[280px] md:h-[360px] md:w-[360px]" />

          <div ref={photoRef} className="group relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[380px] md:w-[380px]">
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#D4A853]/20 shadow-[0_0_40px_rgba(212,168,83,0.1)] transition-all duration-500 group-hover:scale-105 group-hover:border-[#D4A853]/40 group-hover:shadow-[0_0_60px_rgba(212,168,83,0.25)]">
              <img
                src="/images/pizza-4-flavors.jpg"
                alt="4 вкуса: роллы, салаты, шаурма, пицца"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="eager" decoding="async"
                width="760" height="760"
              />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4A853]/50 to-transparent" />
                <div className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
              </div>
            </div>

            {/* Labels — smaller on mobile */}
            <div className="pointer-events-none absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0A0A0D]/80 px-2 py-0.5 text-[9px] font-medium text-[#D4A853] backdrop-blur-sm border border-[#D4A853]/20 md:-top-2 md:px-2.5 md:py-1 md:text-[10px]">
              Роллы
            </div>
            <div className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0D]/80 px-2 py-0.5 text-[9px] font-medium text-emerald-400 backdrop-blur-sm border border-emerald-500/20 md:-right-1.5 md:px-2.5 md:py-1 md:text-[10px]">
              Салаты
            </div>
            <div className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0A0A0D]/80 px-2 py-0.5 text-[9px] font-medium text-orange-400 backdrop-blur-sm border border-orange-500/20 md:-bottom-2 md:px-2.5 md:py-1 md:text-[10px]">
              Шаурма
            </div>
            <div className="pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0D]/80 px-2 py-0.5 text-[9px] font-medium text-red-400 backdrop-blur-sm border border-red-500/20 md:-left-1.5 md:px-2.5 md:py-1 md:text-[10px]">
              Пицца
            </div>
          </div>

          {/* Floating badges — repositioned for mobile */}
          <div className="absolute -bottom-10 left-0 z-10 rounded-xl border border-[#D4A853]/20 bg-[#0A0A0D]/90 px-3 py-2 shadow-lg backdrop-blur md:-bottom-2 md:-left-2">
            <div className="text-[10px] text-white/50">Сегодня готовим</div>
            <div className="text-sm font-bold text-[#D4A853] md:text-base">80+ блюд</div>
          </div>
          <div className="absolute -right-2 top-0 z-10 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 backdrop-blur md:-right-1 md:top-4 md:px-3 md:py-2">
            <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 md:text-[10px]">Открыто</div>
            <div className="text-[10px] text-white/80 md:text-xs">09:00 – 21:00</div>
          </div>
        </div>
      </div>
    </section>
  );
}
