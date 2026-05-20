import { Phone, Clock, MapPin, MessageCircle } from 'lucide-react';

export default function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-['Playfair_Display_SC'] text-3xl font-bold md:text-4xl">Контакты</h2>
          <p className="mt-2 text-white/50">Мы всегда на связи</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <a
            href="tel:+79496117127"
            className="group flex flex-col items-center rounded-2xl border border-white/5 bg-[#121214] p-6 text-center transition-all hover:border-[#D4A853]/20"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A853]/10 transition-colors group-hover:bg-[#D4A853]/20">
              <Phone className="h-6 w-6 text-[#D4A853]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Телефон</h3>
            <p className="mt-1 text-lg font-bold text-[#D4A853]">+7 (949) 611-71-27</p>
            <p className="mt-1 text-xs text-white/40">Звоните или пишите</p>
          </a>

          <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#121214] p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A853]/10">
              <Clock className="h-6 w-6 text-[#D4A853]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Режим работы</h3>
            <p className="mt-1 text-lg font-bold text-white">09:00 – 21:00</p>
            <p className="mt-1 text-xs text-white/40">Ежедневно без выходных</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#121214] p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A853]/10">
              <MapPin className="h-6 w-6 text-[#D4A853]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Адрес</h3>
            <p className="mt-1 text-lg font-bold text-white">Ул. Урицкого 83В</p>
            <p className="mt-1 text-xs text-white/40">Ильичёвский район</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#121214] p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A853]/10">
              <MessageCircle className="h-6 w-6 text-[#D4A853]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Мессенджеры</h3>
            <div className="mt-2 flex gap-3">
              <a href="https://t.me/sushi_mater" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-400 hover:bg-sky-500/20">
                Telegram
              </a>
              <a href="https://wa.me/79496117127" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
