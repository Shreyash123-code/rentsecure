import { motion } from 'motion/react';
import {
  Shield, CreditCard, FileText, CheckCircle, Clock,
  TrendingUp, Home, Bell, ChevronRight, Wallet
} from 'lucide-react';

const mockLeases = [
  {
    id: 'L-9821',
    property: 'The Gilded Manor',
    location: 'Upper East Side, NY',
    status: 'Active',
    rent: '4,500',
    nextPayment: 'May 1, 2026',
    trustScore: 850,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200',
  },
];

const stats = [
  { label: 'Trust Score', value: '850', icon: <TrendingUp className="w-5 h-5" />, color: 'text-accent' },
  { label: 'Active Leases', value: '1', icon: <Home className="w-5 h-5" />, color: 'text-blue-500' },
  { label: 'Months Paid', value: '8', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500' },
  { label: 'Disputes', value: '0', icon: <Shield className="w-5 h-5" />, color: 'text-ink/40' },
];

interface DashboardUser {
  name: string;
  email: string;
}

export const Dashboard = ({ user }: { user: DashboardUser | null }) => {
  const displayName = user?.name || 'Julian Delacroix';
  const email = user?.email || 'tenant@rentsecure.io';
  const initials = displayName
    .trim()
    .split(' ')
    .map((w) => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
  const firstName = displayName.split(' ')[0];
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 px-6 lg:px-10 max-w-7xl mx-auto min-h-screen pb-24"
    >
      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] uppercase font-bold tracking-widest text-accent mb-2">My Account</p>
        <h1 className="serif text-4xl lg:text-5xl font-bold">Welcome back,<br />{firstName}.</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left Sidebar ── */}
        <div className="lg:col-span-1 space-y-6">

          {/* Profile Card */}
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4 ring-2 ring-accent/20">
              <span className="display text-3xl font-bold text-accent">{initials}</span>
            </div>
            <h2 className="serif text-2xl font-bold mb-0.5">{displayName}</h2>
            <p className="text-[11px] uppercase font-bold tracking-widest text-ink/40 mb-6">Platinum Tenant</p>

            {/* Trust Score Bar */}
            <div className="bg-ink/3 rounded-xl p-5 border border-ink/5 text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-bold text-ink/40 tracking-widest">Trust Score</span>
                <span className="display text-2xl font-bold text-accent">850</span>
              </div>
              <div className="w-full h-1.5 bg-ink/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-ink/30 mt-2 font-medium">Top 5% of tenants globally</p>
            </div>
          </div>

          {/* Wallet Card */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-ink/5 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-ink/60" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-ink/40">Account Email</p>
                <p className="text-sm font-semibold text-ink/70 truncate max-w-[160px]">{email}</p>
              </div>
            </div>
            <div className="h-px bg-ink/5 mb-4" />
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-ink/40 font-medium">Escrow Balance</span>
              <span className="font-bold text-sm">1.42 ETH</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6 space-y-3">
            <h3 className="serif text-lg font-semibold mb-4">Quick Actions</h3>
            <ActionItem icon={<CreditCard className="w-4 h-4" />} label="Pay Rent" />
            <ActionItem icon={<FileText className="w-4 h-4" />} label="View Lease" />
            <ActionItem icon={<Bell className="w-4 h-4" />} label="Set Reminders" />
            <ActionItem icon={<Shield className="w-4 h-4" />} label="Open Dispute" danger />
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className={`mb-3 ${s.color}`}>{s.icon}</div>
                <p className="display text-2xl font-bold">{s.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-ink/40 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Leases */}
          <div>
            <h2 className="display text-2xl font-bold mb-5">Active Leases</h2>
            <div className="space-y-4">
              {mockLeases.map((lease, i) => (
                <motion.div
                  key={lease.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={lease.image}
                      alt={lease.property}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="serif text-xl font-semibold mb-0.5">{lease.property}</h4>
                      <p className="text-[11px] text-ink/40 font-medium">{lease.location}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase font-bold tracking-wider text-accent">
                        <CheckCircle className="w-3 h-3" /> {lease.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-ink/40">Monthly Rent</p>
                      <p className="font-bold text-lg">${lease.rent}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-ink/40">Next Due</p>
                      <p className="font-semibold text-sm">{lease.nextPayment}</p>
                    </div>
                    <button id="manage-lease-btn" className="btn-premium py-2.5 text-xs">Manage</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h2 className="display text-2xl font-bold mb-5">History</h2>
            <div className="glass-card p-12 text-center border-dashed" style={{ borderStyle: 'dashed', borderColor: 'rgba(26,26,26,0.1)' }}>
              <Clock className="w-10 h-10 text-ink/15 mx-auto mb-3" />
              <p className="font-serif italic text-ink/40 text-lg">Past transactions will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ActionItem = ({
  icon,
  label,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) => (
  <button
    className={`w-full flex items-center justify-between group py-2.5 px-3 rounded-lg transition-colors hover:bg-ink/5 ${danger ? 'hover:bg-red-50' : ''}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
          ${danger
            ? 'bg-red-50 text-red-400 group-hover:bg-red-500 group-hover:text-white'
            : 'bg-ink/5 text-ink/40 group-hover:bg-ink group-hover:text-white'
          }`}
      >
        {icon}
      </div>
      <span className={`text-sm font-semibold group-hover:translate-x-0.5 transition-transform ${danger ? 'text-red-400' : ''}`}>
        {label}
      </span>
    </div>
    <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-ink/60 transition-colors" />
  </button>
);
