export type TagType = 'hit' | 'new' | 'hot' | null;

export interface OptionChoice {
  label: string;
  priceDelta: number;
}

export interface ItemOption {
  name: string;
  choices: OptionChoice[];
}

export interface MenuItem {
  id: number;
  cats: string[];
  name: string;
  desc: string;
  price: number;
  weight: string | null;
  tag: TagType;
  options?: ItemOption[];
  image?: string;
}

export interface Category {
  id: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Все позиции' },
  { id: 'hit', label: 'Хиты' },
  { id: 'shawarma', label: 'Шаурма' },
  { id: 'burgers', label: 'Бургеры' },
  { id: 'hotdog', label: 'Хот-дог' },
  { id: 'rolls', label: 'Роллы' },
  { id: 'philly', label: 'Филадельфия' },
  { id: 'california', label: 'Калифорния' },
  { id: 'dragons', label: 'Драконы' },
  { id: 'maki', label: 'Маки роллы' },
  { id: 'street', label: 'Стрит-роллы' },
  { id: 'baked', label: 'Запечённые роллы' },
  { id: 'fried', label: 'Жареные роллы' },
  { id: 'mussels', label: 'Запечённые мидии' },
  { id: 'sets', label: 'Сеты' },
  { id: 'pizza', label: 'Пицца' },
  { id: 'noodles', label: 'Лапша и WOK' },
  { id: 'tyahan', label: 'Тяхан' },
  { id: 'skovorodki', label: 'Сковородки' },
  { id: 'soups', label: 'Супы' },
  { id: 'salads', label: 'Салаты' },
  { id: 'fry', label: 'Фритюр' },
  { id: 'shevchiki', label: 'Шевчики' },
  { id: 'extras', label: 'Добавки' },
];

export const TAG_LABELS: Record<string, string> = {
  hit: 'Хит',
  new: 'Новинка',
  hot: 'Острое',
};

export const FMT = (n: number) => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';

// ═══════════════════════════════════════════════════════════
// 📦 АРХИВ — удалённые позиции (для возможного восстановления)
// ═══════════════════════════════════════════════════════════
export const ARCHIVED_ITEMS: MenuItem[] = [
  { id: 121, cats: ['shawarma'], name: 'Буртуч', desc: 'Лаваш, мясо, овощи, соус', price: 410, weight: '500 гр', tag: null },
];

