export const processForecastData = (forecastList) => {
  const groupedData = forecastList.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0]; 
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const dailyForecast = Object.keys(groupedData).map((date) => {
    const dayData = groupedData[date];
    const tempMax = Math.max(...dayData.map((d) => d.main.temp_max));
    const tempMin = Math.min(...dayData.map((d) => d.main.temp_min));
    const midDayWeather = dayData[Math.floor(dayData.length / 2)].weather[0];

    return {
      date,
      tempMax: Math.round(tempMax),
      tempMin: Math.round(tempMin),
      icon: midDayWeather.icon,
      description: midDayWeather.description,
    };
  });

  return dailyForecast.slice(0, 5);
};