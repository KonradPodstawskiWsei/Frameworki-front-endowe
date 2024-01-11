document.addEventListener("keypress", onKeyPress);

let isRecording = [false, false, false, false];
let selectedChannels = [false, false, false, false];
let recordings = [[], [], [], []];
let startTime = [0, 0, 0, 0];
let metronomeInterval;

const metronomeSoundId = "metronome";

const KeyToSound = {
    a: "s1", s: "s2", d: "s3", f: "s4", g: "s5", h: "s6", j: "s7", k: "s8", l: "s9",
};

function onKeyPress(event) {
    const soundId = KeyToSound[event.key];
    if (soundId) {
        playSound(soundId);
        recordSound(soundId);
    }
}

function playSound(soundId) {
    const sound = document.querySelector(`#${soundId}`);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function recordSound(soundId) {
    isRecording.forEach((recording, index) => {
        if (recording) {
            const timestamp = Date.now() - startTime[index];
            recordings[index].push({ soundId, timestamp });
        }
    });
}

function toggleRecording(channel) {
    isRecording[channel] = !isRecording[channel];
    if (isRecording[channel]) {
        startTime[channel] = Date.now();
        recordings[channel] = [];
    }
}

function toggleChannelSelection(channel) {
    selectedChannels[channel] = !selectedChannels[channel];
}

function playSelectedChannels() {
    selectedChannels.forEach((isSelected, index) => {
        if (isSelected) playRecording(index);
    });
}

function playRecording(channel) {
    recordings[channel].forEach(note => {
        setTimeout(() => playSound(note.soundId), note.timestamp);
    });
}

function toggleMetronome(bpm) {
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
    } else {
        const interval = 60000 / bpm;
        metronomeInterval = setInterval(() => playSound(metronomeSoundId), interval);
    }
}
