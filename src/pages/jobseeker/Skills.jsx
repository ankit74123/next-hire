import { useState } from 'react';
import { FaTools, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'React', category: 'technical', proficiency: 5 },
    { id: 2, name: 'Node.js', category: 'technical', proficiency: 4 },
    { id: 3, name: 'Communication', category: 'soft', proficiency: 5 },
    { id: 4, name: 'Leadership', category: 'soft', proficiency: 4 },
  ]);

  const [languages, setLanguages] = useState([
    { id: 1, name: 'English', proficiency: 'Native' },
    { id: 2, name: 'Hindi', proficiency: 'Fluent' },
  ]);

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingLanguageId, setEditingLanguageId] = useState(null);

  const [skillFormData, setSkillFormData] = useState({
    name: '',
    category: 'technical',
    proficiency: 3,
  });

  const [languageFormData, setLanguageFormData] = useState({
    name: '',
    proficiency: 'Intermediate',
  });

  const [skillInput, setSkillInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Popular skill suggestions
  const popularSkills = {
    technical: [
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 
      'PostgreSQL', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'JavaScript',
      'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'AWS', 'Azure',
      'Docker', 'Kubernetes', 'Git', 'CI/CD', 'REST API', 'GraphQL', 'Redis',
      'Microservices', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Analysis',
    ],
    soft: [
      'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management',
      'Critical Thinking', 'Adaptability', 'Creativity', 'Conflict Resolution',
      'Project Management', 'Negotiation', 'Public Speaking', 'Collaboration',
      'Emotional Intelligence', 'Decision Making', 'Strategic Thinking',
    ],
  };

  const languageProficiencyLevels = ['Basic', 'Intermediate', 'Fluent', 'Native'];

  const handleSkillInputChange = (value) => {
    setSkillInput(value);
    setSkillFormData((prev) => ({ ...prev, name: value }));

    if (value.length > 0) {
      const allSkills = [
        ...popularSkills.technical,
        ...popularSkills.soft,
      ];
      const filtered = allSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSkillInput(suggestion);
    setSkillFormData((prev) => ({ ...prev, name: suggestion }));
    setSuggestions([]);
  };

  const validateSkill = () => {
    if (!skillFormData.name.trim()) {
      toast.error('Skill name is required');
      return false;
    }
    return true;
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();

    if (!validateSkill()) return;

    if (editingSkillId) {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === editingSkillId ? { ...skillFormData, id: editingSkillId } : skill
        )
      );
      toast.success('Skill updated successfully!');
    } else {
      const newSkill = { ...skillFormData, id: Date.now() };
      setSkills((prev) => [...prev, newSkill]);
      toast.success('Skill added successfully!');
    }

    resetSkillForm();
  };

  const handleLanguageSubmit = (e) => {
    e.preventDefault();

    if (!languageFormData.name.trim()) {
      toast.error('Language name is required');
      return;
    }

    if (editingLanguageId) {
      setLanguages((prev) =>
        prev.map((lang) =>
          lang.id === editingLanguageId ? { ...languageFormData, id: editingLanguageId } : lang
        )
      );
      toast.success('Language updated successfully!');
    } else {
      const newLanguage = { ...languageFormData, id: Date.now() };
      setLanguages((prev) => [...prev, newLanguage]);
      toast.success('Language added successfully!');
    }

    resetLanguageForm();
  };

  const handleEditSkill = (skill) => {
    setSkillFormData(skill);
    setSkillInput(skill.name);
    setEditingSkillId(skill.id);
    setShowSkillForm(true);
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      toast.success('Skill deleted successfully!');
    }
  };

  const handleEditLanguage = (language) => {
    setLanguageFormData(language);
    setEditingLanguageId(language.id);
    setShowLanguageForm(true);
  };

  const handleDeleteLanguage = (id) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      setLanguages((prev) => prev.filter((lang) => lang.id !== id));
      toast.success('Language deleted successfully!');
    }
  };

  const resetSkillForm = () => {
    setSkillFormData({ name: '', category: 'technical', proficiency: 3 });
    setSkillInput('');
    setSuggestions([]);
    setEditingSkillId(null);
    setShowSkillForm(false);
  };

  const resetLanguageForm = () => {
    setLanguageFormData({ name: '', proficiency: 'Intermediate' });
    setEditingLanguageId(null);
    setShowLanguageForm(false);
  };

  const renderStars = (proficiency) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < proficiency ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const technicalSkills = skills.filter((s) => s.category === 'technical');
  const softSkills = skills.filter((s) => s.category === 'soft');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skills & Languages</h1>
          <p className="text-gray-600">Showcase your technical and soft skills</p>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            {!showSkillForm && (
              <button
                onClick={() => setShowSkillForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Skill
              </button>
            )}
          </div>

          {/* Skill Form */}
          {showSkillForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingSkillId ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button
                  onClick={resetSkillForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleSkillSubmit} className="space-y-6">
                {/* Skill Name with Autocomplete */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => handleSkillInputChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., React, Communication"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={skillFormData.category}
                    onChange={(e) =>
                      setSkillFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="technical">Technical Skills</option>
                    <option value="soft">Soft Skills</option>
                  </select>
                </div>

                {/* Proficiency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level: {skillFormData.proficiency}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={skillFormData.proficiency}
                    onChange={(e) =>
                      setSkillFormData((prev) => ({
                        ...prev,
                        proficiency: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                    <span>Master</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mt-4">
                    {renderStars(skillFormData.proficiency)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetSkillForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center transition"
                  >
                    <FaSave className="mr-2" />
                    {editingSkillId ? 'Update' : 'Add'} Skill
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Technical Skills */}
          {technicalSkills.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Technical Skills
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {technicalSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                        <div className="flex items-center space-x-1 mt-2">
                          {renderStars(skill.proficiency)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {softSkills.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {softSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                        <div className="flex items-center space-x-1 mt-2">
                          {renderStars(skill.proficiency)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length === 0 && !showSkillForm && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaTools className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No skills added yet</p>
              <button
                onClick={() => setShowSkillForm(true)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Add your first skill
              </button>
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
            {!showLanguageForm && (
              <button
                onClick={() => setShowLanguageForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Language
              </button>
            )}
          </div>

          {/* Language Form */}
          {showLanguageForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingLanguageId ? 'Edit Language' : 'Add New Language'}
                </h3>
                <button
                  onClick={resetLanguageForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleLanguageSubmit} className="space-y-6">
                {/* Language Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={languageFormData.name}
                    onChange={(e) =>
                      setLanguageFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., English, Hindi, Spanish"
                  />
                </div>

                {/* Proficiency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level
                  </label>
                  <select
                    value={languageFormData.proficiency}
                    onChange={(e) =>
                      setLanguageFormData((prev) => ({
                        ...prev,
                        proficiency: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {languageProficiencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetLanguageForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center transition"
                  >
                    <FaSave className="mr-2" />
                    {editingLanguageId ? 'Update' : 'Add'} Language
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Languages List */}
          {languages.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div
                    key={language.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{language.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {language.proficiency}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLanguage(language)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length === 0 && !showLanguageForm && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 mb-4">No languages added yet</p>
              <button
                onClick={() => setShowLanguageForm(true)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Add your first language
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
