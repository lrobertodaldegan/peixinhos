import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const muusic = new Sound('theme.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);

    return null;
  }

  muusic.setNumberOfLoops(-1);

  muusic.play();
});

const initialState = {
  music : muusic 
};

const music_reducer = (state = initialState, action) => {
  if(action.type === 'release') {
    state.music.release();
  } else if(action.type === 'play'){
    if(!state.music.isPlaying())
      state.music.play();
  } else if(action.type === 'pause'){
    if(state.music.isPlaying())
      state.music.pause();
  } else if(action.type === 'stop'){
    if(state.music.isPlaying())
      state.music.stop();
  }
  
  return {...state};
}
export default music_reducer;