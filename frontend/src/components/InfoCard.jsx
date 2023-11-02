import React from "react";
import { Link } from "react-router-dom";
import PlaceImg from "./PlaceImg";
import Swal from "sweetalert2";

const InfoCard = ({ place, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Place",
      text: `Are you sure you want to delete this " ${place.title} "?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          onDelete(place._id);
          Swal.fire('Your accomodation removed successfully');
        } catch (error) {
          Swal.fire('Error', 'An error occurred while canceling the booking.', 'error');
        }
      }
    });
  };
  return (
    <>
      <Link
        to={`/account/places/${place._id}`}
        className="my-3 flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 transition-all hover:bg-gray-300 md:flex-row"
        key={place._id}
      >
        <div className="flex w-full shrink-0 bg-gray-300 sm:h-32 sm:w-32 ">
          <PlaceImg place={place} />
        </div>
        <div className="">
          <h2 className="text-lg md:text-xl">{place.title}</h2>
          <p className="line-clamp-3 mt-2 text-sm">{place.description}</p>
        </div>
      </Link>
      <div className="flex justify-center ">
        <button
          onClick={handleDelete}
          className="mx-10 mt-1 md:mx-1 gap-1 py-1 px-6 rounded-full text-white bg-primary hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default InfoCard;
