import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  day: new Date().toJSON().substring(0, 10),
  photos: [],
  content: '',
  location: '',
  tags: [],
};

export const gallerySlice = createSlice({
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
    updateTags: (state, action) => {
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
    addPhoto: (state, action) => {
      let newPhotos = state.photos.concat(action.payload);
      state.photos = newPhotos;
    },
    deletePhoto: (state, action) => {
      let newPhotos = state.photos.filter((photo, idx) => idx !== action.payload);
      state.photos = newPhotos;
    },
    updatePhotos: (state, action) => {
      state.photos = action.payload;
    },
    updateGallery: (state, action) => {
      state.title = action.payload.title ?? state.title;
      state.day = action.payload.day ?? state.day;
      state.photos = action.payload.photos ?? state.photos;
      state.content = action.payload.content ?? state.content;
      state.location = action.payload.location ?? state.location;
      state.tags = action.payload.tags ?? state.tags;
    },
  },
});

export const {
  addPhoto,
  addTag,
  deletePhoto,
  deleteTag,
  init,
  updateContent,
  updateDay,
  updateGallery,
  updateLocation,
  updatePhotos,
  updateTags,
  updateTitle,
} = gallerySlice.actions;
export default gallerySlice.reducer;
