// Wikipedia Image API
export async function getRealImage(placeName) {

    const localImages = {
        "Goa": "../images/goa.jpg",
        "Manali": "../images/manali.jpg",
        "Rishikesh": "../images/rishikesh.jpg"
    };

    try {

        const url =
        `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${encodeURIComponent(placeName)}`;

        const res = await fetch(url);
        const data = await res.json();

        const pages = data.query.pages;
        const page = pages[Object.keys(pages)[0]];

        if (page.original) {
            return page.original.source;
        }

        return localImages[placeName];

    } catch {

        return localImages[placeName];

    }

}

// Weather API
export async function getWeather(place) {
    const coordinates = {
        Goa: { lat: 15.2993, lon: 74.1240 },
        Manali: { lat: 32.2432, lon: 77.1892 },
        Rishikesh: { lat: 30.0869, lon: 78.2676 },
        Mumbai: { lat: 19.0760, lon: 72.8777 },
        Delhi: { lat: 28.6139, lon: 77.2090 },
        Jaipur: { lat: 26.9124, lon: 75.7873 },
        Kashmir: { lat: 34.0837, lon: 74.7973 },
        Ladakh: { lat: 34.1526, lon: 77.5771 },
        Pondicherry: { lat: 11.9416, lon: 79.8083 },
        Kedarnath: { lat: 30.7352, lon: 79.0669 }
    };

    const location = coordinates[place];

    if (!location) return "Weather unavailable";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m`;

    const res = await fetch(url);
    const data = await res.json();

    return `${place}: ${data.current.temperature_2m}°C`;
}