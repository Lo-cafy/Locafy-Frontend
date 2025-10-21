interface BookingCTAProps {
  pricing: {
    total: number;
  };
  isBooking: boolean;
  onBooking: () => void;
  isDisabled: boolean;
}

export default function BookingCTA({ pricing, isBooking, onBooking, isDisabled }: BookingCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block">
          <div className="text-sm text-gray-600">Estimated completion: Within 48 hours</div>
          <div className="text-lg font-bold text-green-600">${pricing.total.toFixed(2)}</div>
        </div>
        <button
          onClick={onBooking}
          disabled={isDisabled || isBooking}
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isBooking ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
}


