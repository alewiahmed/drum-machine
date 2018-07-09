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
      currentPad: null
    };
    this.audios = [];
  }

  showDrumPads = () => {
    let { kitType } = this.state;
    let sounds = kitType === 0 ? soundsOne : soundsTwo;
    return sounds.map((sound, index) => {
      return (
        <div
          key={index}
          id={sound.id}
          className="drum-pad"
          onClick={() => this.playSound(sound.key)}
        >
          {sound.key}
          <audio className="clip" id={sound.key}>
            <source src={sound.src} type="audio/mpeg" />
          </audio>
        </div>
      );
    });
  };

  display = () => {
    let { currentPad } = this.state;
    return currentPad === null ? '' : currentPad;
  };

  playSound = id => {
    let audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.play();
  };

  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div className="drum-container">{this.showDrumPads()}</div>
          <div className="controllers">
            <div>Power</div>
            <p id="display">{this.display()}</p>
            <div>Volume</div>
            <div>Bank</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
