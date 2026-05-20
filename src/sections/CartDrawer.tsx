import { useState } from 'react';
import { Plus, Minus, Trash2, Truck, MapPin, Tag, Gift, Phone, User, MessageSquare, Clock, CheckCircle, ShoppingCart, Send, Loader2 } from 'lucide-react';
import { FMT, DELIVERY_ZONES, UPSELL_ITEMS } from '@/data/menu';
import { calcItemPrice, type CartItem } from '@/hooks/useCart';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  count: number;
  onUpdateQty: (id: number, delta: number, selectedOptions?: number[]) => void;
  onRemove: (id: number, selectedOptions?: number[]) => void;
  onClear: () => void;
  onAddItem: (item: CartItem['item'], qty?: number, selectedOptions?: number[]) => void;
}

export default function CartDrawer({
  open,
  onClose,
  cart,
  total,
  onUpdateQty,
  onRemove,
  onClear,
  onAddItem,
}: CartDrawerProps) {
  const [zoneId, setZoneId] = useState('ilich');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', address: '', comment: '', time: 'Как можно скорее' });
  const [consent, setConsent] = useState(true);
  const [orderSent, setOrderSent] = useState(false);

  const zone = DELIVERY_ZONES.find((z) => z.id === zoneId) || DELIVERY_ZONES[0];
  const deliveryPrice = total >= zone.freeFrom ? 0 : zone.price;
  const promoDiscount = promoApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total + deliveryPrice - promoDiscount;
  const minOrder = 500;

  const applyPromo = () => {
    const savedPromo = localStorage.getItem('sushi-bday-promo');
    if (savedPromo && promo.trim().toUpperCase() === savedPromo) {
      setPromoApplied(true);
    }
  };

  const sendOrder = async () => {
    if (!form.name || !form.phone) return;
    setOrderSent(true);

    // Build order number
    const orderNumber = Math.floor(Math.random() * 9000 + 1000);

    // Always try Telegram silently (internal only)
    try {
      const tgSettingsRaw = localStorage.getItem('telegram_settings');
      if (tgSettingsRaw) {
        const tgSettings = JSON.parse(tgSettingsRaw);
        if (tgSettings.botToken && tgSettings.chatId) {
          const itemsText = cart.map((ci) => `  • ${ci.item.name} x${ci.quantity} = ${FMT(calcItemPrice(ci.item, ci.selectedOptions) * ci.quantity)}`).join('\n');
          const message = `🍣 <b>Новый заказ Суши Мать #${orderNumber}!</b>\n\n` +
            `👤 <b>Имя:</b> ${form.name}\n` +
            `📱 <b>Телефон:</b> ${form.phone}\n` +
            `📍 <b>Адрес:</b> ${form.address || 'Самовывоз'}\n` +
            `🕐 <b>Время:</b> ${form.time}\n` +
            (form.comment ? `💬 <b>Комментарий:</b> ${form.comment}\n` : '') +
            `\n📋 <b>Заказ:</b>\n${itemsText}\n\n` +
            (promoApplied ? `🎁 <b>Промокод:</b> −${FMT(promoDiscount)}\n` : '') +
            `🚚 <b>Доставка:</b> ${deliveryPrice === 0 ? 'Бесплатно' : FMT(deliveryPrice)}\n` +
            `💰 <b>Итого:</b> <b>${FMT(finalTotal)}</b>`;

          await fetch('https://api.telegram.org/bot' + tgSettings.botToken + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: tgSettings.chatId, text: message, parse_mode: 'HTML' }),
          });
        }
      }
    } catch {
      // Silently fail — order still accepted, Telegram is optional
    }

    // Always try MAX silently (internal only)
    try {
      const maxSettingsRaw = localStorage.getItem('max_settings');
      if (maxSettingsRaw) {
        const maxSettings = JSON.parse(maxSettingsRaw);
        if (maxSettings.botToken && maxSettings.chatId) {
          const itemsText = cart.map((ci) => `  • ${ci.item.name} x${ci.quantity} = ${FMT(calcItemPrice(ci.item, ci.selectedOptions) * ci.quantity)}`).join('\n');
          const message = `🍣 <b>Новый заказ Суши Мать #${orderNumber}!</b>\n\n` +
            `👤 <b>Имя:</b> ${form.name}\n` +
            `📱 <b>Телефон:</b> ${form.phone}\n` +
            `📍 <b>Адрес:</b> ${form.address || 'Самовывоз'}\n` +
            `🕐 <b>Время:</b> ${form.time}\n` +
            (form.comment ? `💬 <b>Комментарий:</b> ${form.comment}\n` : '') +
            `\n📋 <b>Заказ:</b>\n${itemsText}\n\n` +
            (promoApplied ? `🎁 <b>Промокод:</b> −${FMT(promoDiscount)}\n` : '') +
            `🚚 <b>Доставка:</b> ${deliveryPrice === 0 ? 'Бесплатно' : FMT(deliveryPrice)}\n` +
            `💰 <b>Итого:</b> <b>${FMT(finalTotal)}</b>`;

          await fetch('https://platform-api.max.ru/messages', {
            method: 'POST',
            headers: {
              'Authorization': maxSettings.botToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: parseInt(maxSettings.chatId),
              text: message,
              format: 'html'
            }),
          });
        }
      }
    } catch {
      // Silently fail — order still accepted, MAX is optional
    }

    // Show success regardless of delivery channel
    setStep('success');
    setTimeout(() => {
      onClear();
      setStep('cart');
      setOrderSent(false);
      setForm({ name: '', phone: '', address: '', comment: '', time: 'Как можно скорее' });
      setPromo('');
      setPromoApplied(false);
      setConsent(true);
      onClose();
    }, 4000);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="flex w-full flex-col border-white/10 bg-[#0E0E12] p-0 sm:max-w-md">
        <SheetHeader className="border-b border-white/10 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg text-white">
            <ShoppingCart className="h-5 w-5 text-[#D4A853]" />
            {step === 'cart' && 'Корзина'}
            {step === 'checkout' && 'Оформление заказа'}
            {step === 'success' && 'Заказ принят!'}
          </SheetTitle>
        </SheetHeader>

        {step === 'success' && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Заказ отправлен!</h3>
            <p className="mt-2 text-sm text-white/60">Мы получили вашу заявку и скоро свяжемся для подтверждения.</p>
          </div>
        )}

        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
                  <ShoppingCart className="mb-3 h-12 w-12" />
                  <p className="text-base">Корзина пуста</p>
                  <p className="mt-1 text-sm">Добавьте что-нибудь вкусное!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((ci) => (
                    <div key={`${ci.item.id}-${ci.selectedOptions.join(',')}`} className="flex gap-3 rounded-xl border border-white/5 bg-[#121214] p-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1D] text-xl border border-white/5">
                        {ci.item.cats.includes('shawarma') ? '🌯' : ci.item.cats.includes('burgers') ? '🍔' : ci.item.cats.includes('rolls') ? '🍣' : ci.item.cats.includes('baked') ? '🔥' : ci.item.cats.includes('pizza') ? '🍕' : ci.item.cats.includes('wok') ? '🍜' : ci.item.cats.includes('sets') ? '🍱' : ci.item.cats.includes('snacks') ? '🍟' : ci.item.cats.includes('soups') ? '🥗' : '🍽'}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h4 className="text-sm font-semibold text-white">{ci.item.name}</h4>
                        {/* Show selected options */}
                        {ci.item.options && ci.item.options.length > 0 && (
                          <span className="text-[10px] text-white/40">
                            {ci.item.options.map((opt, i) => {
                              const chIdx = ci.selectedOptions[i] ?? 0;
                              return opt.choices[chIdx]?.label;
                            }).join(' · ')}
                          </span>
                        )}
                        <span className="text-xs text-white/40">{FMT(calcItemPrice(ci.item, ci.selectedOptions))} / шт</span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQty(ci.item.id, -1, ci.selectedOptions)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{ci.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(ci.item.id, 1, ci.selectedOptions)}
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-[#D4A853]">{FMT(calcItemPrice(ci.item, ci.selectedOptions) * ci.quantity)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(ci.item.id, ci.selectedOptions)}
                        className="self-start text-white/30 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {/* Upsell */}
                  <div className="mt-2 rounded-xl border border-[#D4A853]/10 bg-[#D4A853]/5 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#D4A853]">
                      <Gift className="h-4 w-4" /> Добавить к заказу?
                    </h4>
                    <div className="flex flex-col gap-2">
                      {UPSELL_ITEMS.map((u) => (
                        <div key={u.id} className="flex items-center justify-between rounded-lg bg-[#121214] px-3 py-2">
                          <span className="text-sm text-white/80">{u.name}</span>
                          <button
                            onClick={() => onAddItem(u, 1)}
                            className="rounded-md bg-[#D4A853]/20 px-3 py-1 text-xs font-semibold text-[#D4A853] hover:bg-[#D4A853]/30"
                          >
                            + {FMT(u.price)}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Zone selector */}
                  <div className="mt-2">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                      <MapPin className="h-4 w-4 text-[#D4A853]" /> Зона доставки
                    </label>
                    <select
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4A853]"
                    >
                      {DELIVERY_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name} {z.price > 0 ? `(${FMT(z.price)})` : '(бесплатно)'}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-white/40">
                      Бесплатная доставка от {FMT(zone.freeFrom)}
                    </p>
                  </div>

                  {/* Promo */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                      <Tag className="h-4 w-4 text-[#D4A853]" /> Промокод
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Введите промокод"
                        className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853]"
                      />
                      <button
                        onClick={applyPromo}
                        className="rounded-lg border border-[#D4A853]/30 px-4 py-2 text-sm text-[#D4A853] hover:bg-[#D4A853]/10"
                      >
                        Применить
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="mt-1 text-xs text-emerald-400">Промокод применён! Скидка на день рождения 10%</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Totals */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 px-6 py-4">
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Сумма</span>
                    <span>{FMT(total)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Доставка</span>
                    <span>{deliveryPrice === 0 ? 'Бесплатно' : FMT(deliveryPrice)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Промокод</span>
                      <span>−{FMT(promoDiscount)}</span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t border-white/10 pt-2 text-lg font-bold text-white">
                    <span>Итого</span>
                    <span className="text-[#D4A853]">{FMT(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  disabled={total < minOrder}
                  className={`mt-4 w-full rounded-lg py-3 text-sm font-bold transition-all ${
                    total >= minOrder
                      ? 'gold-gradient-bg text-[#0A0A0D] hover:shadow-lg'
                      : 'cursor-not-allowed bg-white/5 text-white/30'
                  }`}
                >
                  {total >= minOrder ? 'Оформить заказ' : `Минимальный заказ ${FMT(minOrder)}`}
                </button>
                <button
                  onClick={onClear}
                  className="mt-2 w-full py-2 text-xs text-white/30 hover:text-white/60"
                >
                  Очистить корзину
                </button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-white/70">
                  <User className="h-3.5 w-3.5 text-[#D4A853]" /> Имя *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853]"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-white/70">
                  <Phone className="h-3.5 w-3.5 text-[#D4A853]" /> Телефон *
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853]"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-white/70">
                  <MapPin className="h-3.5 w-3.5 text-[#D4A853]" /> Адрес
                </label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Улица, дом, квартира"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853]"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-white/70">
                  <Clock className="h-3.5 w-3.5 text-[#D4A853]" /> Время доставки
                </label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4A853]"
                >
                  <option>Как можно скорее</option>
                  <option>Через 30 минут</option>
                  <option>Через 1 час</option>
                  <option>Через 1.5 часа</option>
                  <option>Через 2 часа</option>
                  <option>12:00 — 12:30</option>
                  <option>12:30 — 13:00</option>
                  <option>13:00 — 13:30</option>
                  <option>13:30 — 14:00</option>
                  <option>14:00 — 14:30</option>
                  <option>14:30 — 15:00</option>
                  <option>18:00 — 18:30</option>
                  <option>18:30 — 19:00</option>
                  <option>19:00 — 19:30</option>
                  <option>19:30 — 20:00</option>
                  <option>20:00 — 20:30</option>
                  <option>20:30 — 21:00</option>
                </select>
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-white/70">
                  <MessageSquare className="h-3.5 w-3.5 text-[#D4A853]" /> Комментарий
                </label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Особые пожелания..."
                  rows={3}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#D4A853]"
                />
              </div>

              <div className="rounded-xl border border-white/5 bg-[#121214] p-4">
                <h4 className="mb-2 text-sm font-semibold text-white">Ваш заказ</h4>
                {cart.map((ci) => {
                  const opts = ci.item.options && ci.item.options.length > 0
                    ? ` (${ci.item.options.map((opt, i) => opt.choices[ci.selectedOptions[i] ?? 0]?.label).join(', ')})`
                    : '';
                  return (
                    <div key={`${ci.item.id}-${ci.selectedOptions.join(',')}`} className="flex justify-between py-1 text-sm text-white/60">
                      <span>{ci.item.name}{opts} × {ci.quantity}</span>
                      <span>{FMT(calcItemPrice(ci.item, ci.selectedOptions) * ci.quantity)}</span>
                    </div>
                  );
                })}
                <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-base font-bold text-[#D4A853]">
                  <span>Итого</span>
                  <span>{FMT(finalTotal)}</span>
                </div>
              </div>

              {/* Consent checkbox — internal only, does not block order */}
              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/5 bg-[#121214] p-3 transition-colors hover:border-white/10">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4A853]"
                />
                <span className="text-xs leading-relaxed text-white/50">
                  Я согласен на обработку персональных данных в соответствии с{" "}
                  <a
                    href="/privacy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4A853] underline hover:no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Политикой конфиденциальности
                  </a>.
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('cart')}
                  className="flex-1 rounded-lg border border-white/15 py-3 text-sm font-medium text-white/70 hover:bg-white/5"
                >
                  Назад
                </button>
                <button
                  onClick={sendOrder}
                  disabled={!form.name || !form.phone || orderSent}
                  className={`flex-[2] flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-all ${
                    form.name && form.phone && !orderSent
                      ? 'gold-gradient-bg text-[#0A0A0D] hover:shadow-lg'
                      : 'cursor-not-allowed bg-white/5 text-white/30'
                  }`}
                >
                  {orderSent ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Отправляем...</>
                  ) : !form.name ? (
                    'Введите имя'
                  ) : !form.phone ? (
                    'Введите телефон'
                  ) : (
                    <><Send className="h-4 w-4" /> Заказать {FMT(finalTotal)}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
