import { useEffect, useState } from 'react';
import { readData } from './api.js';
import './Dashboard.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ReferenceArea 
} from 'recharts';

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

    const [visible, setVisible] = useState({
        temp: true,
        hum: true,
        press: true,
        gas: true,
    });

    useEffect(() => {
        readData()
            .then((data: SensorReading[]) => {
                const sorted = [...data].sort((a, b) => 
                    new Date(a.read_at).getTime() - new Date(b.read_at).getTime()
                );
                setReadings(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setError(err);
                setLoading(false);
            });
    }, []);

    const toggle = (key: keyof typeof visible) => {
        setVisible(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) return <p>Loading sensor data from MySQL...</p>;
    if (error) return <p>Error: {error}</p>;

    const formatTime = (str: string) => 
        new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const SimpleChart = ({ title, dataKey, color, unit, yMin, yMax }: 
                         { title: string, dataKey: string, color: string, unit: string, yMin: number, yMax: number }) => {

        const getValue = (val: number) => {
            if (dataKey === 'temperature') {
                return (val * 9/5) + 32;
            }
            return val;
        };

        return (
            <div className='graph-card'>
                <h3>{title}</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={readings}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="read_at" tickFormatter={formatTime} hide={dataKey !== 'gas_resistance'} />
                        <YAxis domain={['auto', 'auto']} />
                        <ReferenceArea 
                            y1={yMin} 
                            y2={yMax} 
                            fill="rgba(76, 175, 80, 0.15)" 
                            strokeOpacity={0}
                        />
                        <Tooltip 
                            labelFormatter={(t) => new Date(t).toLocaleString()}
                            formatter={(v: number) => [`${v.toFixed(1)} ${unit}`, title]}
                        />
                        <Line type="monotone" dataKey={(row) => getValue(row[dataKey as keyof SensorReading] as number)} stroke={color} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className='dashboard-container'>
            
            <h1 className="dashboard-header">BME680 Enviornmental Metrics</h1>

            <div className='graphs-grid'>
                <SimpleChart title="Temperature" dataKey="temperature" color="#ef4444" unit="°F" yMin={68} yMax={76} />
                <SimpleChart title="Humidity" dataKey="humidity" color="#3b82f6" unit="%" yMin={30} yMax={50} />
                <SimpleChart title="Pressure" dataKey="pressure" color="#10b981" unit="hPa" yMin={1000} yMax={1020} />
                <SimpleChart title="Gas Resistance" dataKey="gas_resistance" color="#f59e0b" unit="Ω" yMin={50000} yMax={500000} />
            </div>

        </div>
    );
}

export default Dashboard;

