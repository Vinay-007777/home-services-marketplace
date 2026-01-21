import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import clsx from 'clsx'; // Assuming clsx is installed or I can use template literals
import { Users, Calendar, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import BookingLogsModal from '../components/BookingLogsModal';

const Admin = () => {
    const [bookings, setBookings] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

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
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAssign = async (id, providerId) => {
        try {
            await api.post(`/bookings/${id}/assign`, { providerId });
            toast.success('Provider assigned');
            fetchData();
        } catch (error) {
            toast.error('Failed to assign provider');
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await api.patch(`/bookings/${id}/status`, { status: 'cancelled', note: 'Admin cancelled' });
            toast.success('Booking cancelled');
            fetchData();
        } catch (error) {
            toast.error('Failed to cancel booking');
        }
    };

    const handleForceStatus = async (id, status) => {
        try {
            const note = prompt('Enter a reason for this manual override:', 'Admin manual override');
            if (note === null) return;

            await api.patch(`/bookings/${id}/status`, { status, note: `[ADMIN OVERRIDE] ${note}` });
            toast.success(`Booking status forced to ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to force status update');
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        active: bookings.filter(b => ['assigned', 'in-progress'].includes(b.status)).length,
        completed: bookings.filter(b => b.status === 'completed').length
    };

    if (loading) return <div className="p-8 text-center">Loading admin panel...</div>;

    return (
        <div className="space-y-6">
            {selectedBooking && (
                <BookingLogsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Operations Console</h2>
                <div className="flex space-x-4">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide">Pending</span>
                        <span className="text-xl font-bold text-yellow-600">{stats.pending}</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide">Active</span>
                        <span className="text-xl font-bold text-blue-600">{stats.active}</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide">Completed</span>
                        <span className="text-xl font-bold text-green-600">{stats.completed}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex gap-4 overflow-x-auto">
                    {['all', 'pending', 'assigned', 'in-progress', 'completed', 'cancelled'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors
                                ${filter === f
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            {f.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Provider</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observability</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manual Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                                        <div className="text-sm text-gray-500">{booking.customerName}</div>
                                        <div className="text-xs text-gray-400 max-w-[200px] truncate">{booking.customerAddress}</div>
                                        <div className="text-xs text-gray-400 mt-1">{new Date(booking.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full w-fit
                                                ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'}`}>
                                                {booking.status.toUpperCase()}
                                            </span>

                                            {booking.providerId ? (
                                                <span className="flex items-center text-sm text-gray-900">
                                                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                                                    {booking.providerId.name}
                                                </span>
                                            ) : booking.status === 'pending' ? (
                                                <select
                                                    className="text-xs border-gray-300 rounded-md shadow-sm p-1 border"
                                                    onChange={(e) => handleAssign(booking._id, e.target.value)}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Select Provider</option>
                                                    {providers.filter(p => p.isAvailable).map(p => (
                                                        <option key={p._id} value={p._id}>{p.name}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Unassigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                        >
                                            <Clock className="w-4 h-4 mr-1" /> View History
                                        </button>
                                        <div className="text-xs text-gray-400 mt-1">
                                            Last update: {new Date(booking.updatedAt).toLocaleTimeString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="text-xs border-gray-300 rounded-md shadow-sm p-1 border bg-gray-50"
                                            onChange={(e) => handleForceStatus(booking._id, e.target.value)}
                                            value=""
                                        >
                                            <option value="" disabled>Override Status...</option>
                                            <option value="pending">Force Pending</option>
                                            <option value="assigned">Force Assigned</option>
                                            <option value="in-progress">Force In-Progress</option>
                                            <option value="completed">Force Completed</option>
                                            <option value="cancelled">Force Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredBookings.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No bookings found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
