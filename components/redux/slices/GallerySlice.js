import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  date: new Date().toJSON().substring(0, 10),
  photos: [],
  content: '',
  location: '',
  tags: [],
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    init: (state) => {
      state = initialState;
    },
    addTag: (state, action) => {
      let newTags = state.tags.concat(action.payload);
      state.tags = newTags;
    },
    deleteTag: (state, action) => {
      let newTags = state.tags.filter((tag, idx) => idx !== action.payload);
      state.tags = newTags;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { addTag, deleteTag, init, updateLocation, updateTitle } = GallerySlice.actions;
export default GallerySlice.reducer;
