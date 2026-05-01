'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const Gallery = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];

        // Client-side sorting
        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(categoriesData);

        // Fetch gallery items
        const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
        const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];

        // Filter active items, sort by order, and take only the latest 6
        const activeItems = itemsData.filter(item => item.isActive);
        activeItems.sort((a, b) => (a.order || 0) - (b.order || 0));
        const latestItems = activeItems.slice(0, 3);

        setGalleryItems(latestItems);

      } catch (error) {
        console.error('Galeri verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  useEffect(() => {
    if (galleryItems.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [galleryItems.length]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Kategori Yok';
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const getWrappedIndex = (index: number) => {
    if (galleryItems.length === 0) {
      return 0;
    }

    return (index + galleryItems.length) % galleryItems.length;
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 pt-[10px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Galeri yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return null; // Don't show anything if no gallery items
  }

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(191,151,96,0.1),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        {/* Header */}
        <MotionReveal className="mx-auto max-w-3xl text-center mb-16 pt-[10px]">


          <h2 className="font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
            Saçlarınıza ilham veren
            <span className="block text-[#b88b4c]">gerçek dönüşümler</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#60584f]">
            Salonumuzda gerçekleştirdiğimiz özel saç tasarım süreçlerinden seçilmiş en özel kareler.
          </p>
        </MotionReveal>

        {/* Gallery Slider */}
        <MotionReveal className="relative mx-auto max-w-4xl">
          <div className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[460px]">
            {galleryItems.map((item, index) => {
              const diff = index - currentIndex;
              const wrappedDiff =
                diff > 1 ? diff - galleryItems.length : diff < -1 ? diff + galleryItems.length : diff;
              const isActive = wrappedDiff === 0;
              const isLeft = wrappedDiff === -1;
              const isRight = wrappedDiff === 1;

              let cardClasses =
                'group pointer-events-none absolute top-1/2 left-1/2 w-[58%] max-w-[640px] -translate-y-1/2 overflow-hidden rounded-[30px] border border-[#eadcc8]/60 bg-white shadow-[0_20px_50px_rgba(124,96,54,0.12)] transition-all duration-700 ease-out';
              let transformStyle = 'translate(-50%, -50%) scale(0.78)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                cardClasses =
                  'group pointer-events-auto absolute top-1/2 left-1/2 w-[58%] max-w-[640px] -translate-y-1/2 overflow-hidden rounded-[30px] border border-[#eadcc8]/60 bg-white shadow-[0_20px_50px_rgba(124,96,54,0.12)] transition-all duration-700 ease-out';
                transformStyle = 'translate(-50%, -50%) scale(1)';
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                transformStyle = 'translate(calc(-50% - 24%), -50%) scale(0.86)';
                opacity = 0.42;
                zIndex = 20;
              } else if (isRight) {
                transformStyle = 'translate(calc(-50% + 24%), -50%) scale(0.86)';
                opacity = 0.42;
                zIndex = 20;
              }

              return (
                <article
                  key={item.id}
                  className={cardClasses}
                  style={{
                    transform: transformStyle,
                    opacity,
                    zIndex,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="block w-full text-left"
                  >
                    <div className="relative h-[300px] sm:h-[340px] lg:h-[380px]">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 58vw, 36vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#fdfaf5]">
                          <span className="text-6xl opacity-20">📷</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-2 text-[11px] font-medium tracking-[0.18em] text-[#9f7740] backdrop-blur sm:left-5 sm:top-5">
                        {getCategoryName(item.categoryId)}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 group-hover:translate-y-0 translate-y-[58%] sm:p-6">
                        <p className="text-[11px] tracking-[0.24em] text-white/80">
                          CALISMA ORNEGI
                        </p>
                        <h3 className="mt-2 font-serif text-xl sm:text-2xl">
                          {item.title}
                        </h3>

                        <div className="mt-3 max-w-lg text-sm leading-6 text-white/88 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {item.description ? (
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          ) : (
                            <p>Detaylari gormek icin karta tiklayin.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-10 bg-[#b18449]' : 'w-2.5 bg-[#dbc29d]'
                  }`}
              />
            ))}
          </div>

          {galleryItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous slide"
                className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#8f6734] shadow-lg backdrop-blur transition hover:bg-white sm:left-3"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next slide"
                className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#8f6734] shadow-lg backdrop-blur transition hover:bg-white sm:right-3"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </MotionReveal>

        {/* View All Button */}
        <MotionReveal className="text-center mt-20">
          <Link
            href="/galeri"
            className="inline-flex items-center group relative"
          >
            <div className="relative z-10 bg-[#b18449] hover:bg-[#a4763c] text-white px-12 py-5 rounded-full font-bold tracking-[0.1em] text-sm transition-all duration-300 shadow-xl shadow-[#b18449]/20 flex items-center gap-4">
              TÜM GALERİYİ KEŞFEDİN
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Gallery;
