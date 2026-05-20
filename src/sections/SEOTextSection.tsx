import { MapPin, Clock, Truck, Gift } from 'lucide-react';

export default function SEOTextSection() {
  return (
    <section className="bg-[#0A0A0D] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
          Доставка роллов, пиццы и шаурмы <span className="text-[#D4A853]">в Мариуполе</span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#121214] p-4 text-center">
            <Truck className="h-6 w-6 text-[#D4A853]" />
            <span className="text-sm font-semibold">Доставка 45–70 мин</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#121214] p-4 text-center">
            <MapPin className="h-6 w-6 text-[#D4A853]" />
            <span className="text-sm font-semibold">По всему Мариуполю</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#121214] p-4 text-center">
            <Clock className="h-6 w-6 text-[#D4A853]" />
            <span className="text-sm font-semibold">09:00–21:00 без выходных</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#121214] p-4 text-center">
            <Gift className="h-6 w-6 text-[#D4A853]" />
            <span className="text-sm font-semibold">Бесплатно от 1000 ₽</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#121214] p-6 md:p-8 text-white/80 text-sm leading-relaxed space-y-4">
          <p>
            Суши Мать — служба доставки японской и европейской кухни в Мариуполе. Мы готовим{' '}
            <strong className="text-white">147 блюд</strong>: роллы, пиццу, шаурму, бургеры, WOK,
            салаты и супы. Работаем ежедневно с <strong className="text-white">09:00 до 21:00</strong>,
            без выходных и праздников.
          </p>

          <p>
            Доставляем по Ильичёвскому району, Черёмушкам, Центру и посёлку Мирный.{' '}
            <strong className="text-white">Минимальный заказ — 500 ₽</strong>, бесплатная доставка
            от 1000 ₽. Среднее время доставки —{' '}
            <strong className="text-white">45–70 минут</strong> в зависимости от района.
          </p>

          <p>
            Каждое утро получаем свежую рыбу, овощи и мясо от проверенных поставщиков. Повара
            готовят вручную, без полуфабрикатов. Для запечённых роллов используем только свежие
            ингредиенты — лосось, тунец, угорь, краб, креветки.
          </p>

          <p>
            <strong className="text-white text-[#D4A853]">Скидка 10% именинникам</strong> в день
            рождения. Укажите дату в разделе акций — мы сгенерируем персональный промокод. Акция
            действует 3 дня: в день рождения, за день до и после.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">
            Почему выбирают Суши Мать в Мариуполе
          </h3>

          <ul className="grid gap-2 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>147 позиций — от классической филадельфии до авторских роллов</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>Пицца двух размеров: 30 см и 50 см с выбором бортика</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>Доставка 45–70 минут по всему Мариуполю</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>Бесплатная доставка от 1000 ₽</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>Работаем без выходных с 09:00 до 21:00</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4A853] mt-0.5">✓</span>
              <span>Свежие ингредиенты каждый день</span>
            </li>
          </ul>

          <p className="pt-2">
            Заказать доставку роллов и пиццы в Мариуполе можно по телефону{' '}
            <a href="tel:+79496117127" className="text-[#D4A853] hover:underline">
              +7 (949) 611-71-27
            </a>{' '}
            или через корзину на сайте. Минимальный заказ — 500 ₽. Бесплатная доставка от 1000 ₽
            по адресу <strong className="text-white">Ул. Урицкого 83В</strong> и близлежащим районам.
          </p>
        </div>
      </div>
    </section>
  );
}
