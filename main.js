import ui from './ui.js';

const lerp = (min, max, a) => min + a * (max - min);
const spread = (a, b) => lerp(a, b, Math.random());

const defaultOptions = {
    angleMod: 0,
    speedMod: 0,
    lengthMod: 0,
};

const angleModPresets = [
    'mv => mv.angle + (0.3 * mv.delta) + .02 * (Math.sin((mv.timestamp - mv.startTime) / (50000 / mv.speed)))',
];

const spawnCount = 1;

const doStuff = () => {
    console.log('starting script...');
    ui.bindEvents();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', {alpha: true});


    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    // update functions can remove themselves from the update list so I use an object
    // I can delete the keys from it and not mess with the rest of the indexes but still iterate
    const updateDict = {};

    // Enclosed function for getting line indexes
    const nextIndex = (() => {
        let index = 0;
        return (() => index++);
    })();

    // Get canvas mouse position
    const getMousePos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const drawLine = (x1, y1, x2, y2, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    const newLine = (x, y, angle, speed, length, color, options = {}) => {
        const myOptions = {...defaultOptions, ...options};
        // console.log(myOptions);

        let xOffset = Math.cos(angle) * length;
        let yOffset = Math.sin(angle) * length;
        let xSpeed = Math.cos(angle) * speed;
        let ySpeed = Math.sin(angle) * speed;

        const line = [
            x,
            y,
            x + xOffset,
            y + yOffset,
            color,
        ];

        const myIndex = nextIndex();
        // console.log('myIndex:', myIndex);
        const startTime = performance.now();
        const endTime = startTime + ui.getLifetime();
        const update = (delta, timestamp) => {
            // Bounds check
            if (timestamp >= endTime || (line[0] < 0 || line[0] > canvas.width || line[1] < 0 || line[1] > canvas.height)) {
                delete updateDict[myIndex];
                // console.log('Deleted index ' + myIndex);
            }
            drawLine(...line);

            const modValues = {
                line, angle, speed, delta, timestamp, startTime, endTime, length, color: line[4], kill: () => delete updateDict[myIndex],
            };
            if (typeof ui.getAngleModEval() === 'function')
                angle = ui.getAngleModEval()(modValues);
            if (typeof ui.getSpeedModEval() === 'function')
                speed = ui.getSpeedModEval()(modValues);
            if (typeof ui.getLengthModEval() === 'function')
                length = ui.getLengthModEval()(modValues);
            if (typeof ui.getColorModEval() === 'function')
                line[4] = ui.getColorModEval()(modValues);

            xOffset = Math.cos(angle) * length;
            yOffset = Math.sin(angle) * length;
            xSpeed = Math.cos(angle) * speed;
            ySpeed = Math.sin(angle) * speed;

            line[0] += xSpeed * delta; line[1] += ySpeed * delta;
            line[2] = line[0] + xOffset; line[3] = line[1] + yOffset;


        };
        updateDict[myIndex] = update;
    };

    let last = performance.now();

    const update = (timestamp) => {
        const delta = (timestamp - last) / 1000;
        last = timestamp;

        // Clear to black
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const key in updateDict) {
            updateDict[key](delta, timestamp);
        }

        for (let i = 0; i < ui.getSpawnCount(); i++) {
            const spawnValues = {
                timestamp,
                index: i,
                spawnCount: ui.getSpawnCount(),
            }
            let angle = Math.random() * Math.PI * 2;
            if (typeof ui.getInitialAngleModEval() === 'function')
                angle = ui.getInitialAngleModEval()(spawnValues);
            spawnValues.angle = angle;
            let speed = spread(80, 200);
            if (typeof ui.getInitialSpeedModEval() === 'function')
                speed = ui.getInitialSpeedModEval()(spawnValues);
            spawnValues.speed = speed;
            let length = speed / 4;
            if (typeof ui.getInitialLengthModEval() === 'function')
                length = ui.getInitialLengthModEval()(spawnValues);
            spawnValues.length = length;
            let color = 'rgb(' + (spread(0, 255) | 0) + ',' + (spread(0, 255) | 0) + ',' + (spread(0, 255) | 0) + ')';
            if (typeof ui.getInitialColorModEval() === 'function')
                color = ui.getInitialColorModEval()(spawnValues);
            newLine(
                canvasCenterX, canvasCenterY,
                angle, speed, length,
                color);
        }
        window.requestAnimationFrame(update);
    };

    canvas.onclick = (e) => {
        const mousePos = getMousePos(e);
        console.log('mouse:', mousePos);
    };

    update(performance.now());
};

window.addEventListener('load', doStuff);