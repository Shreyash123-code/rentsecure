import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    // Use entered name (signup) or derive from email (signin)
    const displayName = activeTab === 'signup' && nameValue.trim()
      ? nameValue.trim()
      : emailValue.split('@')[0];
    onLogin(displayName, emailValue);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Top brand strip */}
            <div className="bg-ink px-8 pt-8 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="serif text-white text-lg font-bold">RentSecure</span>
                </div>
                <button
                  id="auth-modal-close"
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
              <h2 className="serif text-3xl text-white font-bold">
                {activeTab === 'signin' ? 'Welcome back.' : 'Create account.'}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                {activeTab === 'signin'
                  ? 'Sign in to access your secure rental dashboard.'
                  : 'Join thousands securing leases on the blockchain.'}
              </p>
            </div>

            <div className="p-8">
              {/* Tabs */}
              <div className="flex p-1 mb-7 bg-neutral-100 rounded-xl">
                <button
                  id="auth-tab-signin"
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'signin' ? 'bg-white shadow text-ink' : 'text-ink/50 hover:text-ink'}`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
                <button
                  id="auth-tab-signup"
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'signup' ? 'bg-white shadow text-ink' : 'text-ink/50 hover:text-ink'}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <AnimatePresence>
                  {activeTab === 'signup' && (
                    <motion.div
                      key="name-field"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative pb-1">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                        <input
                          id="auth-fullname"
                          type="text"
                          placeholder="Full Name"
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-ink/10 rounded-xl outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5 transition-all font-medium text-sm"
                          required={activeTab === 'signup'}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="Email Address"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-ink/10 rounded-xl outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5 transition-all font-medium text-sm"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full pl-11 pr-12 py-3.5 bg-neutral-50 border border-ink/10 rounded-xl outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5 transition-all font-medium text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {activeTab === 'signin' && (
                  <div className="text-right -mt-1">
                    <button type="button" className="text-[12px] font-semibold text-accent hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-4 bg-ink text-white rounded-xl font-bold text-sm tracking-wide hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    activeTab === 'signin' ? 'Sign In to RentSecure' : 'Create My Account'
                  )}
                </button>


              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
