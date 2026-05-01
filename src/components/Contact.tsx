import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { siteConfig } from '@/lib/siteConfig';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const Contact = () => {
  return (
    <section id="iletisim" className="relative overflow-hidden bg-[#f8f2e9] py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.10),transparent_28%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <MotionReveal className="text-center mb-16">


          <h2 className="mt-8 font-serif text-4xl text-[#171717] sm:text-5xl">
            Bize kolayca
            <span className="block text-[#b88b4c]">ulaşabilirsiniz</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base leading-7 text-[#625b53] sm:text-lg">
            {siteConfig.contactDescription}
          </p>
        </MotionReveal>

        <MotionStagger className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-14" delayChildren={0.08} staggerChildren={0.1}>
          <MotionReveal className="rounded-[28px] border border-[#eadcc8] bg-white/80 p-7 text-center shadow-[0_18px_40px_rgba(124,96,54,0.06)]">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f6ecdf] flex items-center justify-center text-[#b88b4c] shadow-inner">
              <FiPhone className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#1f1f1f] mb-3">Telefon</h3>
            <a
              href={`tel:${siteConfig.primaryPhoneHref}`}
              className="text-lg font-medium text-[#a4763c] hover:text-[#8f6734] transition-colors"
            >
              {siteConfig.primaryPhoneDisplay}
            </a>
            <p className="text-[#6a645d] text-sm mt-3">Randevu ve bilgi icin hemen ulasin</p>
          </MotionReveal>

          <MotionReveal className="rounded-[28px] border border-[#eadcc8] bg-white/80 p-7 text-center shadow-[0_18px_40px_rgba(124,96,54,0.06)]">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f6ecdf] flex items-center justify-center text-[#b88b4c] shadow-inner">
              <FiPhone className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#1f1f1f] mb-3">Sabit Hat</h3>
            <a
              href={`tel:${siteConfig.secondaryPhoneHref}`}
              className="text-base font-medium text-[#a4763c] hover:text-[#8f6734] transition-colors break-all"
            >
              {siteConfig.secondaryPhoneDisplay}
            </a>
            <p className="text-[#6a645d] text-sm mt-3">Telefonla hizli bilgi alabilirsiniz</p>
          </MotionReveal>

          <MotionReveal className="rounded-[28px] border border-[#eadcc8] bg-white/80 p-7 text-center shadow-[0_18px_40px_rgba(124,96,54,0.06)]">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f6ecdf] flex items-center justify-center text-[#b88b4c] shadow-inner">
              <FiMapPin className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#1f1f1f] mb-3">Adres</h3>
            <p className="text-base text-[#2f2f2f]">
              {siteConfig.addressShort}
            </p>
            <p className="text-[#6a645d] text-sm mt-3">{siteConfig.addressLine}</p>
          </MotionReveal>
        </MotionStagger>

        <MotionReveal className="text-center">
          <div className="rounded-[30px] border border-[#e7d5bf] bg-[linear-gradient(90deg,rgba(255,255,255,0.80),rgba(249,239,226,0.96))] p-8 shadow-[0_20px_50px_rgba(124,96,54,0.06)]">
            <h3 className="text-2xl font-serif text-[#1f1f1f] mb-4">Detaylı İletişim Formu</h3>
            <p className="text-[#655f57] mb-6 max-w-2xl mx-auto leading-7">
              Beklentilerinizi bizimle paylaşın, size uygun bakım ve randevu
              planını birlikte oluşturalım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center rounded-full bg-[#b88b4c] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
            >
              Formu Doldur
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Contact;
