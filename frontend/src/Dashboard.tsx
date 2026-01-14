import { useEffect, useState } from 'react';
import { readData } from './api.js';

interface SensorReading {
    id: number;
    temperature: number;
    humidity: number;
    pressure: number;
    gas_resistance: number;
    read_at: string;
}

function Dashboard() {
    const [readings, setReadings] = useState<SensorReading[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        readData()
            .then((data: SensorReading[]) => {
                setReadings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading sensor data from MySQL...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Air Quality Stats</h1>
            {readings.map(r => (
                <p key={r.id}>{r.read_at}: {r.temperature}, {r.humidity}, {r.pressure}, {r.gas_resistance}°C</p>
            ))}
        </div>
    );
}

export default Dashboard;

