import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Shield, Download, FileCheck, Landmark, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface LeaseData {
  propertyAddress: string;
  rent: string;
  landlord: string;
  tenant: string;
  blockchainId: string;
  landlordSignature: string;
  tenantSignature: string;
}

export const DigitalLease = ({ leaseData }: { leaseData: LeaseData }) => {
  const [copied, setCopied] = useState(false);

  const leaseDocument = `
# RESIDENTIAL LEASE AGREEMENT
**Smart Contract ID:** \`${leaseData.blockchainId || '0xPRIVATE_KEY_HASH'}\`

## 1. PARTIES
This Lease is entered into between **${leaseData.landlord || 'The Landlord'}** ("Landlord") and **${leaseData.tenant || 'The Tenant'}** ("Tenant").

## 2. PROPERTY
The Landlord leases to the Tenant the property located at:
**${leaseData.propertyAddress || 'Address Placeholder'}**

## 3. TERM & RENT
- **Duration:** 12 Months
- **Monthly Rent:** $${leaseData.rent || '0.00'}
- **Security Deposit:** Verified on Ethereum Network

## 4. SMART CONTRACT PROVISIONS
The Security Deposit is held in a decentralized escrow on the Ethereum network.
1. Funds are strictly released upon mutual move-out confirmation.
2. Auto-release mechanism activates if no dispute is logged after 30 days of move-out request.
3. All transactions are publicly verifiable on the Ethereum blockchain.

## 5. OBLIGATIONS
**Tenant** agrees to maintain the property, pay rent on time, and follow building regulations.
**Landlord** agrees to keep the property habitable and resolve issues within 5 business days.
  `;

  const handleCopyId = () => {
    navigator.clipboard.writeText(leaseData.blockchainId || '0x0');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleVerifyEtherscan = () => {
    const id = leaseData.blockchainId || '0x0';
    window.open(`https://sepolia.etherscan.io/address/${id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 px-6 pb-24 max-w-4xl mx-auto min-h-screen"
    >
      {/* Blockchain badge */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[11px] uppercase font-bold tracking-widest text-accent mb-1">Digital Lease Document</p>
          <h1 className="serif text-3xl font-bold">Verified Lease Agreement</h1>
        </div>
        <div className="flex items-center gap-2 bg-accent/8 border border-accent/20 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">On-Chain Verified</span>
        </div>
      </div>

      {/* Contract ID Bar */}
      <div className="flex items-center justify-between bg-ink/3 border border-ink/8 rounded-xl px-5 py-4 mb-8 flex-wrap gap-3">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-ink/40 mb-1">Smart Contract Address</p>
          <p className="mono text-ink/70 text-[12px]">{leaseData.blockchainId}</p>
        </div>
        <button
          id="copy-contract-id"
          onClick={handleCopyId}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ink/10 text-sm font-semibold hover:bg-white transition-colors"
        >
          {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy ID'}
        </button>
      </div>

      {/* Document */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-ink/8 rounded-2xl p-10 md:p-16 relative overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] select-none">
          <span className="serif text-9xl font-bold text-ink rotate-[-30deg]">VERIFIED</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="display text-2xl font-bold">RentSecure</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-ink/40 italic">
              Blockchain-Verified Document
            </p>
          </div>
          <div className="text-right">
            <div className="w-20 h-20 border border-accent/20 rounded-xl flex items-center justify-center bg-accent/5">
              <Landmark className="w-9 h-9 text-accent/30" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-ink/30 mt-2">Doc #L-9821</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-[15px] leading-relaxed">
          <ReactMarkdown>{leaseDocument}</ReactMarkdown>
        </div>

        {/* Signatures */}
        <div className="mt-16 pt-10 border-t border-ink/8 grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] uppercase font-bold text-ink/40 tracking-widest mb-3">Landlord Digital Signature</p>
            <div className="h-12 border-b border-ink/10 flex items-end pb-2">
              <span className="font-serif italic text-sm text-ink/60">{leaseData.landlordSignature}</span>
            </div>
            <p className="text-[11px] text-ink/40 mt-2">{leaseData.landlord}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-ink/40 tracking-widest mb-3">Tenant Digital Signature</p>
            <div className="h-12 border-b border-ink/10 flex items-end pb-2">
              <span className="font-serif italic text-sm text-ink/60">{leaseData.tenantSignature}</span>
            </div>
            <p className="text-[11px] text-ink/40 mt-2">{leaseData.tenant}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center gap-3 print:hidden">
          <button
            id="download-pdf-btn"
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-xl text-sm font-bold hover:bg-accent transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button
            id="verify-etherscan-btn"
            onClick={handleVerifyEtherscan}
            className="flex items-center gap-2 px-6 py-3 border border-ink/15 rounded-xl text-sm font-bold hover:bg-ink/5 transition-colors"
          >
            <FileCheck className="w-4 h-4" /> Verify on Etherscan
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
