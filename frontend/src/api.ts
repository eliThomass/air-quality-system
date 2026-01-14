const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function readData() {
    try {
        const res = await fetch(`${BASE_URL}/history/`);
        
        if (!res.ok) {
            throw new Error(`HTTP error status: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error("Could not fetch sensor data:", error);
        throw error;
    }
}
