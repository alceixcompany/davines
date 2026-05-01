import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
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
    value: 'Sakin ve özenli bir deneyim',
  },
] as const;

const WhyChooseUs = () => {
  return (
    <section id="hakkimizda" className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Side: Smaller Elegant Image */}
          <MotionReveal x={-30} className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[32px] shadow-xl">
            <Image
              src="/banner/hakkimizda_banner.png"
              alt="Davines Hakkımızda"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]" />
          </MotionReveal>

          {/* Right Side: Clean Content */}
          <div className="lg:pl-6">
            <MotionStagger>
              <MotionReveal>
                <span className="text-[var(--accent)] text-[10px] font-bold tracking-[0.3em] uppercase">DAVINES FARKI</span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl text-[var(--text-main)] leading-tight">
                  Kişiselleştirilmiş <br />
                  <span className="italic opacity-80 font-normal">bir salon deneyimi.</span>
                </h2>
                <p className="mt-6 text-base text-[var(--text-muted)] leading-relaxed">
                  Davines'te her randevu; sizi dinleyerek başlayan, stilinize göre şekillenen ve aynadan memnun ayrılmanızı hedefleyen kişisel bir süreçtir.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.2} className="mt-10 space-y-6">
                {pillars.map((pillar) => (
                  <div key={pillar.label} className="flex gap-4">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <FiCheck className="h-3 w-3" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-main)]">{pillar.label}</h3>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{pillar.value}</p>
                    </div>
                  </div>
                ))}
              </MotionReveal>

              <MotionReveal delay={0.3} className="mt-10 flex flex-wrap gap-6">
                <Link
                  href="/hakkimizda"
                  className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--text-main)] transition-colors hover:text-[var(--accent)]"
                >
                  BİZİ TANIYIN
                  <FiArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex h-11 items-center px-6 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold tracking-widest hover:bg-opacity-90 transition-all shadow-md"
                >
                  RANDEVU AL
                </Link>
              </MotionReveal>
            </MotionStagger>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


