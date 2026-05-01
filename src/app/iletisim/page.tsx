'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '../../store';
import { sendContactMessage, fetchContactInfo, clearError } from '../../store/slices/contactSlice';
import { siteConfig } from '@/lib/siteConfig';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: 'normal',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const { isSending, error } = useAppSelector((state: RootState) => state.contact) as { isSending: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType || !formData.message) {
      return;
    }

    try {
      const messageData = {
        ...formData,
        subject: `${formData.serviceType} - ${formData.urgency}`,
        priority: formData.urgency === 'cok-acil' ? 'high' as const : formData.urgency === 'acil' ? 'medium' as const : 'low' as const,
      };

      await dispatch(sendContactMessage(messageData)).unwrap();

      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        urgency: 'normal',
        message: ''
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Mesaj gönderilirken hata:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/iletisim_banner1.png"
            alt="Davines iletişim"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,232,0.95)_0%,rgba(247,241,232,0.8)_35%,rgba(247,241,232,0.4)_60%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-[10px]"
          >
            <div className="flex items-center gap-3 mb-6 mt-[15px]">
              <span className="h-px w-12 bg-[#b89562]" />
              <span className="text-sm tracking-[0.3em] text-[#343434] uppercase font-medium">Bize Ulaşın</span>
            </div>
            
            <h1 className="font-serif text-[64px] sm:text-[86px] leading-[0.9] text-[#111111] mb-6">
              Sizi <span className="block text-[#b78a49]">Bekliyoruz</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#2d2d2d] leading-relaxed max-w-lg">
              {siteConfig.contactDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(184,149,98,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Contact Form Section */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white p-8 sm:p-12 rounded-[40px] border border-[#eadcc8] shadow-[0_30px_100px_rgba(124,96,54,0.06)] relative overflow-hidden"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAFA] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2">Mesaj Gönderin</h2>
                  <p className="text-[#60584f] mb-10">Size en kisa surede donus saglayacagiz.</p>

                  {/* Feedback Messages */}
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-6 bg-green-50 rounded-[20px] border border-green-100 flex items-center gap-4 text-green-800"
                    >
                      <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
                      <p className="font-medium">Mesajınız başarıyla iletildi! Uzmanlarımız sizi arayacaktır.</p>
                    </motion.div>
                  )}

                  {error && (
                    <div className="mb-8 p-6 bg-red-50 rounded-[20px] border border-red-100 text-red-800">
                      <p className="font-medium text-sm">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">Ad Soyad</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                          placeholder="İsminiz"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">Telefon</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                          placeholder="05xx xxx xx xx"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">E-posta</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                        placeholder="e-posta@adresiniz.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">Hizmet Türü</label>
                        <select 
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm appearance-none cursor-pointer"
                        >
                          <option value="">Hizmet seçiniz</option>
                          <option value="sac-kesimi">Saç Kesimi & Tasarım</option>
                          <option value="renklendirme">Renklendirme (Boya, Balyaj)</option>
                          <option value="gelin-basi">Gelin Saçı & Makyajı</option>
                          <option value="sac-bakimi">Saç Bakımı & Keratin</option>
                          <option value="fon-masa">Fön & Maşa</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">Aciliyet</label>
                        <select 
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm appearance-none cursor-pointer"
                        >
                          <option value="normal">Normal</option>
                          <option value="acil">Acil</option>
                          <option value="cok-acil">Çok Acil</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold">Mesajınız</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        required
                        className="w-full px-8 py-5 bg-[#FAFAFA] border border-transparent rounded-[32px] focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm resize-none"
                        placeholder="Size nasıl yardımcı olabiliriz?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-[#b78a49] text-white py-5 rounded-full font-bold tracking-[0.15em] text-sm hover:bg-[#a97d3e] transition-all shadow-[0_20px_40px_rgba(183,138,73,0.15)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-gray-400"
                    >
                      {isSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          GÖNDERİLİYOR...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" />
                          MESAJ GÖNDER
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Contact Details Section */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-serif text-3xl text-[#111111] mb-8">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-8">
                  {[
                    { icon: FiPhone, title: "Cep Telefonu", value: siteConfig.primaryPhoneDisplay, sub: "Randevu ve bilgi hatti" },
                    { icon: FiPhone, title: "Sabit Hat", value: siteConfig.secondaryPhoneDisplay, sub: "Merkez telefon hatti" },
                    { icon: FiMapPin, title: "Adres", value: siteConfig.addressLine, sub: `${siteConfig.addressShort} / ${siteConfig.city}` },
                    { icon: FiClock, title: "Calisma Bilgisi", value: siteConfig.workingHours, sub: siteConfig.workingDays }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#b78a49] shadow-sm border border-[#eadcc8] flex-shrink-0 group-hover:bg-[#b78a49] group-hover:text-white transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs tracking-widest text-[#343434] uppercase font-bold mb-1">{item.title}</h4>
                        <p className="text-lg text-[#111111] font-serif mb-1">{item.value}</p>
                        <p className="text-sm text-[#60584f]">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-square sm:aspect-video lg:aspect-auto lg:h-[350px] rounded-[48px] overflow-hidden border border-[#eadcc8] shadow-lg"
              >
                <iframe
                  src="https://www.google.com/maps?q=Kent-2%2030%20Agustos%20Mahallesi%207207%20Sokak%20No%2010%2FC%20Izmir&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`${siteConfig.brandName} Konum`}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-4xl mx-auto p-10 sm:p-16 rounded-[40px] bg-white border border-[#eadcc8] shadow-[0_30px_80px_rgba(124,96,54,0.06)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FAFAFA] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-5">Bizi Sosyal Medyada <span className="text-[#b78a49]">Takip Edin</span></h2>
          <p className="text-[#60584f] text-base sm:text-lg mb-10 max-w-xl mx-auto">Saç tasarım ipuçları, yeni uygulamalar ve kampanyalarımızdan ilk siz haberdar olun.</p>
          
          <a 
            href="https://www.instagram.com/davines.izmir/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#111111] text-white px-9 py-4 rounded-full font-bold tracking-[0.15em] text-xs sm:text-sm hover:bg-[#2d2d2d] transition-all active:scale-[0.98]"
          >
            INSTAGRAM'DA TAKİP ET
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
