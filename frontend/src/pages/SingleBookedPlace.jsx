import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AccountNav from '../components/AccountNav';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import Spinner from '../components/Spinner';
import axiosInstance from '../utils/axios';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const cancelBooking = async () => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/bookings/${booking._id}`);
          navigate('/account/bookings');
          Swal.fire('Booking Cancelled!', 'Your booking has been canceled.', 'success');
        } catch (error) {
          console.error('Error canceling booking: ', error);
          Swal.fire('Error', 'An error occurred while canceling the booking.', 'error');
        }
      }
    });
  };
  
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/bookings');

      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id,
      );

      setBooking(filteredBooking[0]);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {booking?.place ? (
        <div className="p-4">
          <h1 className="text-3xl">{booking?.place?.title}</h1>

          <AddressLink
            className="my-2 block"
            placeAddress={booking.place?.address}
          />
          <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
            <div className=" ">
              <h2 className="mb-4 text-2xl md:text-2xl">
                Your booking information
              </h2>
              <BookingDates booking={booking} />
            </div>
            <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
              <div className="hidden md:block">Total price</div>
              <div className="flex justify-center text-3xl">
                <span>₹{booking?.price}</span>
              </div>
            </div>
          </div>
          <PlaceGallery place={booking?.place} />
          <div className="flex justify-center ">
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="mx-10 mt-3 md:mx-1 gap-1 py-1 px-6 rounded-full text-white bg-primary hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
        </div>
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );
};

export default SingleBookedPlace;
