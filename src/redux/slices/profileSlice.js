import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileData: null,
  resumeData: {},
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    updateBasicInfo: (state, action) => {
      state.resumeData.basicInfo = action.payload;
    },
    updateExperience: (state, action) => {
      state.resumeData.experience = action.payload;
    },
    updateEducation: (state, action) => {
      state.resumeData.education = action.payload;
    },
    updateSkills: (state, action) => {
      state.resumeData.skills = action.payload;
    },
    clearProfile: (state) => {
      state.profileData = null;
      state.resumeData = {};
    },
  },
});

export const {
  setProfileData,
  updateBasicInfo,
  updateExperience,
  updateEducation,
  updateSkills,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
