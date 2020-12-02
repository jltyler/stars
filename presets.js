const presets = {
    fullPresets: {
        "Engage": {"angleMod":"mv => mv.angle","speedMod":"mv => mv.speed","lengthMod":"mv => mv.length","initialAngleMod":"sv => Math.random() * Math.PI * 2","initialSpeedMod":"sv => 250 + 170 * Math.sin(sv.timestamp * 0.00025)","initialLengthMod":"sv => sv.speed * 0.14","initialColorMod":"sv => 'rgb(170,170,170)'","colorMod":"mv => 'hsl(0,0%,' + (50 + 40 * Math.sin(mv.timestamp * 0.001797 * mv.index * mv.speed * 0.007)) + '%)'","spawnCount":"6","lifetime":"15000"},
        "Spiral Pulse": {"angleMod":"mv => mv.angle","speedMod":"mv => mv.speed -7.4 * mv.delta","lengthMod":"mv => mv.length + 1.8 * Math.sin(mv.timestamp / (138*0.5))","initialAngleMod":"sv => sv.index < 9 ? sv.timestamp / 700+ Math.PI * (2/3) * sv.index : Math.random() * Math.PI * 2","initialSpeedMod":"sv => sv.index < 9 ? 100+ 15* (sv.index / 3 | 0) : 500","initialLengthMod":"sv => sv.speed * .05 + 10","initialColorMod":"sv => {\n  if (sv.index >= 9) return 'rgba(255,255,255,.3)'\n  const mod = (sv.index / 3 | 0)\n  const red = 255 - 100 * mod\n  const blue = 55 + 100 * mod\n  return 'rgb('+red+',0,'+blue+')'\n}","colorMod":"mv => mv.color","spawnCount":"10","lifetime":"15000"},
        "Intermittent Alignment": {"angleMod":"mv => mv.angle","speedMod":"mv => mv.speed - 5 * mv.delta","lengthMod":"mv => mv.speed * .2","initialAngleMod":"sv => sv.timestamp / 330 * (sv.index + 1) * .03","initialSpeedMod":"sv => 500","initialLengthMod":"sv => 10","initialColorMod":"sv => 'hsl('+ (sv.timestamp / 100) +',100%,50%)'","colorMod":"mv => mv.color","spawnCount":"12","lifetime":"5000"},
        "Rainbow Tunnel": {"angleMod":"mv => mv.angle","speedMod":"mv => mv.speed","lengthMod":"mv => mv.length * 1.008","initialAngleMod":"sv => Math.random() * Math.PI * 2","initialSpeedMod":"sv => 20+ Math.random() * 80","initialLengthMod":"sv => sv.speed * .1","initialColorMod":"sv => 'rgb(255,0,0)'","colorMod":"mv => {\n  const hue = (1000/ Math.hypot(mv.line[0] - 1280 / 2, mv.line[1] - 800 / 2)) * 100;\n  const value = (Math.min(50, (mv.endTime - mv.timestamp) * .05));\n  return 'hsl(' + hue + ',100%,' + value + '%)';\n}","spawnCount":"12","lifetime":"15000"},
        "Wawa": {"angleMod":"mv => mv.angle + Math.sin(mv.timestamp * 0.001) * 0.02","speedMod":"mv => mv.speed","lengthMod":"mv => mv.length","initialAngleMod":"sv => (sv.timestamp / 200) + sv.index * Math.PI * 2 * (1 / sv.spawnCount)","initialSpeedMod":"sv => 55","initialLengthMod":"sv => 10","initialColorMod":"sv => 'hsl(' + (250 + Math.sin(sv.timestamp * .0025) * 40) + ',100%,' + (40 + (Math.sin(sv.timestamp * 0.001) * 30)) + '%)'","colorMod":"mv => mv.color","spawnCount":"4","lifetime":"20000"},
        "Swarmy": {"angleMod":"mv => (Math.random() <= 0.999) ? mv.angle : Math.random() * Math.PI * 2","speedMod":"mv => ((Math.random() <= 0.9999) ? mv.speed + (10 - Math.random() * 20) : (1000))","lengthMod":"mv => mv.speed <= 600 ? mv.length : mv.speed / 15","initialAngleMod":"sv => Math.random() * Math.PI * 2","initialSpeedMod":"sv => 12","initialLengthMod":"sv => 10","initialColorMod":"sv => 'rgb(0,255,0)'","colorMod":"mv => 'hsl(' + (120 + Math.min(mv.speed * .4, 120)) + ',100%,50%)'","spawnCount":"4","lifetime":"20000"},
        "134 BPM": {"angleMod":"mv => {\n  const r = Math.random()\n  return mv.angle + ((0.5 - r) * 0.03)\n}","speedMod":"mv => (100 + (Math.sin(mv.timestamp * 0.0139925373134) * 120)) // Magic number: 60 / (134bpm * 32)","lengthMod":"mv => mv.length","initialAngleMod":"sv => Math.sin(sv.timestamp / 2500) * Math.PI * 4","initialSpeedMod":"sv => 50","initialLengthMod":"sv => (40+ (Math.sin(sv.timestamp * 0.0139925373134) * 30))","initialColorMod":"sv => 'hsl(' + ((sv.timestamp / 100) + Math.sin(sv.timestamp * 0.0139925373134) * 40) + ',100%,50%)'","colorMod":"mv => mv.color","spawnCount":"7","lifetime":"15000"},
        "Listless Lattice": {"angleMod":"mv => ((mv.timestamp - mv.startTime) % 400 <= 395 ? mv.angle : mv.angle + Math.PI * -0.5)","speedMod":"mv => mv.speed","lengthMod":"mv => mv.length + 0.06","initialAngleMod":"sv => (Math.PI / 2) * (Math.random() * 4).toFixed()","initialSpeedMod":"sv => 100","initialLengthMod":"sv => 24","initialColorMod":"sv => 'hsl(255,100%,50%)'","colorMod":"mv => 'hsl(' + (mv.timestamp % 12521 < 1500 && Math.random() > 0.75 ? 150 : 250) + ',100%,' + ((mv.endTime - mv.timestamp) * 0.003 + (Math.sin(mv.timestamp * 0.0001) * 0.002)) + '%)'","spawnCount":"8","lifetime":"20500"},

    },
    angleModPresets: {},
    speedModPresets: {},
    lengthModPresets: {},
    colorModPresets: {
        'Rainbows All the Way Down': `mv => 'hsl(' + (1000/ Math.hypot(mv.line[0] - 1280 / 2, mv.line[1] - 800 / 2)) * 100 + ',100%,50%)'`,
        'Fadeout': `mv => 'hsl(300,100%, ' + (Math.min(50, (mv.endTime - mv.timestamp) * .1)) + '%)'`,
    },
    initialAngleModPresets: {
        'Spinning Spreader': 'sv => (sv.timestamp / 100) + sv.index * Math.PI * 2 * (1 / sv.spawnCount)',
    },
    initialSpeedModPresets: {},
    initialLengthModPresets: {},
    initialColorModPresets: {},
};

export default presets;