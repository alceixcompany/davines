'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiCheckCircle, FiHeart, FiShield, FiClock } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/banner/hero_banner.png"
            alt="Davines Hair Studio"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,232,0.95)_0%,rgba(247,241,232,0.8)_35%,rgba(247,241,232,0.4)_60%,transparent_100%)]" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-[20px]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#b89562]" />
              <span className="text-sm tracking-[0.3em] text-[#343434] uppercase font-medium">Biz Kimiz?</span>
            </div>

            <h1 className="font-serif text-[64px] sm:text-[86px] leading-[0.9] text-[#111111] mb-6">
              Zarafetin <span className="block text-[#b78a49]">Hikayesi</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#2d2d2d] leading-relaxed max-w-lg">
              Saç tasarımında modern teknikler ve kişiye özel dokunuşlarla, stilinizi yeniden keşfedebileceğiniz lüks bir salon deneyimi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(184,149,98,0.1),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl text-[#b78a49] shadow-sm mb-8">
                <FiHeart className="w-6 h-6" />
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl text-[#111111] mb-8 leading-tight">
                Davines <span className="text-[#b78a49]">Hair Studio</span>
              </h2>

              <div className="space-y-6 text-[#60584f] text-[17px] leading-relaxed">
                <p>
                  Davines, misafirlerine kendini özel hissettiren bir kuaför deneyimi sunma hayaliyle yola çıktı. Kurulduğumuz günden bu yana profesyonel uygulamaları sıcak bir karşılama, yüksek hijyen standartları ve kişisel ilgiyle harmanlıyoruz.
                </p>
                <p>
                  Bugün uzman ekibimizle saç kesimi, renklendirme, profesyonel bakım ve şekillendirme alanlarında kişiye özel çözümler sunuyoruz. Her randevuda doğal sonuç, konforlu süreç ve sürdürülebilir memnuniyet odağımızı koruyoruz.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-serif text-[#b78a49] mb-1">15+</div>
                  <div className="text-xs tracking-widest text-[#343434] uppercase font-bold">Yıl Deneyim</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-[#b78a49] mb-1">5000+</div>
                  <div className="text-xs tracking-widest text-[#343434] uppercase font-bold">Mutlu Danışan</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border border-[#eadcc8] shadow-2xl">
                <Image
                  src="/p_1.png"
                  alt="Davines saç tasarım felsefesi"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#b78a49]/20 rounded-[56px] -z-10 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-[32px] shadow-xl hidden sm:block border border-[#eadcc8]">
                <p className="font-serif text-[#b78a49] text-xl mb-1">“Güzellik, özgüvenle başlar.”</p>
                <p className="text-xs tracking-widest text-[#60584f] uppercase">Davines Stil Felsefesi</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white/50 backdrop-blur-sm relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 sm:p-14 rounded-[40px] bg-white border border-[#eadcc8] shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#b78a49]">
                <FiTarget className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#111111] mb-6">Misyonumuz</h3>
              <p className="text-[#60584f] leading-relaxed text-[17px]">
                Sağlıklı saçlar ve estetik görünüme odaklanarak kişiye özel bir saç tasarım kültürü oluşturmak. Uzman kadromuzla her misafirimizin yüz hatlarını ve saç yapısını doğru analiz edip, en yakışan ve modern sonuçları sunmak temel görevimizdir.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 sm:p-14 rounded-[40px] bg-white border border-[#eadcc8] shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#b78a49]">
                <FiEye className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#111111] mb-6">Vizyonumuz</h3>
              <p className="text-[#60584f] leading-relaxed text-[17px]">
                Saç tasarımı ve stil danışmanlığı alanında zarafetiyle ilham veren, en yeni trendleri profesyonel hizmet anlayışıyla birleştiren ve misafirlerimizin saçlarına dair her konuda ilk tercihi olan lider bir salon haline gelmek.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block h-px w-20 bg-[#b89562] mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl text-[#111111] mb-4">Değerlerimiz</h2>
            <p className="text-[#60584f] tracking-widest uppercase text-xs font-bold">Bizi biz yapan prensiplerimiz</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {[
              { icon: FiShield, title: "Güvenlik", desc: "En yüksek hijyen ve güvenlik standartları." },
              { icon: FiCheckCircle, title: "Kalite", desc: "Onaylı ürünler ve uzman uygulamalar." },
              { icon: FiClock, title: "Zaman", desc: "Randevu sadakati ve özenli süreçler." },
              { icon: FiHeart, title: "Tutku", desc: "İşimize duyduğumuz derin sevgi ve ilgi." }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 text-[#b78a49] shadow-sm border border-[#eadcc8]">
                  <value.icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-[#111111] mb-2">{value.title}</h4>
                <p className="text-sm text-[#60584f] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[40px] bg-white border border-[#eadcc8] shadow-[0_30px_80px_rgba(124,96,54,0.06)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAFAFA] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative p-10 sm:p-16 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-5">
              Stilinizi Keşfetmeye <span className="text-[#b78a49]">Hazır mısınız?</span>
            </h2>
            <p className="text-[#60584f] text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Size özel saç tasarım planı oluşturmak ve profesyonel çözümlerimizle tanışmak için ekibimizle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="bg-[#b78a49] text-white px-9 py-4 rounded-full font-bold tracking-[0.15em] text-xs sm:text-sm hover:bg-[#a97d3e] transition-all shadow-[0_15px_30px_rgba(183,138,73,0.15)] active:scale-[0.98]"
              >
                İLETİŞİME GEÇİN
              </Link>
              <a
                href="tel:+905302387599"
                className="border border-[#d7b687] text-[#a4763c] px-9 py-4 rounded-full font-bold tracking-[0.15em] text-xs sm:text-sm hover:bg-[#FAFAFA] transition-all active:scale-[0.98]"
              >
                HEMEN ARA
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
