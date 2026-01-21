import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [bookingsRes, providersRes] = await Promise.all([
                api.get('/bookings'),
                api.get('/bookings/providers')
            ]);
            setBookings(bookingsRes.data);
            setProviders(providersRes.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Polling for updates
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (id, status, note) => {
        try {
            await api.patch(`/bookings/${id}/status`, { status, note });
            toast.success(`Booking ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleAssign = async (id, providerId) => {
        try {
            await api.post(`/bookings/${id}/assign`, { providerId });
            toast.success('Provider assigned');
            fetchData();
        } catch (error) {
            toast.error('Failed to assign provider');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Booking Dashboard</h2>
            {bookings.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No bookings found. Create one to get started!</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{booking.service}</h3>
                                        <p className="text-sm text-gray-500">{booking.customerName}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{booking.customerAddress}</p>
                                {booking.providerId && (
                                    <p className="text-xs text-blue-600 mb-2 font-medium">
                                        Assigned to: {booking.providerId.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-100 mt-2">
                                {booking.status === 'pending' && (
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Assign Provider</label>
                                        <select
                                            className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5 border bg-white focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => handleAssign(booking._id, e.target.value)}
                                            value={booking.providerId?._id || ''}
                                        >
                                            <option value="">Select Provider</option>
                                            {providers.filter(p => p.isAvailable).map(p => (
                                                <option key={p._id} value={p._id}>{p.name} ({p.skills.join(', ')})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {booking.status === 'assigned' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'in-progress', 'Started job')}
                                            className="flex-1 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                                        >
                                            Start Job
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'pending', 'Provider declined')}
                                            className="px-3 py-1.5 border border-red-200 text-red-600 rounded-md text-sm hover:bg-red-50 transition"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}

                                {booking.status === 'in-progress' && (
                                    <button
                                        onClick={() => handleStatusUpdate(booking._id, 'completed', 'Job finished')}
                                        className="w-full py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                                    >
                                        Complete Job
                                    </button>
                                )}

                                {['pending', 'assigned'].includes(booking.status) && (
                                    <button
                                        onClick={() => handleStatusUpdate(booking._id, 'cancelled', 'Cancelled by admin')}
                                        className="w-full py-1.5 text-red-600 text-xs hover:text-red-800 hover:bg-red-50 rounded mt-1 transition"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
