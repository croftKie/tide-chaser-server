"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStormGlassData = void 0;
const axios_1 = __importDefault(require("axios"));
const dataCalculations_1 = require("./dataCalculations");
const nodeModifiers_1 = require("../constants/nodeModifiers");
const fakeData_1 = require("../constants/fakeData");
function fetchStormGlassData() {
    return __awaiter(this, void 0, void 0, function* () {
        const long = -9.256033028734998;
        const lat = 38.672875677776545;
        const coordData = {
            selection: [long, lat],
            nodes: [
                [long, lat + nodeModifiers_1.nodeModifiers.N.lat],
                [long + nodeModifiers_1.nodeModifiers.E.long, lat],
                [long, lat + nodeModifiers_1.nodeModifiers.S.lat],
                [long + nodeModifiers_1.nodeModifiers.W.long, lat],
            ],
        };
        const params = "airTemperature,humidity,visibility,precipitation,currentDirection,currentSpeed,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed,cloudCover,waterTemperature";
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
        fakeData_1.data.rawData.hours.length = 24 * 7;
        fakeData_1.data.hourlyData = fakeData_1.data.rawData.hours.map((hour) => {
            const keys = Object.keys(hour);
            const values = Object.values(hour);
            const averagedValues = values.map((valueSet, index) => {
                if (typeof valueSet !== "string") {
                    const innerValues = Object.values(valueSet);
                    let total = innerValues.reduce((sum, item) => {
                        return sum + item;
                    }, 0);
                    return total / innerValues.length;
                }
                else {
                    return valueSet;
                }
            });
            const obj = {};
            keys.forEach((key, index) => {
                obj[key] = averagedValues[index];
            });
            return obj;
        });
        return {
            daily: (0, dataCalculations_1.dailyAverage)(fakeData_1.data.hourlyData),
            hourly: (0, dataCalculations_1.hourlyData)(fakeData_1.data.hourlyData),
            rawData: fakeData_1.data.hourlyData,
        };
        ;
    });
}
exports.fetchStormGlassData = fetchStormGlassData;
function fetch(long, lat, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}&params=${params}`, {
            headers: {
                Authorization: process.env.SG_API_KEY,
            },
        });
        return data;
    });
}
function fetchNodes(coords, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapArr = [];
        for (let i = 0; i < coords.nodes.length; i++) {
            const data = yield fetch(coords.nodes[i][0], coords.nodes[i][1], params);
            mapArr.push(data);
        }
        return mapArr;
    });
}
function testNodesForLand(nodes) {
    const landNotification = nodes.map((node) => {
        if (node.hours[0].waveHeight) {
            return 0;
        }
        else {
            return 1;
        }
    });
    return landNotification;
}
