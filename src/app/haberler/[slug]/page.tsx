'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';
import { FiCalendar, FiTag, FiChevronLeft, FiShare2, FiLink, FiFacebook, FiTwitter } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';

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

const HaberDetay = () => {
  const params = useParams();
  const router = useRouter();
  const haberSlug = params.slug as string;
  const [haber, setHaber] = useState<Haber | null>(null);
  const [relatedHaberler, setRelatedHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    const fetchHaber = async () => {
      try {
        setLoading(true);
        const allNewsSnapshot = await getDocs(collection(db, 'haberler'));
        const allNews = allNewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        const foundHaber = allNews.find(h => {
          const newsSlug = createSlug(h.title);
          return newsSlug === haberSlug && h.isActive;
        });
        
        if (foundHaber) {
          setHaber(foundHaber);
          const activeNews = allNews.filter(h => h.isActive && h.id !== foundHaber.id);
          const related = activeNews
            .filter(h => h.tags && foundHaber.tags && 
              h.tags.some(tag => foundHaber.tags.includes(tag)))
            .slice(0, 3);
          
          setRelatedHaberler(related.length > 0 ? related : activeNews.slice(0, 3));
        } else {
          router.push('/haberler');
        }
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
        router.push('/haberler');
      } finally {
        setLoading(false);
      }
    };

    if (haberSlug) {
      fetchHaber();
    }
  }, [haberSlug, router]);

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = haber?.title || '';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const text = `${haber?.title || ''} ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    } catch (err) {
      console.error('Link kopyalanamadı:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[var(--text-muted)] font-medium tracking-widest text-sm">İÇERİK YÜKLENİYOR</p>
        </div>
      </div>
    );
  }

  if (!haber) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pb-24">
      {/* Hero Header */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={haber.imageUrl || "/banner/haberler_banner.png"} 
            alt={haber.title}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <MotionStagger>
            <MotionReveal>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-8 bg-white/40" />
                <span className="text-white/90 text-sm tracking-[0.3em] font-medium uppercase">
                  {haber.tags?.[0] || 'GÜZELLİK & BAKIM'}
                </span>
                <span className="h-px w-8 bg-white/40" />
              </div>
            </MotionReveal>
            
            <MotionReveal delay={0.1}>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
                {haber.title}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm tracking-widest">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-[var(--accent)]" />
                  <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                {haber.featured && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="text-[var(--accent)] font-bold">ÖNE ÇIKAN</span>
                  </div>
                )}
              </div>
            </MotionReveal>
          </MotionStagger>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-main)] to-transparent" />
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          {/* Article Section */}
          <MotionReveal y={40} delay={0.3}>
            <article className="bg-white rounded-[40px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-black/[0.03]">
              {/* Back Button */}
              <Link 
                href="/haberler" 
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm font-semibold tracking-widest mb-12 group"
              >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                GERİ DÖN
              </Link>

              {haber.subtitle && (
                <p className="text-2xl font-serif italic text-[var(--text-main)] mb-10 leading-relaxed border-l-4 border-[var(--accent)] pl-8">
                  {haber.subtitle}
                </p>
              )}

              <div 
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[var(--text-main)] prose-p:text-[var(--text-muted)] prose-p:leading-[1.8] prose-strong:text-[var(--text-main)] prose-a:text-[var(--accent)] prose-img:rounded-3xl shadow-none border-none bg-transparent p-0"
                dangerouslySetInnerHTML={{ __html: haber.content }}
              />

              {/* Tags & Share */}
              <div className="mt-20 pt-12 border-t border-black/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex flex-wrap gap-2">
                  {haber.tags?.map((tag, i) => (
                    <span key={i} className="px-5 py-2 bg-[var(--bg-soft)] text-[var(--text-muted)] text-xs font-bold tracking-widest rounded-full uppercase border border-black/[0.03]">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase">PAYLAŞ:</span>
                  <div className="flex gap-2">
                    <button onClick={shareOnFacebook} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-soft)] text-[var(--text-muted)] hover:bg-[#1877F2] hover:text-white transition-all">
                      <FiFacebook />
                    </button>
                    <button onClick={shareOnTwitter} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-soft)] text-[var(--text-muted)] hover:bg-[#1DA1F2] hover:text-white transition-all">
                      <FiTwitter />
                    </button>
                    <button onClick={shareOnWhatsApp} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-soft)] text-[var(--text-muted)] hover:bg-[#25D366] hover:text-white transition-all">
                      <IoLogoWhatsapp />
                    </button>
                    <button onClick={copyLink} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-soft)] text-[var(--text-muted)] hover:bg-[var(--accent)] hover:text-white transition-all">
                      <FiLink />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </MotionReveal>

          {/* Sidebar / Related News */}
          <aside className="space-y-12">
            <MotionReveal delay={0.4} x={30}>
              <div className="sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[var(--accent)]" />
                  <h3 className="font-serif text-2xl text-[var(--text-main)]">İlgili Haberler</h3>
                </div>

                <div className="space-y-10">
                  {relatedHaberler.map((related, idx) => (
                    <Link key={related.id} href={`/haberler/${createSlug(related.title)}`} className="group block">
                      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-5">
                        <Image 
                          src={related.imageUrl} 
                          alt={related.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <span className="text-[var(--accent)] text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">
                        {new Date(related.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                      <h4 className="font-serif text-lg text-[var(--text-main)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>

                {/* Newsletter Box / Mini CTA */}
                <div className="mt-16 p-8 rounded-[32px] bg-[linear-gradient(135deg,var(--accent),#a97d3e)] text-white">
                  <FiShare2 className="text-3xl mb-4 opacity-50" />
                  <h4 className="text-xl font-serif mb-4 leading-tight">Güzellik Sırlarını Kaçırmayın</h4>
                  <p className="text-sm text-white/80 mb-6 leading-relaxed">
                    Yeni trendler ve bakım ipuçları için bizi sosyal medyadan takip edin.
                  </p>
                  <Link 
                    href="/iletisim" 
                    className="inline-flex h-12 items-center px-6 rounded-full bg-white text-[var(--accent)] text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    RANDEVU AL
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HaberDetay;
