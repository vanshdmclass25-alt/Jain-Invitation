import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { TemplateId } from '../types';

interface CustomizationGateProps {
  templateId: TemplateId;
  children: React.ReactNode;
}

export const CustomizationGate: React.FC<CustomizationGateProps> = ({ templateId, children }) => {
  const { user, loading, signInWithGoogle, isAdmin } = useAuth();
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [loadingRequest, setLoadingRequest] = useState(true);

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
        userName: user.displayName || 'Unknown User',
        userEmail: user.email || 'No email',
        whatsappNumber: '+91 88509 18792', // Usually we'd ask them, but instructions specify this number
        templateId: templateId,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      // Redirect to WhatsApp
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

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
        <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-4">Sign In Required</h2>
        <p className="text-stone-600 mb-8">Please sign in to customize this premium invitation design.</p>
        <button 
          onClick={signInWithGoogle}
          className="bg-[#C08B46] hover:bg-[#A8793A] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full"
        >
          Sign In with Google
        </button>
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
            onClick={() => window.open(`https://wa.me/918850918792?text=Hello, checking on my customization request for email: ${user.email}`, '_blank')}
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
