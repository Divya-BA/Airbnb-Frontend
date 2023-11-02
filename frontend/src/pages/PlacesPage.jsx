import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../utils/axios";

import AccountNav from "../components/AccountNav";
import InfoCard from "../components/InfoCard";
import Spinner from "../components/Spinner";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get("places/user-places");
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, []);
  const handleDeletePlace = async (placeId) => {
    try {
      await axiosInstance.delete(`/places/delete/${placeId}`);
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== placeId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        <Link
          className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mx-4 mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <InfoCard
              place={place}
              key={place._id}
              onDelete={handleDeletePlace}
            />
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
