import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: 'Какое время работы доставки Суши Мать?',
    a: 'Мы принимаем заказы ежедневно с 09:00 до 21:00 без выходных. Доставка занимает от 45 до 70 минут в зависимости от района Мариуполя.',
  },
  {
    q: 'Какой минимальный заказ и стоимость доставки?',
    a: 'Минимальный заказ — 500 ₽. Бесплатная доставка от 1000 ₽ по адресу Ул. Урицкого 83В и близлежащим районам: Ильичёвский, Черёмушки, Центр, пос. Мирный.',
  },
  {
    q: 'Есть ли скидка в день рождения?',
    a: 'Да! Укажите дату рождения в разделе «Акции» — мы сгенерируем персональный промокод на скидку 10%. Акция действует 3 дня: в день рождения, за день до и после.',
  },
  {
    q: 'Какие способы оплаты доступны?',
    a: 'Мы принимаем: наличные курьеру, банковские карты Visa/Mastercard/МИР (онлайн и курьеру), переводы на Сбер и Тинькофф.',
  },
  {
    q: 'Сколько позиций в меню и что есть?',
    a: 'В нашем меню 147 позиций: роллы (Филадельфия, Калифорния, Драконы, Маки, Стрит-роллы), пицца (30 см и 50 см с выбором бортика), шаурма, бургеры, WOK, лапша, супы, салаты, сеты.',
  },
  {
    q: 'Доставляете ли вы в мой район Мариуполя?',
    a: 'Доставляем по всему Мариуполю: Ильичёвский район, Черёмушки, Центр, посёлок Мирный, Левый берег. Уточните адрес при оформлении заказа — курьер свяжется, если будут вопросы.',
  },
  {
    q: 'Можно ли сделать предзаказ на определённое время?',
    a: 'Да, позвоните нам по номеру +7 (949) 611-71-27 и сообщите желаемое время доставки. Мы приготовим заказ к назначенному часу.',
  },
];

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-[#D4A853]"
        aria-expanded={open}
      >
        <span className="text-sm font-medium pr-4">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#D4A853] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-4' : 'max-h-0'}`}
      >
        <p className="text-sm leading-relaxed text-white/70">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="bg-[#0A0A0D] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          Часто задаваемые <span className="text-[#D4A853]">вопросы</span>
        </h2>
        <p className="mb-8 text-center text-sm text-white/50">
          Ответы на самые популярные вопросы о доставке в Мариуполе
        </p>
        <div className="rounded-2xl border border-white/5 bg-[#121214] p-4 md:p-6">
          {FAQ_DATA.map((item, i) => (
            <FAQItemComponent key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
