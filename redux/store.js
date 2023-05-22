import GalleryReducer from './slices/gallerySlice';

import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    gallery: GalleryReducer,
  },
});
