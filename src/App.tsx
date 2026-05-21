import { Routes, Route } from 'react-router';
import { useState } from 'react';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import USPStrip from '@/sections/USPStrip';
import StorySection from '@/sections/StorySection';
import MenuSection from '@/sections/MenuSection';
import LoyaltySection from '@/sections/LoyaltySection';
import DeliverySection from '@/sections/DeliverySection';
import Footer from '@/sections/Footer';
import CartDrawer from '@/sections/CartDrawer';
import ScrollToTop from '@/sections/ScrollToTop';
import QuickViewModal from '@/sections/QuickViewModal';
import MobileCartBar from '@/sections/MobileCartBar';
import CookieConsent from '@/sections/CookieConsent';
import OrderSuccess from '@/pages/OrderSuccess';
import { useCart } from '@/hooks/useCart';
import type { MenuItem } from '@/data/menu';

function HomePage() {
  const cart = useCart();
  const [quickView, setQuickView] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white">
      <Header cartCount={cart.count} onOpenCart={() => cart.setIsOpen(true)} />
      <Hero />
      <USPStrip />
      <StorySection />
      <MenuSection
        onAddToCart={cart.addItem}
        onQuickView={setQuickView}
      />
      <LoyaltySection />
      <DeliverySection />
      <Footer />
      <CartDrawer
        open={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        cart={cart.cart}
        total={cart.total}
        count={cart.count}
        onUpdateQty={cart.updateQty}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
        onAddItem={cart.addItem}
      />
      <MobileCartBar
        count={cart.count}
        total={cart.total}
        onOpenCart={() => cart.setIsOpen(true)}
      />
      <ScrollToTop />
      <QuickViewModal item={quickView} onClose={() => setQuickView(null)} onAdd={cart.addItem} />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order/success" element={<OrderSuccess />} />
    </Routes>
  );
}
