// src/NewsData.js

import React, { useEffect, useState } from 'react';

function NewsData() {
    const [NewsData, setNewsData] = useState([]);

    useEffect(() => {
        console.log("fetching..")
        fetch('http://127.0.0.1:8000/api/news/news/')
            .then(response => response.json())
            .then(data => setNewsData(data))
            .catch(error => console.error('Error fetching the news data:', error));
    }, []);

    return (
        <div>
            <h1>Market Headlines</h1>
            <ul>
                {NewsData.map(item => (
                    <li key={item.id}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.headline}
                        </a>
                        <p>{item.news}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsData;
