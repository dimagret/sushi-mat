import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { CheckCircle, Home, Loader2, AlertCircle, Phone } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
  const orderId = orderIdParam ? Number(orderIdParam) : 0;

  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');

  const orderQuery = trpc.order.getById.useQuery(
    { id: orderId },
    { enabled: orderId > 0, refetchInterval: status === 'checking' ? 5000 : false }
  );

  useEffect(() => {
    if (orderQuery.data) {
      const orderStatus = (orderQuery.data as any).status;
      if (orderStatus === 'confirmed' || orderStatus === 'succeeded' || orderStatus === 'preparing' || orderStatus === 'ready' || orderStatus === 'out_for_delivery' || orderStatus === 'delivered') {
        setStatus('success');
        localStorage.removeItem('sushi-cart-v3');
      } else if (orderStatus === 'cancelled' || orderStatus === 'refunded') {
        setStatus('error');
      }
    }
  }, [orderQuery.data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'checking') {
        setStatus('success');
        localStorage.removeItem('sushi-cart-v3');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0D] px-4 text-center">
        <Loader2 className="mb-6 h-12 w-12 animate-spin text-[#D4A853]" />
        <h1 className="mb-2 text-2xl font-bold text-white">Проверяем оплату...</h1>
        <p className="text-white/60">Это займёт несколько секунд</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0D] px-4 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">Оплата не завершена</h1>
        <p className="mb-4 max-w-sm text-white/60">
          Что-то пошло не так. Попробуйте оформить заказ заново или свяжитесь с нами.
        </p>
        <div className="mb-8 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/70">
          <Phone className="h-4 w-4 text-[#D4A853]" />
          <a href="tel:+79001234567" className="text-[#D4A853]">+7 (900) 123-45-67</a>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#D4A853] px-6 py-3 font-bold text-[#0A0A0D] hover:bg-[#E8C056]"
        >
          <Home className="h-4 w-4" /> На главную
        </Link>
      </div>
    );
  }

  const orderData = orderQuery.data as any;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0D] px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle className="h-8 w-8 text-emerald-400" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-white">Заказ оплачен!</h1>
      <p className="mb-4 max-w-sm text-white/60">
        Спасибо за заказ! Мы уже начали его готовить и скоро свяжемся с вами.
      </p>
      {orderData?.orderNumber && (
        <p className="mb-2 font-mono text-sm text-[#D4A853]">Заказ #{orderData.orderNumber}</p>
      )}
      <div className="mb-8 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/70">
        <Phone className="h-4 w-4 text-[#D4A853]" />
        <a href="tel:+79001234567" className="text-[#D4A853]">+7 (900) 123-45-67</a>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-[#D4A853] px-6 py-3 font-bold text-[#0A0A0D] hover:bg-[#E8C056]"
      >
        <Home className="h-4 w-4" /> На главную
      </Link>
    </div>
  );
}
