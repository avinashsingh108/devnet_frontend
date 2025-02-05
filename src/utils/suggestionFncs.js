
export const fetchLocationSuggestions = async (query) => {
    if (query.trim().length < 3) return [];
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1`
      );
      const data = await response.json();
  
      const simplifiedSuggestions = data.map((result) => {
        const { city, town, village, county, state, country } = result.address;
        const locationParts = [
          city || town || village || county || "",
          state || "",
          country || "",
        ].filter(Boolean); 
        return locationParts.join(", ");
      });
  
      return [...new Set(simplifiedSuggestions)].slice(0, 5); 
    } catch (error) {
      return [];
    }
  };
  