import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';

interface Request {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  whatsappNumber: string;
  templateId: string;
  status: string;
  createdAt: any;
}

export const AdminDashboard: React.FC = () => {
  const { isAdmin, loginAdmin, authError } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
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

    fetchRequests();
  }, [isAdmin]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'requests', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center border border-amber-200">
        <h2 className="text-2xl font-cinzel font-bold text-stone-800 mb-4">Admin Access</h2>
        <p className="text-stone-600 mb-6">Enter the master passcode to access the dashboard.</p>
        
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-6 text-left break-words">
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
          <button type="submit" className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full mt-4">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-cinzel font-bold text-stone-800 mb-8">Admin Dashboard</h1>
      
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
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Template</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{req.userName}</div>
                      <div className="text-sm text-stone-500">{req.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium">
                        {req.templateId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500">
                      {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === 'approved' ? 'bg-green-100 text-green-800' :
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'approved')}
                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md transition"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(req.id, 'rejected')}
                            className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {req.status === 'approved' && (
                        <button 
                          onClick={() => handleUpdateStatus(req.id, 'pending')}
                          className="text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-md border border-stone-300 transition"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-stone-500">
                      No requests found.
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