export const MENU: MenuItem[] = [
  // === РОЛЛЫ ===
  { id: 1, cats: ['rolls'], name: 'Динамит', desc: 'Рис, нори, сыр, авокадо, кусочки манго, белый кунжут, шапочка, соус манго, чили', price: 570, weight: '320 гр', tag: null, image: '/catalog_part2/dish_006.jpg' },
  { id: 2, cats: ['rolls'], name: 'Аляска', desc: 'Рис, нори, сыр, тунец, манго, масаго красная, манго соус', price: 470, weight: '230 гр', tag: null, image: '/catalog/dish_002.jpg' },
  { id: 3, cats: ['rolls'], name: 'Анаго', desc: 'Рис, нори, сыр, тунец, лосось, айсберг, тобико чёрная, унаги соус', price: 490, weight: '230 гр', tag: null, image: '/catalog/dish_015.jpg' },
  { id: 4, cats: ['rolls'], name: 'Эмаги', desc: 'Рис, нори, сыр, лосось, томаго, зелёная масаго, шапка', price: 520, weight: '280 гр', tag: null },
  { id: 5, cats: ['rolls'], name: 'Маями', desc: 'Рис, нори, сыр, угорь, краб, огурец, масаго зелёная, унаги соус', price: 500, weight: '280 гр', tag: null, image: '/catalog/dish_011.jpg' },
  { id: 6, cats: ['rolls'], name: 'Кайри', desc: 'Рис, нори, сыр, тунец, креветка, масаго зелёная, чеддер', price: 470, weight: '230 гр', tag: 'hit', image: '/catalog/dish_016.jpg' },
  { id: 7, cats: ['rolls', 'hot'], name: 'Вулкан (острый ролл)', desc: 'Рис, нори, сыр, тунец, масаго зелёная, спайси соус, лук зелёный', price: 520, weight: '220 гр', tag: 'hot', image: '/catalog_v10/dish_007.png' },
  { id: 8, cats: ['rolls'], name: 'Сан Райз', desc: 'Рис, нори, сыр, тунец, огурец, тобико чёрная, шапка', price: 470, weight: '330 гр', tag: null, image: '/catalog_dish_2026/dish_010.png' },
  { id: 9, cats: ['rolls'], name: 'Гурман', desc: 'Рис, нори, сыр, лосось, авокадо, тобико красная, шапка', price: 550, weight: '315 гр', tag: null, image: '/catalog/dish_003.jpg' },
  { id: 10, cats: ['rolls'], name: 'Арамаки', desc: 'Рис, нори, сыр, тунец, лосось, огурец, масаго чёрная, шапка', price: 590, weight: '320 гр', tag: null },
  { id: 11, cats: ['rolls'], name: 'Сырный ролл', desc: 'Рис, нори, сыр филадельфия, огурец, лосось, чеддер, спайс', price: 450, weight: '250 гр', tag: null, image: '/catalog/dish_007.jpg' },
  { id: 12, cats: ['rolls', 'hit'], name: 'Сенсей', desc: 'Рис, нори, креветка, сыр, авокадо, масаго, лосось, спайс', price: 700, weight: '290 гр', tag: 'hit' },
  { id: 13, cats: ['rolls'], name: 'Сайтама', desc: 'Рис, нори, сыр, лосось с/с, огурец, кунжут', price: 520, weight: '230 гр', tag: null, image: '/catalog/dish_009.jpg' },

  // === МАКИ РОЛЛЫ ===
  { id: 14, cats: ['maki'], name: 'Маки с креветкой', desc: 'Рис, нори, креветка, сыр', price: 250, weight: '125 гр', tag: null },
  { id: 15, cats: ['maki'], name: 'Маки с крабом', desc: 'Рис, нори, краб, сыр, соус', price: 220, weight: '135 гр', tag: null },
  { id: 16, cats: ['maki'], name: 'Маки с авокадо', desc: 'Рис, нори, авокадо', price: 250, weight: '115 гр', tag: null, image: '/catalog_v10/dish_002.png' },
  { id: 17, cats: ['maki'], name: 'Маки с лососем', desc: 'Рис, нори, лосось', price: 260, weight: '115 гр', tag: null, image: '/catalog_v10/dish_001.png' },
  { id: 18, cats: ['maki'], name: 'Маки с угрём', desc: 'Рис, нори, угорь, кунжут, соус унаги', price: 290, weight: '115 гр', tag: null },
  { id: 19, cats: ['maki'], name: 'Маки с тунцом', desc: 'Рис, нори, тунец', price: 230, weight: '125 гр', tag: null },
  { id: 20, cats: ['maki'], name: 'Маки с огурцом', desc: 'Рис, нори, огурец', price: 200, weight: null, tag: null, image: '/catalog_v10/dish_009.png' },

  // === СТРИТ-РОЛЛЫ ===
  { id: 21, cats: ['street'], name: 'Креветка', desc: 'Рис, нори, сыр, тобика, айсберг, креветка, соус', price: 420, weight: '250 гр', tag: null },
  { id: 22, cats: ['street'], name: 'Лосось', desc: 'Рис, нори, огурец, сыр, лосось с/с, тобика, спайс соус', price: 440, weight: '250 гр', tag: null },
  { id: 23, cats: ['street'], name: 'Краб + креветка', desc: 'Рис, нори, авокадо, огурец, краб, креветка, пармезан, сливочный соус', price: 420, weight: '250 гр', tag: null },
  { id: 24, cats: ['street'], name: 'Угорь + тунец', desc: 'Рис, нори, сыр, угорь, тунец, болгарский перец, помидор', price: 440, weight: '250 гр', tag: null },

  // === ФИЛАДЕЛЬФИЯ ===
  { id: 25, cats: ['philly'], name: 'Филадельфия с тунцом', desc: 'Рис, нори, тунец, сыр, огурец, авокадо', price: 570, weight: '280 гр', tag: null, image: '/dish_photos_v2/филадельфия_тунец.jpg' },
  { id: 26, cats: ['philly'], name: 'Филадельфия креветка', desc: 'Рис, нори, креветка, сыр, огурец, авокадо', price: 570, weight: '280 гр', tag: null , image: '/dish_photos_v2/филадельфия_креветка.jpg' },
  { id: 27, cats: ['philly'], name: 'Филадельфия угорь', desc: 'Рис, нори, угорь, сыр, огурец, авокадо', price: 650, weight: '280 гр', tag: null , image: '/dish_photos_v2/филадельфия_угорь.jpg' },
  { id: 28, cats: ['philly', 'hit'], name: 'Филадельфия лосось', desc: 'Рис, нори, лосось, сыр, огурец, авокадо', price: 650, weight: '280 гр', tag: 'hit' , image: '/dish_photos_v2/филадельфия_лосось.jpg' },
  { id: 29, cats: ['philly'], name: 'Филадельфия люкс', desc: 'Рис, нори, лосось, икра лососевая, сыр, огурец, авокадо', price: 700, weight: '285 гр', tag: 'new'
},
  { id: 30, cats: ['philly'], name: 'Филадельфия лайт', desc: 'Рис, нори, лосось, сыр, огурец, соус манго', price: 570, weight: '265 гр', tag: null, image: '/catalog/dish_008.jpg' },

  // === КАЛИФОРНИЯ ===
  { id: 31, cats: ['california'], name: 'Калифорния эби', desc: 'Рис, нори, сыр, огурец, креветка, тобико', price: 450, weight: '240 гр', tag: null, image: '/catalog/dish_014.jpg' },
  { id: 32, cats: ['california'], name: 'Калифорния краб', desc: 'Рис, нори, авокадо, огурец, краб, тобико', price: 470, weight: '230 гр', tag: null },
  { id: 33, cats: ['california'], name: 'Калифорния с лососем', desc: 'Рис, нори, авокадо, огурец, лосось, тобико', price: 520, weight: '230 гр', tag: null, image: '/catalog/dish_013.jpg' },

  // === ДРАКОНЫ ===
  { id: 34, cats: ['dragons'], name: 'Чёрный дракон', desc: 'Рис, нори, чёрная тобико, красная тобико, соус унаги, сыр филадельфия, креветка тигровая, томаго', price: 620, weight: '260 гр', tag: null , image: '/dish_photos_v2/чёрный_дракон.jpg' },
  { id: 35, cats: ['dragons', 'hit'], name: 'Золотой дракон', desc: 'Рис, нори, лосось, краб, огурец, сыр, тобико, майонез', price: 670, weight: '290 гр', tag: 'hit' , image: '/dish_photos_v2/золотой_дракон.jpg' },
  { id: 36, cats: ['dragons', 'hot'], name: 'Красный дракон', desc: 'Рис, нори, тунец, угорь, салат, сыр, тобико, спайс соус', price: 620, weight: '290 гр', tag: 'hot' , image: '/dish_photos_v2/краснный_дракон.jpg' },
  { id: 37, cats: ['dragons'], name: 'Зелёный дракон', desc: 'Рис, нори, краб, креветка, тобико, авокадо, сыр, унаги соус', price: 670, weight: '290 гр', tag: null , image: '/dish_photos_v2/зелённый_дракон.jpg' },
  { id: 38, cats: ['rolls'], name: 'Окинава', desc: 'Рис, нори, сыр, лук, огурец, лосось с/с, масаго, спайс', price: 450, weight: '240 гр', tag: null },
  { id: 39, cats: ['rolls'], name: 'Окаяма', desc: 'Рис, нори, сыр, авокадо, лосось, угорь, унаги соус', price: 620, weight: '260 гр', tag: null, image: '/catalog_part2/dish_004.jpg' },
  { id: 40, cats: ['rolls', 'hit'], name: 'Микс ролл', desc: 'Рис, нори, креветка, авокадо, лосось, тунец, сыр, унаги соус', price: 650, weight: '300 гр', tag: 'hit', image: '/catalog_part2/dish_007.jpg' },
  { id: 41, cats: ['rolls'], name: 'Мидори', desc: 'Рис, нори, сыр, краб, перец, салат, огурец, масаго красная, майонез', price: 400, weight: '250 гр', tag: null, image: '/catalog_v10/dish_004.png' },

  // === СТРИТ-РОЛЛЫ ===
  { id: 204, cats: ['street'], name: 'Стрит ролл с лососем', desc: 'Рис, нори, огурец, сыр, лосось слабосолёный, тобика, спайс-соус', price: 440, weight: '250 гр', tag: 'new', image: '/catalog_part3/dish_001.jpg' },
  { id: 205, cats: ['street'], name: 'Стрит ролл с креветкой', desc: 'Рис, нори, сыр, тобика, айсберг, креветка, соус', price: 420, weight: '250 гр', tag: 'new' },
  { id: 206, cats: ['street'], name: 'Стрит ролл с крабом и креветкой', desc: 'Рис, нори, авокадо, огурец, краб, креветка, пармезан, сливочный соус', price: 420, weight: '250 гр', tag: 'new' },
  { id: 207, cats: ['street'], name: 'Стрит ролл с угрём и тунцом', desc: 'Рис, нори, сыр, угорь, тунец, болгарский перец, помидор', price: 440, weight: '250 гр', tag: 'new' },

  // === ЗАПЕЧЁННЫЕ РОЛЛЫ ===
  { id: 42, cats: ['baked', 'hit'], name: 'Запечённый лосось', desc: 'Рис, нори, лосось с/с, авокадо, кунжут, шапка, унаги', price: 670, weight: '300 гр', tag: 'hit' },
  { id: 43, cats: ['baked'], name: 'С крабом и креветкой', desc: 'Рис, нори, краб, креветка, перец болгарский, шапка, масаго', price: 570, weight: '300 гр', tag: null, image: '/catalog_part2/dish_018.jpg' },
  { id: 44, cats: ['baked'], name: 'Запечённый Бона', desc: 'Рис, нори, томаго, авокадо, креветка, сыр, шапка, унаги, кунжут', price: 550, weight: '300 гр', image: '/catalog_part4/dish_003.jpeg', tag: null },
  { id: 45, cats: ['baked'], name: 'Запечённый креветка', desc: 'Рис, нори, сыр, креветка, авокадо, спайс, масаго, шапка', price: 570, weight: '280 гр', image: '/catalog_part4/dish_001.jpeg', tag: null },
  { id: 46, cats: ['baked'], name: 'Запечённый Осака', desc: 'Рис, нори, сыр, курица копчёная, томаго, салат, масаго, шапка, унаги', price: 470, weight: '340 гр', tag: null },
  { id: 47, cats: ['baked'], name: 'Запечённый три рыбы', desc: 'Рис, нори, угорь, лосось, креветка, шапка, соус устричный, унаги', price: 690, weight: '260 гр', image: '/catalog_part2/dish_017.jpg', tag: null },
  { id: 48, cats: ['baked'], name: 'Запечённый Фила', desc: 'Рис, нори, сыр, огурец, авокадо, лосось, унаги', price: 650, weight: '310 гр', tag: null, image: '/catalog_v10/dish_005.png' },
  { id: 49, cats: ['baked'], name: 'Тунец + лосось', desc: 'Рис, нори, тунец, лосось с/с, масаго красная, шапка', price: 690, weight: '280 гр', tag: 'new', image: '/catalog_dish_2026/dish_012.png' },
  { id: 50, cats: ['baked'], name: 'Угорь + лосось', desc: 'Рис, нори, угорь, лосось с/с, огурец, унаги, масаго, шапка', price: 690, weight: '260 гр', tag: null },
  { id: 51, cats: ['baked'], name: 'Сага', desc: 'Рис, нори, угорь, тунец, кунжут белый, унаги соус, шапка', price: 610, weight: '340 гр', image: '/catalog_part4/dish_002.jpeg', tag: null },
  { id: 52, cats: ['baked'], name: 'Сендай (запечённый)', desc: 'Рис, нори, сыр филадельфия, чеддер, краб, шапка', price: 470, weight: '320 гр', image: '/catalog_part4/dish_004.jpeg', tag: null },
  { id: 53, cats: ['baked', 'hit'], name: 'Крейзи', desc: 'Рис, нори, сыр, креветка, лосось, авокадо, масаго красная', price: 650, weight: '385 гр', tag: 'hit', image: '/catalog/dish_010.jpg' },

  // === ЖАРЕНЫЕ РОЛЛЫ ===
  { id: 54, cats: ['fried'], name: 'Эби фрай', desc: 'Рис, нори, сыр филадельфия, моцарелла, креветка тигровая, тобико, огурец', price: 470, weight: '340 гр', tag: null, image: '/catalog_part2/dish_008.jpg' },
  { id: 55, cats: ['fried'], name: 'Жареный ролл с тунцом', desc: 'Рис, нори, сыр, тунец, болгарский перец, помидор, лук, спайс соус', price: 470, weight: '340 гр', tag: null },
  { id: 56, cats: ['fried'], name: 'Хот-фиш', desc: 'Рис, нори, лосось, угорь, сыр, помидор, соус унаги', price: 570, weight: '320 гр', tag: null },
  { id: 57, cats: ['fried'], name: 'Жареный ролл лосось + краб', desc: 'Рис, нори, лосось, краб, тобико, салат, огурец', price: 500, weight: '320 гр', tag: null, image: '/catalog/dish_017.jpg' },

  // === ЗАПЕЧЁННЫЕ МИДИИ ===
  { id: 58, cats: ['mussels'], name: 'Мидии в ракушке', desc: 'Запечённые мидии под сырной шапкой', price: 370, weight: '3 шт / 5 шт', tag: 'new', options: [{ name: 'Количество', choices: [{ label: '3 шт', priceDelta: 0 }, { label: '5 шт', priceDelta: 160 }] }, { name: 'Соус', choices: [{ label: 'Тар-тар', priceDelta: 0 }, { label: 'Сладкий чили', priceDelta: 0 }, { label: 'Сырный', priceDelta: 0 }] }] },

  // === СЕТЫ ===
  { id: 59, cats: ['sets', 'hit'], name: 'Сет №1', desc: 'Филадельфия лайт, Кайри, Сендай, Калифорния лосось', price: 2200, weight: '1100 гр', tag: 'hit' , image: '/dish_photos_v2/сет_1.jpg' },
  { id: 60, cats: ['sets'], name: 'Сет №2', desc: 'Окаяма, Калифорния краб, Сендай, Зелёный дракон', price: 2350, weight: '1050 гр', tag: null },
  { id: 61, cats: ['sets', 'hit'], name: 'Сет №3', desc: 'Филадельфия лосось, Филадельфия угорь, Филадельфия креветка, Филадельфия тунец', price: 2350, weight: '1100 гр', tag: 'hit' , image: '/dish_photos_v2/сет_3.jpg' },
  { id: 62, cats: ['sets'], name: 'Сет №4', desc: 'Сайтама, Калифорния лосось, Филадельфия угорь, Золотой дракон', price: 2250, weight: '1050 гр', tag: null },
  { id: 63, cats: ['sets'], name: 'Сет №5', desc: 'Окинава, Мидори, Калифорния эби, Анаго', price: 1550, weight: '1000 гр', tag: null },
  { id: 64, cats: ['sets', 'new'], name: 'Сет №6', desc: 'Динамит, Санрайз, Анаго, Кайри', price: 1900, weight: '1100 гр', tag: 'new' , image: '/dish_photos_v2/сет_6.jpg' },
  { id: 65, cats: ['sets'], name: 'Сет XXL', desc: 'Аляска, Анаго, Маями, Вулкан, Крейзи, Сенсей, Сайтама, Банзай', price: 3900, weight: '2100 гр', tag: null , image: '/dish_photos_v2/сет_xxl.jpg' },
  { id: 66, cats: ['sets', 'new'], name: 'Сет микс', desc: 'Филадельфия люкс, Микс ролл, Запечённая Филадельфия, Запечённый три рыбы', price: 2500, weight: '1150 гр', tag: 'new', image: '/catalog_part2/dish_001.jpg' },
  { id: 67, cats: ['sets', 'hit'], name: 'Сет запечённый', desc: 'Запечённый тунец + лосось, Запечённый креветка, Запечённый краб + креветка, Запечённый лосось', price: 2300, weight: '1150 гр', tag: 'hit' },
  { id: 68, cats: ['sets'], name: 'Маки сет', desc: 'Маки ролл: с лососем, с тунцом, с креветкой, с угрём, с крабом, с авокадо', price: 1300, weight: '730 гр', tag: null, image: '/catalog_dish_2026/dish_009.png' },
  { id: 69, cats: ['sets'], name: 'Сет дракон', desc: 'Золотой дракон, Красный дракон, Чёрный дракон, Зелёный дракон', price: 2500, weight: '1130 гр', tag: null , image: '/dish_photos_v2/сет_драон.jpg' },

  // === ПИЦЦА ===
  // Пиццы с размерами 30/50 см + бортики
  { id: 70, cats: ['pizza', 'hit'], name: 'По-шефски', desc: 'Курица гриль, телятина, бекон, ветчина, лук марин., томаты, огурец марин., моцарелла, соус красный', price: 700, weight: '30 см / 50 см', image: '/catalog_part4/dish_006.jpeg', tag: 'new', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 71, cats: ['pizza'], name: 'По-домашнему', desc: 'Рубленое мясо, сыр, лук марин., томаты, соус чесночный, соус красный', price: 550, weight: '30 см / 50 см', image: '/catalog_part4/dish_005.jpeg', tag: null, options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 72, cats: ['pizza', 'hit'], name: 'Цезарь', desc: 'Курица, бекон, моцарелла, томаты, айсберг, пармезан, белый соус', price: 650, weight: '30 см / 50 см', tag: 'hit', image: '/catalog_dish_2026/dish_001.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 73, cats: ['pizza'], name: 'Фермерская', desc: 'Курица, сыр, грибы, огурец марин., лук, соус красный', price: 550, weight: '30 см / 50 см', tag: null, image: '/catalog_part2/dish_013.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 350 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 74, cats: ['pizza', 'hot'], name: 'Охотничья', desc: 'Колбаски охотничьи, сыр, перец болгарский, перец халапеньо, соус красный', price: 600, weight: '30 см / 50 см', tag: 'hot', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 500 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 75, cats: ['pizza'], name: 'Гавайская', desc: 'Моцарелла, филе куриное, кукуруза, ананас, соус красный', price: 600, weight: '30 см / 50 см', tag: null, image: '/catalog/dish_001.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 350 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 77, cats: ['pizza'], name: 'С морепродуктами', desc: 'Креветки тигровые, лосось, мидии, оливки, пармезан, тобика, соус белый', price: 800, weight: '30 см / 50 см', tag: null, image: '/catalog_dish_2026/dish_004.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 700 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 78, cats: ['pizza'], name: '4 сыра', desc: 'Пармезан, моцарелла, филадельфия, чеддер, белый соус', price: 700, weight: '30 см / 50 см', tag: null, options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] , image: '/dish_photos_v2/пицца_4_сыра.jpg' },
  { id: 79, cats: ['pizza'], name: 'С телятиной', desc: 'Телятина, моцарелла, томаты, лук, соус белый', price: 550, weight: '30 см / 50 см', tag: null, image: '/catalog/dish_012.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 80, cats: ['pizza'], name: 'Маргарита', desc: 'Моцарелла, томаты, рукола, соус красный', price: 450, weight: '30 см / 50 см', tag: null, options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 81, cats: ['pizza', 'new'], name: 'Карбонара', desc: 'Моцарелла, бекон, шампиньоны, яйцо перепелиное, соус белый', price: 650, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part2/dish_012.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 82, cats: ['pizza', 'hit'], name: 'Пепперони', desc: 'Моцарелла, колбаса пепперони, лук фри, соус красный', price: 600, weight: '30 см / 50 см', tag: 'hit', image: '/catalog_dish_2026/dish_002.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 83, cats: ['pizza'], name: 'Жюльен', desc: 'Моцарелла, белый соус, шампиньоны, лук репчатый, куриное филе, пармезан', price: 700, weight: '30 см / 50 см', tag: null, image: '/catalog_dish_2026/dish_005.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 500 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 208, cats: ['pizza', 'new'], name: 'Половинки', desc: 'Белый соус: моцарелла, пепперони, лук кранч, филадельфия, пармезан, чеддер | Красный соус: моцарелла, пепперони, лук кранч, филадельфия, пармезан, чеддер', price: 700, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part7/dish-002.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 500 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 209, cats: ['pizza', 'new'], name: '4 сезона', desc: 'Моцарелла, грибы | курица, лук, пармезан | бекон, черри, айсберг | охотничьи колбаски, болгарский перец, халапеньо, колбаса милана, ветчина, зелёный лук', price: 750, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part7/dish-000.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 550 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  // Пиццы только 30 см + бортики
  { id: 76, cats: ['pizza', 'new'], name: 'Бьянка', desc: 'Моцарелла, филе куриное, кукуруза, соус красный, шампиньоны, красный лук', price: 550, weight: '30 см', tag: 'new', options: [{ name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] , image: '/dish_photos_v2/пицца_бьянка.jpg' },
  { id: 84, cats: ['pizza', 'new'], name: 'Милана', desc: 'Моцарелла, красный соус, колбаса милана, ветчина, помидор, зелёный лук', price: 550, weight: '30 см', tag: 'new', image: '/catalog_part2/dish_015.jpg', options: [{ name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },

  // === ШЕВЧИКИ ===
  { id: 85, cats: ['shevchiki', 'new'], name: 'Краб + креветка', desc: 'Тесто, белый соус, сыр филадельфия, краб, креветка, салат айсберг, унаги соус', price: 320, weight: null, tag: 'new' },
  { id: 86, cats: ['shevchiki', 'new'], name: 'Угорь + тунец', desc: 'Тесто, белый соус, сыр филадельфия, угорь, тунец, салат айсберг, унаги соус', price: 340, weight: null, tag: 'new' },

  // === ЛАПША ===
  { id: 87, cats: ['noodles'], name: 'Лапша с телятиной', desc: 'Лапша, телятина, шампиньоны, соус', price: 450, weight: '310 гр', tag: null, image: '/catalog_part3/dish_004.jpg' },
  { id: 88, cats: ['noodles', 'hit'], name: 'Лапша с курицей', desc: 'Лапша, куриное филе, овощи, спецсоус', price: 370, weight: '320 гр', tag: 'hit' , image: '/dish_photos_v2/лапка_с_курицей.jpg' },
  { id: 89, cats: ['noodles'], name: 'Лапша с морепродуктами', desc: 'Лапша, креветка, мидии, кальмар, овощи', price: 500, weight: '300 гр', tag: null },
  { id: 90, cats: ['noodles'], name: 'Лапша карбонара', desc: 'Лапша, бекон, пармезан, сливочный соус', price: 340, weight: '400 гр', tag: null , image: '/dish_photos_v2/лапша_карбонара.jpg' },
  { id: 91, cats: ['noodles'], name: 'Фунчоза с курицей', desc: 'Стеклянная лапша, курица, овощи', price: 370, weight: '300 гр', tag: null, image: '/catalog_part3/dish_005.jpg' },
  { id: 92, cats: ['noodles'], name: 'Фунчоза с морепродуктами', desc: 'Стеклянная лапша, креветка, мидии, кальмар, овощи', price: 500, weight: '330 гр', tag: null, image: '/catalog_part3/dish_003.jpg' },

  // === ТЯХАН ===
  { id: 93, cats: ['tyahan'], name: 'Тяхан с курицей', desc: 'Рис, курица, яйцо, овощи', price: 350, weight: '350 гр', tag: null , image: '/dish_photos_v2/тяхан_с_курицей.jpg' },
  { id: 94, cats: ['tyahan'], name: 'Тяхан с мидиями', desc: 'Рис, мидии, морские водоросли', price: 350, weight: '350 гр', tag: null },

  // === СКОВОРОДКИ ===
  { id: 95, cats: ['skovorodki', 'new'], name: 'Сковородка с курицей в сливках', desc: 'Куриное филе, грибы, помидоры, пармезан, моцарелла, сливки, помидоры черри, розмарин', price: 570, weight: null, tag: 'new' },
  { id: 96, cats: ['skovorodki', 'new'], name: 'Сковородка с курицей и свининой', desc: 'Лук, грибы, куриное филе, вырезка свиная, бекон, чесночный соус, пармезан, помидоры черри, картофель', price: 570, weight: null, tag: 'new' },

  // === СУПЫ ===
  { id: 97, cats: ['soups', 'hit'], name: 'Суп куриный с лапшой', desc: 'Бульон, курица, лапша, зелень', price: 250, weight: '370 гр', tag: 'hit', image: '/catalog_part3/dish_002.jpg' },
  { id: 98, cats: ['soups', 'hot'], name: 'Том-ям с рисом', desc: 'Кокосовое молоко, креветки, рис', price: 490, weight: '410 гр', tag: 'hot' },
  { id: 99, cats: ['soups', 'hot'], name: 'Том-ям с фунчозой', desc: 'Кокосовое молоко, креветки, фунчоза', price: 490, weight: '430 гр', tag: 'hot' },
  { id: 100, cats: ['soups'], name: 'Солянка', desc: 'Мясная солянка', price: 400, weight: '350 гр', tag: null , image: '/dish_photos_v2/солянка.jpg' },

  // === САЛАТЫ ===
  { id: 101, cats: ['salads'], name: 'Греческий', desc: 'Свежие овощи, маслины, фета', price: 320, weight: '310 гр', tag: null, image: '/catalog_part9/dish-002.png' },
  { id: 102, cats: ['salads', 'new'], name: 'Салат с лососем и авокадо', desc: 'Лосось, авокадо, микс салатов', price: 600, weight: '250 гр', tag: 'new' },
  { id: 103, cats: ['salads'], name: 'Боул креветка', desc: 'Рис, креветка, авокадо, огурец', price: 500, weight: '330 гр', tag: null },
  { id: 104, cats: ['salads'], name: 'Боул лосось', desc: 'Рис, лосось, авокадо, огурец', price: 500, weight: '330 гр', tag: null },
  { id: 105, cats: ['salads', 'new'], name: 'Боул угорь', desc: 'Рис, угорь, авокадо, огурец', price: 500, weight: '330 гр', tag: 'new', image: '/catalog_part9/dish-000.png' },
  { id: 106, cats: ['salads', 'new'], name: 'Цезарь с креветкой', desc: 'Креветки, айсберг, пармезан, соус цезарь', price: 500, weight: '250 гр', tag: 'new', image: '/catalog_part9/dish-001.png' },
  { id: 107, cats: ['salads'], name: 'Цезарь с курицей', desc: 'Курица, айсберг, пармезан, соус цезарь', price: 340, weight: '250 гр', tag: null , image: '/dish_photos_v2/цезарь_с_курицей.jpg' },

  // === ФРИТЮР ===
  { id: 108, cats: ['fry', 'hit'], name: 'Нагетсы', desc: 'Куриные нагетсы, хрустящая панировка', price: 220, weight: '7 шт', tag: 'hit', image: '/catalog_part2/dish_003.jpg' },
  { id: 109, cats: ['fry', 'hit'], name: 'Картофель фри', desc: 'Классический фри', price: 240, weight: '160 гр', tag: 'hit', image: '/catalog_part8/dish-000.png' },
  { id: 110, cats: ['fry'], name: 'Сырные палочки', desc: 'Моцарелла в панировке', price: 270, weight: '5 шт', tag: 'hit', image: '/catalog_part8/dish-001.png' },
  { id: 111, cats: ['fry'], name: 'Тори темпура', desc: 'Курица в темпурном кляре', price: 270, weight: '160 гр', tag: null },
  { id: 112, cats: ['fry'], name: 'Луковые кольца', desc: 'Луковые кольца в панировке', price: 190, weight: '170 гр', tag: null, image: '/catalog_part2/dish_009.jpg' },
  { id: 113, cats: ['fry'], name: 'Куриные крылышки', desc: 'Крылышки в соусе', price: 400, weight: '5 шт', tag: null, image: '/catalog_part8/dish-003.png' },
  { id: 114, cats: ['fry', 'new'], name: 'Креветка в панировке', desc: 'Креветки в хрустящей панировке', price: 500, weight: '7 шт', tag: 'new' },
  { id: 115, cats: ['fry', 'new'], name: 'Картофельные дольки', desc: 'Запечённые дольки с приправой', price: 290, weight: '160 гр', tag: 'new' },
  { id: 116, cats: ['fry'], name: 'Картофель фри от шефа', desc: 'Фри с авторской приправой', price: 370, weight: '280 гр', tag: null, image: '/catalog_part8/dish-002.png' },

  // === ШАУРМА ===
  { id: 117, cats: ['shawarma', 'hit'], name: 'Шаурма от шефа', desc: 'Авторский рецепт — максимум начинки', price: 410, weight: '550 гр', tag: 'hit', image: '/catalog/dish_004.jpg' },
  { id: 118, cats: ['shawarma', 'hit'], name: 'Шаурма классическая', desc: 'Курица, морковь по-корейски, соленый огурец, фирменный соус', price: 310, weight: '370 гр', tag: 'hit', image: '/catalog/dish_006.jpg' },
  { id: 119, cats: ['shawarma', 'hot'], name: 'Шаурма мексиканская', desc: 'Соус шрирача, кукуруза', price: 370, weight: '370 гр', tag: 'hot' },
  { id: 120, cats: ['shawarma'], name: 'Шаурма со свининой', desc: 'Свинина, маринованные овощи, чесночный соус', price: 420, weight: '400 гр', tag: null },

  // === БУРГЕРЫ ===
  { id: 122, cats: ['burgers', 'hit'], name: 'Бургер от шефа', desc: 'Котлета, карамелизованный лук, спецсоус', price: 370, weight: null, tag: 'hit' , image: '/dish_photos_v2/бургер_от_шефа.jpg' },
  { id: 123, cats: ['burgers'], name: 'Бургер с курицей', desc: 'Куриная котлета, салат', price: 370, weight: null, tag: null , image: '/dish_photos_v2/бургер_с_курицей.jpg' },
  { id: 124, cats: ['burgers', 'new'], name: 'Бургер с яйцом', desc: 'Котлета, яйцо, сыр, салат', price: 370, weight: null, tag: 'new' },
  { id: 125, cats: ['burgers'], name: 'Бургер люкс с телятиной', desc: 'Телятина', price: 670, weight: null, tag: null },
  { id: 126, cats: ['burgers'], name: 'Чизбургер', desc: 'Котлета, чеддер, маринованный огурчик', price: 320, weight: null, tag: null },
  { id: 127, cats: ['burgers'], name: 'Чикен бургер', desc: 'Котлета куринная, соус барбекю', price: 270, weight: null, tag: null },
  { id: 128, cats: ['burgers'], name: 'Бургер с лососем', desc: 'Лосось, сливочный сыр, огурец', price: 670, weight: null, tag: null, image: '/catalog_part2/dish_010.jpg' },

  // === ХОТ-ДОГ ===
  { id: 129, cats: ['hotdog'], name: 'Френч-дог', desc: 'Сосиска в хрустящей булочке', price: 260, weight: null, tag: null },
  { id: 130, cats: ['hotdog'], name: 'Хот-дог в лаваше', desc: 'Сосиска, огурец, горчица', price: 310, weight: null, tag: null },
  { id: 131, cats: ['hotdog'], name: 'Американский', desc: 'Кетчуп, горчица, маринованный огурец', price: 310, weight: null, tag: null
},

  // === ДОБАВКИ ===
  { id: 132, cats: ['extras'], name: 'Помидор', desc: 'Добавка к пицце', price: 50, weight: null, tag: null },
  { id: 133, cats: ['extras'], name: 'Сыр', desc: 'Добавка к пицце', price: 50, weight: null, tag: null },
  { id: 134, cats: ['extras', 'hot'], name: 'Перец халапеньо', desc: 'Добавка к пицце', price: 50, weight: null, tag: 'hot' },
  { id: 135, cats: ['extras'], name: 'Грибы', desc: 'Добавка к пицце', price: 50, weight: null, tag: null },
  { id: 136, cats: ['extras'], name: 'Соус шрирача', desc: 'Острый соус', price: 50, weight: null, tag: null },
  { id: 137, cats: ['extras'], name: 'Соевый соус', desc: 'Классический соевый', price: 50, weight: null, tag: null },
  { id: 138, cats: ['extras'], name: 'Имбирь', desc: 'Маринованный имбирь', price: 50, weight: null, tag: null },
  { id: 139, cats: ['extras'], name: 'Васаби', desc: 'Японский хрен', price: 50, weight: null, tag: null },
  { id: 140, cats: ['extras'], name: 'Соус спайс', desc: 'Острый спайс соус', price: 50, weight: null, tag: null },
  { id: 141, cats: ['extras'], name: 'Соус унаги', desc: 'Соус унаги', price: 50, weight: null, tag: null },
  { id: 142, cats: ['extras'], name: 'Соус манго', desc: 'Сладкий манго соус', price: 50, weight: null, tag: null },
  { id: 143, cats: ['extras', 'new'], name: 'Сырный бортик', desc: 'Сырный край для пиццы', price: 150, weight: null, tag: 'new' },
  { id: 144, cats: ['extras', 'new'], name: 'Колбасный бортик', desc: 'Колбасный край для пиццы', price: 150, weight: null, tag: 'new' },
];

export const DELIVERY_ZONES = [
  { id: 'ilich', name: 'Ильичёвский район', freeFrom: 1500, price: 500, isSelf: false, isHere: false },
  { id: 'cherry', name: 'Черёмушки', freeFrom: 2000, price: 250, isSelf: false, isHere: false },
  { id: 'center', name: 'Центр города', freeFrom: 1500, price: 250, isSelf: false, isHere: false },
  { id: 'mirny', name: 'пос. Мирный', freeFrom: 1500, price: 500, isSelf: false, isHere: false },
  { id: 'self', name: 'Самовывоз', freeFrom: 0, price: 0, isSelf: true, isHere: false },
];

export const UPSELL_ITEMS: MenuItem[] = [
  { id: 201, cats: ['extras'], name: 'Соус сырный', desc: 'Горячий сырный соус, 50 мл', price: 50, weight: '50 мл', tag: null },
  { id: 202, cats: ['extras'], name: 'Соус чесночный', desc: 'Фирменный чесночный соус, 50 мл', price: 50, weight: '50 мл', tag: null },
  { id: 203, cats: ['extras'], name: 'Соус BBQ', desc: 'Копчёный барбекю соус, 50 мл', price: 50, weight: '50 мл', tag: null },
];

export const REVIEWS = [
  {
    name: 'Анна К.',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    text: 'Заказываем уже третий раз. Роллы всегда свежие, доставка быстрая. Особенно любим Филадельфию с лососем — просто тает во рту!',
    date: '2 дня назад',
  },
  {
    name: 'Дмитрий П.',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    text: 'Отличная шаурма! Начинки много, мясо сочное. Доставили за 35 минут, ещё горячая была. Рекомендую!',
    date: '1 неделю назад',
  },
  {
    name: 'Максим С.',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    text: 'Пицца Цезарь — огонь! Тонкое тесто, много начинки. Запечённые роллы тоже на высоте. Теперь только к вам!',
    date: '2 недели назад',
  },
];