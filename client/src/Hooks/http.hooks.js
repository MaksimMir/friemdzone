import { useCallback, useState } from "react"

const useHttp = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                method, 
                body, 
                headers
            });
            const data = response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false);
            console.log(data)
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const cleanError = useCallback(() => setError(null), []);

    return { loading, request, error, cleanError };
}

export default useHttp;