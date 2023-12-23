import axios from "axios";
import { dailyAverage, hourlyData } from "./dataCalculations";
import { nodeModifiers } from "../constants/nodeModifiers";
import { data } from "../constants/fakeData";

export async function fetchStormGlassData() {
  const long = -9.256033028734998;
  const lat = 38.672875677776545;

  const coordData = {
    selection: [long, lat],
    nodes: [
      [long, lat + nodeModifiers.N.lat],
      [long + nodeModifiers.E.long, lat],
      [long, lat + nodeModifiers.S.lat],
      [long + nodeModifiers.W.long, lat],
    ],
  };

  const params =
    "airTemperature,humidity,visibility,precipitation,currentDirection,currentSpeed,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed,cloudCover,waterTemperature";

  // const selection = await fetch(
  //   coordData.selection[0],
  //   coordData.selection[1],
  //   params
  // );
  // const nodes = await fetchNodes(coordData, params);

  // const landNodes = testNodesForLand(nodes);

  // const preparedData = {
  //   rawData: selection,
  //   landNodes: landNodes,
  // };
  // return preparedData;

  data.rawData.hours.length = 24 * 7;

  data.hourlyData = data.rawData.hours.map((hour: any) => {
    const keys = Object.keys(hour);
    const values = Object.values(hour);
    const averagedValues = values.map((valueSet: any, index: number) => {
      if (typeof valueSet !== "string") {
        const innerValues: number[] = Object.values(valueSet);
        let total = innerValues.reduce((sum, item) => {
          return sum + item;
        }, 0);
        return total / innerValues.length;
      } else {
        return valueSet;
      }
    });
    const obj: { [key: string]: number | string } = {};
    keys.forEach((key: string, index) => {
      obj[key] = averagedValues[index];
    });
    return obj;
  });

  return {
    daily: dailyAverage(data.hourlyData),
    hourly: hourlyData(data.hourlyData),
    rawData: data.hourlyData,
  };;
}

async function fetch(long: number, lat: number, params: string) {
  const { data } = await axios.get(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}&params=${params}`,
    {
      headers: {
        Authorization: process.env.SG_API_KEY,
      },
    }
  );
  return data;
}

async function fetchNodes(coords: any, params: any) {
  const mapArr = [];
  for (let i = 0; i < coords.nodes.length; i++) {
    const data = await fetch(coords.nodes[i][0], coords.nodes[i][1], params);
    mapArr.push(data);
  }
  return mapArr;
}

function testNodesForLand(nodes: any) {
  const landNotification = nodes.map((node: any) => {
    if (node.hours[0].waveHeight) {
      return 0;
    } else {
      return 1;
    }
  });
  return landNotification;
}
