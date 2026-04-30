/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PropertyCard } from './components/Core';
import { Dashboard } from './components/Dashboard';
import { DigitalLease } from './components/DigitalLease';
import { AuthModal } from './components/AuthModal';
import { Grid, Map as MapIcon, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { firebaseService } from './services/firebaseService';
import { Property } from './types';
import { cn } from './lib/utils';

type Route = 'browse' | 'dashboard' | 'lease';

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'mock1',
    title: 'The Gilded Manor',
    location: 'Upper East Side, New York',
    price: '4,500',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    socialProof: '8 people viewed this today',
    type: 'Penthouse',
  },
  {
    id: 'mock2',
    title: 'Heritage Estate',
    location: 'Knightsbridge, London',
    price: '3,800',
    verified: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    socialProof: '3 people viewed this today',
    type: 'Mansion',
  },
  {
    id: 'mock3',
    title: 'Lakeside Retreat',
    location: 'Lake Geneva, Switzerland',
    price: '6,200',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
    socialProof: '12 people viewed this today',
    type: 'Villa',
  },
  {
    id: 'mock4',
    title: 'The Grand Terrace',
    location: 'Bel Air, Los Angeles',
    price: '9,100',
    verified: false,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    socialProof: '5 people viewed this today',
    type: 'Estate',
  },
  {
    id: 'mock5',
    title: 'Montmartre Loft',
    location: 'Paris, France',
    price: '2,900',
    verified: true,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    socialProof: '7 people viewed this today',
    type: 'Loft',
  },
  {
    id: 'mock6',
    title: 'Santorini Cliffside',
    location: 'Oia, Greece',
    price: '5,500',
    verified: true,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800',
    socialProof: '21 people viewed this today',
    type: 'Villa',
  },
];

