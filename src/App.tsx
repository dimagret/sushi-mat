import { Routes, Route } from 'react-router';
import { useState, lazy, Suspense } from 'react';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import USPStrip from '@/sections/USPStrip';
import StorySection from '@/sections/StorySection';
import MenuSection from '@/sections/MenuSection';
import ReviewsSection from '@/sections/ReviewsSection';
import LoyaltySection from '@/sections/LoyaltySection';
import DeliverySection from '@/sections/DeliverySection';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/sections/ScrollToTop';
import { useCart } from '@/hooks/useCart';
import type { MenuItem } from '@/data/menu';

// Lazy-load некритичных компонентов
const CartDrawer = lazy(() => import('@/sections/CartDrawer'));
const QuickViewModal = lazy(() => import('@/sections/QuickViewModal'));
const MobileCartBar = lazy(() => import('@/sections/MobileCartBar'));
const CookieConsent = lazy(() => import('@/sections/CookieConsent'));
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'));

// Минимальный fallback для Suspense (невидимый — компоненты ниже fold)
const LazyFallback = () => null;

function HomePage() {
  const cart = useCart();
  const [quickView, setQuickView] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white">
      <Header cartCount={cart.count} onOpenCart={() => cart.setIsOpen(true)} />
      <main>
        <Hero />
        <USPStrip />
        <StorySection />
        <MenuSection
          onAddToCart={cart.addItem}
          onQuickView={setQuickView}
        />
        <ReviewsSection />
        <LoyaltySection />
        <DeliverySection />
      </main>
      <Footer />
      <Suspense fallback={<LazyFallback />}>
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
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <MobileCartBar
          count={cart.count}
          total={cart.total}
          onOpenCart={() => cart.setIsOpen(true)}
        />
      </Suspense>
      <ScrollToTop />
      <Suspense fallback={<LazyFallback />}>
        <QuickViewModal item={quickView} onClose={() => setQuickView(null)} onAdd={cart.addItem} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/order/success"
        element={
          <Suspense fallback={<LazyFallback />}>
            <OrderSuccess />
          </Suspense>
        }
      />
    </Routes>
  );
}
