import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [],
  filteredCandidates: [],
  selectedCandidate: null,
  searchQuery: '',
  filters: {
    location: '',
    minExperience: '',
    maxExperience: '',
    skills: '',
    education: '',
    availability: '',
    salary: ''
  },
  savedSearches: [],
  folders: [],
  atsStages: [
    { id: 'new', name: 'New Applications', color: 'blue', order: 1 },
    { id: 'screening', name: 'Screening', color: 'purple', order: 2 },
    { id: 'interview', name: 'Interview', color: 'orange', order: 3 },
    { id: 'offer', name: 'Offer', color: 'green', order: 4 },
    { id: 'hired', name: 'Hired', color: 'emerald', order: 5 },
    { id: 'rejected', name: 'Rejected', color: 'red', order: 6 }
  ],
  loading: false,
  error: null
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    // Candidates Management
    setCandidates: (state, action) => {
      state.candidates = action.payload;
      state.filteredCandidates = action.payload;
    },
    
    addCandidate: (state, action) => {
      state.candidates.push(action.payload);
      state.filteredCandidates.push(action.payload);
    },
    
    updateCandidate: (state, action) => {
      const index = state.candidates.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.candidates[index] = { ...state.candidates[index], ...action.payload };
      }
      const filteredIndex = state.filteredCandidates.findIndex(c => c.id === action.payload.id);
      if (filteredIndex !== -1) {
        state.filteredCandidates[filteredIndex] = { 
          ...state.filteredCandidates[filteredIndex], 
          ...action.payload 
        };
      }
    },
    
    deleteCandidate: (state, action) => {
      state.candidates = state.candidates.filter(c => c.id !== action.payload);
      state.filteredCandidates = state.filteredCandidates.filter(c => c.id !== action.payload);
    },
    
    setSelectedCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
    
    clearSelectedCandidate: (state) => {
      state.selectedCandidate = null;
    },
    
    // Search and Filter
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
    },
    
    applyFilters: (state) => {
      let filtered = [...state.candidates];
      
      // Apply search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          c.skills?.some(skill => skill.toLowerCase().includes(query))
        );
      }
      
      // Apply location filter
      if (state.filters.location) {
        filtered = filtered.filter(c => 
          c.location?.toLowerCase().includes(state.filters.location.toLowerCase())
        );
      }
      
      // Apply experience filter
      if (state.filters.minExperience) {
        filtered = filtered.filter(c => 
          c.experience >= parseInt(state.filters.minExperience)
        );
      }
      if (state.filters.maxExperience) {
        filtered = filtered.filter(c => 
          c.experience <= parseInt(state.filters.maxExperience)
        );
      }
      
      // Apply skills filter
      if (state.filters.skills) {
        const requiredSkills = state.filters.skills.split(',').map(s => s.trim().toLowerCase());
        filtered = filtered.filter(c => 
          requiredSkills.every(skill => 
            c.skills?.some(s => s.toLowerCase().includes(skill))
          )
        );
      }
      
      // Apply education filter
      if (state.filters.education) {
        filtered = filtered.filter(c => 
          c.education?.toLowerCase().includes(state.filters.education.toLowerCase())
        );
      }
      
      // Apply availability filter
      if (state.filters.availability) {
        filtered = filtered.filter(c => 
          c.availability?.toLowerCase().includes(state.filters.availability.toLowerCase())
        );
      }
      
      state.filteredCandidates = filtered;
    },
    
    // Saved Searches
    addSavedSearch: (state, action) => {
      state.savedSearches.push({
        id: Date.now(),
        name: action.payload.name,
        query: state.searchQuery,
        filters: { ...state.filters },
        createdAt: new Date().toISOString()
      });
    },
    
    deleteSavedSearch: (state, action) => {
      state.savedSearches = state.savedSearches.filter(s => s.id !== action.payload);
    },
    
    loadSavedSearch: (state, action) => {
      const search = state.savedSearches.find(s => s.id === action.payload);
      if (search) {
        state.searchQuery = search.query;
        state.filters = { ...search.filters };
      }
    },
    
    // Folders Management
    createFolder: (state, action) => {
      state.folders.push({
        id: Date.now(),
        name: action.payload.name,
        candidates: [],
        createdAt: new Date().toISOString()
      });
    },
    
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(f => f.id !== action.payload);
    },
    
    addCandidateToFolder: (state, action) => {
      const { folderId, candidateId } = action.payload;
      const folder = state.folders.find(f => f.id === folderId);
      if (folder && !folder.candidates.includes(candidateId)) {
        folder.candidates.push(candidateId);
      }
    },
    
    removeCandidateFromFolder: (state, action) => {
      const { folderId, candidateId } = action.payload;
      const folder = state.folders.find(f => f.id === folderId);
      if (folder) {
        folder.candidates = folder.candidates.filter(id => id !== candidateId);
      }
    },
    
    // Notes Management
    addNote: (state, action) => {
      const { candidateId, note } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate) {
        if (!candidate.notes) {
          candidate.notes = [];
        }
        candidate.notes.push({
          id: Date.now(),
          text: note,
          createdAt: new Date().toISOString()
        });
      }
    },
    
    updateNote: (state, action) => {
      const { candidateId, noteId, text } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate && candidate.notes) {
        const note = candidate.notes.find(n => n.id === noteId);
        if (note) {
          note.text = text;
          note.updatedAt = new Date().toISOString();
        }
      }
    },
    
    deleteNote: (state, action) => {
      const { candidateId, noteId } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate && candidate.notes) {
        candidate.notes = candidate.notes.filter(n => n.id !== noteId);
      }
    },
    
    // ATS Stage Management
    addATSStage: (state, action) => {
      state.atsStages.push({
        id: `custom-${Date.now()}`,
        name: action.payload.name,
        color: action.payload.color || 'gray',
        order: state.atsStages.length + 1
      });
    },
    
    updateATSStage: (state, action) => {
      const { id, ...updates } = action.payload;
      const stage = state.atsStages.find(s => s.id === id);
      if (stage) {
        Object.assign(stage, updates);
      }
    },
    
    deleteATSStage: (state, action) => {
      state.atsStages = state.atsStages.filter(s => s.id !== action.payload);
    },
    
    reorderATSStages: (state, action) => {
      state.atsStages = action.payload;
    },
    
    moveCandidateToStage: (state, action) => {
      const { candidateId, stageId } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate) {
        candidate.stage = stageId;
        candidate.stageHistory = candidate.stageHistory || [];
        candidate.stageHistory.push({
          stage: stageId,
          movedAt: new Date().toISOString()
        });
      }
    },
    
    // Rating
    setCandidateRating: (state, action) => {
      const { candidateId, rating } = action.payload;
      const candidate = state.candidates.find(c => c.id === candidateId);
      if (candidate) {
        candidate.rating = rating;
      }
    },
    
    // Loading and Error
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
    
    // Reset
    resetCandidates: (state) => {
      return initialState;
    }
  }
});

export const {
  setCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  setSelectedCandidate,
  clearSelectedCandidate,
  setSearchQuery,
  setFilters,
  clearFilters,
  applyFilters,
  addSavedSearch,
  deleteSavedSearch,
  loadSavedSearch,
  createFolder,
  deleteFolder,
  addCandidateToFolder,
  removeCandidateFromFolder,
  addNote,
  updateNote,
  deleteNote,
  addATSStage,
  updateATSStage,
  deleteATSStage,
  reorderATSStages,
  moveCandidateToStage,
  setCandidateRating,
  setLoading,
  setError,
  clearError,
  resetCandidates
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
