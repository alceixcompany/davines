'use client'
import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { MotionReveal, MotionStagger } from '@/components/MotionReveal';

const faqs = [
  {
    question: 'Ilk kuafor randevusu oncesinde sacimi nasil hazirlamaliyim?',
    answer:
      'Isleme gore yonlendirme yapiyoruz. Sac kesimi ve fon icin normal sekilde gelmeniz yeterli olur. Renk islemlerinde ise sacinizda yakin tarihte yapilan uygulamalari bizimle paylasmaniz dogru planlama icin faydali olur.',
  },
  {
    question: 'Yuz seklime ve tarzima uygun sac kesimini nasil belirliyorsunuz?',
    answer:
      'Randevu basinda sac yapinizi, yuz hatlarinizi ve gunluk kullanim aliskanliginizi degerlendiriyoruz. Boylece hem sizi yormayan hem de size yakisan bir kesim ve sekillendirme oneriyoruz.',
  },
  {
    question: 'Sac boyama ve renk yenilemede dogal gorunum saglanir mi?',
    answer:
      'Evet. Renk seciminde ten tonu, mevcut sac zemini ve istediginiz gorunum birlikte degerlendirilir. Amacimiz sacinizla uyumlu, temiz ve dogal duran bir sonuc elde etmektir.',
  },
  {
    question: 'Fon ve sekillendirme ne kadar kalici olur?',
    answer:
      'Kalicilik sac telinizin yapisina, hava kosullarina ve uygulama sonrasindaki kullanim sekline gore degisir. Daha uzun sure formunu korumasi icin size uygun urun ve kullanim onerileri de paylasiyoruz.',
  },
  {
    question: 'Yipranmis saclar icin bakim uygulamasi oneriyor musunuz?',
    answer:
      'Evet. Sacin nem, parlaklik ve yumusaklik ihtiyacina gore bakim adimlari planliyoruz. Islem gormus veya kuru saclarda onarim ve destekleyici bakimlarla daha saglikli bir gorunum hedefliyoruz.',
  },
  {
    question: 'Randevu degisikligi veya iptal yapabilir miyim?',
    answer:
      'Elbette. Mumkun oldugunca erken haber vermeniz yeterli. Uygunluk durumuna gore yeni bir saat planlayarak sizi bekletmeden sureci birlikte duzenliyoruz.',
  },
] as const;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#fcf6ee] py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(191,151,96,0.10),transparent_28%)]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-7 lg:px-10">
        <MotionReveal className="mx-auto max-w-3xl text-center">


          <h2 className="mt-8 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
            Akliniza takilan sorular icin
            <span className="block text-[#b88b4c]">kuafore ozel net yanitlar</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f5a54]">
            Sac kesimi, renk uygulamalari, fon, bakim ve randevu sureciyle
            ilgili en cok merak edilen konulari sizin icin bir araya getirdik.
          </p>
        </MotionReveal>

        <MotionStagger className="mt-14 space-y-3" delayChildren={0.08} staggerChildren={0.08}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <MotionReveal
                key={faq.question}
                className={`overflow-hidden rounded-[28px] border bg-white/80 shadow-[0_18px_40px_rgba(124,96,54,0.05)] transition-all duration-300 ${isActive ? 'border-[#dcb889]' : 'border-[#ece0d0]'
                  }`}
                delay={index * 0.03}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                >
                  <h3 className="text-base font-medium leading-7 text-[#1f1f1f] sm:text-lg">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive
                        ? 'border-[#dcb889] bg-[#f8efe2] text-[#b88b4c]'
                        : 'border-[#ece0d0] bg-white text-[#8b8378]'
                      }`}
                  >
                    <FiChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'rotate-180' : ''
                        }`}
                    />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#f1e7da] px-5 pb-5 pt-4 sm:px-7">
                      <p className="max-w-4xl text-sm leading-7 text-[#645d56]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
};

export default FAQ;
