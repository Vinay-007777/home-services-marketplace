import { X, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

const BookingLogsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Booking History</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                        {[...booking.logs].reverse().map((log, index) => (
                            <div key={index} className="ml-6 relative">
                                <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-white 
                                    ${log.status === 'completed' ? 'bg-green-500' :
                                        log.status === 'cancelled' ? 'bg-red-500' :
                                            log.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 flex items-center mb-1">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(log.timestamp).toLocaleString()}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800 capitalize mb-0.5">
                                        {log.status.replace('-', ' ')}
                                    </span>
                                    {log.note && (
                                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 mt-1">
                                            {log.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingLogsModal;
