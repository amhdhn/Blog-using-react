import { useEffect, useState } from "react";

const useData = (url) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abort = new AbortController()
        setTimeout(() => {
            fetch(url, { signal: abort.signal }).
                then(res => {
                    if (!res.ok) {
                        throw Error('Error : ' + res.status);
                    }
                    else {
                        return res.json();
                    }
                }).then(data => {
                    setData(data.reverse());
                    setLoading(false);
                    setError(null);
                }).catch(err => {
                    if (err.name !== 'AbortError') {
                        setError(err);
                        setLoading(false);
                    }
                })

        }, 1000);
        return () => abort.abort();
    }, [url]);
    return { error, data, loading };
}
export default useData;