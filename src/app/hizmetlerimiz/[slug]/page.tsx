import React from 'react';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';

// Services data - JSON'dan gelecek
const servicesData = {
  'cilt-bakimi': {
    id: 'cilt-bakimi',
    title: 'Cilt Bakımı',
    icon: '✨',
    description: 'Cildinizin ihtiyacına uygun arındırma, nemlendirme ve canlandırma uygulamaları.',
    heroImage: '/banner/guzelik_merkezi.png',
    features: [
      'Kişisel cilt analizi',
      'Derin temizlik uygulaması',
      'Nem ve denge desteği',
      'Aydınlık görünüm hedefi',
      'Hassas ciltlere özel plan',
      'Bakım sonrası öneriler'
    ],
    detailedInfo: {
      overview: 'Cilt bakımı hizmetimiz, cildinizin mevcut durumunu analiz ederek ihtiyacınıza uygun profesyonel bir rutin oluşturmak için tasarlanmıştır.',
      whyChoose: [
        'Kişiye özel bakım planı',
        'Nazik ama etkili uygulama adımları',
        'Hijyen ve konfor odaklı süreç',
        'Bakım sonrası yönlendirme',
        'Doğal ışıltıyı destekleyen sonuç'
      ],
      process: [
        { step: 1, title: 'Cilt Analizi', description: 'Cildinizin ihtiyacını birlikte belirliyoruz' },
        { step: 2, title: 'Bakım Planı', description: 'Size uygun uygulama adımlarını planlıyoruz' },
        { step: 3, title: 'Profesyonel Uygulama', description: 'Konforlu ve özenli bir seans gerçekleştiriyoruz' },
        { step: 4, title: 'Takip Önerileri', description: 'Seans sonrasında ev bakımı için yönlendirme sunuyoruz' }
      ]
    },
    gallery: [
      '/banner/guzelik_merkezi.png',
      '/img/philosophy.png',
      '/davines_logo.png'
    ]
  },
  'lazer-epilasyon': {
    id: 'lazer-epilasyon',
    title: 'Lazer Epilasyon',
    icon: '🌿',
    description: 'Modern cihazlarla planlanan, konforlu ve düzenli takipli lazer epilasyon seansları.',
    heroImage: '/banner/guzelik_merkezi.png',
    features: [
      'Bölgesel uygulama seçenekleri',
      'Kişiye uygun seans planlaması',
      'Konfor odaklı uygulama',
      'Düzenli takip süreci',
      'Cilt tipi değerlendirmesi',
      'Seans sonrası bilgilendirme'
    ],
    detailedInfo: {
      overview: 'Lazer epilasyon hizmetimiz, cilt yapınızı ve beklentilerinizi dikkate alarak düzenli ve kontrollü bir süreç sunar.',
      whyChoose: [
        'Modern cihaz desteği',
        'Kişisel seans takvimi',
        'Konforlu uygulama akışı',
        'Süreç boyunca bilgilendirme',
        'Düzenli takip ve geri bildirim'
      ],
      process: [
        { step: 1, title: 'Ön Görüşme', description: 'Cilt yapısı ve beklentiler değerlendirilir' },
        { step: 2, title: 'Seans Planlama', description: 'Bölgeye uygun uygulama takvimi oluşturulur' },
        { step: 3, title: 'Uygulama', description: 'Kontrollü ve konforlu bir seans gerçekleştirilir' },
        { step: 4, title: 'Takip', description: 'Bir sonraki seans ve bakım önerileri paylaşılır' }
      ]
    },
    gallery: [
      '/banner/guzelik_merkezi.png',
      '/img/philosophy.png',
      '/davines_logo.png'
    ]
  },
  'kas-ve-kirpik': {
    id: 'kas-ve-kirpik',
    title: 'Kaş ve Kirpik',
    icon: '👁️',
    description: 'Yüzünüze uyumlu, doğal ama belirgin sonuç veren kaş ve kirpik uygulamaları.',
    heroImage: '/banner/guzelik_merkezi.png',
    features: [
      'Kaş tasarımı',
      'Kaş şekillendirme',
      'Kirpik bakımı',
      'Doğal ifade desteği',
      'Yüz hatlarına uygun planlama',
      'Bakım sonrası öneriler'
    ],
    detailedInfo: {
      overview: 'Kaş ve kirpik uygulamalarımız, yüz ifadenizi destekleyen zarif detayları öne çıkarmak için planlanır.',
      whyChoose: [
        'Doğal görünüm odağı',
        'Yüz proporsiyonuna uygun tasarım',
        'Titiz ve kontrollü uygulama',
        'Nazik ürün seçimi',
        'Misafir beklentisine göre şekillenen sonuç'
      ],
      process: [
        { step: 1, title: 'Yüz Analizi', description: 'Kaş ve kirpik yapısı detaylı incelenir' },
        { step: 2, title: 'Tasarım Kararı', description: 'Size en uygun görünüm birlikte belirlenir' },
        { step: 3, title: 'Uygulama', description: 'Planlanan işlem profesyonelce uygulanır' },
        { step: 4, title: 'Son Dokunuş', description: 'Bakım sonrası korunma önerileri paylaşılır' }
      ]
    },
    gallery: [
      '/banner/guzelik_merkezi.png',
      '/img/philosophy.png',
      '/davines_logo.png'
    ]
  },
  'vucut-bakimi': {
    id: 'vucut-bakimi',
    title: 'Vücut Bakımı',
    icon: '💆',
    description: 'Rahatlama ve yenilenme hissi veren profesyonel vücut bakımı seansları.',
    heroImage: '/banner/guzelik_merkezi.png',
    features: [
      'Rahatlatıcı bakım ritüeli',
      'Kişisel ihtiyaca uygun uygulama',
      'Toparlanma hissi',
      'Bütünsel yaklaşım',
      'Konforlu seans planı',
      'Düzenli bakım önerileri'
    ],
    detailedInfo: {
      overview: 'Vücut bakımı hizmetimiz, günlük temponun etkilerini azaltmak ve kendinizi daha iyi hissetmenizi desteklemek için planlanır.',
      whyChoose: [
        'Sakin ve özenli merkez deneyimi',
        'İhtiyaca göre şekillenen uygulamalar',
        'Rahatlatan atmosfer',
        'Düzenli bakım süreci planlaması',
        'Misafir memnuniyeti odaklı yaklaşım'
      ],
      process: [
        { step: 1, title: 'İhtiyaç Belirleme', description: 'Beklenti ve odak alanları görüşülür' },
        { step: 2, title: 'Seans Kurgusu', description: 'Uygulama içeriği size göre belirlenir' },
        { step: 3, title: 'Bakım Uygulaması', description: 'Konforlu bir seans gerçekleştirilir' },
        { step: 4, title: 'Devam Planı', description: 'Gerekirse sonraki seans için yönlendirme yapılır' }
      ]
    },
    gallery: [
      '/banner/guzelik_merkezi.png',
      '/img/philosophy.png',
      '/davines_logo.png'
    ]
  }
};

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${service.heroImage}")`
          }}
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">{service.icon}</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-amber-400">{service.title}</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#iletisim-formu"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                📞 Randevu Planla
              </a>
              <a
                href={`tel:${siteConfig.primaryPhoneHref}`}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
              >
                📱 Hemen Ara: {siteConfig.primaryPhoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hizmet Detayları
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.detailedInfo.overview}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <ul className="space-y-3">
                  {service.detailedInfo.whyChoose.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Hizmet Kapsamımız
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 
    </div>
  );
}

// Generate static params for all services
export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}
