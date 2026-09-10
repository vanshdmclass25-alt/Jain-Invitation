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
  const { user, isAdmin } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

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
      <div className="flex items-center justify-center p-12 text-stone-600">
        Access Denied. Admin privileges required.
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
