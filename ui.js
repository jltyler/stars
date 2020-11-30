import presets from './presets.js';

console.log('Loading ui.js');

let angleModEval = undefined;
let speedModEval = undefined;
let lengthModEval = undefined;
let colorModEval = undefined;

// modules don't share state or I just don't understand how so I'll just use getters
const getAngleModEval = () => angleModEval;
const getSpeedModEval = () => speedModEval;
const getLengthModEval = () => lengthModEval;
const getColorModEval = () => colorModEval;

let initialAngleModEval = undefined;
let initialSpeedModEval = undefined;
let initialLengthModEval = undefined;
let initialColorhModEval = undefined;

const getInitialAngleModEval = () => initialAngleModEval;
const getInitialSpeedModEval = () => initialSpeedModEval;
const getInitialLengthModEval = () => initialLengthModEval;
const getInitialColorModEval = () => initialColorhModEval;

let spawnCount = 1;
const getSpawnCount = () => spawnCount;

let lifetime = 15000;
const getLifetime = () => lifetime;

const safeMode = false;

let currentTextArea = 0;

const bindEvents = () => {
    console.log('Binding events...');

    // Store elements in variables
    const angleModTextArea = document.getElementById('angle-mod-text-area');
    const angleModSubmit = document.getElementById('angle-mod-submit');
    const speedModTextArea = document.getElementById('speed-mod-text-area');
    const speedModSubmit = document.getElementById('speed-mod-submit');
    const lengthModTextArea = document.getElementById('length-mod-text-area');
    const lengthModSubmit = document.getElementById('length-mod-submit');
    const colorModTextArea = document.getElementById('color-mod-text-area');
    const colorModSubmit = document.getElementById('color-mod-submit');

    const initialAngleModTextArea = document.getElementById('initial-angle-mod-text-area');
    const initialAngleModSubmit = document.getElementById('initial-angle-mod-submit');
    const initialSpeedModTextArea = document.getElementById('initial-speed-mod-text-area');
    const initialSpeedModSubmit = document.getElementById('initial-speed-mod-submit');
    const initialLengthModTextArea = document.getElementById('initial-length-mod-text-area');
    const initialLengthModSubmit = document.getElementById('initial-length-mod-submit');
    const initialColorModTextArea = document.getElementById('initial-color-mod-text-area');
    const initialColorModSubmit = document.getElementById('initial-color-mod-submit');

    const submitAll = document.getElementById('submit-all');
    const spawnCountInput = document.getElementById('spawn-count-input');
    const lifetimeInput = document.getElementById('lifetime-input');
    const loadPreset = document.getElementById('load-preset');
    const presetSelect = document.getElementById('preset-select');

    const jsonTextArea = document.getElementById('json-text-area');
    const jsonExportCurrent = document.getElementById('json-export-current');
    const jsonImportFull = document.getElementById('json-import-full');
    const jsonExportFull = document.getElementById('json-export-full');



    // Read text input
    // angleModSubmit.addEventListener('click', () => {submitAngleMod(angleModTextArea.value); console.log('angleModEval:', angleModEval)});
    angleModSubmit.addEventListener('click', e => {angleModEval = eval(angleModTextArea.value); console.log('angleModEval:', angleModEval)});
    speedModSubmit.addEventListener('click', e => {speedModEval = eval(speedModTextArea.value); console.log('speedModEval:', speedModEval)});
    lengthModSubmit.addEventListener('click', e => {lengthModEval = eval(lengthModTextArea.value); console.log('lengthModEval:', lengthModEval)});
    colorModSubmit.addEventListener('click', e => {colorModEval = eval(colorModTextArea.value); console.log('colorModEval:', colorModEval)});
    initialAngleModSubmit.addEventListener('click', e => {initialAngleModEval = eval(initialAngleModTextArea.value); console.log('initialAngleModEval:', initialAngleModEval)});
    initialSpeedModSubmit.addEventListener('click', e => {initialSpeedModEval = eval(initialSpeedModTextArea.value); console.log('initialSpeedModEval:', initialSpeedModEval)});
    initialLengthModSubmit.addEventListener('click', e => {initialLengthModEval = eval(initialLengthModTextArea.value); console.log('initialLengthModEval:', initialLengthModEval)});
    initialColorModSubmit.addEventListener('click', e => {initialColorhModEval = eval(initialColorModTextArea.value); console.log('initialColorhModEval:', initialColorhModEval)});

    const submitAllEvent = (e) => {
        angleModEval = eval(angleModTextArea.value);
        speedModEval = eval(speedModTextArea.value);
        lengthModEval = eval(lengthModTextArea.value);
        colorModEval = eval(colorModTextArea.value);
        initialAngleModEval = eval(initialAngleModTextArea.value);
        initialSpeedModEval = eval(initialSpeedModTextArea.value);
        initialLengthModEval = eval(initialLengthModTextArea.value);
        initialColorhModEval = eval(initialColorModTextArea.value);
        spawnCount = spawnCountInput.value;
        lifetime = lifetimeInput.value;
        const ev = new Event('change', {bubbles: true});
        spawnCountInput.dispatchEvent(ev);
        lifetimeInput.dispatchEvent(ev);

    }

    submitAll.addEventListener('click', submitAllEvent);

    // Preset loading
    const makePresetOptionElement = (name) => `<option value="${name}"> ${name} </option>`;
    presetSelect.innerHTML = Object.keys(presets.fullPresets).map(p => makePresetOptionElement(p)).join('');
    // loadPreset.addEventListener('click', e => console.log(JSON.stringify(angleModTextArea.value)));
    const loadPresetEvent = (e) => {
        if (presetSelect.value in presets.fullPresets) {
            const o = presets.fullPresets[presetSelect.value];
            // console.log(o);
            angleModTextArea.value = o.angleMod;
            speedModTextArea.value = o.speedMod;
            lengthModTextArea.value = o.lengthMod;
            initialAngleModTextArea.value = o.initialAngleMod;
            initialSpeedModTextArea.value = o.initialSpeedMod;
            initialLengthModTextArea.value = o.initialLengthMod;
            initialColorModTextArea.value = o.initialColorMod;
            colorModTextArea.value = o.colorMod;
            spawnCountInput.value = o.spawnCount;
            lifetimeInput.value = o.lifetime;
        }
        if (!safeMode) submitAllEvent();
    };
    loadPreset.addEventListener('click', loadPresetEvent);

    // JSON
    jsonExportCurrent.addEventListener('click', (e) => {
        const o = {};
        o[currentTextArea.dataset.key] = currentTextArea.value;
        jsonTextArea.value = JSON.stringify(o);
    });

    jsonExportFull.addEventListener('click', (e) => {
        jsonTextArea.value = JSON.stringify({
            angleMod: angleModTextArea.value,
            speedMod: speedModTextArea.value,
            lengthMod: lengthModTextArea.value,
            initialAngleMod: initialAngleModTextArea.value,
            initialSpeedMod: initialSpeedModTextArea.value,
            initialLengthMod: initialLengthModTextArea.value,
            initialColorMod: initialColorModTextArea.value,
            colorMod: colorModTextArea.value,
            spawnCount: spawnCountInput.value,
            lifetime: lifetimeInput.value
        });
    });

    jsonImportFull.addEventListener('click', (e) => {
        const pojo = JSON.parse(jsonTextArea.value);
        if ('angleMod' in pojo) angleModTextArea.value = pojo['angleMod'];
        if ('speedMod' in pojo) speedModTextArea.value = pojo['speedMod'];
        if ('lengthMod' in pojo) lengthModTextArea.value = pojo['lengthMod'];
        if ('initialAngleMod' in pojo) initialAngleModTextArea.value = pojo['initialAngleMod'];
        if ('initialSpeedMod' in pojo) initialSpeedModTextArea.value = pojo['initialSpeedMod'];
        if ('initialLengthMod' in pojo) initialLengthModTextArea.value = pojo['initialLengthMod'];
        if ('initialColorMod' in pojo) initialColorModTextArea.value = pojo['initialColorMod'];
        if ('colorMod' in pojo) colorModTextArea.value = pojo['colorMod'];
        if ('spawnCount' in pojo) spawnCountInput.value = pojo['spawnCount'];
        if ('lifetime' in pojo) lifetimeInput.value = pojo['lifetime'];
        if (!safeMode) submitAllEvent();
    })

    // UI events
    // Modal
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const showHelp = () => {
        helpModal.style.display = 'block';
        modalBackdrop.style.display = 'block';
    };
    const hideHelp = () => {
        helpModal.style.display = 'none';
        modalBackdrop.style.display = 'none';
    };
    helpButton.addEventListener('click', showHelp);
    modalBackdrop.addEventListener('click', hideHelp);
    helpModal.getElementsByClassName('close-modal-button')[0].addEventListener('click', hideHelp);
    modalBackdrop.addEventListener('click', hideHelp);

    // Text Areas / Submit buttons
    const hideAll = (e) => {
        angleModTextArea.style.display = 'none';
        angleModSubmit.style.display = 'none';
        speedModTextArea.style.display = 'none';
        speedModSubmit.style.display = 'none';
        lengthModTextArea.style.display = 'none';
        lengthModSubmit.style.display = 'none';
        initialAngleModTextArea.style.display = 'none';
        initialAngleModSubmit.style.display = 'none';
        initialSpeedModTextArea.style.display = 'none';
        initialSpeedModSubmit.style.display = 'none';
        initialLengthModTextArea.style.display = 'none';
        initialLengthModSubmit.style.display = 'none';
        initialColorModTextArea.style.display = 'none';
        initialColorModSubmit.style.display = 'none';
        colorModTextArea.style.display = 'none';
        colorModSubmit.style.display = 'none';
    };

    const showAngleMod = (e) => {
        // console.log('showAngleMod');
        hideAll();
        enableAllButtons();
        angleDisplayButton.disabled = true;
        currentTextArea = angleModTextArea;
        currentTextArea.style.display = 'block';
        angleModSubmit.style.display = 'inline';
    };

    const showSpeedMod = (e) => {
        // console.log('showSpeedMod');
        hideAll();
        enableAllButtons();
        speedDisplayButton.disabled = true;
        currentTextArea = speedModTextArea;
        currentTextArea.style.display = 'block';
        speedModSubmit.style.display = 'inline';
    };

    const showLengthMod = (e) => {
        // console.log('showLengthMod');
        hideAll();
        enableAllButtons();
        lengthDisplayButton.disabled = true;
        currentTextArea = lengthModTextArea;
        currentTextArea.style.display = 'block';
        lengthModSubmit.style.display = 'inline';
    };

    const showColorMod = (e) => {
        // console.log('showColorMod');
        hideAll();
        enableAllButtons();
        colorDisplayButton.disabled = true;
        currentTextArea = colorModTextArea;
        currentTextArea.style.display = 'block';
        colorModSubmit.style.display = 'inline';
    };

    const showInitialAngleMod = (e) => {
        // console.log('showInitialAngleMod');
        hideAll();
        enableAllButtons();
        initialAngleDisplayButton.disabled = true;
        currentTextArea = initialAngleModTextArea;
        currentTextArea.style.display = 'block';
        initialAngleModSubmit.style.display = 'inline';
    };

    const showInitialSpeedMod = (e) => {
        // console.log('showInitialSpeedMod');
        hideAll();
        enableAllButtons();
        initialSpeedDisplayButton.disabled = true;
        currentTextArea = initialSpeedModTextArea;
        currentTextArea.style.display = 'block';
        initialSpeedModSubmit.style.display = 'inline';
    };

    const showInitialLengthMod = (e) => {
        // console.log('showInitialLengthMod');
        hideAll();
        enableAllButtons();
        initialLengthDisplayButton.disabled = true;
        currentTextArea = initialLengthModTextArea;
        currentTextArea.style.display = 'block';
        initialLengthModSubmit.style.display = 'inline';
    };

    const showInitialColorMod = (e) => {
        // console.log('showInitialColorMod');
        hideAll();
        enableAllButtons();
        initialColorDisplayButton.disabled = true;
        currentTextArea = initialColorModTextArea;
        currentTextArea.style.display = 'block';
        initialColorModSubmit.style.display = 'inline';
    };

    const angleDisplayButton = document.getElementById('angle-display-button');
    const speedDisplayButton = document.getElementById('speed-display-button');
    const lengthDisplayButton = document.getElementById('length-display-button');
    const colorDisplayButton = document.getElementById('color-display-button');
    const initialAngleDisplayButton = document.getElementById('initial-angle-display-button');
    const initialSpeedDisplayButton = document.getElementById('initial-speed-display-button');
    const initialLengthDisplayButton = document.getElementById('initial-length-display-button');
    const initialColorDisplayButton = document.getElementById('initial-color-display-button');

    const enableAllButtons = () => {
        angleDisplayButton.disabled = false;
        speedDisplayButton.disabled = false;
        lengthDisplayButton.disabled = false;
        colorDisplayButton.disabled = false;
        initialAngleDisplayButton.disabled = false;
        initialSpeedDisplayButton.disabled = false;
        initialLengthDisplayButton.disabled = false;
        initialColorDisplayButton.disabled = false;
    };

    angleDisplayButton.addEventListener('click', showAngleMod);
    speedDisplayButton.addEventListener('click', showSpeedMod);
    lengthDisplayButton.addEventListener('click', showLengthMod);
    colorDisplayButton.addEventListener('click', showColorMod);
    initialAngleDisplayButton.addEventListener('click', showInitialAngleMod);
    initialSpeedDisplayButton.addEventListener('click', showInitialSpeedMod);
    initialLengthDisplayButton.addEventListener('click', showInitialLengthMod);
    initialColorDisplayButton.addEventListener('click', showInitialColorMod);

    spawnCountInput.addEventListener('change', e => spawnCount = parseInt(e.target.value));
    lifetimeInput.addEventListener('change', e => lifetime = parseInt(e.target.value));

    // Display labels for inputs
    const labels = document.getElementsByClassName('value-display');
    for (let i = 0; i < labels.length; ++i) {
        const l = labels[i];
        const target = document.getElementById(l.dataset.targetid);
        if (target) {
            target.addEventListener('change', e => l.innerHTML = e.target.value);
        }
    }

    // Show Hide all stuff buttons
    const showButton = document.getElementById('show-button');
    showButton.style.display = 'none';
    const hideButton = document.getElementById('hide-button');
    const controls = document.getElementById('controls');

    showButton.addEventListener('click', e => {
        controls.style.display = 'block';
        showButton.style.display = 'none';
        hideButton.style.display = 'inline';
    });

    hideButton.addEventListener('click', e => {
        controls.style.display = 'none';
        showButton.style.display = 'inline';
        hideButton.style.display = 'none';
    });

    showAngleMod();
    submitAllEvent();
};

export default {
    bindEvents,
    getAngleModEval,
    getSpeedModEval,
    getLengthModEval,
    getColorModEval,
    getInitialAngleModEval,
    getInitialSpeedModEval,
    getInitialLengthModEval,
    getInitialColorModEval,
    getSpawnCount,
    getLifetime
};