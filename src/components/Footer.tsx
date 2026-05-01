'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { siteConfig } from '@/lib/siteConfig';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-[var(--bg-soft)] text-[var(--text-main)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(191,151,96,0.10),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="border-t border-[#e1cfb6]/80 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
            <div>
              <Image
                src="/davines_logo.png"
                alt="Davines Logo"
                width={190}
                height={76}
                className="h-12 w-auto"
              />
              <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
                {siteConfig.businessCategory} kategorisinde, Kent-2
                lokasyonunda randevu odakli hizmet veriyoruz. Hizmet, ulasim ve
                calisma gunleri bilgilerine buradan hizlica ulasabilirsiniz.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={`tel:${siteConfig.primaryPhoneHref}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-white/70 text-[var(--accent)] transition-colors hover:bg-[var(--bg-main)]"
                  title="Cep Telefonu"
                >
                  <FiPhone className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${siteConfig.secondaryPhoneHref}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-white/70 text-[var(--accent)] transition-colors hover:bg-[var(--bg-main)]"
                  title="Sabit Hat"
                >
                  <FiPhone className="h-4 w-4" />
                </a>
                <a
                  href="/iletisim"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-white/70 text-[var(--accent)] transition-colors hover:bg-[var(--bg-main)]"
                  title="Calisma Saatleri"
                >
                  <FiClock className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--text-main)]">Sayfalar</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--text-muted)]">
                <li>
                  <Link href="/" className="transition-colors hover:text-[var(--accent)]">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="transition-colors hover:text-[var(--accent)]">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetlerimiz" className="transition-colors hover:text-[var(--accent)]">
                    Hizmetlerimiz
                  </Link>
                </li>
                <li>
                  <Link href="/galeri" className="transition-colors hover:text-[var(--accent)]">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="transition-colors hover:text-[var(--accent)]">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--text-main)]">Hizmetler</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--text-muted)]">
                <li>Sac kesimi ve sekillendirme</li>
                <li>Profesyonel fon uygulamalari</li>
                <li>Sac boyama ve renk yenileme</li>
                <li>Bakim ve onarim ritüelleri</li>
                <li>Ozel gun sac tasarimi</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[var(--text-main)]">İletişim</h3>
              <ul className="mt-5 space-y-4 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-1 h-4 w-4 text-[var(--accent)]" />
                  <span>{siteConfig.addressLine}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="h-4 w-4 text-[var(--accent)]" />
                  <a href={`tel:${siteConfig.primaryPhoneHref}`} className="transition-colors hover:text-[var(--accent)]">
                    {siteConfig.primaryPhoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="h-4 w-4 text-[var(--accent)]" />
                  <a href={`tel:${siteConfig.secondaryPhoneHref}`} className="transition-colors hover:text-[var(--accent)]">
                    {siteConfig.secondaryPhoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiClock className="mt-1 h-4 w-4 text-[var(--accent)]" />
                  <span>{siteConfig.workingHours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e1cfb6]/80 py-6">
          <div className="flex flex-col gap-3 text-center text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © 2025 <span className="font-medium text-[var(--accent)]">{siteConfig.brandName}</span>. Tum haklari saklidir.
            </p>

            <div className="flex items-center justify-center gap-5 md:justify-end">
              <a
                href="https://www.alceix.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)]"
              >
                Hakları Alceix tarafından saklıdır
              </a>
              <Link href="/hakkimizda" className="transition-colors hover:text-[var(--accent)]">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="transition-colors hover:text-[var(--accent)]">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
