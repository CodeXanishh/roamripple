// Wikipedia Image API
export async function getRealImage(placeName) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${placeName}`;

        const res = await fetch(url);
        const data = await res.json();

        const pages = data.query.pages;
        const page = pages[Object.keys(pages)[0]];

        return page.original
            ? page.original.source
            : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    } catch (error) {
        console.error("Image Error:", error);
        return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
}

// Weather API
export async function getWeather(place) {
    try {
        const res = await fetch(`https://wttr.in/${place}?format=3`);
        return await res.text();
    } catch (error) {
        console.error("Weather Error:", error);
        return "Weather unavailable";
    }
}