export default function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [currentRoute, setCurrentRoute] = useState<Route>('browse');
  const [account, setAccount] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const getInitials = (name: string) =>
    name
      .trim()
      .split(' ')
      .map((w) => w[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('');

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToProperties((data) => {
      setProperties(data);
    });
    return () => unsubscribe();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet!');
    }
  };

  const applyFilters = (list: Property[]) => {
    return list.filter((p) => {
      const rawPrice = parseFloat(p.price.replace(/,/g, ''));
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesMin = minPrice === '' || rawPrice >= parseFloat(minPrice);
      const matchesMax = maxPrice === '' || rawPrice <= parseFloat(maxPrice);
      const matchesType = propertyType === 'All Types' || (p.type ?? p.property_type) === propertyType;
      return matchesSearch && matchesMin && matchesMax && matchesType;
    });
  };

  const filteredProperties = applyFilters(properties);
  const displayProperties = filteredProperties.length > 0
    ? filteredProperties
    : applyFilters(MOCK_PROPERTIES);

  const nav = (route: Route) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentRoute(route);
  };

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-xl thin-border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <button
            onClick={nav('browse')}
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="serif text-xl font-bold tracking-tight">RentSecure</span>
          </button>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <button
              id="nav-rent"
              onClick={nav('browse')}
              className={`pb-0.5 transition-colors ${currentRoute === 'browse' ? 'text-ink border-b-2 border-ink' : 'text-ink/50 hover:text-ink'}`}
            >
              Rent
            </button>
            <button
              id="nav-account"
              onClick={nav('dashboard')}
              className={`pb-0.5 transition-colors ${currentRoute === 'dashboard' ? 'text-ink border-b-2 border-ink' : 'text-ink/50 hover:text-ink'}`}
            >
              My Account
            </button>
            <button
              id="nav-leases"
              onClick={nav('lease')}
              className={`pb-0.5 transition-colors ${currentRoute === 'lease' ? 'text-ink border-b-2 border-ink' : 'text-ink/50 hover:text-ink'}`}
            >
              Leases
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                id="nav-user-avatar"
                onClick={() => setCurrentRoute('dashboard')}
                className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full border border-ink/10 hover:bg-ink/5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{getInitials(user.name)}</span>
                </div>
                <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                id="nav-login"
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:block px-5 py-2 text-sm font-semibold border border-ink/15 rounded-full hover:bg-ink/5 transition-colors"
              >
                Log In
              </button>
            )}
            <button
              id="nav-wallet"
              onClick={connectWallet}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                account
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'bg-ink text-white hover:bg-ink/85'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', account ? 'bg-green-300' : 'bg-white/40')} />
              <span className="mono text-[11px] font-medium">
                {account ? `${account.slice(0, 6)}…${account.slice(-4)}` : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Router ── */}
      <AnimatePresence mode="wait">

        {/* BROWSE */}
        {currentRoute === 'browse' && (
          <motion.main
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto pt-28 px-6 lg:px-10"
          >
            {/* Hero */}
            <div className="mb-12 flex flex-col gap-8 items-center text-center">
              <div className="flex flex-col items-center gap-4 w-full">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
                  <p className="text-[11px] uppercase font-bold tracking-widest text-accent mb-3">Blockchain-Verified • Escrow-Protected</p>
                  <h1 className="serif text-5xl lg:text-6xl leading-tight font-bold">
                    Exceptional living,<br />secured on-chain.
                  </h1>
                </motion.div>
                <div className="flex gap-2 mt-2">
                  <button
                    id="view-grid"
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all thin-border ${viewMode === 'grid' ? 'bg-ink text-white' : 'bg-white hover:bg-ink/5'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    id="view-map"
                    onClick={() => setViewMode('map')}
                    className={`p-2.5 rounded-lg transition-all thin-border ${viewMode === 'map' ? 'bg-ink text-white' : 'bg-white hover:bg-ink/5'}`}
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex items-center bg-white rounded-2xl shadow-lg thin-border overflow-hidden w-full max-w-4xl"
              >
                <div className="flex-1 px-6 py-4 border-r border-ink/8">
                  <p className="text-[10px] uppercase font-bold text-ink/40 mb-0.5 tracking-widest">Location</p>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="City, neighbourhood…"
                    className="w-full text-sm bg-transparent outline-none font-medium placeholder:text-ink/30"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="hidden sm:flex flex-1 px-6 py-4 border-r border-ink/8 gap-2 items-center">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-ink/40 mb-0.5 tracking-widest">Min Price</p>
                    <input
                      id="min-price-input"
                      type="number"
                      placeholder="e.g. 10000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full text-sm bg-transparent outline-none font-medium placeholder:text-ink/30"
                    />
                  </div>
                  <span className="text-ink/20 font-bold mt-3">–</span>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-ink/40 mb-0.5 tracking-widest">Max Price</p>
                    <input
                      id="max-price-input"
                      type="number"
                      placeholder="e.g. 100000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full text-sm bg-transparent outline-none font-medium placeholder:text-ink/30"
                    />
                  </div>
                </div>
                <div className="hidden lg:block flex-1 px-6 py-4">
                  <p className="text-[10px] uppercase font-bold text-ink/40 mb-0.5 tracking-widest">Type</p>
                  <select
                    id="property-type-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full text-sm bg-transparent outline-none appearance-none cursor-pointer font-medium"
                  >
                    <option>All Types</option>
                    <option>Penthouse</option>
                    <option>Villa</option>
                    <option>Mansion</option>
                    <option>Loft</option>
                    <option>Estate</option>
                  </select>
                </div>
                <div className="px-3">
                  <button id="search-btn" className="btn-premium py-3 px-6">Search</button>
                </div>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex gap-6 mb-10 text-[11px] font-bold uppercase tracking-widest text-ink/40 justify-center"
            >
              <span>{displayProperties.length} Properties</span>
              <span className="text-ink/15">|</span>
              <span>2 Active Escrows</span>
              <span className="text-ink/15">|</span>
              <span>Avg. Trust Score: 98</span>
            </motion.div>

            {/* Grid / Map */}
            {viewMode === 'map' ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <MapIcon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="serif text-2xl font-bold">Map View</h3>
                <p className="text-sm text-ink/40 max-w-sm">Interactive map integration coming soon. Switch back to grid to browse listings.</p>
                <button onClick={() => setViewMode('grid')} className="btn-premium py-2.5 px-6 text-sm mt-2">Back to Grid</button>
              </div>
            ) : (
              <div className="masonry-grid">
                {displayProperties.length > 0 ? displayProperties.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                )) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-ink/40 font-medium">No properties match your filters.</p>
                    <button onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); setPropertyType('All Types'); }} className="mt-4 text-sm text-accent font-semibold hover:underline">Clear all filters</button>
                  </div>
                )}
              </div>
            )}
          </motion.main>
        )}

        {/* DASHBOARD */}
        {currentRoute === 'dashboard' && <Dashboard key="dashboard" user={user} />}

        {/* LEASE */}
        {currentRoute === 'lease' && (
          <DigitalLease
            key="lease"
            leaseData={{
              propertyAddress: '742 Park Avenue, Penthouse B, Manhattan, NY 10065',
              rent: '12,500',
              landlord: 'Alexander Sterling',
              tenant: account || user?.name || 'Julian Delacroix',
              blockchainId: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
              landlordSignature: '0x892a…f912',
              tenantSignature: '0x120d…bd2e',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="w-full flex flex-wrap items-center justify-between px-10 py-6 border-t border-ink/5 bg-white mt-16 text-[10px] font-bold uppercase tracking-widest text-ink/40 gap-4">
        <div className="flex gap-6 flex-wrap">
          <span>Escrows Active: 2</span>
          <span>Disputes: 0</span>
          <span>Avg. Pay Period: 1.2 Days</span>
        </div>
        <span>RentSecure © 2024 • Powered by Ethereum</span>
      </footer>

      {/* ── Auth Modal ── */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(name, email) => {
          setUser({ name, email });
          setIsAuthModalOpen(false);
          setCurrentRoute('dashboard');
        }}
      />
    </div>
  );
}
