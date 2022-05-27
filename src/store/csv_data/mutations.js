/*
export function someMutation (state) {
}
*/
export const set_csv_data = (state, arg) => {
  state.csv_data = arg;
};

export const set_emotion = (state, arg) => {
  state.emotion = arg;
};

export const set_emotion_avg = (state, arg) => {
  state.emotion_avg = arg;
};

export const set_song_emotion = (state, arg) => {
  state.song_emotion = arg;
};
