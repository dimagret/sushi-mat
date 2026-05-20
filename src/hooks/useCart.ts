import { useCallback, useEffect, useState } from 'react';
import { type MenuItem } from '@/data/menu';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions: number[];
}

const STORAGE_KEY = 'sushi-cart-v3';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/** Calculate the effective price of an item including selected options */
export function calcItemPrice(item: MenuItem, selectedOptions: number[]): number {
  let price = item.price;
  if (!item.options || item.options.length === 0) return price;
  item.options.forEach((opt, i) => {
    const choiceIdx = selectedOptions[i] ?? 0;
    const choice = opt.choices[choiceIdx];
    if (choice) price += choice.priceDelta;
  });
  return price;
}

/** Create a unique key for a cart item with its options */
function cartKey(itemId: number, selectedOptions: number[]): string {
  return `${itemId}::${selectedOptions.join(',')}`;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addItem = useCallback((item: MenuItem, quantity = 1, selectedOptions: number[] = []) => {
    setCart((prev) => {
      const key = cartKey(item.id, selectedOptions);
      const existingIdx = prev.findIndex((ci) => cartKey(ci.item.id, ci.selectedOptions) === key);
      if (existingIdx >= 0) {
        return prev.map((ci, i) =>
          i === existingIdx ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity, selectedOptions }];
    });
    return item.name;
  }, []);

  const removeItem = useCallback((itemId: number, selectedOptions: number[] = []) => {
    const key = cartKey(itemId, selectedOptions);
    setCart((prev) => prev.filter((ci) => cartKey(ci.item.id, ci.selectedOptions) !== key));
  }, []);

  const updateQty = useCallback((itemId: number, delta: number, selectedOptions: number[] = []) => {
    const key = cartKey(itemId, selectedOptions);
    setCart((prev) =>
      prev
        .map((ci) =>
          cartKey(ci.item.id, ci.selectedOptions) === key
            ? { ...ci, quantity: Math.max(0, ci.quantity + delta) }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = cart.reduce((sum, ci) => sum + calcItemPrice(ci.item, ci.selectedOptions) * ci.quantity, 0);
  const count = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  return { cart, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart, total, count };
}
