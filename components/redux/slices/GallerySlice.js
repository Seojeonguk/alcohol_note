import { createSlice } from '@reduxjs/toolkit';

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    title: '',
    date: new Date().toJSON().substring(0, 10),
    photos: [],
    content: '',
    location: '',
    tags: [],
  },
  reducers: {
    init: (state) => {
      state.title = '';
      state.date = new Date().toJSON().substring(0, 10);
      state.photos = [];
      state.content = '';
      state.location = '';
      state.tags = [];
    },
  },
});

export const { init } = GallerySlice.actions;
export default GallerySlice.reducer;
