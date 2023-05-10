import React, { useEffect, useState } from 'react';
import facade from '../apiFacade.js';

const Joke = () => {
    const [data, setData] = useState('Loading...');

    useEffect(() => {
        const url = '/api/joke';
        facade.fetchData(url).then((res) => {
            console.log(res);
            setData(res.value);
        });
    }, []);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default Joke;