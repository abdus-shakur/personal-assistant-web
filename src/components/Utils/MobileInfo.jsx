import React, { useState, useEffect ,useRef} from "react";

import {useBattery, useGeolocation,useMediaDevices,useFullscreen, useToggle,useVibrate} from 'react-use';
import addNotification from 'react-push-notification';


const Demo = () => {
  const batteryState = useBattery();

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>not supported</span>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>supported</span> <br />
        <strong>Battery state</strong>: <span>fetching</span>
      </div>
    );
  }

  return (
    <div>
      <strong>Battery sensor</strong>:&nbsp;&nbsp; <span>supported</span> <br />
      <strong>Battery state</strong>: <span>fetched</span> <br />
      <strong>Charge level</strong>:&nbsp;&nbsp; <span>{ (batteryState.level * 100).toFixed(0) }%</span> <br />
      <strong>Charging</strong>:&nbsp;&nbsp; <span>{ batteryState.charging ? 'yes' : 'no' }</span> <br />
      <strong>Charging time</strong>:&nbsp;&nbsp;
      <span>{ batteryState.chargingTime ? batteryState.chargingTime : 'finished' }</span> <br />
      <strong>Discharging time</strong>:&nbsp;&nbsp; <span>{ batteryState.dischargingTime }</span>
    </div>
  );
};

const DemoLocation = () => {
    const state = useGeolocation();
  
    return (
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    );
  };



const DemoMedia = () => {
  const state = useMediaDevices();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};


const DemoFullScreen = () => {
  const ref = useRef(null)
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {onClose: () => toggle(false)});

  return (
    <div ref={ref} style={{backgroundColor: 'white'}}>
      <div>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <button onClick={() => toggle()}>Toggle</button>
      <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay />
    </div>
  );
};


const DemoVibrate = () => {
  const [vibrating, toggleVibrating] = useToggle(false);

  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false);



  return (
    <div>
      <button onClick={()=>{toggleVibrating();setTimeout(()=>toggleVibrating(),2000);}}>{vibrating ? 'Stop' : 'Vibrate'}</button>
      
    </div>
  );
};

    // const x = document.documentElement;

    function getLocation() {
        navigator.geolocation.getCurrentPosition(()=>showPosition,(error)=>alert("Error getting geo location : "+JSON.stringify(error)));
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(()=>showPosition,(error)=>alert("Error getting geo location : "+error));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    }

    function showPosition(position) {
    var location = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    alert(location);
    // x.innerHTML;
    }

    const PushNotification = () => {

        const buttonClick = () => {
            addNotification({
                title: 'Warning',
                subtitle: 'This is a subtitle',
                message: 'This is a very long message',
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            });
        };
    
        return (
          <div className="page">
              <button onClick={buttonClick} className="button">
               Hello world.
              </button>
          </div>
        );
      }

export default function(){
    // return Demo();
    // return DemoLocation();
    // return DemoMedia();
    // return DemoFullScreen();
    // return DemoVibrate();
    // return getLocation();
    return PushNotification();
};