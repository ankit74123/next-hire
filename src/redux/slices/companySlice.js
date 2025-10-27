import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: null,
  loading: false,
  error: null,
  gallery: [],
  testimonials: []
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // Set company data
    setCompany: (state, action) => {
      state.company = action.payload;
      state.error = null;
    },

    // Update company information
    updateCompany: (state, action) => {
      state.company = {
        ...state.company,
        ...action.payload
      };
    },

    // Update company logo
    updateLogo: (state, action) => {
      if (state.company) {
        state.company.logo = action.payload;
      }
    },

    // Update social media links
    updateSocialMedia: (state, action) => {
      if (state.company) {
        state.company.socialMedia = {
          ...state.company.socialMedia,
          ...action.payload
        };
      }
    },

    // Locations management
    addLocation: (state, action) => {
      if (state.company) {
        state.company.locations = [...(state.company.locations || []), action.payload];
      }
    },

    updateLocation: (state, action) => {
      if (state.company && state.company.locations) {
        const index = state.company.locations.findIndex(loc => loc.id === action.payload.id);
        if (index !== -1) {
          state.company.locations[index] = action.payload;
        }
      }
    },

    removeLocation: (state, action) => {
      if (state.company && state.company.locations) {
        state.company.locations = state.company.locations.filter(
          loc => loc.id !== action.payload
        );
      }
    },

    // Gallery management
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },

    addGalleryImage: (state, action) => {
      state.gallery.push(action.payload);
    },

    updateGalleryImage: (state, action) => {
      const index = state.gallery.findIndex(img => img.id === action.payload.id);
      if (index !== -1) {
        state.gallery[index] = action.payload;
      }
    },

    removeGalleryImage: (state, action) => {
      state.gallery = state.gallery.filter(img => img.id !== action.payload);
    },

    reorderGallery: (state, action) => {
      state.gallery = action.payload;
    },

    // Testimonials management
    setTestimonials: (state, action) => {
      state.testimonials = action.payload;
    },

    addTestimonial: (state, action) => {
      state.testimonials.push(action.payload);
    },

    updateTestimonial: (state, action) => {
      const index = state.testimonials.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.testimonials[index] = action.payload;
      }
    },

    removeTestimonial: (state, action) => {
      state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
    },

    // Loading and error states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Reset company state
    resetCompany: (state) => {
      return initialState;
    }
  }
});

export const {
  setCompany,
  updateCompany,
  updateLogo,
  updateSocialMedia,
  addLocation,
  updateLocation,
  removeLocation,
  setGallery,
  addGalleryImage,
  updateGalleryImage,
  removeGalleryImage,
  reorderGallery,
  setTestimonials,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
  setLoading,
  setError,
  clearError,
  resetCompany
} = companySlice.actions;

export default companySlice.reducer;
