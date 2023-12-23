type nodeType = {
  N: { long: number; lat: number };
  E: { long: number; lat: number };
  S: { long: number; lat: number };
  W: { long: number; lat: number };
};

export const nodeModifiers: nodeType = {
  N: { long: 0, lat: 2 },
  E: { long: 2, lat: 0 },
  S: { long: 0, lat: 2 },
  W: { long: -2, lat: 0 },
};
