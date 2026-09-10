import React from 'react';
import { Star, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const InviteOTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Kamlesh & Hansa Shah',
      location: 'Borivali, Mumbai',
      occasion: 'Daughter\'s Athai Tapasya (8 Upvas)',
      quote: 'Our 82-year-old Baa could open the website on WhatsApp without any assistance! The ceremonial door opening to Bhagwan Mahavir Swami gave everyone goosebumps. Much more dignified and devotional than a PDF.',
      rating: 5,
    },
    {
      name: 'Pravinbhai & Rekhaben Mehta',
      location: 'Paldi, Ahmedabad',
      occasion: 'Maskhamana Pārna (31 Upvas)',
      quote: 'With over 400 guests coming for the Pārna, having Google Maps built right into the invite saved us dozens of phone calls asking for derasar directions. The flower devotion and scratch card delighted everyone.',
      rating: 5,
    },
    {
      name: 'Nitin & Dimple Doshi',
      location: 'Ghatkopar, Mumbai',
      occasion: 'Varshitap Pārna Mahotsav',
      quote: 'The music stotra playing when doors open created a divine atmosphere. Our relatives in the US and Antwerp loved feeling like they were part of the sacred celebration from afar.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8EE] border-t border-[#E0A458]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#C98A3E] text-xs font-bold uppercase tracking-widest border border-[#E0A458]/40 mb-3">
            Family Love
          </span>

          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-[#2A2018] tracking-tight mb-3">
            Families love their invite websites
          </h2>

          <p className="text-[#5C4E42] text-sm sm:text-base leading-relaxed">
            Over 1,200+ Jain families have celebrated their Tapasvi's Pārna with Tattva.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-poppins text-xs font-bold text-[#2A2018]">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-stone-500">
                    {item.location} · <span className="text-[#C98A3E] font-medium">{item.occasion}</span>
                  </p>
                </div>

                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Family" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
