import React, { useEffect, useState } from 'react';
import './Explore.css';
import Banner from '../../Components/Banner/Banner';
import IndicePrices from '../../Components/Indices/Indices';
import TopGainers from '../../Components/TopGainers/TopGainers';
import TopLosers from '../../Components/TopLosers/TopLosers';
import ActiveByVolume from '../../Components/ActiveByVolume/ActiveByVolume';
import MainNews from '../../Components/MainNews/MainNews';
import Week52High from '../../Components/Week52High/Week52High';
import Week52Low from '../../Components/Week52Low/Week52Low';
import Footer from '../../Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Explore = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for demonstration purposes
        const timer = setTimeout(() => {
            setLoading(false); // Simulate content loading completion
        }, 3000); // Adjust the duration as needed

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <FontAwesomeIcon icon={faSpinner} className="loader" spin />
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Banner />
            <IndicePrices />
            <TopGainers />
            <TopLosers />
            <ActiveByVolume />
            <MainNews />
            <Week52High />
            <Week52Low />
            <Footer />
        </>
    );
};

export default Explore;
