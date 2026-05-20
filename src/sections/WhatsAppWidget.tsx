import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {open && (
        <div className="mb-2 w-64 rounded-2xl border border-white/10 bg-[#121214] p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Напишите нам</span>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-3 text-xs text-white/50">Закажите быстро через мессенджер</p>
          <a
            href="https://wa.me/79496117127"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href="https://t.me/sushi_mater"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-sky-500/10 py-2.5 text-sm font-medium text-sky-400 transition-colors hover:bg-sky-500/20"
          >
            <MessageCircle className="h-4 w-4" /> Telegram
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A853] text-[#0A0A0D] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label="WhatsApp"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
