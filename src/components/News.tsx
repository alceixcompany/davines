'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

interface Haber {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const News = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Haber[];

        const activeNews = newsData.filter((haber) => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        setHaberler(activeNews.slice(0, 3));
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f8f2e9] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#cda56a] border-t-transparent" />
            <p className="mt-4 text-sm tracking-[0.16em] text-[#7c6a56]">
              GUNCEL ICERIKLER HAZIRLANIYOR
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return null;
  }

  const [featuredNews, ...otherNews] = haberler;

  return (
    <section className="relative overflow-hidden bg-[#f8f2e9] py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(194,157,103,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          

          <h2 className="mt-8 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
            Guzellik dunyasindan ilham veren
            <span className="block text-[#b88b4c]">bakim ve trend icerikleri</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#60584f]">
            Merkezimizde uyguladigimiz bakim yaklasimlari, sezonun one cikan
            onerileri ve guzellik rutinlerinize eslik edecek pratik bilgiler.
          </p>
        </MotionReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal className="overflow-hidden rounded-[34px] border border-[#eadcc8] bg-white/80 shadow-[0_24px_80px_rgba(124,96,54,0.08)] backdrop-blur" x={-24}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px]">
                {featuredNews.imageUrl ? (
                  <Image
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full min-h-[320px] items-center justify-center bg-[linear-gradient(135deg,#f3e7d6,#fbf6ef)] text-6xl text-[#c79e62]">
                    ✦
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a16]/25 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-white/88 px-4 py-2 text-xs font-medium tracking-[0.16em] text-[#9f7740] backdrop-blur">
                  ONE CIKAN YAZI
                </div>
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-9">
                <div>
                  <p className="text-sm tracking-[0.12em] text-[#a17a45]">
                    {new Date(featuredNews.createdAt).toLocaleDateString('tr-TR')}
                  </p>

                  <h3 className="mt-4 font-serif text-3xl leading-tight text-[#171717]">
                    {featuredNews.title}
                  </h3>

                  {featuredNews.subtitle && (
                    <p className="mt-4 text-base leading-7 text-[#5e574f]">
                      {featuredNews.subtitle}
                    </p>
                  )}

                  <p className="mt-5 text-sm leading-7 text-[#6a645d]">
                    {featuredNews.description}
                  </p>

                  {featuredNews.tags && featuredNews.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featuredNews.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#ead6b9] bg-[#faf4ec] px-3 py-1 text-xs text-[#a17a45]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Link
                    href={`/haberler/${createSlug(featuredNews.title)}`}
                    className="inline-flex items-center gap-3 rounded-full bg-[#b88b4c] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
                  >
                    Yaziyi Oku
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionStagger className="space-y-6" delayChildren={0.1} staggerChildren={0.1}>
            {otherNews.map((haber) => (
              <MotionReveal
                key={haber.id}
                className="rounded-[30px] border border-[#eadcc8] bg-white/80 p-5 shadow-[0_20px_50px_rgba(124,96,54,0.07)] transition-transform duration-300 hover:-translate-y-1"
                x={24}
              >
                <div className="flex gap-4">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#f5eadc]">
                    {haber.imageUrl ? (
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl text-[#c79e62]">
                        ✦
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs tracking-[0.14em] text-[#a17a45]">
                      {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                    </p>

                    <Link href={`/haberler/${createSlug(haber.title)}`}>
                      <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-[#1e1e1e] transition-colors hover:text-[#b88b4c]">
                        {haber.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#676058]">
                      {haber.description}
                    </p>

                    <Link
                      href={`/haberler/${createSlug(haber.title)}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#a4763c] transition-colors hover:text-[#8f6734]"
                    >
                      Devamini Oku
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </MotionStagger>
        </div>

        <MotionReveal className="mt-14 text-center">
          <Link
            href="/haberler"
            className="inline-flex items-center justify-center rounded-full border border-[#d7b687] bg-white/70 px-8 py-3 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
          >
            Tum Icerikleri Gor
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
};

export default News;
