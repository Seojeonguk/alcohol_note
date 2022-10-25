import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  day: '',
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
      state.title = '';
      state.day = '';
      state.photos = [];
      state.content = '';
      state.location = '';
      state.tags = [];
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
    updateContent: (state, action) => {
      state.content = action.payload;
    },
    updateDay: (state, action) => {
      state.day = action.payload;
    },
    addImage: (state, action) => {
      let newPhotos = state.photos.concat(action.payload);
      state.photos = newPhotos;
    },
  },
});

export const {
  addTag,
  addImage,
  deleteTag,
  init,
  updateContent,
  updateDay,
  updateLocation,
  updateTitle,
} = GallerySlice.actions;
export default GallerySlice.reducer;
