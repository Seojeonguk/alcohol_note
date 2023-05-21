import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  day: new Date().toJSON().substring(0, 10),
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
      state.title = initialState.title;
      state.day = initialState.day;
      state.photos = initialState.photos;
      state.content = initialState.content;
      state.location = initialState.location;
      state.tags = initialState.tags;
    },
    addTag: (state, action) => {
      let newTags = state.tags.concat(action.payload);
      state.tags = newTags;
    },
    deleteTag: (state, action) => {
      let newTags = state.tags.filter((tag, idx) => idx !== action.payload);
      state.tags = newTags;
    },
    updateTag: (state, action) => {
      state.tags = action.payload;
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
    updatePhoto: (state, action) => {
      state.photos = action.payload;
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
  updatePhoto,
  updateTag,
} = GallerySlice.actions;
export default GallerySlice.reducer;
