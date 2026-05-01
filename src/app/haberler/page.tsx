'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FiArrowRight, FiCalendar, FiTag, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        setHaberler(activeNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(haberler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = haberler.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    try {
      setIsSubscribing(true);
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
        isActive: true,
        source: 'haberler_sayfasi'
      });
      setSubscriptionStatus('success');
      setSubscriptionMessage('E-posta adresiniz başarıyla kaydedildi! Teşekkürler.');
      setEmail('');
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setSubscriptionMessage('');
      }, 5000);
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#b78a49] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#60584f] font-medium tracking-widest uppercase text-xs">Icerikler Yukleniyor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/banner/haberler_banner.png"
            alt="Davines haberler"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Elegant Overlay Layered with Hero style */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,232,0.95)_0%,rgba(247,241,232,0.8)_35%,rgba(247,241,232,0.4)_60%,transparent_100%)]" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
        
        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="max-w-2xl pt-[20px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#b89562]" />
              <span className="text-sm tracking-[0.3em] text-[#343434] uppercase font-medium">Saç Tasarım Günlüğü</span>
            </div>
            
            <h1 className="font-serif text-[64px] sm:text-[86px] leading-[0.9] text-[#111111] mb-6">
              Haberler <span className="block text-[#b78a49]">& Duyurular</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#2d2d2d] leading-relaxed max-w-lg mb-10">
              Saç tasarımı dünyasından en son trendler, stil sırları ve salonumuzdaki yeniliklerden haberdar olun.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-24 sm:py-32">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(184,149,98,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(184,149,98,0.08),transparent_70%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          {haberler.length === 0 ? (
            <div className="text-center py-20 bg-white/40 rounded-[40px] border border-[#eadcc8] backdrop-blur-sm">
              <span className="text-6xl block mb-6">✦</span>
              <h3 className="font-serif text-2xl text-[#111111] mb-2">Henüz yazı bulunmuyor</h3>
              <p className="text-[#60584f]">Yakında sizin için harika saç tasarım ve bakım içerikleri hazırlayacağız.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-16">
              {currentNews.map((haber, index) => (
                <motion.article
                  key={haber.id}
                  className="group flex flex-col gap-8"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-[#eadcc8] bg-white shadow-[0_20px_50px_rgba(124,96,54,0.06)]">
                    {haber.imageUrl ? (
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[linear-gradient(135deg,#f3e7d6,#fbf6ef)] flex items-center justify-center text-5xl text-[#c79e62]">
                        ✦
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-[#9f7740] text-[11px] font-bold tracking-[0.15em] px-4 py-2 rounded-full shadow-sm uppercase">
                        {haber.tags?.[0] || 'Saç Tasarımı'}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="px-2">
                    <div className="flex items-center gap-4 text-xs tracking-widest text-[#a17a45] mb-4 uppercase">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-3.5 h-3.5" />
                        <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>

                    <Link href={`/haberler/${createSlug(haber.title)}`}>
                      <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-4 hover:text-[#b78a49] transition-colors leading-tight">
                        {haber.title}
                      </h2>
                    </Link>

                    <p className="text-[#60584f] leading-[1.8] line-clamp-3 mb-8 text-[17px]">
                      {haber.description}
                    </p>

                    <Link 
                      href={`/haberler/${createSlug(haber.title)}`}
                      className="inline-flex items-center gap-3 text-[#b78a49] font-semibold tracking-widest uppercase text-xs group/link"
                    >
                      Devamını Oku 
                      <span className="h-px w-8 bg-[#b78a49] transition-all group-hover/link:w-12" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full border border-[#d7b687] flex items-center justify-center text-[#a4763c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all"
              >
                <FiArrowRight className="rotate-180" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-full font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#b78a49] text-white shadow-lg'
                        : 'border border-[#d7b687] text-[#a4763c] hover:bg-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-full border border-[#d7b687] flex items-center justify-center text-[#a4763c] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all"
              >
                <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="pb-24 px-5">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[40px] bg-white border border-[#eadcc8] shadow-[0_30px_70px_rgba(124,96,54,0.06)]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FAFAFA] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FAFAFA] rounded-xl text-[#b78a49] mb-6">
                <FiMail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-3">
                Bültenimize Abone Olun
              </h3>
              <p className="text-[#60584f] leading-relaxed text-sm sm:text-base">
                Size özel tekliflerden, yeni hizmetlerimizden ve saç tasarım ipuçlarından ilk siz haberdar olun.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubscription} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                  disabled={isSubscribing}
                />
              </div>
              <button 
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-[#b78a49] text-white py-4 rounded-full font-bold tracking-[0.15em] text-xs hover:bg-[#a97d3e] transition-all shadow-[0_15px_30px_rgba(183,138,73,0.12)] active:scale-[0.98]"
              >
                {isSubscribing ? 'KAYDEDİLİYOR...' : 'ŞİMDİ KAYDOL'}
              </button>
              
              {subscriptionMessage && (
                <p className={`text-center text-xs font-medium mt-1 ${
                  subscriptionStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subscriptionMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
