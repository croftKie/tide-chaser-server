"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hourlyData = exports.dailyAverage = void 0;
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
function dailyAverage(fullData) {
    const dailyAverages = [];
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
exports.dailyAverage = dailyAverage;
// Hourly Data Object Creation
function hourlyData(fullData) {
    const dataByHour = [];
    getDayNums(fullData).forEach((day) => {
        const dayData = {
            name: days[day],
            date: fullData[0].time,
            dayValue: day,
            data: [],
        };
        const dayObj = fullData.filter((e) => {
            return new Date(e.time).getDay() === day;
        });
        dayObj.forEach((hour) => {
            dayData.data.push(hour);
        });
        dataByHour.push(dayData);
    });
    return dataByHour;
}
exports.hourlyData = hourlyData;
//
// DAILY AVERAGE CALCULATIONS
//
function averageWaveHeight(fullData, dayNum) {
    let avgWaveHeight = 0;
    const surfPerDay = fullData.filter((e) => {
        return new Date(e.time).getDay() === dayNum;
    });
    surfPerDay.forEach((e) => {
        avgWaveHeight += e.waveHeight.noaa;
    });
    return parseFloat((avgWaveHeight / surfPerDay.length).toFixed(2));
}
function averageTemp(fullData, dayNum) {
    let avgTemp = 0;
    const weatherPerDay = fullData.filter((e) => {
        return new Date(e.time).getDay() === dayNum;
    });
    weatherPerDay.forEach((e) => {
        avgTemp += e.airTemperature.noaa;
    });
    return Math.round(avgTemp / weatherPerDay.length);
}
function averagecloud(fullData, dayNum) {
    let avgCloud = 0;
    const cloudPerDay = fullData.filter((e) => {
        return new Date(e.time).getDay() === dayNum;
    });
    cloudPerDay.forEach((e) => {
        avgCloud += e.cloudCover.noaa;
    });
    return Math.floor(avgCloud / cloudPerDay.length);
}
function averageRain(fullData, dayNum) {
    let avgRain = 0;
    const rainPerDay = fullData.filter((e) => {
        return new Date(e.time).getDay() === dayNum;
    });
    rainPerDay.forEach((e) => {
        avgRain += e.precipitation.noaa;
    });
    return parseFloat((avgRain / rainPerDay.length).toFixed(2));
}
function getDayNums(fullData) {
    const nums = [];
    for (let i = 0; i < fullData.length; i += 24) {
        nums.push(new Date(fullData[i].time).getDay());
    }
    return nums;
}
