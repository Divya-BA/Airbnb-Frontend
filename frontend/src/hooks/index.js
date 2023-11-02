import { useState, useEffect, useContext } from "react";

import { UserContext } from "../providers/UserProvider";
import { PlaceContext } from "../providers/PlaceProvider";

import axiosInstance from "../utils/axios";
import {
  getItemFromLocalStorage,
  setItemsInLocalStorage,
  removeItemFromLocalStorage,
} from "../utils";

// USER
export const useAuth = () => {
  return useContext(UserContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getItemFromLocalStorage("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    const { name, email, password } = formData;

    try {
      const { data } = await axiosInstance.post("user/register", {
        name,
        email,
        password,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage("user", data.user);
        setItemsInLocalStorage("token", data.token);
      }
      return { success: true, message: "Registration successfull" };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  };

  const login = async (formData) => {
    const { email, password } = formData;

    try {
      const { data } = await axiosInstance.post("user/login", {
        email,
        password,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage("user", data.user);
        setItemsInLocalStorage("token", data.token);
      }
      return { success: true, message: "Login successfull" };
    } catch (error) {
      const { message } = error.response.data;
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.get("/user/logout");
      if (data.success) {
        setUser(null);

        removeItemFromLocalStorage("user");
        removeItemFromLocalStorage("token");
      }
      return { success: true, message: "Logout successfull" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Something went wrong!" };
    }
  };

  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      const { data } = await axiosInstance.post(
        "/user/upload-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userDetails) => {
    const { name, password, picture } = userDetails;
    const email = JSON.parse(getItemFromLocalStorage("user")).email;
    try {
      const { data } = await axiosInstance.put("/user/update-user", {
        name,
        password,
        email,
        picture,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    setUser,
    register,
    login,
    logout,
    loading,
    uploadPicture,
    updateUser,
  };
};

// PLACES
export const usePlaces = () => {
  return useContext(PlaceContext);
};

export const useProvidePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaces = async () => {
    const { data } = await axiosInstance.get("/places");
    setPlaces(data.places);
    setLoading(false);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return {
    places,
    setPlaces,
    loading,
    setLoading,
  };
};
