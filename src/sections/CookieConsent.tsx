import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'sushi-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem(STORAGE_KEY);
    if (!agreed) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-[#0E0E12]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 md:py-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4A853]/10">
            <Cookie className="h-5 w-5 text-[#D4A853]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/90">Мы используем cookies</p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/50">
              Сайт использует файлы cookie для сохранения корзины, аналитики и улучшения работы.
              Продолжая использование, вы соглашаетесь с{" "}
              <a
                href="/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A853] underline hover:no-underline"
              >
                Политикой конфиденциальности
              </a>{" "}
              и{" "}
              <a
                href="/offer.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A853] underline hover:no-underline"
              >
                Публичной офертой
              </a>.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            onClick={accept}
            className="rounded-lg bg-[#D4A853]/15 px-5 py-2.5 text-sm font-semibold text-[#D4A853] transition-colors hover:bg-[#D4A853]/25"
          >
            Принять
          </button>
          <button
            onClick={accept}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/30 hover:bg-white/5 hover:text-white/60"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
