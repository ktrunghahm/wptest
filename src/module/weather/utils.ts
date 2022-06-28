const WIND_DIR_ARR = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export function getWindDirection(degree: number) {
  const val = Math.floor(degree / 22.5 + 0.5);
  return WIND_DIR_ARR[val % 16];
}

export function getAirQualityText(index: number) {
  if (index === 1) {
    return "Good";
  } else if (index === 2) {
    return "Fair";
  } else if (index === 3) {
    return "Moderate";
  } else if (index === 4) {
    return "Poor";
  } else if (index === 5) {
    return "Very poor";
  } else {
    return "N/A";
  }
}
