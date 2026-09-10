import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { TemplateId } from '../types';

interface CustomizationGateProps {
  templateId: TemplateId;
  children: React.ReactNode;
}

export const CustomizationGate: React.FC<CustomizationGateProps> = ({ templateId, children }) => {
  const { user, loading, registerUser, loginAdmin, isAdmin, authError } = useAuth();
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [loadingRequest, setLoadingRequest] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    if (!user) {
      setLoadingRequest(false);
      return;
    }

    if (isAdmin) {
      setRequestStatus('approved');
      setLoadingRequest(false);
      return;
    }

    const q = query(collection(db, 'requests'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setRequestStatus(null);
      } else {
        const latestDoc = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a: any, b: any) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))[0] as any;
        
        setRequestStatus(latestDoc.status);
      }
      setLoadingRequest(false);
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const handleRequestAccess = async () => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'requests'), {
        userId: user.uid,
        userName: user.name || 'Unknown User',
        userEmail: user.email || 'No email',
        whatsappNumber: '+91 88509 18792',
        templateId: templateId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      window.open(`https://wa.me/918850918792?text=Hello, I would like to customize the Parna invitation design. My email is ${user.email}.`, '_blank');
    } catch (e) {
      console.error("Error adding request:", e);
    }
  };

  if (loading || loadingRequest) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user && !isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setMode('user')}
            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${mode === 'user' ? 'border-amber-600 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            Request Access
          </button>
          <button 
            onClick={() => setMode('admin')}
            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${mode === 'admin' ? 'border-amber-600 text-amber-800' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            Admin Login
          </button>
        </div>

        <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-4">
          {mode === 'user' ? 'Sign In Required' : 'Admin Access'}
        </h2>
        <p className="text-stone-600 mb-6">
          {mode === 'user' 
            ? 'Please provide your details to request customization access.'
            : 'Enter your admin PIN to manage requests.'}
        </p>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-6 text-left break-words">
            {authError}
          </div>
        )}
        
        {mode === 'user' ? (
          <form onSubmit={(e) => { e.preventDefault(); if (name && email) registerUser(name, email); }} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g. Rahul Shah" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="your@email.com" />
            </div>
            <button type="submit" className="bg-[#C08B46] hover:bg-[#A8793A] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full mt-4">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); loginAdmin(pin); }} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Admin PIN</label>
              <input type="password" required value={pin} onChange={e => setPin(e.target.value)} className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center tracking-widest" placeholder="•••••" />
            </div>
            <button type="submit" className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full mt-4">
              Verify PIN
            </button>
          </form>
        )}
      </div>
    );
  }

  if (requestStatus === 'approved' || isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
      <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-4">Premium Design Lock</h2>
      
      {requestStatus === 'pending' ? (
        <>
          <p className="text-stone-600 mb-6">Your request to customize this design is currently pending approval.</p>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6">
            Please complete your payment via WhatsApp to unlock the editor.
          </div>
          <button 
            onClick={() => window.open(`https://wa.me/918850918792?text=Hello, checking on my customization request for email: ${user?.email}`, '_blank')}
            className="bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2 w-full"
          >
            Contact on WhatsApp
          </button>
        </>
      ) : (
        <>
          <p className="text-stone-600 mb-8">Customizing this premium design requires payment. Click below to request access and we'll connect via WhatsApp.</p>
          <button 
            onClick={handleRequestAccess}
            className="bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2 w-full"
          >
            Request Access via WhatsApp
          </button>
        </>
      )}
    </div>
  );
};
