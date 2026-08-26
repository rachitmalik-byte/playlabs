/**
 * High-performance, transparent-background, sketchbook vector Lottie animations for PlayLabs.
 * Clean, charming, easy-to-understand science illustrations compliant with Bodymovin / Lottie specification.
 */

// 1. Chemistry Lab & Bubbling Flask (Transparent)
export const chemistryLabAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 160,
  h: 160,
  nm: "Chemistry Lab",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bubble 1",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 15, s: [100], e: [100] }, { t: 45, s: [100], e: [0] }, { t: 60, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [75, 110, 0], e: [75, 60, 0] }, { t: 60, s: [75, 60, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [50, 50, 100], e: [120, 120, 100] }, { t: 60, s: [120, 120, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [10, 10] } },
        { ty: "fl", c: { k: [0.38, 0.72, 0.98, 0.9] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Flask Liquid",
      sr: 1,
      ks: {
        o: { k: 90 },
        r: { k: 0 },
        p: { k: [80, 100, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [100, 100, 100], e: [103, 97, 100] }, { t: 30, s: [103, 97, 100], e: [100, 100, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 10] }, s: { k: [50, 32] } },
        { ty: "fl", c: { k: [0.2, 0.6, 0.95, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Flask Glass",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [80, 80, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "rc", p: { k: [0, -20] }, s: { k: [18, 40] }, r: { k: 4 } },
        { ty: "el", p: { k: [0, 20] }, s: { k: [65, 60] } },
        { ty: "st", c: { k: [0.2, 0.35, 0.55, 1] }, w: { k: 5 } }
      ]
    }
  ]
};

// 2. Burning Flame Simulator (Transparent)
export const flameAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 30,
  w: 140,
  h: 140,
  nm: "Flame",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Flame Core",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [70, 80, 0], e: [70, 75, 0] }, { t: 15, s: [70, 75, 0], e: [70, 80, 0] }, { t: 30, s: [70, 80, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [80, 100, 100], e: [95, 120, 100] }, { t: 15, s: [95, 120, 100], e: [80, 100, 100] }, { t: 30, s: [80, 100, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [26, 38] } },
        { ty: "fl", c: { k: [1.0, 0.9, 0.2, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Outer Flame",
      sr: 1,
      ks: {
        o: { k: 90 },
        r: { k: [{ t: 0, s: [-3], e: [3] }, { t: 15, s: [3], e: [-3] }, { t: 30, s: [-3] }] },
        p: { k: [70, 70, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [100, 100, 100], e: [110, 115, 100] }, { t: 15, s: [110, 115, 100], e: [100, 100, 100] }, { t: 30, s: [100, 100, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 10] }, s: { k: [48, 65] } },
        { ty: "fl", c: { k: [0.95, 0.3, 0.1, 0.9] } }
      ]
    }
  ]
};

// 3. Electrical Sparks & Glowing Bulb (Transparent)
export const electricityAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Electricity",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Glow",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [30], e: [80] }, { t: 20, s: [80], e: [30] }, { t: 40, s: [30] }] },
        r: { k: 0 },
        p: { k: [70, 65, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [90, 90, 100], e: [125, 125, 100] }, { t: 20, s: [125, 125, 100], e: [90, 90, 100] }, { t: 40, s: [90, 90, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [70, 70] } },
        { ty: "fl", c: { k: [1.0, 0.85, 0.2, 0.5] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Bulb",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [70, 65, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, -5] }, s: { k: [40, 40] } },
        { ty: "fl", c: { k: [1.0, 0.92, 0.3, 1] } },
        { ty: "rc", p: { k: [0, 18] }, s: { k: [18, 14] }, r: { k: 3 } },
        { ty: "fl", c: { k: [0.6, 0.6, 0.65, 1] } }
      ]
    }
  ]
};

