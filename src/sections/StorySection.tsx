import { useEffect, useRef } from 'react';
import { Leaf, ChefHat, Truck, UtensilsCrossed } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Leaf,
    title: 'Свежие ингредиенты',
    desc: 'Каждое утро — свежайшая рыба, овощи и мясо от проверенных поставщиков. Никаких полуфабрикатов.',
  },
  {
    icon: ChefHat,
    title: 'Мастера своего дела',
    desc: 'Каждый ролл и каждая пицца — вручную. Годы опыта и любовь к делу в каждом блюде.',
  },
  {
    icon: Truck,
    title: 'Тёплая доставка',
    desc: 'Термо-сумки сохраняют температуру. Еда приезжает горячей и свежей — как из духовки.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Приятного аппетита',
    desc: 'Откройте коробку и насладитесь вкусом ресторана у себя дома. С любовью, Суши Мать.',
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section id="process" ref={sectionRef} className="overflow-hidden scroll-mt-20 border-y border-white/5 bg-[#0A0A0D] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A853]">
            Наш процесс
          </span>
          <h2 className="font-['Playfair_Display_SC'] text-3xl font-bold md:text-4xl">
            От кухни до вашего стола
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/50">
            Мы контролируем каждый этап, чтобы вы получили не просто еду, а настоящий гастрономический опыт
          </p>
        </div>

        {/* Steps grid — 4 columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl border border-white/5 bg-[#121214] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853]/20 hover:shadow-[0_8px_30px_rgba(212,168,83,0.08)]"
            >
              {/* Step number */}
              <span className="absolute right-4 top-4 text-5xl font-bold text-white/[0.03] transition-colors group-hover:text-[#D4A853]/[0.06]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4A853]/10 transition-colors group-hover:bg-[#D4A853]/15">
                <step.icon className="h-5 w-5 text-[#D4A853]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white">{step.title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
