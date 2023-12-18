type daily = {
  day: string;
  dayValue: number;
  waveHeight: number;
  temp: number;
  cloud: number;
  rain: number;
};

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function dailyAverage(fullData: any) {
  const dailyAverages: Array<daily> = [];
  getDayNums(fullData).forEach((day) => {
    dailyAverages.push({
      day: days[day],
      dayValue: day,
      waveHeight: averageWaveHeight(fullData, day),
      temp: averageTemp(fullData, day),
      cloud: averagecloud(fullData, day),
      rain: averageRain(fullData, day),
    });
  });
  return dailyAverages;
}

// Hourly Data Object Creation
export function hourlyData(fullData: any) {
  const dataByHour: any = [];
  getDayNums(fullData).forEach((day) => {
    const dayData = {
      name: days[day],
      date: fullData[0].time,
      dayValue: day,
      data: [],
    };
    const dayObj = fullData.filter((e: any) => {
      return new Date(e.time).getDay() === day;
    });
    dayObj.forEach((hour: never) => {
      dayData.data.push(hour);
    });
    dataByHour.push(dayData);
  });
  return dataByHour;
}

//
// DAILY AVERAGE CALCULATIONS
//
function averageWaveHeight(fullData: any, dayNum: number) {
  let avgWaveHeight = 0;
  const surfPerDay = fullData.filter((e: any) => {
    return new Date(e.time).getDay() === dayNum;
  });
  surfPerDay.forEach((e: any) => {
    avgWaveHeight += e.waveHeight.noaa;
  });
  return parseFloat((avgWaveHeight / surfPerDay.length).toFixed(2));
}
function averageTemp(fullData: any, dayNum: number) {
  let avgTemp = 0;
  const weatherPerDay = fullData.filter((e: any) => {
    return new Date(e.time).getDay() === dayNum;
  });
  weatherPerDay.forEach((e: any) => {
    avgTemp += e.airTemperature.noaa;
  });
  return Math.round(avgTemp / weatherPerDay.length);
}
function averagecloud(fullData: any, dayNum: number) {
  let avgCloud = 0;
  const cloudPerDay = fullData.filter((e: any) => {
    return new Date(e.time).getDay() === dayNum;
  });
  cloudPerDay.forEach((e: any) => {
    avgCloud += e.cloudCover.noaa;
  });
  return Math.floor(avgCloud / cloudPerDay.length);
}
function averageRain(fullData: any, dayNum: number) {
  let avgRain = 0;
  const rainPerDay = fullData.filter((e: any) => {
    return new Date(e.time).getDay() === dayNum;
  });
  rainPerDay.forEach((e: any) => {
    avgRain += e.precipitation.noaa;
  });
  return parseFloat((avgRain / rainPerDay.length).toFixed(2));
}
function getDayNums(fullData: any) {
  const nums = [];
  for (let i = 0; i < fullData.length; i += 24) {
    nums.push(new Date(fullData[i].time).getDay());
  }
  return nums;
}
