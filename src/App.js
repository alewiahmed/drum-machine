import React, { Component } from 'react';

import './App.css';

import allSounds from './sounds';

const soundsOne = [
  {
    key: 'Q',
    keyCode: 81,
    id: 'heater-1',
    name: 'Heater 1',
    src: allSounds.heaterOne
  },
  {
    key: 'W',
    keyCode: 87,
    id: 'heater-2',
    name: 'Heater 2',
    src: allSounds.heaterTwo
  },
  {
    key: 'E',
    keyCode: 69,
    id: 'heater-3',
    name: 'Heater 3',
    src: allSounds.heaterThree
  },
  {
    key: 'A',
    keyCode: 65,
    id: 'heater-4',
    name: 'Heater 4',
    src: allSounds.heaterFour
  },
  {
    key: 'S',
    id: 'clap',
    keyCode: 83,
    name: 'Clap',
    src: allSounds.clap
  },
  {
    key: 'D',
    keyCode: 68,
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.openHH
  },
  {
    key: 'Z',
    keyCode: 90,
    id: 'kick-n-hat',
    name: `kick n'Hat`,
    src: allSounds.kickNHat
  },
  {
    key: 'X',
    id: 'kick',
    keyCode: 88,
    name: 'Kick',
    src: allSounds.kick
  },
  {
    key: 'C',
    keyCode: 67,
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.closedHH
  }
];

const soundsTwo = [
  {
    key: 'Q',
    keyCode: 81,
    id: 'chord-1',
    name: 'Chord 1',
    src: allSounds.chordOne
  },
  {
    key: 'W',
    keyCode: 87,
    id: 'chord-2',
    name: 'Chord 2',
    src: allSounds.chordTwo
  },
  {
    key: 'E',
    keyCode: 69,
    id: 'chord-3',
    name: 'Chord 3',
    src: allSounds.chordThree
  },
  {
    key: 'A',
    keyCode: 65,
    id: 'shaker',
    name: 'Shaker',
    src: allSounds.shaker
  },
  {
    key: 'S',
    keyCode: 83,
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.dryOpenHH
  },
  {
    key: 'D',
    keyCode: 68,
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.dryClosedHH
  },
  {
    key: 'Z',
    keyCode: 90,
    id: 'punchy-kick',
    name: 'Punchy Kick',
    src: allSounds.punchyKick
  },
  {
    key: 'X',
    keyCode: 88,
    id: 'side-stick',
    name: 'Side Stick',
    src: allSounds.sideStick
  },
  {
    key: 'C',
    keyCode: 67,
    id: 'snare',
    name: 'Snare',
    src: allSounds.snare
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kitType: 0,
      power: false,
      display: null,
      volumeLevel: 0.35
    };
  }

  componentDidMount() {
    this.changeVolume();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  showDrumPads = () => {
    let { kitType, power } = this.state;
    let sounds = kitType === 0 ? soundsOne : soundsTwo;
    let drumClass = power ? 'drum-pad power' : 'drum-pad';
    let audioDOMs = sounds.map((sound, index) => {
      return (
        <div
          key={index}
          id={sound.id}
          className={drumClass}
          onClick={() => this.playSound(index)}
        >
          {sound.key}
          <audio className="clip" id={sound.key} src={sound.src} />
        </div>
      );
    });
    return <div className="drum-container">{audioDOMs}</div>;
  };

  togglePower = () => {
    this.setState(
      state => {
        state.power = !state.power;
        return state;
      },
      () => {
        if (!this.state.power) this.clearDisplay();
      }
    );
  };

  toggleKitType = () => {
    let { power } = this.state;
    if (!power) return;
    this.clearTimeoutObj();
    this.setState(state => {
      state.kitType = state.kitType === 0 ? 1 : 0;
      state.display = state.kitType === 0 ? 'Heater Kit' : 'Smooth Piano Kit';
      return state;
    });
  };

  display = () => {
    let { display } = this.state;
    return display === null ? String.fromCharCode(160) : display;
  };

  playSound = index => {
    let { kitType, power } = this.state;
    if (!power) return;
    let sounds = kitType === 0 ? soundsOne : soundsTwo;
    this.setState(state => {
      state.display = sounds[index].name;
      return state;
    });
    let audio = document.getElementById(sounds[index].key);
    audio.currentTime = 0;
    audio.play();
  };

  handleKeyPress = e => {
    let { power } = this.state;
    if (!power) return;
    let index;
    soundsOne.some((sound, i) => {
      if (sound.keyCode === e.keyCode) index = i;
      return sound.keyCode === e.keyCode;
    });
    if (index === undefined) return;
    this.playSound(index);
  };

  handleSlider = e => {
    let { power } = this.state;
    if (!power) return;
    this.clearTimeoutObj();
    this.setState(
      {
        volumeLevel: e.target.value,
        display: `Volume: ${Math.round(e.target.value * 100)}`
      },
      () => {
        this.changeVolume();
        this.timeout = setTimeout(() => {
          this.clearDisplay();
        }, 1400);
      }
    );
  };

  changeVolume = () => {
    soundsOne.forEach(sound => {
      let audioDOMs = document.getElementById(sound.key);
      audioDOMs.volume = this.state.volumeLevel;
    });
  };

  clearDisplay = () => {
    this.setState({
      display: null
    });
  };

  clearTimeoutObj = () => {
    if (this.timeout) clearTimeout(this.timeout);
  };

  showRangeSlider = () => {
    let { volumeLevel, power } = this.state;
    let rangeClass = power ? 'range power' : 'range';
    return (
      <div className="range-slider">
        <input
          min="0"
          max="1"
          step="0.01"
          type="range"
          value={volumeLevel}
          className={rangeClass}
          onChange={this.handleSlider}
        />
      </div>
    );
  };

  render() {
    let { power, kitType } = this.state;
    return (
      <div className="App">
        <div id="drum-machine">
          {this.showDrumPads()}
          <div className="controllers">
            <SwitchButton on={power} text="POWER" onClick={this.togglePower} />
            <p id="display">{this.display()}</p>
            {this.showRangeSlider()}
            <SwitchButton
              text="BANK"
              on={kitType === 1}
              onClick={this.toggleKitType}
            />
          </div>
        </div>
      </div>
    );
  }
}

const SwitchButton = props => {
  let { onClick, on, text } = props;
  let switchClass = on === true ? 'switch on' : 'switch';
  return (
    <div className="switch-container row">
      <div className="switch-text">{text}</div>
      <div className={switchClass} onClick={onClick}>
        <div className="switch-button" />
      </div>
    </div>
  );
};

export default App;
