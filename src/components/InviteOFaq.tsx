import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const InviteOFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does a Jain Tapasya Pārna invite website cost?',
      a: '₹899, one time, for unlimited guests. There are no subscriptions, per-guest charges, or hidden fees. Your website stays active with all features included.',
    },
    {
      q: 'What is a Pārna invite website?',
      a: 'It is the modern, reverent form of a digital invitation. Instead of a flat PDF or static image, your guests receive a real interactive website at your own unique link. When they open it, ceremonial doors open with sacred music to reveal Bhagwan Mahavir Swami, your Tapasvi\'s photo, the Pārna Muhurat schedule, live Google Maps venue directions, Pushpanjali flower devotion, and secret scratch card.',
    },
    {
      q: 'Will older relatives and grandparents be able to open it easily?',
      a: 'Yes! It opens directly inside any smartphone browser (Chrome, Safari, WhatsApp in-app browser). No app installation, no login, and no password required. They just tap the link.',
    },
    {
      q: 'Can I upload our own photo of Bhagwan Mahavir Swami or our Tapasvi?',
      a: 'Yes, absolutely. You can upload your Tapasvi\'s portrait, family photos, and even replace or customize the Bhagwan Mahavir Swami image if your family has a specific derasar pratima you wish to feature.',
    },
    {
      q: 'Can I edit the details or timings after sharing the link?',
      a: 'Yes. Any updates you make to the venue, timings, or family details update instantly at the same link. You never have to re-send a corrected card.',
    },
    {
      q: 'Does it support different languages (Gujarati, Hindi, English)?',
      a: 'Yes, you can write all texts, mantras (॥ ॐ नमो जिणाणं ॥), and invitation messages in Gujarati, Hindi, English, or Marwari.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8EE] via-[#F4EEDD] to-[#FAF8EE] border-t border-[#E0A458]/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#C98A3E] text-xs font-bold uppercase tracking-widest border border-[#E0A458]/40 mb-3">
            Got Questions?
          </span>

          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-[#2A2018] tracking-tight mb-3">
            Frequently asked questions
          </h2>

          <p className="text-[#5C4E42] text-sm sm:text-base leading-relaxed">
            Everything you need to know about creating your Tapasya Pārna invite website.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-poppins text-sm sm:text-base font-semibold text-[#2A2018] hover:text-[#C98A3E] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C98A3E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-[#5C4E42] leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
