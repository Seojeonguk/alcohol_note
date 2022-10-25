import GalleryReducer from './slices/GallerySlice';

import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    gallery: GalleryReducer,
  },
});
