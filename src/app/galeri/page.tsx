'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { db } from '@/lib/firebase';

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

const itemsPerPage = 9;

const GaleriPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);

        const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryCategory[];

        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(categoriesData.filter((category) => category.isActive));

        const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
        const itemsData = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryItem[];

        itemsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setGalleryItems(itemsData.filter((item) => item.isActive));
      } catch (error) {
        console.error('Galeri verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.categoryId === selectedCategory);
  }, [galleryItems, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const featuredItems = filteredItems.filter((item) => item.isFeatured).slice(0, 3);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Genel Koleksiyon';
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-7 lg:px-10">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#cda56a] border-t-transparent" />
          <p className="mt-5 text-sm tracking-[0.18em] text-[#7c6a56]">
            GALERI HAZIRLANIYOR
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-white">
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/banner/galeri_banner1.png"
            alt="Davines Galeri"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Elegant Overlay like About Page */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,232,0.95)_0%,rgba(247,241,232,0.8)_35%,rgba(247,241,232,0.4)_60%,transparent_100%)]" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="max-w-2xl pt-[20px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#b89562]" />
              <span className="text-sm tracking-[0.3em] text-[#343434] uppercase font-medium">KOLEKSIYONUMUZ</span>
            </div>

            <h1 className="font-serif text-[64px] sm:text-[86px] leading-[0.9] text-[#111111] mb-6">
              Saç Tasarım <span className="block text-[#b78a49]">Galerisi</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#2d2d2d] leading-relaxed max-w-lg">
              Davines Hair Studio'da gerçekleştirilen dönüşümleri, modern saç tasarımlarını ve salonumuzun seçkin atmosferini keşfedin.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fafafa] py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.12),transparent_30%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a56f]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">


            <h2 className="mt-8 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
              Sanatla Buluşan
              <span className="block text-[#b88b4c]">Saç Tasarımları</span>
            </h2>


          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition-all ${selectedCategory === 'all'
                ? 'bg-[#b88b4c] text-white shadow-[0_12px_30px_rgba(184,139,76,0.25)]'
                : 'border border-[#ddc5a2] bg-white/80 text-[#9f7740] hover:bg-[#fbf3e7]'
                }`}
            >
              Tum Kareler ({galleryItems.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition-all ${selectedCategory === category.id
                  ? 'bg-[#b88b4c] text-white shadow-[0_12px_30px_rgba(184,139,76,0.25)]'
                  : 'border border-[#ddc5a2] bg-white/80 text-[#9f7740] hover:bg-[#fbf3e7]'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {featuredItems.length > 0 && selectedCategory === 'all' && (
            <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="overflow-hidden rounded-[34px] border border-[#eadcc8] bg-white/80 shadow-[0_24px_80px_rgba(124,96,54,0.08)] backdrop-blur">
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[340px]">
                    <Image
                      src={featuredItems[0].imageUrl || featuredItems[0].thumbnailUrl}
                      alt={featuredItems[0].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a16]/25 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full bg-white/88 px-4 py-2 text-xs font-medium tracking-[0.16em] text-[#9f7740] backdrop-blur">
                      ONE CIKAN KARE
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-9">
                    <div>
                      <p className="text-xs tracking-[0.16em] text-[#a17a45]">
                        {getCategoryName(featuredItems[0].categoryId)}
                      </p>
                      <h3 className="mt-4 font-serif text-3xl leading-tight text-[#171717]">
                        {featuredItems[0].title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-[#6a645d]">
                        {featuredItems[0].description || 'Salonumuzun imza tasarımlarını ve uygulama detaylarını yansıtan özel bir çalışma.'}
                      </p>
                      {featuredItems[0].tags?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {featuredItems[0].tags.slice(0, 3).map((tag) => (
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

                    <button
                      onClick={() => setSelectedItem(featuredItems[0])}
                      className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#b88b4c] px-7 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
                    >
                      Detayli Incele
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>

              <div className="space-y-6">
                {featuredItems.slice(1, 3).map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[30px] border border-[#eadcc8] bg-white/80 p-5 shadow-[0_20px_50px_rgba(124,96,54,0.07)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#f5eadc]">
                        <Image
                          src={item.thumbnailUrl || item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs tracking-[0.14em] text-[#a17a45]">
                          {getCategoryName(item.categoryId)}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-[#1e1e1e]">
                          {item.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#676058]">
                          {item.description || 'Saç tasarım seanslarımızdan seçilen zarif ve ilham veren bir detay.'}
                        </p>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#a4763c] transition-colors hover:text-[#8f6734]"
                        >
                          Buyuterek Gor
                          <FiArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-[34px] border border-[#eadcc8] bg-white/70 p-6 shadow-[0_24px_80px_rgba(124,96,54,0.08)] backdrop-blur sm:p-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-[#eadcc8] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#b18449]">
                  Gorsel Arsiv
                </p>
                <h3 className="mt-2 font-serif text-3xl text-[#1a1a1a]">
                  {selectedCategory === 'all' ? 'Tum Kareler' : getCategoryName(selectedCategory)}
                </h3>
              </div>
              <div className="rounded-full border border-[#ead6b9] bg-[#faf4ec] px-4 py-2 text-sm text-[#a17a45]">
                {filteredItems.length} gorsel bulundu
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#e1cfb6] bg-[#fffaf4] px-6 py-16 text-center">
                <div className="text-5xl">🖼️</div>
                <h3 className="mt-5 font-serif text-3xl text-[#1f1f1f]">Bu koleksiyonda gorsel yok</h3>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#6a645d]">
                  Secili kategori icin henuz gorsel eklenmemis. Dilerseniz tum karelere
                  donerek diger secimleri inceleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentItems.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-[30px] border border-[#efe4d5] bg-[#fffdfa] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4b183] hover:shadow-[0_24px_40px_rgba(184,139,76,0.12)]"
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="block w-full text-left"
                    >
                      <div className="relative h-80 overflow-hidden bg-[#f5eadc]">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl text-[#d4b183]">
                            ✦
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a16]/35 via-transparent to-transparent opacity-90" />
                        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/88 text-[#a4763c] shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-105">
                          <FiEye className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-serif text-2xl text-[#1f1f1f]">
                          {item.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#645f58]">
                          {item.description || 'Salonumuzdaki uygulamalardan seçilen zarif ve ilham veren bir kare.'}
                        </p>
                        {item.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.slice(0, 2).map((tag) => (
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
                    </button>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${currentPage === 1
                      ? 'cursor-not-allowed bg-[#f4ede3] text-[#c7b7a1]'
                      : 'border border-[#ddc5a2] bg-white text-[#9f7740] hover:bg-[#fbf3e7]'
                      }`}
                  >
                    <FiChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`flex h-11 min-w-[44px] items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${currentPage === page
                        ? 'bg-[#b88b4c] text-white shadow-[0_12px_30px_rgba(184,139,76,0.2)]'
                        : 'border border-[#ddc5a2] bg-white text-[#9f7740] hover:bg-[#fbf3e7]'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${currentPage === totalPages
                      ? 'cursor-not-allowed bg-[#f4ede3] text-[#c7b7a1]'
                      : 'border border-[#ddc5a2] bg-white text-[#9f7740] hover:bg-[#fbf3e7]'
                      }`}
                  >
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(191,151,96,0.10),transparent_28%)]" />

        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-7 lg:px-10">
          <div className="rounded-[34px] border border-[#e7d5bf] bg-[linear-gradient(90deg,rgba(255,255,255,0.82),rgba(249,239,226,0.96))] p-8 shadow-[0_20px_50px_rgba(124,96,54,0.06)] sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#b18449]">
              Randevu ve Bilgi
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[#1f1f1f] sm:text-5xl">
              Sizi de bu deneyimin bir parcasi olmaya davet ediyoruz
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#655f57] sm:text-lg">
              Galeride gördüğünüz saç tasarımları hakkında bilgi almak veya size özel
              stil danışmanlığı için bizimle iletişime geçebilirsiniz.
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
                href="/hizmetlerimiz"
                className="inline-flex items-center justify-center rounded-full border border-[#d7b687] bg-white/70 px-8 py-4 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
              >
                Hizmetleri Inceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1f1710]/70 p-4 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[34px] border border-[#eadcc8] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between border-b border-[#f0e6d8] px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs tracking-[0.16em] text-[#a17a45]">
                  {getCategoryName(selectedItem.categoryId)}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[#1f1f1f] sm:text-3xl">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadcc8] text-[#8d7b67] transition-colors hover:bg-[#fbf3e7] hover:text-[#a4763c]"
              >
                ✕
              </button>
            </div>

            <div className="grid max-h-[calc(88vh-96px)] overflow-y-auto lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[320px] bg-[#f5eadc] lg:min-h-[620px]">
                {selectedItem.imageUrl ? (
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl text-[#d4b183]">
                    ✦
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm leading-8 text-[#655f57]">
                  {selectedItem.description || 'Salonumuzun saç tasarım stilini ve uygulama detaylarını yansıtan özel bir kare.'}
                </p>

                {selectedItem.tags?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ead6b9] bg-[#faf4ec] px-3 py-1 text-xs text-[#a17a45]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 rounded-[28px] bg-[#faf3e8] p-5">
                  <p className="text-xs tracking-[0.16em] text-[#a67a42]">SALON STİLİ</p>
                  <p className="mt-3 text-sm leading-7 text-[#645e56]">
                    Doğal sonuç, konforlu deneyim ve özenli hizmet anlayışımız galerimizin
                    her köşesinde aynı zarif dili korur.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#b88b4c] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-[#a4763c]"
                  >
                    Randevu Planla
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center justify-center rounded-full border border-[#d7b687] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#a4763c] transition-colors hover:bg-[#fbf3e7]"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GaleriPage;
