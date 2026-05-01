'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiCheckCircle, FiExternalLink, FiMapPin, FiMoreVertical, FiStar } from 'react-icons/fi';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const References = () => {
  const [counts, setCounts] = useState({
    reviews: 0,
    customers: 0,
    years: 0,
    satisfaction: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    reviews: 128,
    customers: 500,
    years: 8,
    satisfaction: 98,
  };

  const animateCount = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);

      callback(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            animateCount(0, targetCounts.reviews, 1800, (value) =>
              setCounts((prev) => ({ ...prev, reviews: value }))
            );
            animateCount(0, targetCounts.customers, 1800, (value) =>
              setCounts((prev) => ({ ...prev, customers: value }))
            );
            animateCount(0, targetCounts.years, 1800, (value) =>
              setCounts((prev) => ({ ...prev, years: value }))
            );
            animateCount(0, targetCounts.satisfaction, 1800, (value) =>
              setCounts((prev) => ({ ...prev, satisfaction: value }))
            );
          }
        });
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetCounts.reviews, targetCounts.customers, targetCounts.years, targetCounts.satisfaction]);

  const reviews = [
    {
      name: 'Elif K.',
      service: 'Cilt Bakımı',
      location: 'İstanbul',
      rating: 5,
      time: '2 hafta önce',
      guide: 'Yerel Rehber',
      stats: '46 yorum · 60 fotoğraf',
      comment:
        'İlk girdiğim andan itibaren çok huzurlu bir ortam vardı. Cilt bakımı sonrasında yüzüm daha aydınlık ve dinlenmiş göründü.',
      image: '/img/ayşe.avif',
    },
    {
      name: 'Merve A.',
      service: 'Lazer Epilasyon',
      location: 'Ataşehir',
      rating: 5,
      time: '1 ay önce',
      guide: 'Yerel Rehber',
      stats: '31 yorum · 18 fotoğraf',
      comment:
        'Süreç detaylı anlatıldı, çok nazik yaklaştılar. Seanslar oldukça konforlu geçti ve düzenli takip yapmaları güven verdi.',
      image: '/img/banu.avif',
    },
    {
      name: 'Seda T.',
      service: 'Kaş ve Kirpik',
      location: 'Kadıköy',
      rating: 5,
      time: '3 hafta önce',
      guide: 'Yerel Rehber',
      stats: '24 yorum · 12 fotoğraf',
      comment:
        'Kaş tasarımında tam istediğim gibi doğal bir görünüm elde edildi. Fazla abartmadan yüzüme en uygun şekli verdiler.',
      image: '/img/ahmet.avif',
    },
    {
      name: 'Gizem Y.',
      service: 'Vücut Bakımı',
      location: 'Üsküdar',
      rating: 5,
      time: '5 gün önce',
      guide: 'Yerel Rehber',
      stats: '52 yorum · 27 fotoğraf',
      comment:
        'Bakım sonrası hem fiziksel olarak rahatladım hem de kendimi çok iyi hissettim. Ortam tertemiz ve ekip çok ilgiliydi.',
      image: '/img/ali.avif',
    },
  ] as const;

  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section
      id="referanslar"
      className="relative overflow-hidden bg-[#f8f2e9] py-24 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <MotionReveal className="mx-auto max-w-3xl text-center">


          <h2 className="mt-8 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
            Misafirlerimizin paylastigi
            <span className="block text-[#b88b4c]">gercek deneyimler</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#60584f]">
            Google yorumu hissi veren, samimi ve dogal geri bildirimleri sitenin
            sakin premium diliyle bir araya getirdik.
          </p>
        </MotionReveal>

        <MotionReveal className="mt-16 rounded-[34px] border border-[#eadcc8] bg-white/75 p-6 shadow-[0_24px_80px_rgba(124,96,54,0.08)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[30px] border border-[#ece0d0] bg-[linear-gradient(180deg,#fffdfa,#f8efe2)] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <span className="text-xl font-bold text-[#4285F4]">G</span>
                </div>
                <div>
                  <p className="text-sm tracking-[0.14em] text-[#9d7742]">
                    GOOGLE YORUMLARI
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-[#1f1f1f]">
                    4.9 / 5.0
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1 text-[#e1ab4d]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FiStar key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-[#645d55]">
                Misafirlerimizin yorumlarinda en cok; guleryuzlu yaklasim,
                hijyen, dogal sonuc ve rahat hissettiren atmosfer one cikiyor.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3">
                  <FiCheckCircle className="h-5 w-5 text-[#b88b4c]" />
                  <span className="text-sm text-[#4f4a44]">Dogal ve zarif sonuc odakli</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3">
                  <FiCheckCircle className="h-5 w-5 text-[#b88b4c]" />
                  <span className="text-sm text-[#4f4a44]">Temiz ve huzurlu merkez deneyimi</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3">
                  <FiCheckCircle className="h-5 w-5 text-[#b88b4c]" />
                  <span className="text-sm text-[#4f4a44]">Duzenli takip ve ilgili ekip</span>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[#ead7bc] bg-white/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.14em] text-[#a17a45]">
                      GORUNTULEME
                    </p>
                    <p className="mt-1 text-sm text-[#5e564d]">
                      Google benzeri yorum ozeti
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-[#a4763c]">
                    Incele
                    <FiExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="review-viewport relative h-[540px] overflow-hidden rounded-[30px]">
              <div className="review-track space-y-4">
                {scrollingReviews.map((review, index) => (
                  <article
                    key={`${review.name}-${review.service}-${index}`}
                    className="rounded-[28px] border border-[#ece0d0] bg-white p-5 shadow-[0_18px_36px_rgba(124,96,54,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-[15px] font-semibold leading-none text-[#1f1f1f]">
                            {review.name}
                          </h4>
                          <div className="mt-1 text-[13px] text-[#6f6961]">
                            <span>{review.guide}</span>
                            <span className="mx-1">·</span>
                            <span>{review.stats}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Yorum seçenekleri"
                        className="text-[#5f5951]"
                      >
                        <FiMoreVertical className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#f4b62c]">
                        {Array.from({ length: review.rating }).map((_, starIndex) => (
                          <FiStar key={starIndex} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[14px] text-[#6f6961]">{review.time}</span>
                    </div>

                    <p className="mt-4 text-[15px] leading-8 text-[#33302c]">
                      {review.comment}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#f0e7da] pt-4">
                      <div className="flex items-center gap-2 text-xs text-[#7a736a]">
                        <FiMapPin className="h-3.5 w-3.5" />
                        <span>{review.location}</span>
                      </div>
                      <span className="rounded-full bg-[#f8efe2] px-3 py-1 text-xs text-[#a4763c]">
                        {review.service}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#fdf9f3] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fdf9f3] to-transparent" />
            </div>
          </div>

          <div
            ref={statsRef}
            className="mt-10 grid gap-4 border-t border-[#eadcc8] pt-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            <MotionStagger className="contents" delayChildren={0.1} staggerChildren={0.08}>
              <MotionReveal className="rounded-2xl bg-[#faf3e8] p-5 text-center">
                <div className="text-3xl font-semibold text-[#b88b4c]">
                  {counts.reviews}+
                </div>
                <p className="mt-2 text-sm text-[#666057]">Yorum ve degerlendirme</p>
              </MotionReveal>
              <MotionReveal className="rounded-2xl bg-[#faf3e8] p-5 text-center">
                <div className="text-3xl font-semibold text-[#b88b4c]">
                  {counts.customers}+
                </div>
                <p className="mt-2 text-sm text-[#666057]">Mutlu misafir</p>
              </MotionReveal>
              <MotionReveal className="rounded-2xl bg-[#faf3e8] p-5 text-center">
                <div className="text-3xl font-semibold text-[#b88b4c]">
                  {counts.years}+
                </div>
                <p className="mt-2 text-sm text-[#666057]">Yillik deneyim</p>
              </MotionReveal>
              <MotionReveal className="rounded-2xl bg-[#faf3e8] p-5 text-center">
                <div className="text-3xl font-semibold text-[#b88b4c]">
                  %{counts.satisfaction}
                </div>
                <p className="mt-2 text-sm text-[#666057]">Memnuniyet orani</p>
              </MotionReveal>
            </MotionStagger>
          </div>
        </MotionReveal>
      </div>
      <style jsx>{`
        .review-track {
          animation: review-scroll 26s linear infinite;
        }

        @keyframes review-scroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default References;
