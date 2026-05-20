import { Star, Quote } from 'lucide-react';

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  dish: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Анна М.',
    date: '3 мая 2026',
    rating: 5,
    text: 'Заказываем уже третий раз — всё всегда свежее и вкусное. Филадельфия с лососем просто топ! Доставка в Черёмушки пришла за 50 минут, курьер вежливый.',
    dish: 'Филадельфия лосось',
  },
  {
    name: 'Дмитрий К.',
    date: '28 апреля 2026',
    rating: 5,
    text: 'Большая компания, заказали сет XXL + пиццу 50 см. Всего хватило на всех! Качество отличное, роллы сочные. Будем заказывать ещё.',
    dish: 'Сет XXL, Пицца 50 см',
  },
  {
    name: 'Елена С.',
    date: '15 апреля 2026',
    rating: 5,
    text: 'Воспользовалась скидкой на день рождения — 10% приятный бонус. Запечённые роллы с крабом и креветкой невероятно вкусные! Спасибо!',
    dish: 'Запечённые роллы, Скидка ДР',
  },
  {
    name: 'Максим П.',
    date: '10 апреля 2026',
    rating: 4,
    text: 'Хорошая доставка, шаурма от шефа — огромная, мяса много. Единственное, в пятницу вечером ждали чуть дольше обычного — около часа. Но еда того стоит.',
    dish: 'Шаурма от шефа',
  },
  {
    name: 'Ольга В.',
    date: '5 апреля 2026',
    rating: 5,
    text: 'Наконец-то в Мариуполе появилась достойная доставка суши! Всё красиво упаковано, соусы отдельно, имбирь и васаби в достаточном количестве. Рекомендую!',
    dish: 'Сет Гурман',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'fill-[#D4A853] text-[#D4A853]' : 'text-white/20'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#0A0A0D] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          Отзывы наших <span className="text-[#D4A853]">клиентов</span>
        </h2>
        <p className="mb-8 text-center text-sm text-white/50">
          Честные отзывы из Мариуполя
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/5 bg-[#121214] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853]/30"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4A853]/15 text-sm font-bold text-[#D4A853]">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" itemProp="author">
                      {review.name}
                    </p>
                    <p className="text-xs text-white/40">{review.date}</p>
                  </div>
                </div>
                <Quote className="h-5 w-5 text-[#D4A853]/30" />
              </div>

              <StarRating rating={review.rating} />

              <p className="mt-3 text-sm leading-relaxed text-white/80" itemProp="reviewBody">
                {review.text}
              </p>

              <p className="mt-3 text-xs text-[#D4A853]/70">
                Заказал: {review.dish}
              </p>

              <meta itemProp="datePublished" content={review.date} />
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(review.rating)} />
                <meta itemProp="bestRating" content="5" />
              </div>
            </div>
          ))}
        </div>

        {/* AggregateRating Schema */}
        <div
          className="mt-8 text-center"
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <meta itemProp="ratingValue" content="4.8" />
          <meta itemProp="reviewCount" content="5" />
          <meta itemProp="bestRating" content="5" />
          <p className="text-sm text-white/50">
            Средняя оценка:{' '}
            <span className="text-[#D4A853] font-bold">4.8 из 5</span> на основе 5 отзывов
          </p>
        </div>
      </div>
    </section>
  );
}
