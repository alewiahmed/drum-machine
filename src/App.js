import React, { Component } from 'react';

import './App.css';

import allSounds from './sounds';

const soundsOne = [
  {
    key: 'Q',
    id: 'heater-1',
    name: 'Heater 1',
    src: allSounds.heaterOne
  },
  {
    key: 'W',
    id: 'heater-2',
    name: 'Heater 2',
    src: allSounds.heaterTwo
  },
  {
    key: 'E',
    id: 'heater-3',
    name: 'Heater 3',
    src: allSounds.heaterThree
  },
  {
    key: 'A',
    id: 'heater-4',
    name: 'Heater 4',
    src: allSounds.heaterFour
  },
  {
    key: 'S',
    id: 'clap',
    name: 'Clap',
    src: allSounds.clap
  },
  {
    key: 'D',
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.openHH
  },
  {
    key: 'Z',
    id: 'kick-n-hat',
    name: `kick n'Hat`,
    src: allSounds.kickNHat
  },
  {
    key: 'X',
    id: 'kick',
    name: 'Kick',
    src: allSounds.kick
  },
  {
    key: 'C',
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.closedHH
  }
];

const soundsTwo = [
  {
    key: 'Q',
    id: 'chord-1',
    name: 'Chord 1',
    src: allSounds.chordOne
  },
  {
    key: 'W',
    id: 'chord-2',
    name: 'Chord 2',
    src: allSounds.chordTwo
  },
  {
    key: 'E',
    id: 'chord-3',
    name: 'Chord 3',
    src: allSounds.chordThree
  },
  {
    key: 'A',
    id: 'shaker',
    name: 'Shaker',
    src: allSounds.shaker
  },
  {
    key: 'S',
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.dryOpenHH
  },
  {
    key: 'D',
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.dryClosedHH
  },
  {
    key: 'Z',
    id: 'punchy-kick',
    name: 'Punchy Kick',
    src: allSounds.punchyKick
  },
  {
    key: 'X',
    id: 'side-stick',
    name: 'Side Stick',
    src: allSounds.sideStick
  },
  {
    key: 'C',
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

  handleSlider = e => {
    let { power } = this.state;
    if (!power) return;
    this.setState(
      {
        volumeLevel: e.target.value
      },
      this.changeVolume
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
