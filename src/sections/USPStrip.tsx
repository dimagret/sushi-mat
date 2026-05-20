import { useEffect, useRef, useState } from 'react';
import { Timer, Truck, Gift, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const USPS = [
  { icon: Timer, title: 'Быстрая доставка', desc: 'От 45 минут до вашей двери' },
  { icon: Truck, title: 'Бесплатная доставка', desc: 'При заказе от 1000 ₽', href: '#delivery' },
  { icon: Gift, title: 'Скидка 10%', desc: 'Именинникам в день рождения', href: '#loyalty' },
  { icon: ShieldCheck, title: 'Свежие продукты', desc: 'Качественные ингредиенты ежедневно' },
];

export default function USPStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.usp-card');
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-white/5 bg-[#0E0E12]">
      {/* Mobile: 1 column | sm+: 2 columns | lg: 4 columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:items-stretch lg:grid-cols-4 md:px-6 md:py-10">
        {USPS.map((usp, i) => {
          const CardContent = (
            <div
              className={`usp-card flex h-full items-center gap-4 rounded-xl border p-4 transition-all duration-300 sm:p-5 ${
                hovered === i
                  ? 'border-[#D4A853]/30 bg-[#D4A853]/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A853]/10 transition-colors duration-300 md:h-11 md:w-11">
                <usp.icon className="h-4 w-4 text-[#D4A853] md:h-5 md:w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{usp.title}</h3>
                <p className="mt-0.5 text-xs text-white/50 md:text-sm">{usp.desc}</p>
              </div>
            </div>
          );

          if (usp.href) {
            return (
              <a
                key={usp.title}
                href={usp.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(usp.href!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="block h-full"
              >
                {CardContent}
              </a>
            );
          }

          return <div key={usp.title} className="h-full">{CardContent}</div>;
        })}
      </div>
    </section>
  );
}
