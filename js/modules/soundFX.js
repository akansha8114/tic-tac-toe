// Sound Effects Module - Handles audio feedback using Web Audio API
const SoundFX = {
    audioContext: null,
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    },

    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },

    playMoveSound() {
        this.playTone(800, 0.1);
    },

    playWinSound() {
        this.playTone(600, 0.2);
        setTimeout(() => this.playTone(800, 0.2), 150);
        setTimeout(() => this.playTone(1000, 0.3), 300);
    },

    playTieSound() {
        this.playTone(400, 0.5, 'square');
    }
};