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
  // 'hot' removed — острые роллы вошли в основные категории
  { id: 'shawarma', label: 'Шаурма' },
  { id: 'burgers', label: 'Бургеры' },
  { id: 'rolls', label: 'Роллы' },
  { id: 'philly', label: 'Филадельфия' },
  { id: 'california', label: 'Калифорния' },
  { id: 'dragons', label: 'Драконы' },
  { id: 'maki', label: 'Маки роллы' },
  { id: 'street', label: 'Стрит-роллы' },
  { id: 'baked', label: 'Запечённые роллы' },
  { id: 'fried', label: 'Жареные роллы' },
  { id: 'sets', label: 'Сеты' },
  { id: 'pizza', label: 'Пицца' },
  { id: 'noodles', label: 'Лапша и WOK' },
  { id: 'tyahan', label: 'Тяхан' },
  { id: 'soups', label: 'Супы' },
  { id: 'salads', label: 'Салаты' },
  { id: 'fry', label: 'Фритюр' },
  { id: 'shevchiki', label: 'Шевчики' },
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
  { id: 8, cats: ['rolls'], name: 'Сан Райз', desc: 'Рис, нори, сыр, тунец, огурец, тобико чёрная, шапка', price: 470, weight: '330 гр', tag: null, image: '/catalog_dish_2026/dish_010.png' },
  { id: 41, cats: ['rolls'], name: 'Мидори', desc: 'Рис, нори, сыр, краб, перец, салат, огурец, масаго красная, майонез', price: 400, weight: '250 гр', tag: null, image: '/catalog_v10/dish_004.png' },
  { id: 51, cats: ['baked'], name: 'Сага', desc: 'Рис, нори, угорь, тунец, кунжут белый, унаги соус, шапка', price: 610, weight: '340 гр', image: '/catalog_part4/dish_002.jpeg', tag: null },
];

