import { motion } from 'motion/react';
import { Shield, MapPin, Star } from 'lucide-react';

// Navbar (legacy - kept for backward compat, App.tsx has its own inline nav)
export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-xl thin-border-b">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="serif text-xl font-bold tracking-tight">RentSecure</span>
        </div>
      </div>
    </nav>
  );
};

export const PropertyCard = ({ property, index = 0 }: { property: any; index?: number }) => {
  const isLarge = index % 5 === 0 || index % 5 === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`group flex flex-col gap-3 cursor-pointer ${isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-neutral-100" style={{ aspectRatio: isLarge ? '16/10' : '4/5' }}>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          {property.verified && (
            <span className="badge-verified flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" /> Verified
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-ink/70 px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider">
            {property.type}
          </span>
        </div>

        {/* Social proof */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-white text-[11px] font-medium flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-gold text-gold" />
            {property.socialProof}
          </span>
        </div>

        <img
          src={property.image}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex justify-between items-start pt-0.5 px-0.5">
        <div className="flex flex-col gap-0.5">
          <h3 className="serif text-base font-semibold leading-tight group-hover:text-accent transition-colors">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 text-[12px] text-ink/50">
            <MapPin className="w-3 h-3" />
            {property.location}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0 ml-4">
          <span className="text-sm font-bold text-ink">${property.price}</span>
          <span className="text-[10px] text-ink/40 uppercase font-bold tracking-wider">/ month</span>
        </div>
      </div>
    </motion.div>
  );
};
