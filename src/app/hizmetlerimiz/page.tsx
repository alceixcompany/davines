import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiDroplet, FiScissors, FiShield, FiStar, FiWind } from 'react-icons/fi';

const services = [
  {
    slug: 'cilt-bakimi',
    icon: FiScissors,
    title: 'Saç Kesimi',
    description:
      'Yüz hatlarınıza, saç yapınıza ve günlük kullanım alışkanlığınıza uygun kesimlerle daha temiz, dengeli ve sizi yansıtan bir görünüm planlıyoruz.',
    highlights: ['Yüz tipine uygun form', 'Temiz hatlar ve hacim dengesi', 'Günlük kullanıma uygun bitiş'],
    image: '/hizmetler/hizmet_1.webp',
  },
  {
    slug: 'lazer-epilasyon',
    icon: FiDroplet,
    title: 'Renk Uygulamaları',
    description:
      'Boya, balyaj ve tonlama uygulamalarında saçınızın doğal akışını bozmadan daha canlı, parlak ve özenli bir renk geçişi hedefliyoruz.',
    highlights: ['Ten tonuna uygun seçim', 'Yumuşak geçişler', 'Parlak ve bakımlı görünüm'],
    image: '/hizmetler/hizmet_2.webp',
  },
  {
    slug: 'kas-ve-kirpik',
    icon: FiWind,
    title: 'Fön ve Şekillendirme',
    description:
      'Hacimli fön, düz bitiş ya da hareketli şekillendirme seçenekleriyle saçınızın gün boyu düzenli ve özenli görünmesini sağlıyoruz.',
    highlights: ['Kalıcı salon bitişi', 'Hacim ve parlaklık desteği', 'Özel günlere uygun şekillendirme'],
    image: '/hizmetler/hizmet_3.webp',
  },
  {
    slug: 'vucut-bakimi',
    icon: FiStar,
    title: 'Saç Bakım Ritüelleri',
    description:
      'Yıpranmış, kuru ya da işlem görmüş saçlar için planlanan profesyonel bakım adımlarıyla daha yumuşak, parlak ve toparlanmış bir sonuç sunuyoruz.',
    highlights: ['Nem ve onarım desteği', 'İşlem görmüş saçlara özel bakım', 'Daha yumuşak ve canlı doku'],
    image: '/hizmetler/hizmet_4.jpg',
  },
] as const;

const values = [
  {
    icon: FiShield,
    title: 'Güven Veren Uygulama',
    description: 'Hijyen, doğru ürün seçimi ve kontrollü uygulama adımlarıyla her randevuyu özenli bir salon akışına dönüştürüyoruz.',
  },
  {
    icon: FiWind,
    title: 'Temiz Salon Hissi',
    description: 'Karşılamadan son dokunuşa kadar sizi yormayan, düzenli ve rahat hissettiren bir kuaför deneyimi sunuyoruz.',
  },
  {
    icon: FiScissors,
    title: 'Kişisel Stil Yaklaşımı',
    description: 'Her misafirin saç yapısını, beklentisini ve tarzını dinleyerek en uygun kesim, renk ve şekillendirme akışını birlikte belirliyoruz.',
  },
] as const;

