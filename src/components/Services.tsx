'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowRight,
  FiDroplet,
  FiScissors,
  FiStar,
  FiWind,
} from 'react-icons/fi';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const services = [
  {
    icon: FiScissors,
    title: 'Saç Kesimi',
    note: 'Yüz hatlarına uygun net formlar',
  },
  {
    icon: FiDroplet,
    title: 'Renk Uygulamaları',
    note: 'Boya, balyaj ve parlak geçişler',
  },
  {
    icon: FiWind,
    title: 'Fön ve Şekillendirme',
    note: 'Hacimli, temiz ve kalıcı bitiş',
  },
  {
    icon: FiStar,
    title: 'Saç Bakım Ritüelleri',
    note: 'Besleyici ve onarıcı profesyonel dokunuşlar',
  },
] as const;

const Services = () => {
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_30%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a56f]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight text-[#171717] sm:text-4xl">
            Saç stilinizi öne çıkaran
            <span className="block text-[#b88b4c]">kuaför dokunuşları</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#5f5a54] sm:text-lg">
            Davines'te kesimden renge, bakımdan şekillendirmeye uzanan seçili salon deneyimleri.
          </p>
        </MotionReveal>

        <div className="mt-14 p-2 sm:p-4 lg:p-0">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <MotionStagger className="order-2 lg:order-1">
              <div className="max-w-lg">
                <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#b18449]">
                  Hair Studio Edit
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-[#1a1a1a] sm:text-4xl">
                  Her randevuda
                  <span className="block text-[#b88b4c]">kişisel bir saç planı</span>
                </h3>
              </div>

              <MotionStagger className="mt-8 space-y-4" delayChildren={0.08} staggerChildren={0.1}>
                {services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <MotionReveal
                      key={service.title}
                      className="flex items-center justify-between gap-4 rounded-[24px] border border-[#efe4d5] bg-[#fffdfa] px-5 py-5 transition-all duration-300 hover:border-[#d4b183] hover:shadow-[0_18px_34px_rgba(184,139,76,0.09)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6ecdf] text-[#b88b4c] shadow-inner">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-[#1f1f1f]">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm text-[#6c675f]">
                            {service.note}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-medium tracking-[0.24em] text-[#b18449]">
                        0{index + 1}
                      </span>
                    </MotionReveal>
                  );
                })}
              </MotionStagger>

              <MotionReveal className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b88b4c] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
                >
                  Randevu Al
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/hakkimizda"
                  className="inline-flex items-center justify-center rounded-full border border-[#d7b687] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
                >
                  Merkezimizi Taniyin
                </Link>
              </MotionReveal>
            </MotionStagger>

            <MotionStagger className="order-1 lg:order-2" delayChildren={0.12} staggerChildren={0.1}>
              <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr]">
                <div className="grid gap-4">
                  <MotionReveal className="relative min-h-[220px] overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_18px_40px_rgba(124,96,54,0.07)]" x={-18}>
                    <Image
                      src="/p_3.png"
                      alt="Davines profesyonel bakım atmosferi"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 18vw"
                    />
                  </MotionReveal>

                  <MotionReveal className="relative min-h-[180px] overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_16px_36px_rgba(124,96,54,0.06)]" x={-18}>
                    <Image
                      src="/p_4.png"
                      alt="Davines salon deneyimi"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 18vw"
                    />
                  </MotionReveal>
                </div>

                <div className="grid gap-4">
                  <MotionReveal className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_24px_60px_rgba(124,96,54,0.08)]" x={18}>
                    <Image
                      src="/p_1.png"
                      alt="Davines imza bakım uygulaması"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 36vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e]/25 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 rounded-full bg-white/88 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#7A5C45] backdrop-blur">
                      DAVINES EDIT
                    </div>
                  </MotionReveal>

                  <MotionReveal className="relative min-h-[180px] overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#f4ecdf] shadow-[0_18px_40px_rgba(124,96,54,0.07)]" x={18}>
                    <Image
                      src="/p_2.png"
                      alt="Davines saç bakım detayı"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 36vw"
                    />
                  </MotionReveal>
                </div>
              </div>
            </MotionStagger>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
