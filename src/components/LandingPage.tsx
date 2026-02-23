import React from 'react';
import { motion } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onLoginClick: () => void;
  onCreateAccountClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onCreateAccountClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [lang, setLang] = React.useState<'EN' | 'BN'>('EN');

  const logoUrl = "https://scontent.fspd3-1.fna.fbcdn.net/v/t39.30808-6/636856053_122093875569285093_6442118386641895876_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LU_Bs78Q-WsQ7kNvwFvu4Fy&_nc_oc=Adlm0RhoFOG5k10IPSh3nsnqb7EEW6cmcI8NVZ8PBQRKUpmwpA7YCFUL4kRyqjxf7qc&_nc_zt=23&_nc_ht=scontent.fspd3-1.fna&_nc_gid=8ywDWztAeDizUAKZZaMxgA&oh=00_AftpN_WSbQgLu7y3yCT8cx-NK4_XES9YDtWbfqbcdrmixg&oe=69A1E181";

  const t = {
    EN: {
      home: 'Home',
      about: 'About Us',
      info: 'Information',
      gallery: 'Gallery',
      contact: 'Contact',
      login: 'Login',
      create: 'Create Account',
      subtitle: 'Organic & Fresh Dairy Products',
      heroTitle: 'Eco Dairy Farm',
      heroDesc: 'Experience the purity of nature with our organic dairy products. Fresh from our farm to your table, every day.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      aboutTitle: 'Modern Dairy Farming & Healthy Cow Rearing',
      features: [
        'Healthy cow rearing and regular checkups',
        'Cleanliness and use of modern technology',
        '100% organic and fresh dairy products',
        'Eco-friendly eco-system'
      ],
      coreFeatures: 'Our Core Features',
      coreDesc: 'We combine traditional values with modern technology to ensure the highest quality.',
      healthyCows: 'Healthy Cows',
      healthyCowsDesc: 'Regular veterinary checkups and organic feed.',
      qualityMilk: 'Quality Milk',
      qualityMilkDesc: 'Automated milking and instant cooling system.',
      ecoFriendly: 'Eco-Friendly',
      ecoFriendlyDesc: 'Sustainable waste management and green energy.',
      farmGallery: 'Farm Gallery',
      getInTouch: 'Get in Touch',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      management: 'Management Team'
    },
    BN: {
      home: 'হোম',
      about: 'আমাদের সম্পর্কে',
      info: 'তথ্য',
      gallery: 'গ্যালারি',
      contact: 'যোগাযোগ',
      login: 'লগইন',
      create: 'অ্যাকাউন্ট তৈরি করুন',
      subtitle: 'অর্গানিক এবং ফ্রেশ ডেইরি পণ্য',
      heroTitle: 'ইকো ডেইরি ফার্ম',
      heroDesc: 'আমাদের অর্গানিক ডেইরি পণ্যের সাথে প্রকৃতির বিশুদ্ধতা অনুভব করুন। প্রতিদিন আমাদের খামার থেকে সরাসরি আপনার টেবিলে।',
      getStarted: 'শুরু করুন',
      learnMore: 'আরও জানুন',
      aboutTitle: 'আধুনিক ডেইরি ফার্মিং ও স্বাস্থ্যকর গরু পালন',
      features: [
        'স্বাস্থ্যকর গরু পালন ও নিয়মিত চেকআপ',
        'পরিচ্ছন্নতা ও আধুনিক প্রযুক্তি ব্যবহার',
        '১০০% অর্গানিক ও ফ্রেশ ডেইরি পণ্য',
        'পরিবেশবান্ধব ইকো-সিস্টেম'
      ],
      coreFeatures: 'আমাদের মূল বৈশিষ্ট্য',
      coreDesc: 'আমরা সর্বোচ্চ গুণমান নিশ্চিত করতে আধুনিক প্রযুক্তির সাথে ঐতিহ্যগত মূল্যবোধের সমন্বয় করি।',
      healthyCows: 'স্বাস্থ্যকর গরু',
      healthyCowsDesc: 'নিয়মিত পশুচিকিৎসা এবং জৈব খাদ্য।',
      qualityMilk: 'মানসম্মত দুধ',
      qualityMilkDesc: 'স্বয়ংক্রিয় মিল্কিং এবং ইনস্ট্যান্ট কুলিং সিস্টেম।',
      ecoFriendly: 'পরিবেশবান্ধব',
      ecoFriendlyDesc: 'টেকসই বর্জ্য ব্যবস্থাপনা এবং সবুজ শক্তি।',
      farmGallery: 'খামার গ্যালারি',
      getInTouch: 'যোগাযোগ করুন',
      address: 'ঠিকানা',
      phone: 'ফোন',
      email: 'ইমেইল',
      management: 'ব্যবস্থাপনা দল'
    }
  };

  const content = t[lang];

  const navItems = [
    { label: content.home, href: '#home' },
    { label: content.about, href: '#about' },
    { label: content.info, href: '#info' },
    { label: content.gallery, href: '#gallery' },
    { label: content.contact, href: '#contact' },
  ];

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Eco Dairy Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className="text-xl md:text-2xl font-serif font-bold text-farm-green">Eco Dairy</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'EN' ? 'BN' : 'EN')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-farm-light text-farm-green font-bold text-sm hover:bg-farm-green hover:text-white transition-all"
            >
              <Globe className="w-4 h-4" />
              {lang === 'EN' ? 'বাংলা' : 'English'}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu Overlay */}
      <motion.div
        initial={false}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-farm-green text-white z-[60] p-12 shadow-2xl"
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col h-full">
          <div className="space-y-6 mt-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-3xl font-serif hover:translate-x-4 transition-transform"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
              className="w-full bg-white text-farm-green py-4 rounded-2xl font-bold text-xl hover:bg-farm-light transition-colors"
            >
              {content.login}
            </button>
            <button 
              onClick={() => { onCreateAccountClick(); setIsMenuOpen(false); }}
              className="w-full border-2 border-white/30 py-4 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors"
            >
              {content.create}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/farm/1920/1080" 
            alt="Farm Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 bg-farm-accent text-white rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 tracking-widest uppercase">{content.subtitle}</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-8 leading-tight">
              {content.heroTitle.split(' ')[0]} <br />
              <span className="text-farm-accent italic">{content.heroTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-xl leading-relaxed">
              {content.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <button onClick={onLoginClick} className="glossy-button px-8 md:px-10 py-3 md:py-4 text-base md:text-lg">{content.getStarted}</button>
              <a href="#about" className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg text-white border-2 border-white/30 rounded-full font-bold hover:bg-white/10 transition-all">{content.learnMore}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="https://picsum.photos/seed/cow/800/600" alt="Modern Farming" className="rounded-3xl shadow-2xl w-full" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 -right-6 bg-farm-green p-6 md:p-8 rounded-3xl text-white hidden md:block">
                <p className="text-3xl md:text-4xl font-bold mb-1">15+</p>
                <p className="text-xs md:text-sm opacity-80">Years of Excellence</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 md:mb-8 leading-tight">{content.aboutTitle}</h2>
              <div className="space-y-4 md:space-y-6">
                {content.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 p-1 bg-farm-light rounded-full shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-farm-green" />
                    </div>
                    <p className="text-base md:text-lg text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section id="info" className="py-16 md:py-24 bg-farm-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">{content.coreFeatures}</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">{content.coreDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: content.healthyCows, desc: content.healthyCowsDesc, icon: '🐄' },
              { title: content.qualityMilk, desc: content.qualityMilkDesc, icon: '🥛' },
              { title: content.ecoFriendly, desc: content.ecoFriendlyDesc, icon: '🌱' }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 text-center card-hover"
              >
                <div className="text-5xl md:text-6xl mb-4 md:mb-6">{card.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{card.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">{content.farmGallery}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-md"
              >
                <img 
                  src={`https://picsum.photos/seed/farm${i}/500/500`} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12">{content.getInTouch}</h2>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-white/10 rounded-2xl shrink-0">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-farm-accent" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest">{content.address}</p>
                    <p className="text-lg md:text-xl">Jadurani Bajar, Haripur, Thakurgaon</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-white/10 rounded-2xl shrink-0">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-farm-accent" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest">{content.phone}</p>
                    <p className="text-lg md:text-xl">+8801727387706</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-white/10 rounded-2xl shrink-0">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-farm-accent" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest">{content.email}</p>
                    <p className="text-lg md:text-xl">rafeenaheyan2@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">{content.management}</h3>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-farm-accent rounded-full flex items-center justify-center text-xl md:text-2xl font-bold shrink-0">R</div>
                  <div>
                    <p className="font-bold text-lg md:text-xl">RAFEE NAHEYAN</p>
                    <p className="text-white/60 text-sm md:text-base">Manager | 01590018360</p>
                    <p className="text-white/60 text-xs md:text-sm">rafeenaheyan@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold shrink-0">S</div>
                  <div>
                    <p className="font-bold text-lg md:text-xl">MD SAGAR HOSSAIN</p>
                    <p className="text-white/60 text-sm md:text-base">Co-Manager</p>
                    <p className="text-white/60 text-xs md:text-sm">sagarhossain0@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-farm-green rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-serif font-bold text-white">Eco Dairy</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram /></a>
          </div>

          <p className="text-white/40 text-sm">&copy; 2026 Eco Dairy Farm. Built with excellence.</p>
        </div>
      </footer>
    </div>
  );
};