const ServicesPage = () => {
  return (
    <main className="bg-[#fbf6ef]">
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/banner/hizmetlerimiz_banner1.png"
            alt="Davines hizmetleri"
            fill
            priority
            className="object-cover object-[62%_center]"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-y-0 left-0 w-[74%] bg-[linear-gradient(90deg,rgba(252,249,244,0.94)_0%,rgba(252,249,244,0.84)_24%,rgba(252,249,244,0.58)_52%,rgba(252,249,244,0.24)_74%,rgba(252,249,244,0.02)_100%)] backdrop-blur-[3px]" />
          <div className="absolute inset-y-0 left-0 w-[52%] bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.62),rgba(255,255,255,0.16)_58%,transparent_82%)]" />
          <div className="absolute inset-0 bg-black/[0.04]" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="max-w-2xl pt-[20px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#b89562]" />
              <span className="text-sm tracking-[0.3em] text-[#343434] uppercase font-medium">KUAFÖR DOKUNUŞLARI</span>
            </div>

            <h1 className="font-serif text-[64px] sm:text-[86px] leading-[0.9] text-[#111111] mb-6">
              İmza
              <span className="block text-[#b78a49]">saç hizmetleri</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#2d2d2d] leading-relaxed max-w-lg">
              Saç kesimi, renk uygulamaları, fön ve profesyonel bakımlarla
              stilinize en uygun kuaför deneyimini birlikte planlayalım.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fcf8f3] py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_30%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a56f]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">


          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.slug}
                  className="group overflow-hidden rounded-[34px] border border-[#eadcc8] bg-white/90 shadow-[0_20px_60px_rgba(124,96,54,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8b17a] hover:shadow-[0_28px_80px_rgba(124,96,54,0.12)]"
                >
                  <div className="relative min-h-[260px] overflow-hidden">
                    <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-3 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#a4763c] shadow-[0_10px_22px_rgba(124,96,54,0.10)]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6ecdf] text-[#b88b4c]">
                        <Icon className="h-4 w-4" />
                      </span>
                      İMZA HİZMET
                    </div>

                    <div className="relative min-h-[260px]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f1811]/18 via-[#1f1811]/4 to-transparent" />
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="max-w-2xl">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b18449]">
                          Özel Kuaför Hizmeti
                        </p>
                        <h3 className="mt-3 font-serif text-3xl text-[#1f1f1f] sm:text-[34px]">
                          {service.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[#645f58] sm:text-base">
                          {service.description}
                        </p>
                      </div>

                      <div className="hidden shrink-0 rounded-full border border-[#eadcc8] bg-[#FAFAFA] px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-[#8f6734] sm:block">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {service.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-[20px] border border-[#efe4d5] bg-[#fcfaf7] px-4 py-4 text-sm leading-6 text-[#6c675f]"
                        >
                          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f8efe2]">
                            <FiCheck className="h-4 w-4 text-[#c49a5e]" />
                          </div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b88b4c] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
                      >
                        Randevu Oluştur
                        <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fcf6ee] py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">


            <h2 className="mt-8 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
              Sadece sonuca değil
              <span className="block text-[#b88b4c]">salon deneyimine de özen gösteriyoruz</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f5a54]">
              Salonumuza gelen herkesin kendini rahat, güvende ve bakımlı
              hissetmesini önemsiyoruz. Bu anlayış tüm kuaför hizmetlerimizin
              temelini oluşturuyor.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-[30px] border border-[#eadcc8] bg-white/80 p-7 shadow-[0_20px_50px_rgba(124,96,54,0.07)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ecdf] text-[#b88b4c] shadow-inner">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-[#1f1f1f]">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#645f58] sm:text-base">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f2e9] py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(191,151,96,0.10),transparent_28%)]" />

        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-7 lg:px-10">
          <div className="rounded-[34px] border border-[#e7d5bf] bg-[linear-gradient(90deg,rgba(255,255,255,0.82),rgba(249,239,226,0.96))] p-8 shadow-[0_20px_50px_rgba(124,96,54,0.06)] sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#b18449]">
              Randevu Planlama
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[#1f1f1f] sm:text-5xl">
              Size en uygun kuaför planını birlikte oluşturalım
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#655f57] sm:text-lg">
              İster saçınızda taze bir değişim isteyin ister mevcut görünümünüzü
              güçlendirmek isteyin, size en uygun kesim, renk ve bakım adımlarını
              birlikte belirleyelim.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b88b4c] px-8 py-4 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
              >
                İletişime Geçin
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/galeri"
                className="inline-flex items-center justify-center rounded-full border border-[#d7b687] bg-white/70 px-8 py-4 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
              >
                Galeriyi İnceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