export const MENU: MenuItem[] = [
  // === РОЛЛЫ ===
  { id: 1, cats: ['rolls'], name: 'Динамит', desc: 'Рис, нори, сыр, авокадо, кусочки манго, белый кунжут, шапочка, соус манго, чили', price: 570, weight: '320 гр', tag: null, image: '/catalog_part2/dish_006.jpg' },
  { id: 2, cats: ['rolls'], name: 'Аляска', desc: 'Рис, нори, сыр, тунец, манго, масаго красная, манго соус', price: 470, weight: '230 гр', tag: null, image: '/catalog/dish_002.jpg' },
  { id: 3, cats: ['rolls'], name: 'Анаго', desc: 'Рис, нори, сыр, тунец, лосось, айсберг, тобико чёрная, унаги соус', price: 490, weight: '230 гр', tag: null, image: '/catalog_part10/dish-000.png' },
  { id: 5, cats: ['rolls'], name: 'Маями', desc: 'Рис, нори, сыр, угорь, краб, огурец, масаго зелёная, унаги соус', price: 500, weight: '280 гр', tag: null, image: '/catalog/dish_011.jpg' },
  { id: 6, cats: ['rolls'], name: 'Кайри', desc: 'Рис, нори, сыр, тунец, креветка, масаго зелёная, чеддер', price: 470, weight: '230 гр', tag: 'hit', image: '/catalog/dish_016.jpg' },
  { id: 7, cats: ['rolls'], name: 'Вулкан (острый ролл)', desc: 'Рис, нори, сыр, тунец, масаго зелёная, спайси соус, лук зелёный', price: 520, weight: '220 гр', tag: 'hot', image: '/catalog_part10/dish-001.png' },
  { id: 11, cats: ['rolls'], name: 'Сырный ролл', desc: 'Рис, нори, сыр филадельфия, огурец, лосось, чеддер, спайс', price: 450, weight: '250 гр', tag: null, image: '/catalog/dish_007.jpg' },
  { id: 13, cats: ['rolls'], name: 'Сайтама', desc: 'Рис, нори, сыр, лосось с/с, огурец, кунжут', price: 520, weight: '230 гр', tag: null, image: '/catalog/dish_009.jpg' },

  // === МАКИ РОЛЛЫ ===
  { id: 16, cats: ['maki'], name: 'Маки с авокадо', desc: 'Рис, нори, авокадо', price: 250, weight: '115 гр', tag: null, image: '/catalog_v10/dish_002.png' },
  { id: 17, cats: ['maki'], name: 'Маки с лососем', desc: 'Рис, нори, лосось', price: 260, weight: '115 гр', tag: null, image: '/catalog_v10/dish_001.png' },
  { id: 20, cats: ['maki'], name: 'Маки с огурцом', desc: 'Рис, нори, огурец', price: 200, weight: null, tag: null, image: '/catalog_v10/dish_009.png' },

  // === СТРИТ-РОЛЛЫ ===
  { id: 25, cats: ['philly'], name: 'Филадельфия с тунцом', desc: 'Рис, нори, тунец, сыр, огурец, авокадо', price: 570, weight: '280 гр', tag: null, image: '/dish_photos_v2/филадельфия_тунец.jpg' },
  { id: 26, cats: ['philly'], name: 'Филадельфия креветка', desc: 'Рис, нори, креветка, сыр, огурец, авокадо', price: 570, weight: '280 гр', tag: null , image: '/dish_photos_v2/филадельфия_креветка.jpg' },
  { id: 27, cats: ['philly'], name: 'Филадельфия угорь', desc: 'Рис, нори, угорь, сыр, огурец, авокадо', price: 650, weight: '280 гр', tag: null , image: '/dish_photos_v2/филадельфия_угорь.jpg' },
  { id: 28, cats: ['philly', 'hit'], name: 'Филадельфия лосось', desc: 'Рис, нори, лосось, сыр, огурец, авокадо', price: 650, weight: '280 гр', tag: 'hit' , image: '/dish_photos_v2/филадельфия_лосось.jpg' },
  { id: 30, cats: ['philly'], name: 'Филадельфия лайт', desc: 'Рис, нори, лосось, сыр, огурец, соус манго', price: 570, weight: '265 гр', tag: null, image: '/catalog/dish_008.jpg' },

  // === КАЛИФОРНИЯ ===
  { id: 31, cats: ['california'], name: 'Калифорния эби', desc: 'Рис, нори, сыр, огурец, креветка, тобико', price: 450, weight: '240 гр', tag: null, image: '/catalog/dish_014.jpg' },
  { id: 33, cats: ['california'], name: 'Калифорния с лососем', desc: 'Рис, нори, авокадо, огурец, лосось, тобико', price: 520, weight: '230 гр', tag: null, image: '/catalog/dish_013.jpg' },

  // === ДРАКОНЫ ===
  { id: 34, cats: ['dragons'], name: 'Чёрный дракон', desc: 'Рис, нори, чёрная тобико, красная тобико, соус унаги, сыр филадельфия, креветка тигровая, томаго', price: 620, weight: '260 гр', tag: null , image: '/dish_photos_v2/чёрный_дракон.jpg' },
  { id: 35, cats: ['dragons', 'hit'], name: 'Золотой дракон', desc: 'Рис, нори, лосось, краб, огурец, сыр, тобико, майонез', price: 670, weight: '290 гр', tag: 'hit' , image: '/dish_photos_v2/золотой_дракон.jpg' },
  { id: 36, cats: ['dragons'], name: 'Красный дракон', desc: 'Рис, нори, тунец, угорь, салат, сыр, тобико, спайс соус', price: 620, weight: '290 гр', tag: 'hot' , image: '/dish_photos_v2/краснный_дракон.jpg' },
  { id: 37, cats: ['dragons'], name: 'Зелёный дракон', desc: 'Рис, нори, краб, креветка, тобико, авокадо, сыр, унаги соус', price: 670, weight: '290 гр', tag: null , image: '/dish_photos_v2/зелённый_дракон.jpg' },
  { id: 39, cats: ['rolls'], name: 'Окаяма', desc: 'Рис, нори, сыр, авокадо, лосось, угорь, унаги соус', price: 620, weight: '260 гр', tag: null, image: '/catalog_part2/dish_004.jpg' },
  { id: 40, cats: ['rolls', 'hit'], name: 'Микс ролл', desc: 'Рис, нори, креветка, авокадо, лосось, тунец, сыр, унаги соус', price: 650, weight: '300 гр', tag: 'hit', image: '/catalog_part2/dish_007.jpg' },
  // === СТРИТ-РОЛЛЫ ===
  { id: 204, cats: ['street'], name: 'Стрит ролл с лососем', desc: 'Рис, нори, огурец, сыр, лосось слабосолёный, тобика, спайс-соус', price: 440, weight: '250 гр', tag: 'new', image: '/catalog_part3/dish_001.jpg' },
  { id: 42, cats: ['baked', 'hit'], name: 'Запечённый лосось', desc: 'Рис, нори, лосось с/с, авокадо, кунжут, шапка, унаги', price: 670, weight: '300 гр', tag: 'hit', image: '/catalog/dish_015.jpg' },
  { id: 43, cats: ['baked'], name: 'С крабом и креветкой', desc: 'Рис, нори, краб, креветка, перец болгарский, шапка, масаго', price: 570, weight: '300 гр', tag: null, image: '/catalog/с_крабом_и_креветкой_43.jpg' },
  { id: 44, cats: ['baked'], name: 'Запечённый Бона', desc: 'Рис, нори, томаго, авокадо, креветка, сыр, шапка, унаги, кунжут', price: 550, weight: '300 гр', image: '/catalog_part4/dish_003.jpeg', tag: null },
  { id: 45, cats: ['baked'], name: 'Запечённый креветка', desc: 'Рис, нори, сыр, креветка, авокадо, спайс, масаго, шапка', price: 570, weight: '280 гр', image: '/catalog_part4/dish_001.jpeg', tag: null },
  { id: 47, cats: ['baked'], name: 'Запечённый три рыбы', desc: 'Рис, нори, угорь, лосось, креветка, шапка, соус устричный, унаги', price: 690, weight: '260 гр', image: '/catalog_part2/dish_017.jpg', tag: null },
  { id: 48, cats: ['baked'], name: 'Запечённый Фила', desc: 'Рис, нори, сыр, огурец, авокадо, лосось, унаги', price: 650, weight: '310 гр', tag: null, image: '/catalog_part10/dish-002.png' },
  { id: 49, cats: ['baked'], name: 'Тунец + лосось', desc: 'Рис, нори, тунец, лосось с/с, масаго красная, шапка', price: 690, weight: '280 гр', tag: 'new', image: '/catalog/тунец_лосось_49.jpg' },
  { id: 52, cats: ['rolls'], name: 'Сендай', desc: 'Сыр, креветка, авокадо, лосось, спайс соус', price: 700, weight: '320 гр', image: '/catalog_part4/dish_004.jpeg', tag: null },


  // === ЖАРЕНЫЕ РОЛЛЫ ===
  { id: 54, cats: ['fried'], name: 'Эби фрай', desc: 'Рис, нори, сыр филадельфия, моцарелла, креветка тигровая, тобико, огурец', price: 470, weight: '340 гр', tag: null, image: '/catalog_part2/dish_008.jpg' },
  { id: 56, cats: ['fried'], name: 'Хот-фиш', desc: 'Рис, нори, лосось, угорь, сыр, помидор, соус унаги', price: 570, weight: '320 гр', tag: null, image: '/catalog/хотфиш_56.png' },
  { id: 57, cats: ['fried'], name: 'Жареный ролл лосось + краб', desc: 'Рис, нори, лосось, краб, тобико, салат, огурец', price: 500, weight: '320 гр', tag: null, image: '/catalog/dish_017.jpg' },

  // === ЗАПЕЧЁННЫЕ МИДИИ ===
  { id: 59, cats: ['sets', 'hit'], name: 'Сет №1', desc: 'Филадельфия лайт, Кайри, Сендай, Калифорния лосось', price: 2200, weight: '1100 гр', tag: 'hit' , image: '/dish_photos_v2/сет_1.jpg' },
  { id: 61, cats: ['sets', 'hit'], name: 'Сет №3', desc: 'Филадельфия лосось, Филадельфия угорь, Филадельфия креветка, Филадельфия тунец', price: 2350, weight: '1100 гр', tag: 'hit' , image: '/dish_photos_v2/сет_3.jpg' },
  { id: 64, cats: ['sets', 'new'], name: 'Сет №6', desc: 'Динамит, Санрайз, Анаго, Кайри', price: 1900, weight: '1100 гр', tag: 'new' , image: '/dish_photos_v2/сет_6.jpg' },
  { id: 65, cats: ['sets'], name: 'Сет XXL', desc: 'Аляска, Анаго, Маями, Вулкан, Крейзи, Сенсей, Сайтама, Банзай', price: 3900, weight: '2100 гр', tag: null , image: '/dish_photos_v2/сет_xxl.jpg' },
  { id: 66, cats: ['sets', 'new'], name: 'Сет микс', desc: 'Филадельфия люкс, Микс ролл, Запечённая Филадельфия, Запечённый три рыбы', price: 2500, weight: '1150 гр', tag: 'new', image: '/catalog_part2/dish_001.jpg' },
  { id: 63, cats: ['sets'], name: 'Сет №5', desc: 'Окинава, Мидори, Калифорния эби, Анаго', price: 1550, weight: '1000 гр', tag: null, image: '/catalog_dish_2026/dish_009.png' },
  { id: 68, cats: ['sets'], name: 'Маки сет', desc: 'Маки ролл: с лососем, с тунцом, с креветкой, с угрём, с крабом, с авокадо', price: 1300, weight: '730 гр', tag: null, image: '/catalog_part10/dish-004.png' },
  { id: 69, cats: ['sets'], name: 'Сет дракон', desc: 'Золотой дракон, Красный дракон, Чёрный дракон, Зелёный дракон', price: 2500, weight: '1130 гр', tag: null , image: '/dish_photos_v2/сет_драон.jpg' },

  // === ПИЦЦА ===
  // Пиццы с размерами 30/50 см + бортики
  { id: 70, cats: ['pizza', 'hit'], name: 'По-шефски', desc: 'Курица гриль, телятина, бекон, ветчина, лук марин., томаты, огурец марин., моцарелла, соус красный', price: 700, weight: '30 см / 50 см', image: '/catalog_part4/dish_006.jpeg', tag: 'new', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 71, cats: ['pizza'], name: 'По-домашнему', desc: 'Рубленое мясо, сыр, лук марин., томаты, соус чесночный, соус красный', price: 550, weight: '30 см / 50 см', image: '/catalog_part4/dish_005.jpeg', tag: null, options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 72, cats: ['pizza', 'hit'], name: 'Цезарь', desc: 'Курица, бекон, моцарелла, томаты, айсберг, пармезан, белый соус', price: 650, weight: '30 см / 50 см', tag: 'hit', image: '/catalog_dish_2026/dish_001.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 73, cats: ['pizza'], name: 'Фермерская', desc: 'Курица, сыр, грибы, огурец марин., лук, соус красный', price: 550, weight: '30 см / 50 см', tag: null, image: '/catalog_part2/dish_013.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 350 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 75, cats: ['pizza'], name: 'Гавайская', desc: 'Моцарелла, филе куриное, кукуруза, ананас, соус красный', price: 600, weight: '30 см / 50 см', tag: null, image: '/catalog/dish_001.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 350 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 77, cats: ['pizza'], name: 'С морепродуктами', desc: 'Креветки тигровые, лосось, мидии, оливки, пармезан, тобика, соус белый', price: 800, weight: '30 см / 50 см', tag: null, image: '/catalog_dish_2026/dish_004.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 700 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 78, cats: ['pizza'], name: '4 сыра', desc: 'Пармезан, моцарелла, филадельфия, чеддер, белый соус', price: 700, weight: '30 см / 50 см', tag: null, options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 400 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] , image: '/dish_photos_v2/пицца_4_сыра.jpg' },
  { id: 79, cats: ['pizza'], name: 'С телятиной', desc: 'Телятина, моцарелла, томаты, лук, соус белый', price: 550, weight: '30 см / 50 см', tag: null, image: '/catalog/dish_012.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 81, cats: ['pizza', 'new'], name: 'Карбонара', desc: 'Моцарелла, бекон, шампиньоны, яйцо перепелиное, соус белый', price: 650, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part2/dish_012.jpg', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 82, cats: ['pizza', 'hit'], name: 'Пепперони', desc: 'Моцарелла, колбаса пепперони, лук фри, соус красный', price: 600, weight: '30 см / 50 см', tag: 'hit', image: '/catalog_dish_2026/dish_002.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 450 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 83, cats: ['pizza'], name: 'Жюльен', desc: 'Моцарелла, белый соус, шампиньоны, лук репчатый, куриное филе, пармезан', price: 700, weight: '30 см / 50 см', tag: null, image: '/catalog_dish_2026/dish_005.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 500 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 208, cats: ['pizza', 'new'], name: 'Половинки', desc: 'Белый соус: моцарелла, пепперони, лук кранч, филадельфия, пармезан, чеддер | Красный соус: моцарелла, пепперони, лук кранч, филадельфия, пармезан, чеддер', price: 700, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part7/dish-002.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 500 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  { id: 209, cats: ['pizza', 'new'], name: '4 сезона', desc: 'Моцарелла, грибы | курица, лук, пармезан | бекон, черри, айсберг | охотничьи колбаски, болгарский перец, халапеньо, колбаса милана, ветчина, зелёный лук', price: 750, weight: '30 см / 50 см', tag: 'new', image: '/catalog_part7/dish-000.png', options: [{ name: 'Размер', choices: [{ label: '30 см', priceDelta: 0 }, { label: '50 см', priceDelta: 550 }] }, { name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },
  // Пиццы только 30 см + бортики
  { id: 76, cats: ['pizza', 'new'], name: 'Бьянка', desc: 'Моцарелла, филе куриное, кукуруза, соус красный, шампиньоны, красный лук', price: 550, weight: '30 см', tag: 'new', options: [{ name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] , image: '/dish_photos_v2/пицца_бьянка.jpg' },
  { id: 84, cats: ['pizza', 'new'], name: 'Милана', desc: 'Моцарелла, красный соус, колбаса милана, ветчина, помидор, зелёный лук', price: 550, weight: '30 см', tag: 'new', image: '/catalog_part2/dish_015.jpg', options: [{ name: 'Бортик', choices: [{ label: 'Обычный бортик', priceDelta: 0 }, { label: 'Сырный бортик', priceDelta: 150 }, { label: 'Колбасный бортик', priceDelta: 150 }] }] },

  // === ШЕВЧИКИ ===
  { id: 85, cats: ['shevchiki', 'new'], name: 'Краб + креветка', desc: 'Нори, рис, сыр, краб, креветка, масаго, унаги', price: 490, weight: '250 гр', tag: 'new', image: '/catalog_temp/dish_001.png' },
  { id: 86, cats: ['shevchiki', 'new'], name: 'Угорь + тунец', desc: 'Нори, рис, сыр, угорь, тунец, тобико', price: 520, weight: '250 гр', tag: 'new', image: '/catalog_temp/dish_002.png' },
  { id: 87, cats: ['noodles'], name: 'Лапша с телятиной', desc: 'Лапша, телятина, шампиньоны, соус', price: 450, weight: '310 гр', tag: null, image: '/catalog_part3/dish_004.jpg' },
  { id: 88, cats: ['noodles', 'hit'], name: 'Лапша с курицей', desc: 'Лапша, куриное филе, овощи, спецсоус', price: 370, weight: '320 гр', tag: 'hit' , image: '/dish_photos_v2/лапка_с_курицей.jpg' },
  { id: 90, cats: ['noodles'], name: 'Лапша карбонара', desc: 'Лапша, бекон, пармезан, сливочный соус', price: 340, weight: '400 гр', tag: null , image: '/dish_photos_v2/лапша_карбонара.jpg' },
  { id: 91, cats: ['noodles'], name: 'Фунчоза с курицей', desc: 'Стеклянная лапша, курица, овощи', price: 370, weight: '300 гр', tag: null, image: '/catalog_part3/dish_005.jpg' },
  { id: 92, cats: ['noodles'], name: 'Фунчоза с морепродуктами', desc: 'Стеклянная лапша, креветка, мидии, кальмар, овощи', price: 500, weight: '330 гр', tag: null, image: '/catalog_part3/dish_003.jpg' },

  // === ТЯХАН ===
  { id: 93, cats: ['tyahan'], name: 'Тяхан с курицей', desc: 'Рис, курица, яйцо, овощи', price: 350, weight: '350 гр', tag: null , image: '/dish_photos_v2/тяхан_с_курицей.jpg' },
  { id: 97, cats: ['soups', 'hit'], name: 'Суп куриный с лапшой', desc: 'Бульон, курица, лапша, зелень', price: 250, weight: '370 гр', tag: 'hit', image: '/catalog_part3/dish_002.jpg' },
  { id: 100, cats: ['soups'], name: 'Солянка', desc: 'Мясная солянка', price: 400, weight: '350 гр', tag: null , image: '/dish_photos_v2/солянка.jpg' },

  // === САЛАТЫ ===
  { id: 101, cats: ['salads'], name: 'Греческий', desc: 'Свежие овощи, маслины, фета', price: 320, weight: '310 гр', tag: null, image: '/catalog_part9/dish-002.png' },
  { id: 105, cats: ['salads', 'new'], name: 'Боул угорь', desc: 'Рис, угорь, авокадо, огурец', price: 500, weight: '330 гр', tag: 'new', image: '/catalog_part9/dish-000.png' },
  { id: 106, cats: ['salads', 'new'], name: 'Цезарь с креветкой', desc: 'Креветки, айсберг, пармезан, соус цезарь', price: 500, weight: '250 гр', tag: 'new', image: '/catalog_part9/dish-001.png' },
  { id: 107, cats: ['salads'], name: 'Цезарь с курицей', desc: 'Курица, айсберг, пармезан, соус цезарь', price: 340, weight: '250 гр', tag: null , image: '/dish_photos_v2/цезарь_с_курицей.jpg' },

  // === ФРИТЮР ===
  { id: 108, cats: ['fry', 'hit'], name: 'Нагетсы', desc: 'Куриные нагетсы, хрустящая панировка', price: 220, weight: '7 шт', tag: 'hit', image: '/catalog_part2/dish_003.jpg' },
  { id: 109, cats: ['fry', 'hit'], name: 'Картофель фри', desc: 'Классический фри', price: 240, weight: '160 гр', tag: 'hit', image: '/catalog_part8/dish-000.png' },
  { id: 110, cats: ['fry'], name: 'Сырные палочки', desc: 'Моцарелла в панировке', price: 270, weight: '5 шт', tag: 'hit', image: '/catalog_part8/dish-001.png' },
  { id: 112, cats: ['fry'], name: 'Луковые кольца', desc: 'Луковые кольца в панировке', price: 190, weight: '170 гр', tag: null, image: '/catalog_part2/dish_009.jpg' },
  { id: 113, cats: ['fry'], name: 'Куриные крылышки', desc: 'Крылышки в соусе', price: 400, weight: '5 шт', tag: null, image: '/catalog_part8/dish-003.png' },
  { id: 116, cats: ['fry'], name: 'Картофель фри от шефа', desc: 'Фри с авторской приправой', price: 370, weight: '280 гр', tag: null, image: '/catalog_part8/dish-002.png' },

  // === ШАУРМА ===
  { id: 117, cats: ['shawarma', 'hit'], name: 'Шаурма от шефа', desc: 'Авторский рецепт — максимум начинки', price: 410, weight: '550 гр', tag: 'hit', image: '/catalog/dish_004.jpg' },
  { id: 118, cats: ['shawarma', 'hit'], name: 'Шаурма классическая', desc: 'Курица, морковь по-корейски, соленый огурец, фирменный соус', price: 310, weight: '370 гр', tag: 'hit', image: '/catalog/dish_006.jpg' },
  { id: 122, cats: ['burgers', 'hit'], name: 'Бургер от шефа', desc: 'Котлета, карамелизованный лук, спецсоус', price: 370, weight: null, tag: 'hit' , image: '/dish_photos_v2/бургер_от_шефа.jpg' },
  { id: 123, cats: ['burgers'], name: 'Бургер с курицей', desc: 'Куриная котлета, салат', price: 370, weight: null, tag: null , image: '/dish_photos_v2/бургер_с_курицей.jpg' },
  { id: 128, cats: ['burgers'], name: 'Бургер с лососем', desc: 'Лосось, сливочный сыр, огурец', price: 670, weight: null, tag: null, image: '/catalog_part2/dish_010.jpg' },

  // === ХОТ-ДОГ ===
];

export const DELIVERY_ZONES = [
  { id: 'ilich', name: 'Ильичёвский район', freeFrom: 1500, price: 250, isSelf: false, isHere: false },
  { id: 'cherry', name: 'Черёмушки', freeFrom: 2000, price: 250, isSelf: false, isHere: false },
  { id: 'center', name: 'Центр города', freeFrom: 1500, price: 250, isSelf: false, isHere: false },
  { id: 'mirny', name: 'пос. Мирный', freeFrom: 3000, price: 250, isSelf: false, isHere: false },
  { id: 'rayon20', name: '20 Райн', freeFrom: 1200, price: 250, isSelf: false, isHere: false },
  { id: 'rayon17', name: '17 район', freeFrom: 1200, price: 250, isSelf: false, isHere: false },
  { id: 'rayon23', name: '23 район', freeFrom: 1200, price: 250, isSelf: false, isHere: false },
  { id: 'self', name: 'Самовывоз', freeFrom: 0, price: 0, isSelf: true, isHere: false },
];

export const UPSELL_ITEMS: MenuItem[] = [
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