// 4. Plant & Cotton Growing (Transparent)
export const plantGrowthAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 140,
  h: 140,
  nm: "Cotton Plant",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Cotton Boll",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 30, s: [100] }, { t: 60, s: [100] }] },
        r: { k: 0 },
        p: { k: [70, 42, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [20, 20, 100], e: [100, 100, 100] }, { t: 30, s: [100, 100, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [-10, 0] }, s: { k: [22, 22] } },
        { ty: "el", p: { k: [10, 0] }, s: { k: [22, 22] } },
        { ty: "el", p: { k: [0, -8] }, s: { k: [24, 24] } },
        { ty: "fl", c: { k: [1.0, 1.0, 1.0, 1] } },
        { ty: "st", c: { k: [0.85, 0.9, 0.85, 1] }, w: { k: 3 } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Leaves",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [-6], e: [6] }, { t: 30, s: [6], e: [-6] }, { t: 60, s: [-6] }] },
        p: { k: [70, 75, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [-15, -8] }, s: { k: [18, 12] } },
        { ty: "el", p: { k: [15, -8] }, s: { k: [18, 12] } },
        { ty: "fl", c: { k: [0.2, 0.75, 0.35, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Stem",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [70, 85, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "rc", p: { k: [0, 0] }, s: { k: [6, 60] }, r: { k: 3 } },
        { ty: "fl", c: { k: [0.15, 0.65, 0.3, 1] } }
      ]
    }
  ]
};

// 5. Fluffy Sheep & Wool (Transparent)
export const woolSheepAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 45,
  w: 140,
  h: 140,
  nm: "Wool Sheep",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Sheep Body",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [70, 70, 0], e: [70, 67, 0] }, { t: 22, s: [70, 67, 0], e: [70, 70, 0] }, { t: 45, s: [70, 70, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        // Fluffy cloud body
        { ty: "el", p: { k: [0, 0] }, s: { k: [55, 45] } },
        { ty: "el", p: { k: [-18, -10] }, s: { k: [30, 30] } },
        { ty: "el", p: { k: [18, -10] }, s: { k: [30, 30] } },
        { ty: "fl", c: { k: [0.95, 0.95, 0.98, 1] } },
        { ty: "st", c: { k: [0.75, 0.8, 0.85, 1] }, w: { k: 3 } },
        // Cute face
        { ty: "el", p: { k: [25, 2] }, s: { k: [20, 18] } },
        { ty: "fl", c: { k: [0.95, 0.8, 0.75, 1] } },
        // Eye
        { ty: "el", p: { k: [28, 0] }, s: { k: [4, 4] } },
        { ty: "fl", c: { k: [0.1, 0.1, 0.1, 1] } }
      ]
    }
  ]
};

// 6. Silkworm & Golden Silk Thread (Transparent)
export const silkwormAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Silkworm Cocoon",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Golden Thread",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [0], e: [360] }, { t: 40, s: [360] }] },
        p: { k: [70, 70, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [52, 38] } },
        { ty: "st", c: { k: [1.0, 0.82, 0.2, 1] }, w: { k: 4 } },
        { ty: "fl", c: { k: [1.0, 0.92, 0.5, 0.9] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Caterpillar Head",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [-8], e: [8] }, { t: 20, s: [8], e: [-8] }, { t: 40, s: [-8] }] },
        p: { k: [45, 68, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [18, 18] } },
        { ty: "fl", c: { k: [0.35, 0.8, 0.4, 1] } },
        { ty: "el", p: { k: [-3, -2] }, s: { k: [4, 4] } },
        { ty: "fl", c: { k: [0.1, 0.1, 0.1, 1] } }
      ]
    }
  ]
};

// 7. Nylon Climbing Rope (Transparent)
export const nylonRopeAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Nylon Rope",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Rope & Carabiner",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [70, 65, 0], e: [70, 72, 0] }, { t: 20, s: [70, 72, 0], e: [70, 65, 0] }, { t: 40, s: [70, 65, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        // Blue coiled climbing rope
        { ty: "el", p: { k: [0, -10] }, s: { k: [44, 44] } },
        { ty: "st", c: { k: [0.15, 0.5, 0.95, 1] }, w: { k: 8 } },
        // Carabiner clip
        { ty: "rc", p: { k: [0, 22] }, s: { k: [20, 28] }, r: { k: 8 } },
        { ty: "st", c: { k: [0.95, 0.4, 0.1, 1] }, w: { k: 5 } }
      ]
    }
  ]
};

// 8. Polyester Jacket & Water Droplets (Transparent)
export const polyesterJacketAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Polyester Jacket",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Water Droplet Bounce",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 15, s: [100] }, { t: 35, s: [100], e: [0] }, { t: 40, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [70, 30, 0], e: [85, 75, 0] }, { t: 40, s: [85, 75, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [10, 14] } },
        { ty: "fl", c: { k: [0.2, 0.7, 1.0, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Jacket Body",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [70, 75, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "rc", p: { k: [0, 0] }, s: { k: [50, 48] }, r: { k: 10 } },
        { ty: "fl", c: { k: [0.95, 0.45, 0.15, 1] } },
        { ty: "st", c: { k: [0.8, 0.35, 0.1, 1] }, w: { k: 3 } }
      ]
    }
  ]
};

