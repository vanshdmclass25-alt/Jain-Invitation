import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, addDoc, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { TemplateId, InvitationRequest } from '../types';
import { Lock, Clock, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

interface CustomizationGateProps {
  templateId: TemplateId;
  children: React.ReactNode;
}

export const CustomizationGate: React.FC<CustomizationGateProps> = ({ templateId, children }) => {
  const { user, loading, registerUser, loginAdmin, isAdmin, authError } = useAuth();
  const [userRequests, setUserRequests] = useState<InvitationRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [now, setNow] = useState<number>(Date.now());

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<'user' | 'admin'>('user');

  // Realtime clock for 24h countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  // Listen to Firestore requests for the logged-in user
  useEffect(() => {
    if (!user) {
      setLoadingRequests(false);
      return;
    }

    if (isAdmin) {
      setLoadingRequests(false);
      return;
    }

    const q = query(collection(db, 'requests'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data({ serverTimestamps: 'estimate' })
      })) as InvitationRequest[];
      setUserRequests(requests);
      setLoadingRequests(false);
    }, (err) => {
      console.error("Firestore subscription error:", err);
      setLoadingRequests(false);
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const handleRequestAccess = async () => {
    if (!user) return;
    try {
      // Find the most recent existing request for this template
      const existingReqs = userRequests
        .filter(r => r.templateId === templateId)
        .sort((a, b) => {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return timeB - timeA;
        });
        
      const existingReq = existingReqs[0];

      if (existingReq) {
        // Update existing document instead of creating a duplicate
        await updateDoc(doc(db, 'requests', existingReq.id), {
          status: 'pending',
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(), // Bump to top of admin dashboard
        });
      } else {
        // Create new document
        await addDoc(collection(db, 'requests'), {
          userId: user.uid,
          userName: user.name || 'Tapasvi Devotee',
          userEmail: user.email || 'No email',
          whatsappNumber: '+91 88509 18792',
          templateId: templateId,
          status: 'pending',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      
      const whatsappText = encodeURIComponent(
        `Hello Tattva Team, I requested 24h customization access for Template "${templateId}".\nName: ${user.name}\nEmail: ${user.email}`
      );
      window.open(`https://wa.me/918850918792?text=${whatsappText}`, '_blank');
    } catch (e) {
      console.error("Error adding access request:", e);
    }
  };

  if (loading || loadingRequests) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className="w-10 h-10 border-4 border-[#C08B46] border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-xs font-semibold text-stone-600 font-cinzel tracking-wider">
          Verifying 24h Template Access Pass...
        </span>
      </div>
    );
  }

  // Admin bypasses all gates
  if (isAdmin) {
    return <>{children}</>;
  }

  // If user not authenticated, show sign-in or admin login
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setMode('user')}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition ${mode === 'user' ? 'border-[#C08B46] text-[#683D10]' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            User Sign-In
          </button>
          <button 
            onClick={() => setMode('admin')}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition ${mode === 'admin' ? 'border-[#C08B46] text-[#683D10]' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            Admin Login
          </button>
        </div>

        <div className="w-12 h-12 bg-amber-50 rounded-full border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8B6E28]">
          <Lock className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-cinzel font-bold text-stone-800 mb-2">
          {mode === 'user' ? 'Identify for 24h Pass' : 'Admin Passcode'}
        </h2>
        <p className="text-xs text-stone-600 mb-6">
          {mode === 'user' 
            ? 'Enter your name and email to request single-template 24h customization access.'
            : 'Enter master PIN to unlock admin dashboard.'}
        </p>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs mb-6 text-left break-words">
            {authError}
          </div>
        )}
        
        {mode === 'user' ? (
          <form onSubmit={(e) => { e.preventDefault(); if (name && email) registerUser(name, email); }} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g. Rahul Shah" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="your@email.com" />
            </div>
            <button type="submit" className="bg-[#C08B46] hover:bg-[#A8793A] text-white px-6 py-3 rounded-xl font-semibold text-xs shadow-md transition w-full mt-2 cursor-pointer">
              Continue to Template Studio
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); loginAdmin(pin); }} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Admin PIN</label>
              <input type="password" required value={pin} onChange={e => setPin(e.target.value)} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono" placeholder="•••••" />
            </div>
            <button type="submit" className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-xl font-semibold text-xs shadow-md transition w-full mt-2 cursor-pointer">
              Verify Master PIN
            </button>
          </form>
        )}
      </div>
    );
  }

  // Check requests specifically for current templateId
  const matchingReq = userRequests
    .filter(r => r.templateId === templateId)
    .sort((a, b) => {
      const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return timeB - timeA;
    })[0];

  // Check if user has an active 24h pass for ANY other template
  const activeOtherReq = userRequests.find(r => {
    if (r.templateId === templateId || r.status !== 'approved') return false;
    let expTime = 0;
    if (r.expiresAt) {
      expTime = r.expiresAt?.toDate ? r.expiresAt.toDate().getTime() : new Date(r.expiresAt).getTime();
    } else if (r.approvedAt) {
      const appTime = r.approvedAt?.toDate ? r.approvedAt.toDate().getTime() : new Date(r.approvedAt).getTime();
      expTime = appTime + 24 * 60 * 60 * 1000;
    }
    return expTime > now;
  });

  // Calculate expiration for current matching request
  let expiresTime = 0;
  if (matchingReq && matchingReq.status === 'approved') {
    if (matchingReq.expiresAt) {
      expiresTime = matchingReq.expiresAt?.toDate ? matchingReq.expiresAt.toDate().getTime() : new Date(matchingReq.expiresAt).getTime();
    } else if (matchingReq.approvedAt) {
      const appTime = matchingReq.approvedAt?.toDate ? matchingReq.approvedAt.toDate().getTime() : new Date(matchingReq.approvedAt).getTime();
      expiresTime = appTime + 24 * 60 * 60 * 1000;
    } else if (matchingReq.createdAt) {
      const createdTime = matchingReq.createdAt?.toDate ? matchingReq.createdAt.toDate().getTime() : new Date(matchingReq.createdAt).getTime();
      expiresTime = createdTime + 24 * 60 * 60 * 1000;
    }
  }

  const isPassActive = matchingReq && matchingReq.status === 'approved' && expiresTime > now;
  const isPassExpired = matchingReq && (matchingReq.status === 'expired' || (matchingReq.status === 'approved' && expiresTime <= now));
  const isPending = matchingReq && matchingReq.status === 'pending';

  // Format remaining time for active pass
  let remainingTimeStr = '';
  if (isPassActive && expiresTime) {
    const diffMs = expiresTime - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
    remainingTimeStr = `${hours}h ${mins}m ${secs}s left`;
  }

  // PASS ACTIVE: Render children with top notification banner
  if (isPassActive) {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="bg-gradient-to-r from-[#2A2018] via-[#3D2E20] to-[#1E1712] border border-[#D4AF37]/50 rounded-xl p-3 px-4 shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <span className="font-cinzel font-bold text-[#E0A458] block leading-tight">
                  Single-Template 24h Pass Active
                </span>
                <span className="text-[11px] text-stone-300">
                  Approved for template: <strong className="text-amber-200 capitalize font-cinzel">{templateId}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1A120B] px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/40 text-[#FAF2DE] font-mono text-xs shadow-inner">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">Access Expires:</span>
              <span className="text-emerald-400 font-bold">{remainingTimeStr}</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  // PASS LOCKED / EXPIRED / UNAPPROVED: Show Lock Screen
  return (
    <div className="max-w-lg mx-auto my-12 p-6 sm:p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
      <div className="w-14 h-14 bg-[#FAF2DE] rounded-full border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-4 text-[#8B6E28] shadow-sm">
        <Lock className="w-7 h-7 text-[#8B6E28]" />
      </div>

      <span className="text-[10px] font-cinzel font-bold tracking-[0.2em] text-[#8B6E28] uppercase block mb-1">
        Restricted Customization
      </span>
      <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-2">
        24-Hour Customization Pass
      </h2>

      <p className="text-xs text-stone-600 mb-6 leading-relaxed">
        Upon approval, <strong>24-hour editing access</strong> is granted for 1 selected template. <br/>
        <span className="inline-block mt-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold text-[11px]">
          ✦ Note: Your published invitation website remains <strong>LIVE ALWAYS</strong> for your guests!
        </span>
      </p>

      {/* Alert if user has pass for OTHER template */}
      {activeOtherReq && (
        <div className="bg-amber-50 border border-amber-300/80 p-3.5 rounded-xl text-xs text-amber-900 text-left mb-6 shadow-2xs">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-[#8B6E28]">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Active Pass Found for Another Design</span>
          </div>
          <p className="text-[11px] text-stone-700 leading-snug">
            You currently hold an active 24h pass for design: <strong className="font-cinzel text-amber-900 uppercase">{activeOtherReq.templateId}</strong>. Access is restricted to 1 template per approval.
          </p>
        </div>
      )}

      {/* Specific Status Banner for this template */}
      {isPending ? (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
            <Clock className="w-4 h-4 text-amber-600 animate-spin" />
            <span>Approval Request Pending</span>
          </div>
          <p className="text-xs text-amber-900/90 leading-normal">
            Your request to unlock template <strong className="font-cinzel">{templateId}</strong> is under review by the admin. Contact on WhatsApp to fast-track your 24h pass.
          </p>
          <button 
            onClick={() => window.open(`https://wa.me/918850918792?text=Hello, checking status of my 24h pass for template "${templateId}". Email: ${user?.email}`, '_blank')}
            className="mt-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition flex items-center justify-center gap-2 w-full cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fast-Track on WhatsApp</span>
          </button>
        </div>
      ) : isPassExpired ? (
        <div className="bg-stone-50 border border-stone-300 p-4 rounded-xl mb-6 text-left space-y-2">
          <div className="flex items-center gap-2 text-stone-800 font-semibold text-xs">
            <Lock className="w-4 h-4 text-stone-600" />
            <span>24h Editing Window Expired</span>
          </div>
          <p className="text-xs text-stone-600 leading-normal">
            Your 24-hour editing window for <strong className="font-cinzel">{templateId}</strong> has ended. <br/>
            <span className="text-emerald-700 font-semibold block mt-1">
              ✓ Your published invitation website remains LIVE ALWAYS for your guests!
            </span>
            If you need to edit details again, request a pass renewal below.
          </p>
          <button 
            onClick={handleRequestAccess}
            className="mt-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition flex items-center justify-center gap-2 w-full cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request 24h Pass Renewal</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#FAF8EE] border border-[#E0A458]/40 p-4 rounded-xl mb-6 text-left space-y-3">
          <div className="flex items-center gap-2 text-[#683D10] font-bold text-xs font-cinzel">
            <CheckCircle2 className="w-4 h-4 text-[#8B6E28]" />
            <span>Template: {templateId}</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Click below to request your 24-hour customization pass. Admin will approve access for this specific design.
          </p>
          <button 
            onClick={handleRequestAccess}
            className="bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 w-full cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request 24h Pass on WhatsApp</span>
          </button>
        </div>
      )}

      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
        <span>Logged in as: {user.email}</span>
        <button 
          onClick={() => window.location.reload()}
          className="text-[#8B6E28] hover:underline cursor-pointer"
        >
          Refresh Status
        </button>
      </div>
    </div>
  );
};
