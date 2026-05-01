import Image from 'next/image';
import Link from 'next/link';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)]">
      <div className="absolute inset-0">
        <Image
          src="/banner/hero_banner.png"
          alt="Davines kuaför salonu hero banner"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[82%_center] lg:object-[92%_center] translate-x-[70px]"
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,234,0.96)_0%,rgba(247,242,234,0.9)_30%,rgba(247,242,234,0.54)_50%,rgba(247,242,234,0.1)_70%,rgba(247,242,234,0)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.68),rgba(255,255,255,0.2)_32%,transparent_54%)]" />
      <div className="absolute left-[-6%] top-[-2%] h-[110%] w-[54%] rotate-[-18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))] blur-xl" />
      <div className="absolute inset-0 bg-black/[0.03]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="flex h-screen items-center py-10 sm:py-12 lg:py-14">
          <MotionStagger className="max-w-[560px] pt-[20px]">
            <MotionReveal>
              <p className="text-[13px] sm:text-[16px] tracking-[0.42em] text-[var(--text-main)]">
                DAVINES HAIR STUDIO
              </p>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              <h1 className="mt-4 font-serif text-[64px] leading-[0.9] text-[var(--text-main)] sm:text-[88px] lg:text-[104px]">
                SAÇINIZA
                <br />
                İMZA ATIN
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p
                className="mt-4 text-[28px] leading-none text-[var(--accent)] sm:text-[42px] lg:text-[48px] font-script"
              >
                Kesim, renk ve profesyonel bakım bir arada
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="mt-12 h-px w-28 bg-[rgba(198,165,106,0.65)]" />
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="mt-7 max-w-[470px] text-xl leading-[1.45] text-[var(--text-muted)] sm:text-[20px]">
                Davines'te yüz hatlarınıza ve stilinize uygun saç kesimi, boya,
                fön ve bakım uygulamalarıyla her ziyarette bakımlı, modern ve
                güçlü bir görünüm yakalayın.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <div className="mt-14">
                <Link
                  href="/iletisim"
                  className="inline-flex min-w-[228px] items-center justify-center gap-5 rounded-full bg-[var(--accent)] px-10 py-4 text-[15px] font-medium tracking-[0.16em] text-white shadow-[0_20px_40px_rgba(198,165,106,0.22)] transition-all duration-300 hover:brightness-95 hover:shadow-[0_24px_48px_rgba(198,165,106,0.3)]"
                >
                  RANDEVUNU OLUŞTUR
                  <span aria-hidden="true" className="text-2xl leading-none">
                    →
                  </span>
                </Link>
              </div>
            </MotionReveal>
          </MotionStagger>
        </div>
      </div>
    </section>
  );
};

export default Hero;
