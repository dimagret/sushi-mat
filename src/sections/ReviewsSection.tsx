import { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const AGGREGATE_RATING = {
  ratingValue: '5.0',
  reviewCount: '8',
  bestRating: '5',
};

const reviews = [
  {
    name: 'Анна К.',
    text: 'Заказываю Филадельфию уже третий раз. Роллы всегда свежие, рыба отличного качества. Доставка в Ильичёвский район за 40 минут. Очень довольна!',
    rating: 5,
    date: '2026-05-28',
    dish: 'Филадельфия Классика',
  },
  {
    name: 'Максим Д.',
    text: 'Большая компания, заказали сет "Биг Бен" + пиццу 50 см. Всё привезли горячее, вкусное. Бесплатная доставка от 1500₽ — супер.',
    rating: 5,
    date: '2026-05-25',
    dish: 'Сет Биг Бен',
  },
  {
    name: 'Елена С.',
    text: 'Дракон запечённый — просто бомба! Соус унаги, угорь, всё как должно быть. Дочь просит каждую неделю. Спасибо Суши Мать!',
    rating: 5,
    date: '2026-05-22',
    dish: 'Ролл Дракон',
  },
  {
    name: 'Игорь П.',
    text: 'Работаю в центре, обеды заказываем всем офисом. Шаурма и роллы — топ. Цены адекватные, доставка всегда вовремя. Рекомендую.',
    rating: 5,
    date: '2026-05-20',
    dish: 'Шаурма классическая',
  },
  {
    name: 'Ольга В.',
    text: 'В день рождения получила скидку 10%, очень приятно! Заказала Калифорнию и запечённый сет. Всё вкусно, красиво упаковано.',
    rating: 5,
    date: '2026-05-18',
    dish: 'Калифорния',
  },
  {
    name: 'Дмитрий Н.',
    text: 'Живу в пос. Мирный, многие не доставляют к нам. Суши Мать привезли за 55 минут. Роллы тёплые, свежие. Теперь только к вам!',
    rating: 5,
    date: '2026-05-15',
    dish: 'Сет Филадельфия',
  },
  {
    name: 'Светлана М.',
    text: 'Пицца 50 см на всю семью — отличная идея! Тесто тонкое, начинки много. Дети в восторге. Доставка в 20-й микрорайон работает.',
    rating: 5,
    date: '2026-05-12',
    dish: 'Пицца 50 см Мясная',
  },
  {
    name: 'Артём Р.',
    text: 'Пробовал много служб доставки в Мариуполе. Суши Мать — лучшие по соотношению цена/качество. Свежие продукты, быстрая доставка.',
    rating: 5,
    date: '2026-05-10',
    dish: 'Филадельфия Де Люкс',
  },
];

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section id="reviews" className="scroll-mt-20 border-t border-[#D4A853]/10 bg-[#0A0A0D] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="mb-2 text-center font-['Playfair_Display_SC'] text-2xl font-bold text-white md:text-3xl">
          Отзывы о доставке <span className="gold-gradient-text">Суши Мать</span> в Мариуполе
        </h2>
        <p className="mb-10 text-center text-sm text-white/50 md:text-base">
          Что говорят наши клиенты о роллах, пицце и доставке
        </p>

        {/* AggregateRating wrapper */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <meta itemProp="ratingValue" content={AGGREGATE_RATING.ratingValue} />
          <meta itemProp="reviewCount" content={AGGREGATE_RATING.reviewCount} />
          <meta itemProp="bestRating" content={AGGREGATE_RATING.bestRating} />
          {visible.map((r, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-[#D4A853]/20 hover:bg-white/[0.04]"
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="datePublished" content={r.date} />
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content={r.dish} />
              </div>

              <Quote className="mb-3 h-5 w-5 text-[#D4A853]/30" />

              <p className="mb-4 text-sm leading-relaxed text-white/70" itemProp="reviewBody">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-[#D4A853] text-[#D4A853]" />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs font-medium text-white/80" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{r.name}</span>
                </span>
                <span className="text-[10px] text-white/30">{r.date}</span>
              </div>

              <div
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
                className="hidden"
              >
                <meta itemProp="ratingValue" content={String(r.rating)} />
                <meta itemProp="bestRating" content="5" />
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-[#D4A853]/30 px-6 py-2.5 text-sm text-[#D4A853] transition-all hover:bg-[#D4A853]/10"
            >
              Показать все отзывы ({reviews.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
