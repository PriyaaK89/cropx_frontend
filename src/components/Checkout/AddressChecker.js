// AddressChecker.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Config } from "../Utils/Config";

const AddressChecker = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [addressExists, setAddressExists] = useState(false);
    const { user } = useContext(AuthContext);
    const userId = user?.data?.id;

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await axios.get(`${Config?.get_delivery_address}/${userId}`);

                if (res.status === 200) {
                    if (res.data?.data?.length > 0) {
                        setAddressExists(true); // address found
                    } else {
                        setAddressExists(false); // no address saved
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [userId]);

    if (loading) return <div>Loading...</div>;

    // If address exists, go to payment page
    if (addressExists) {
        return <Navigate to="/checkout/payment-mode" replace />;
    }

    // else show the save-address page
    return children;
};

export default AddressChecker;
