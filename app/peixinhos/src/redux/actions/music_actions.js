const play = () => {
  return {
    type: "play"
  }
}
const pause = () => {
  return {
    type: "pause"
  }
}
const release = () => {
  return {
    type: "release"
  }
}
const stop = () => {
  return {
    type: "stop"
  }
}
export {
  play, 
  pause,
  stop,
  release
};