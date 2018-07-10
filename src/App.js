import React, { Component } from 'react';

import './App.css';

import allSounds from './sounds';

const soundsOne = [
  {
    keyCode: 81,
    id: 'heater-1',
    name: 'Heater 1',
    src: allSounds.heaterOne
  },
  {
    keyCode: 87,
    id: 'heater-2',
    name: 'Heater 2',
    src: allSounds.heaterTwo
  },
  {
    keyCode: 69,
    id: 'heater-3',
    name: 'Heater 3',
    src: allSounds.heaterThree
  },
  {
    keyCode: 65,
    id: 'heater-4',
    name: 'Heater 4',
    src: allSounds.heaterFour
  },
  {
    id: 'clap',
    keyCode: 83,
    name: 'Clap',
    src: allSounds.clap
  },
  {
    keyCode: 68,
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.openHH
  },
  {
    keyCode: 90,
    id: 'kick-n-hat',
    name: `kick n'Hat`,
    src: allSounds.kickNHat
  },
  {
    id: 'kick',
    keyCode: 88,
    name: 'Kick',
    src: allSounds.kick
  },
  {
    keyCode: 67,
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.closedHH
  }
];

const soundsTwo = [
  {
    keyCode: 81,
    id: 'chord-1',
    name: 'Chord 1',
    src: allSounds.chordOne
  },
  {
    keyCode: 87,
    id: 'chord-2',
    name: 'Chord 2',
    src: allSounds.chordTwo
  },
  {
    keyCode: 69,
    id: 'chord-3',
    name: 'Chord 3',
    src: allSounds.chordThree
  },
  {
    keyCode: 65,
    id: 'shaker',
    name: 'Shaker',
    src: allSounds.shaker
  },
  {
    keyCode: 83,
    id: 'open-hh',
    name: 'Open HH',
    src: allSounds.dryOpenHH
  },
  {
    keyCode: 68,
    id: 'closed-hh',
    name: 'Closed HH',
    src: allSounds.dryClosedHH
  },
  {
    keyCode: 90,
    id: 'punchy-kick',
    name: 'Punchy Kick',
    src: allSounds.punchyKick
  },
  {
    keyCode: 88,
    id: 'side-stick',
    name: 'Side Stick',
    src: allSounds.sideStick
  },
  {
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
      power: true,
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
    let audioDOMs = sounds.map((sound, index) => {
      return (
        <Pad
          key={index}
          sound={sound}
          power={power}
          onClick={this.changeDisplay}
        />
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

  changeDisplay = sound => {
    this.setState({
      display: sound.name
    });
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
      let audioDOMs = document.getElementById(
        String.fromCharCode(sound.keyCode)
      );
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

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    let { power, sound, onClick } = this.props;
    if (e.keyCode === sound.keyCode) {
      this.activate();
      if (power) {
        this.playSound();
        onClick(sound);
      }
    }
  };

  playSound = () => {
    this.audio.currentTime = 0;
    this.audio.play();
  };

  activate = () => {
    this.setState(
      {
        active: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            active: false
          });
        }, 150);
      }
    );
  };

  render() {
    let { sound, power, onClick } = this.props;
    let { active } = this.state;
    let key = String.fromCharCode(sound.keyCode);
    let drumClass =
      power && active
        ? 'drum-pad power active'
        : active
          ? 'drum-pad active'
          : 'drum-pad';
    return (
      <div
        id={sound.id}
        className={drumClass}
        onClick={() => {
          this.activate();
          if (!power) return;
          this.playSound();
          onClick(sound);
        }}
      >
        {key}
        <audio
          id={key}
          src={sound.src}
          className="clip"
          ref={ref => (this.audio = ref)}
        />
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