// 9. Plastic Recyclable Bottle (Transparent)
export const plasticBottleAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Plastic Bottle",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bottle",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [-3], e: [3] }, { t: 20, s: [3], e: [-3] }, { t: 40, s: [-3] }] },
        p: { k: [70, 70, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        // Cap
        { ty: "rc", p: { k: [0, -32] }, s: { k: [14, 10] }, r: { k: 2 } },
        { ty: "fl", c: { k: [0.15, 0.5, 0.95, 1] } },
        // Body
        { ty: "rc", p: { k: [0, 4] }, s: { k: [32, 54] }, r: { k: 8 } },
        { ty: "fl", c: { k: [0.75, 0.9, 1.0, 0.8] } },
        { ty: "st", c: { k: [0.4, 0.7, 0.95, 1] }, w: { k: 3 } }
      ]
    }
  ]
};

// 10. Rubber Tree & Latex Cup (Transparent)
export const rubberTreeAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
  nm: "Rubber Tree",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Latex Drop",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 20, s: [100] }, { t: 38, s: [100], e: [0] }, { t: 40, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [76, 68, 0], e: [76, 85, 0] }, { t: 40, s: [76, 85, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [6, 8] } },
        { ty: "fl", c: { k: [1.0, 1.0, 1.0, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Tree Trunk & Foliage",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [70, 70, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        // Canopy
        { ty: "el", p: { k: [0, -28] }, s: { k: [50, 36] } },
        { ty: "fl", c: { k: [0.2, 0.7, 0.3, 1] } },
        // Trunk
        { ty: "rc", p: { k: [0, 14] }, s: { k: [16, 50] }, r: { k: 3 } },
        { ty: "fl", c: { k: [0.55, 0.35, 0.2, 1] } },
        // Cup
        { ty: "el", p: { k: [8, 20] }, s: { k: [12, 10] } },
        { ty: "fl", c: { k: [0.3, 0.3, 0.35, 1] } }
      ]
    }
  ]
};

// 11. Celebration Confetti & Star (Transparent)
export const celebrationAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 45,
  w: 160,
  h: 160,
  nm: "Celebration",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Star",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [0], e: [360] }, { t: 45, s: [360] }] },
        p: { k: [80, 80, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [80, 80, 100], e: [110, 110, 100] }, { t: 22, s: [110, 110, 100], e: [80, 80, 100] }, { t: 45, s: [80, 80, 100] }] }
      },
      shapes: [
        { ty: "sr", p: { k: [0, 0] }, pt: { k: 5 }, ir: { k: 16 }, or: { k: 34 } },
        { ty: "fl", c: { k: [1.0, 0.8, 0.1, 1] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Confetti",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [100], e: [0] }, { t: 45, s: [0] }] },
        r: { k: 0 },
        p: { k: [80, 80, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [20, 20, 100], e: [130, 130, 100] }, { t: 45, s: [130, 130, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [-35, -35] }, s: { k: [10, 10] } },
        { ty: "fl", c: { k: [0.95, 0.25, 0.35, 1] } },
        { ty: "el", p: { k: [38, -30] }, s: { k: [9, 9] } },
        { ty: "fl", c: { k: [0.2, 0.7, 0.95, 1] } },
        { ty: "el", p: { k: [-38, 30] }, s: { k: [9, 9] } },
        { ty: "fl", c: { k: [0.3, 0.85, 0.4, 1] } },
        { ty: "el", p: { k: [35, 35] }, s: { k: [10, 10] } },
        { ty: "fl", c: { k: [0.8, 0.35, 0.95, 1] } }
      ]
    }
  ]
};

// 12. Water Droplets & Sweat (Transparent)
export const waterDropletsAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 120,
  h: 120,
  nm: "Water Droplets",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Drop 1",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 10, s: [100] }, { t: 35, s: [100], e: [0] }, { t: 40, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [60, 25, 0], e: [60, 80, 0] }, { t: 40, s: [60, 80, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [14, 20] } },
        { ty: "fl", c: { k: [0.25, 0.65, 0.98, 0.9] } }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Ripple",
      sr: 1,
      ks: {
        o: { k: [{ t: 20, s: [0], e: [80] }, { t: 30, s: [80], e: [0] }, { t: 40, s: [0] }] },
        r: { k: 0 },
        p: { k: [60, 85, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 20, s: [30, 15, 100], e: [120, 35, 100] }, { t: 40, s: [120, 35, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [0, 0] }, s: { k: [32, 16] } },
        { ty: "st", c: { k: [0.3, 0.7, 1.0, 1] }, w: { k: 3 } }
      ]
    }
  ]
};
