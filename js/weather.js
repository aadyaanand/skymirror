// Weather API Integration (Open-Meteo)
// Free, no API key required

class WeatherAPI {
  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    this.airQualityUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality';
  }
  
  async getWeather(lat, lon) {
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,wind_speed_10m,cloud_cover',
        timezone: 'auto'
      });
      
      const response = await fetch(`${this.baseUrl}?${params}`);
      if (!response.ok) throw new Error('Weather fetch failed');
      
      const data = await response.json();
      return this.parseWeatherData(data);
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getFallbackData();
    }
  }
  
  async getAirQuality(lat, lon) {
    try {
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'pm2_5,pm10,us_aqi',
        timezone: 'auto'
      });
      
      const response = await fetch(`${this.airQualityUrl}?${params}`);
      if (!response.ok) throw new Error('Air quality fetch failed');
      
      const data = await response.json();
      return this.parseAirQualityData(data);
    } catch (error) {
      console.error('Air quality API error:', error);
      return { aqi: 50, description: 'Good' };
    }
  }
  
  parseWeatherData(data) {
    const current = data.current;
    
    return {
      temperature: Math.round(current.temperature_2m),
      apparentTemp: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      cloudCover: current.cloud_cover,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: current.wind_direction_10m,
      weatherCode: current.weather_code,
      hourly: {
        temperature: data.hourly.temperature_2m,
        windSpeed: data.hourly.wind_speed_10m,
        cloudCover: data.hourly.cloud_cover
      }
    };
  }
  
  parseAirQualityData(data) {
    const current = data.current;
    const aqi = current.us_aqi || 50;
    
    let description = 'Good';
    if (aqi > 150) description = 'Unhealthy';
    else if (aqi > 100) description = 'Unhealthy for Sensitive';
    else if (aqi > 50) description = 'Moderate';
    
    return {
      aqi: Math.round(aqi),
      pm25: current.pm2_5,
      pm10: current.pm10,
      description
    };
  }
  
  getFallbackData() {
    return {
      temperature: 21,
      apparentTemp: 20,
      humidity: 65,
      precipitation: 0,
      cloudCover: 45,
      windSpeed: 12,
      windDirection: 180,
      weatherCode: 2,
      hourly: {
        temperature: Array(24).fill(20),
        windSpeed: Array(24).fill(10),
        cloudCover: Array(24).fill(40)
      }
    };
  }
  
  // Weather code interpretations (WMO codes)
  interpretWeatherCode(code) {
    const codes = {
      0: { condition: 'Clear sky', icon: 'sun' },
      1: { condition: 'Mainly clear', icon: 'sun' },
      2: { condition: 'Partly cloudy', icon: 'cloud' },
      3: { condition: 'Overcast', icon: 'cloud' },
      45: { condition: 'Foggy', icon: 'cloud' },
      48: { condition: 'Depositing rime fog', icon: 'cloud' },
      51: { condition: 'Light drizzle', icon: 'droplet' },
      53: { condition: 'Moderate drizzle', icon: 'droplet' },
      55: { condition: 'Dense drizzle', icon: 'droplet' },
      61: { condition: 'Slight rain', icon: 'droplet' },
      63: { condition: 'Moderate rain', icon: 'droplet' },
      65: { condition: 'Heavy rain', icon: 'droplet' },
      71: { condition: 'Slight snow', icon: 'cloud' },
      73: { condition: 'Moderate snow', icon: 'cloud' },
      75: { condition: 'Heavy snow', icon: 'cloud' },
      80: { condition: 'Slight rain showers', icon: 'droplet' },
      81: { condition: 'Moderate rain showers', icon: 'droplet' },
      82: { condition: 'Violent rain showers', icon: 'droplet' },
      95: { condition: 'Thunderstorm', icon: 'cloud' },
      96: { condition: 'Thunderstorm with slight hail', icon: 'cloud' },
      99: { condition: 'Thunderstorm with heavy hail', icon: 'cloud' }
    };
    
    return codes[code] || codes[2];
  }
  
  getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
  
  getWindDescription(speed) {
    if (speed < 5) return 'calm';
    if (speed < 12) return 'gentle';
    if (speed < 20) return 'moderate';
    if (speed < 30) return 'strong';
    return 'powerful';
  }
  
  getTempDescription(temp) {
    if (temp < 0) return 'freezing cold';
    if (temp < 10) return 'cold';
    if (temp < 15) return 'cool';
    if (temp < 20) return 'mild';
    if (temp < 25) return 'comfortable';
    if (temp < 30) return 'warm';
    return 'hot';
  }
}

// Export for use in app
window.WeatherAPI = WeatherAPI;

