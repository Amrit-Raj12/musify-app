import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';

interface PlaylistModal {
  visible: boolean;
  selectedListId?: string;
}

const initialState: PlaylistModal = {
  visible: false,
};

const slice = createSlice({
  name: 'playlistModal',
  initialState,
  reducers: {
    updatePlaylistVisibility(playerState, {payload}: PayloadAction<boolean>) {
      playerState.visible = payload;
    },
    updateSelectedList(playerState, {payload}: PayloadAction<string>) {
      playerState.selectedListId = payload;
    },
  },
});

export const getPlaylistModalState = createSelector(
  (state: RootState) => state.playlisModal,
  modalState => modalState,
);

export const {updatePlaylistVisibility, updateSelectedList} = slice.actions;

export default slice.reducer;
