export const useWorker = () => {
    const [data, setData] = useState<WorkerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetchWorker(controller.signal)
            .then(setData)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, []);

    return { data, loading, error, refetch: () => fetchWorker() };
};


export async function fetchDashboard(signal?: AbortSignal): Promise<DashboardResponse> {
    const response = await fetch(`/api/v1/dashboards`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        signal,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.message, response.status);
    }

    return response.json();
}
