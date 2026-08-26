/**
 * High-performance, lightweight vector Lottie JSON animations for PlayLabs experiments
 * Compliant with Bodymovin / Lottie specification
 */

// 1. Chemistry Lab & Bubbling Flask
export const chemistryLabAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Chemistry Lab",
  ddd: 0,
  assets: [],
  layers: [
    // Bubbles
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bubble 1",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 15, s: [100], e: [100] }, { t: 45, s: [100], e: [0] }, { t: 60, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [95, 130, 0], e: [95, 75, 0] }, { t: 60, s: [95, 75, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [50, 50, 100], e: [120, 120, 100] }, { t: 60, s: [120, 120, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [12, 12] }
        },
        {
          ty: "fl",
          c: { k: [0.38, 0.72, 0.98, 0.9] },
          o: { k: 100 }
        }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Bubble 2",
      sr: 1,
      ks: {
        o: { k: [{ t: 10, s: [0], e: [100] }, { t: 25, s: [100], e: [100] }, { t: 55, s: [100], e: [0] }, { t: 60, s: [0] }] },
        r: { k: 0 },
        p: { k: [{ t: 10, s: [110, 135, 0], e: [112, 70, 0] }, { t: 60, s: [112, 70, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 10, s: [40, 40, 100], e: [100, 100, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [10, 10] }
        },
        {
          ty: "fl",
          c: { k: [0.6, 0.85, 1.0, 0.9] },
          o: { k: 100 }
        }
      ]
    },
    // Flask Body
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Flask Liquid",
      sr: 1,
      ks: {
        o: { k: 90 },
        r: { k: 0 },
        p: { k: [100, 125, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [100, 100, 100], e: [102, 98, 100] }, { t: 30, s: [102, 98, 100], e: [100, 100, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 10] },
          s: { k: [60, 40] }
        },
        {
          ty: "fl",
          c: { k: [0.2, 0.6, 0.95, 1] },
          o: { k: 100 }
        }
      ]
    },
    // Glass Outline
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Flask Glass",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [100, 100, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc",
          p: { k: [0, -25] },
          s: { k: [22, 50] },
          r: { k: 4 }
        },
        {
          ty: "el",
          p: { k: [0, 25] },
          s: { k: [80, 75] }
        },
        {
          ty: "st",
          c: { k: [0.2, 0.35, 0.55, 1] },
          w: { k: 6 },
          o: { k: 100 }
        }
      ]
    }
  ]
};

// 2. Burning Flame & Safety Simulator
export const flameAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 30,
  w: 160,
  h: 160,
  nm: "Flame",
  ddd: 0,
  assets: [],
  layers: [
    // Inner Hot Core
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Flame Core",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [{ t: 0, s: [80, 95, 0], e: [80, 90, 0] }, { t: 15, s: [80, 90, 0], e: [80, 95, 0] }, { t: 30, s: [80, 95, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [80, 100, 100], e: [95, 120, 100] }, { t: 15, s: [95, 120, 100], e: [80, 100, 100] }, { t: 30, s: [80, 100, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [30, 45] }
        },
        {
          ty: "fl",
          c: { k: [1.0, 0.9, 0.2, 1] },
          o: { k: 100 }
        }
      ]
    },
    // Outer Flame
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Outer Flame",
      sr: 1,
      ks: {
        o: { k: 90 },
        r: { k: [{ t: 0, s: [-3], e: [3] }, { t: 15, s: [3], e: [-3] }, { t: 30, s: [-3] }] },
        p: { k: [80, 85, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [100, 100, 100], e: [110, 115, 100] }, { t: 15, s: [110, 115, 100], e: [100, 100, 100] }, { t: 30, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 10] },
          s: { k: [55, 75] }
        },
        {
          ty: "fl",
          c: { k: [0.95, 0.3, 0.1, 0.9] },
          o: { k: 100 }
        }
      ]
    }
  ]
};

// 3. Electrical Sparks & Glowing Bulb
export const electricityAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 160,
  h: 160,
  nm: "Electricity",
  ddd: 0,
  assets: [],
  layers: [
    // Glow Halo
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Glow",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [30], e: [80] }, { t: 20, s: [80], e: [30] }, { t: 40, s: [30] }] },
        r: { k: 0 },
        p: { k: [80, 75, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [90, 90, 100], e: [125, 125, 100] }, { t: 20, s: [125, 125, 100], e: [90, 90, 100] }, { t: 40, s: [90, 90, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [80, 80] }
        },
        {
          ty: "fl",
          c: { k: [1.0, 0.85, 0.2, 0.5] },
          o: { k: 100 }
        }
      ]
    },
    // Bulb Glass
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Bulb",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [80, 75, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, -5] },
          s: { k: [46, 46] }
        },
        {
          ty: "fl",
          c: { k: [1.0, 0.92, 0.3, 1] },
          o: { k: 100 }
        },
        {
          ty: "rc",
          p: { k: [0, 22] },
          s: { k: [22, 16] },
          r: { k: 3 }
        },
        {
          ty: "fl",
          c: { k: [0.6, 0.6, 0.65, 1] },
          o: { k: 100 }
        }
      ]
    }
  ]
};

