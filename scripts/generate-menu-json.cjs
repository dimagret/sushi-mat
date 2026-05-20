// Генерация menu-data.json для админки
// Запуск: node scripts/generate-menu-json.js

const fs = require('fs');
const path = require('path');

// Читаем menu.ts
const menuPath = path.join(__dirname, '../src/data/menu.ts');
const menuContent = fs.readFileSync(menuPath, 'utf8');

// Парсим menu items
const items = [];
const regex = /\{ id: (\d+), cats: \[([^\]]+)\], name: '([^']+)'/g;
let match;

while ((match = regex.exec(menuContent)) !== null) {
  const id = parseInt(match[1]);
  const cats = match[2].split(',').map(c => c.trim().replace(/'/g, ''));
  const name = match[3];
  
  // Ищем фото
  const blockStart = match.index;
  const blockEnd = menuContent.indexOf('},', blockStart) + 2;
  const block = menuContent.slice(blockStart, blockEnd);
  
  const imageMatch = block.match(/image: '([^']+)'/);
  const image = imageMatch ? imageMatch[1] : null;
  
  // Ищем цену
  const priceMatch = block.match(/price: (\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;
  
  items.push({ id, name, cats, image, price });
}

// Сохраняем JSON
const outputPath = path.join(__dirname, '../public/admin/menu-data.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));

console.log(`✅ Сгенерировано: ${items.length} блюд`);
console.log(`📍 С фото: ${items.filter(i => i.image).length}`);
console.log(`📍 Без фото: ${items.filter(i => !i.image).length}`);
console.log(`💾 Сохранено: ${outputPath}`);
