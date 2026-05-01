import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const pillars = [
  {
    label: 'Kesim Yaklaşımı',
    value: 'Yüz hatlarına uygun form ve akış',
  },
  {
    label: 'Renk Dengesi',
    value: 'Işığı doğru alan doğal geçişler',
  },
  {
    label: 'Salon Hissi',
    value: 'Sakin, düzenli ve özenli bir deneyim',
  },
] as const;

const WhyChooseUs = () => {
  return (
    <section
      id="hakkimizda"
      className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          {/* Images Section (Now on the Left) */}
          <MotionStagger className="space-y-6" delayChildren={0.08} staggerChildren={0.1}>
            <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
              <MotionReveal className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_24px_80px_rgba(124,96,54,0.08)]" x={-18}>
                <Image
                  src="/banner/hero_banner.png"
                  alt="Davines kuaför salonu"
                  fill
                  className="object-cover object-[56%_center]"
                  sizes="(max-width: 640px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1813]/25 via-transparent to-transparent" />
              </MotionReveal>

              <div className="grid gap-4">
                <MotionReveal className="rounded-[28px] border border-[#eadcc8] bg-white/82 p-6 shadow-[0_18px_40px_rgba(124,96,54,0.06)]" x={18}>
                  <p className="text-xs tracking-[0.18em] text-[#a67a42]">
                    STIL NOTU
                  </p>
                  <p className="mt-3 font-serif text-2xl leading-tight text-[#1f1f1f]">
                    Yüzünüze yakışan kesim, saçınıza yakışan renk.
                  </p>
                </MotionReveal>

                <MotionReveal className="relative min-h-[180px] overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_16px_36px_rgba(124,96,54,0.06)]" x={18}>
                  <Image
                    src="/p_2.png"
                    alt="Davines saç tasarımı detayı"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 24vw"
                  />
                </MotionReveal>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <MotionReveal
                  key={pillar.label}
                  className="rounded-[26px] border border-[#eadcc8] bg-white/78 p-6 shadow-[0_16px_36px_rgba(124,96,54,0.05)]"
                  delay={index * 0.04}
                >
                  <p className="text-xs tracking-[0.18em] text-[#a67a42]">
                    {pillar.label}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#2d2d2d]">
                    {pillar.value}
                  </p>
                </MotionReveal>
              ))}
            </div>
          </MotionStagger>

          {/* Content Section (Now on the Right) */}
          <MotionStagger className="lg:sticky lg:top-28">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#b18449]">
              Davines Atmosferi
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Sadece saç değil,
              <span className="block text-[#b88b4c]">baştan sona iyi hissettiren bir deneyim</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5f5a54] sm:text-lg">
              Davines'te her randevu; sizi dinleyerek başlayan, stilinize göre
              şekillenen ve aynadan memnun ayrılmanızı hedefleyen kişisel bir
              salon akışıyla ilerler.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hakkimizda"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b88b4c] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
              >
                Bizi Yakından Tanıyın
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-[#d7b687] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
              >
                Randevu Oluşturun
              </Link>
            </div>
          </MotionStagger>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