// 4. Plant & Cotton Growing
export const plantGrowthAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 160,
  h: 160,
  nm: "Plant Growth",
  ddd: 0,
  assets: [],
  layers: [
    // Cotton Flower
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Cotton Boll",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [0], e: [100] }, { t: 30, s: [100] }, { t: 60, s: [100] }] },
        r: { k: 0 },
        p: { k: [80, 48, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [20, 20, 100], e: [100, 100, 100] }, { t: 30, s: [100, 100, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [38, 38] }
        },
        {
          ty: "fl",
          c: { k: [1.0, 1.0, 1.0, 1] },
          o: { k: 100 }
        },
        {
          ty: "st",
          c: { k: [0.85, 0.9, 0.85, 1] },
          w: { k: 4 },
          o: { k: 100 }
        }
      ]
    },
    // Leaves
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Leaves",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [-8], e: [8] }, { t: 30, s: [8], e: [-8] }, { t: 60, s: [-8] }] },
        p: { k: [80, 85, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [-18, -10] },
          s: { k: [22, 14] }
        },
        {
          ty: "el",
          p: { k: [18, -10] },
          s: { k: [22, 14] }
        },
        {
          ty: "fl",
          c: { k: [0.2, 0.75, 0.35, 1] },
          o: { k: 100 }
        }
      ]
    },
    // Stem
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Stem",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: 0 },
        p: { k: [80, 95, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc",
          p: { k: [0, 0] },
          s: { k: [8, 70] },
          r: { k: 3 }
        },
        {
          ty: "fl",
          c: { k: [0.15, 0.65, 0.3, 1] },
          o: { k: 100 }
        }
      ]
    }
  ]
};

// 5. Celebration Stars & Confetti
export const celebrationAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 45,
  w: 180,
  h: 180,
  nm: "Celebration",
  ddd: 0,
  assets: [],
  layers: [
    // Golden Trophy Star
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Star",
      sr: 1,
      ks: {
        o: { k: 100 },
        r: { k: [{ t: 0, s: [0], e: [360] }, { t: 45, s: [360] }] },
        p: { k: [90, 90, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [80, 80, 100], e: [110, 110, 100] }, { t: 22, s: [110, 110, 100], e: [80, 80, 100] }, { t: 45, s: [80, 80, 100] }] }
      },
      shapes: [
        {
          ty: "sr",
          p: { k: [0, 0] },
          pt: { k: 5 },
          ir: { k: 18 },
          or: { k: 38 }
        },
        {
          ty: "fl",
          c: { k: [1.0, 0.8, 0.1, 1] },
          o: { k: 100 }
        }
      ]
    },
    // Confetti Dots
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Confetti",
      sr: 1,
      ks: {
        o: { k: [{ t: 0, s: [100], e: [0] }, { t: 45, s: [0] }] },
        r: { k: 0 },
        p: { k: [90, 90, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 0, s: [20, 20, 100], e: [140, 140, 100] }, { t: 45, s: [140, 140, 100] }] }
      },
      shapes: [
        { ty: "el", p: { k: [-40, -40] }, s: { k: [12, 12] } },
        { ty: "fl", c: { k: [0.95, 0.25, 0.35, 1] } },
        { ty: "el", p: { k: [45, -35] }, s: { k: [10, 10] } },
        { ty: "fl", c: { k: [0.2, 0.7, 0.95, 1] } },
        { ty: "el", p: { k: [-45, 35] }, s: { k: [10, 10] } },
        { ty: "fl", c: { k: [0.3, 0.85, 0.4, 1] } },
        { ty: "el", p: { k: [40, 40] }, s: { k: [12, 12] } },
        { ty: "fl", c: { k: [0.8, 0.35, 0.95, 1] } }
      ]
    }
  ]
};

// 6. Water Droplets & Sweat Absorption
export const waterDropletsAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 40,
  w: 140,
  h: 140,
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
        p: { k: [{ t: 0, s: [70, 30, 0], e: [70, 95, 0] }, { t: 40, s: [70, 95, 0] }] },
        a: { k: [0, 0, 0] },
        s: { k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [18, 26] }
        },
        {
          ty: "fl",
          c: { k: [0.25, 0.65, 0.98, 0.9] },
          o: { k: 100 }
        }
      ]
    },
    // Splash Ripple
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Ripple",
      sr: 1,
      ks: {
        o: { k: [{ t: 20, s: [0], e: [80] }, { t: 30, s: [80], e: [0] }, { t: 40, s: [0] }] },
        r: { k: 0 },
        p: { k: [70, 100, 0] },
        a: { k: [0, 0, 0] },
        s: { k: [{ t: 20, s: [30, 15, 100], e: [140, 40, 100] }, { t: 40, s: [140, 40, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { k: [0, 0] },
          s: { k: [40, 20] }
        },
        {
          ty: "st",
          c: { k: [0.3, 0.7, 1.0, 1] },
          w: { k: 3 }
        }
      ]
    }
  ]
};
