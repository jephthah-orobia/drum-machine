import React, { useEffect, useState } from "react";
import VolumeSlider from "../VolumeSlider/volumeSlider";
import keysMapping from "../keyboardEventsRouter";

const DrumPad = (props) => {
  const [volume, setVolume] = useState(1);
  const [padIsPressed, setPadIsPressed] = useState(false);

  const audioRef = React.createRef();
  const btnRef = React.createRef();
  useEffect(() => {
    keysMapping[props.hotkey] = [play, forceEnd];
    return () => {
      delete keysMapping[props.hotkey];
    };
  });

  const play = () => {
    if (!padIsPressed) {
      setPadIsPressed(true);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volume * props.masterVolume;
      btnRef.current.classList.add("drum-pad-playing");
      audioRef.current.play();
      props.onPlay(props.name);
    }
  };

  const forceEnd = () => {
    if (!props.sustain) {
      //setPadIsPressed(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      ended(props.name);
    }
    setPadIsPressed(false);
    btnRef.current.classList.remove("drum-pad-playing");
  };

  const ended = () => {
    props.onEnd(props.name);
  };

  return (
    <div className="drum-pad-container">
      {props.showSlider && (
        <VolumeSlider
          volume={volume}
          label={props.name}
          onVolumeChange={setVolume}
          volumeDisplayClassName="form-control text-bg-secondary fs-6 ms-1 px-1 text-center border-secondary"
          sliderClassName="drum-pad-volume"
          labelStyle={{
            fontSize: "0.8rem",
            verticalAlign: "middle",
            marginTop: "0.3rem",
            minWidth: '30px'
          }}
        />
      )}
      <button
        className="drum-pad mx-auto"
        onMouseDown={play}
        onMouseUp={forceEnd}
        ref={btnRef}
        id={props.name.replace(" ", "-")}
      >
        {props.hotkey}
        <audio
          ref={audioRef}
          id={props.hotkey}
          onEnded={ended}
          className="clip"
          src={props.src}
          alt={props.name}
        ></audio>
      </button>
    </div>
  );
};

export default DrumPad;
