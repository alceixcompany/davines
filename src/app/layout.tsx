import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: '--font-playfair',
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  variable: '--font-dancing',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  keywords: [
    "davines",
    "health beauty",
    "guzellik merkezi",
    "kent-2 guzellik",
    "30 agustos mahallesi guzellik",
    "izmir guzellik merkezi",
    "randevu",
    "iletisim",
    "0530 238 75 99",
    "0232 202 80 60"
  ].join(", "),
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  publisher: siteConfig.brandName,
  robots: "index, follow",
  alternates: {
    canonical: siteConfig.siteUrl
  },
  category: "health/beauty",
  classification: "Business",
  other: {
    "geo.region": siteConfig.region,
    "geo.placename": `${siteConfig.city}, Turkiye`,
    "business:contact_data:street_address": siteConfig.addressLine,
    "business:contact_data:locality": siteConfig.city,
    "business:contact_data:phone_number": siteConfig.primaryPhoneDisplay,
    "business:contact_data:website": siteConfig.siteUrl,
  },
  icons: {
    icon: [
      { url: '/browser_icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/browser_icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/browser_icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/browser_icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/browser_icon.png', sizes: '128x128', type: 'image/png' },
      { url: '/browser_icon.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/browser_icon.png',
    apple: [
      { url: '/browser_icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/browser_icon.png' },
    ],
  },
  openGraph: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    type: "website",
    locale: "tr_TR",
    siteName: siteConfig.brandName,
    url: siteConfig.siteUrl,
    images: [
      {
        url: '/davines_logo',
        width: 1200,
        height: 630,
        alt: siteConfig.brandName
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brandName,
    description: siteConfig.ogDescription,
    images: ['/davines_logo']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WMRRXTMT');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C0CDXP5F4H"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C0CDXP5F4H');
              gtag('config', 'AW-16813075076');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              name: siteConfig.brandName,
              url: siteConfig.siteUrl,
              description: siteConfig.metaDescription,
              telephone: siteConfig.primaryPhoneDisplay,
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.addressLine,
                addressLocality: siteConfig.city,
                addressCountry: 'TR',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: siteConfig.primaryPhoneDisplay,
                  contactType: 'customer service',
                },
                {
                  '@type': 'ContactPoint',
                  telephone: siteConfig.secondaryPhoneDisplay,
                  contactType: 'customer service',
                },
              ],
              openingHours: 'Mo,We,Th,Fr,Sa,Su',
              areaServed: siteConfig.city,
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WMRRXTMT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
