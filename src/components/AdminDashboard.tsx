import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, getDocs, doc, updateDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw, Lock } from 'lucide-react';

interface Request {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  whatsappNumber: string;
  templateId: string;
  status: string;
  createdAt: any;
  approvedAt?: any;
  expiresAt?: any;
}

export const AdminDashboard: React.FC = () => {
  const { isAdmin, loginAdmin, authError } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');
  const [now, setNow] = useState<number>(Date.now());

  // Update current time every 30 seconds for live expiration countdowns
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Request[];
      setRequests(data);
    } catch (e) {
      console.error("Error fetching requests:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    fetchRequests();
  }, [isAdmin]);

  const handleApprove24h = async (id: string, currentExpiresAt?: any) => {
    try {
      const startTime = new Date();
      // 24 hours from now
      const expiresAt = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

      await updateDoc(doc(db, 'requests', id), {
        status: 'approved',
        approvedAt: startTime,
        expiresAt: expiresAt,
        updatedAt: serverTimestamp()
      });

      setRequests(requests.map(req => req.id === id ? {
        ...req,
        status: 'approved',
        approvedAt: startTime,
        expiresAt: expiresAt
      } : req));
    } catch (e) {
      console.error("Error approving 24h pass:", e);
    }
  };

  const handleExtend24h = async (id: string, currentExpiresAt?: any) => {
    try {
      let baseTime = new Date().getTime();
      if (currentExpiresAt) {
        const parsed = currentExpiresAt?.toDate ? currentExpiresAt.toDate().getTime() : new Date(currentExpiresAt).getTime();
        if (parsed > baseTime) baseTime = parsed;
      }
      const newExpiresAt = new Date(baseTime + 24 * 60 * 60 * 1000);

      await updateDoc(doc(db, 'requests', id), {
        status: 'approved',
        expiresAt: newExpiresAt,
        updatedAt: serverTimestamp()
      });

      setRequests(requests.map(req => req.id === id ? {
        ...req,
        status: 'approved',
        expiresAt: newExpiresAt
      } : req));
    } catch (e) {
      console.error("Error extending 24h pass:", e);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await updateDoc(doc(db, 'requests', id), {
        status: 'expired',
        updatedAt: serverTimestamp()
      });
      setRequests(requests.map(req => req.id === id ? { ...req, status: 'expired' } : req));
    } catch (e) {
      console.error("Error revoking pass:", e);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateDoc(doc(db, 'requests', id), {
        status: 'rejected',
        updatedAt: serverTimestamp()
      });
      setRequests(requests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
    } catch (e) {
      console.error("Error rejecting request:", e);
    }
  };

  const getPassStatusInfo = (req: Request) => {
    if (req.status === 'pending') {
      return { status: 'pending', label: 'Pending Approval', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    if (req.status === 'rejected') {
      return { status: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-300' };
    }

    // Check expiration if approved
    let expiresTime: number | null = null;
    if (req.expiresAt) {
      expiresTime = req.expiresAt?.toDate ? req.expiresAt.toDate().getTime() : new Date(req.expiresAt).getTime();
    } else if (req.approvedAt) {
      const approvedTime = req.approvedAt?.toDate ? req.approvedAt.toDate().getTime() : new Date(req.approvedAt).getTime();
      expiresTime = approvedTime + 24 * 60 * 60 * 1000;
    }

    if (req.status === 'expired') {
      return { status: 'expired', label: 'Stopped / Expired (Access Locked)', color: 'bg-stone-200 text-stone-700 border-stone-300' };
    }

    if (!expiresTime || now > expiresTime) {
      return { status: 'expired', label: 'Expired (24h Pass Ended)', color: 'bg-stone-200 text-stone-700 border-stone-300' };
    }

    const remainingMs = expiresTime - now;
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      status: 'active',
      label: `Active (${hours}h ${mins}m left)`,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      remainingText: `${hours}h ${mins}m remaining`
    };
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
        <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-2">Admin Control Panel</h2>
        <p className="text-xs text-stone-600 mb-6">Enter master PIN to manage single-template 24h approvals.</p>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs mb-6 text-left break-words">
            {authError}
          </div>
        )}
        
        <form onSubmit={(e) => { e.preventDefault(); loginAdmin(pin); }} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Master PIN</label>
            <input 
              type="password" 
              required 
              value={pin} 
              onChange={e => setPin(e.target.value)} 
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center tracking-widest text-lg" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full mt-2 cursor-pointer">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  const activeCount = requests.filter(r => getPassStatusInfo(r).status === 'active').length;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const expiredCount = requests.filter(r => getPassStatusInfo(r).status === 'expired').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-cinzel font-bold tracking-widest text-[#8B6E28] uppercase block">
            Access Pass Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-800">
            Admin Approval Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Grant 24-hour editing passes per template. (Note: Published invitations remain permanently LIVE for guests).
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Total Requests</span>
          <span className="text-2xl font-bold font-mono text-stone-800">{requests.length}</span>
        </div>
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Pending Approval</span>
          <span className="text-2xl font-bold font-mono text-amber-800">{pendingCount}</span>
        </div>
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Active 24h Passes</span>
          <span className="text-2xl font-bold font-mono text-emerald-800">{activeCount}</span>
        </div>
        <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Expired / Blocked</span>
          <span className="text-2xl font-bold font-mono text-stone-700">{expiredCount}</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Requested Template</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">24h Pass Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {requests.map(req => {
                  const passInfo = getPassStatusInfo(req);
                  const createdDate = req.createdAt?.toDate ? req.createdAt.toDate().toLocaleString() : 'Unknown';

                  return (
                    <tr key={req.id} className="hover:bg-stone-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-stone-900 text-sm">{req.userName}</div>
                        <div className="text-xs text-stone-500 font-mono">{req.userEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF3DF] text-[#8B6E28] border border-[#D4AF37]/40 rounded-lg text-xs font-bold font-cinzel">
                          {req.templateId || 'parnaUtsav'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-stone-500 whitespace-nowrap">
                        {createdDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${passInfo.color}`}>
                          {passInfo.status === 'active' && <Clock className="w-3.5 h-3.5 animate-pulse text-emerald-600" />}
                          {passInfo.status === 'pending' && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                          {passInfo.status === 'expired' && <Lock className="w-3.5 h-3.5 text-stone-500" />}
                          {passInfo.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                          <span>{passInfo.label}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {(passInfo.status === 'pending' || passInfo.status === 'expired' || passInfo.status === 'rejected') && (
                            <button 
                              onClick={() => handleApprove24h(req.id)}
                              className="text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg font-semibold shadow-2xs transition cursor-pointer flex items-center gap-1"
                              title="Grant 24-hour access pass for this specific template"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{passInfo.status === 'expired' ? 'Re-Approve 24h Pass' : 'Approve 24h Pass'}</span>
                            </button>
                          )}

                          {passInfo.status === 'active' && (
                            <>
                              <button 
                                onClick={() => handleExtend24h(req.id, req.expiresAt)}
                                className="text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1"
                                title="Add 24 hours to active pass"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Extend +24h</span>
                              </button>
                              <button 
                                onClick={() => handleRevoke(req.id)}
                                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg font-semibold shadow-2xs transition cursor-pointer flex items-center gap-1"
                                title="Instantly stop editable access for this user midway"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Stop Editable Access</span>
                              </button>
                            </>
                          )}

                          {passInfo.status === 'pending' && (
                            <button 
                              onClick={() => handleReject(req.id)}
                              className="text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                      No customization requests found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
