import { useState } from 'react';
import { 
  FaBuilding, 
  FaGlobe, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendar,
  FaIndustry,
  FaCamera,
  FaPlus,
  FaTimes,
  FaSave,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [companyData, setCompanyData] = useState({
    name: 'Tech Solutions Inc.',
    tagline: 'Building the future of technology',
    logo: null,
    industry: 'Information Technology',
    companySize: '1000-5000',
    foundedYear: '2015',
    website: 'https://techsolutions.com',
    about: `Tech Solutions Inc. is a leading technology company specializing in innovative software solutions. We're committed to delivering excellence and creating meaningful impact through technology.

Our mission is to empower businesses with cutting-edge solutions that drive growth and success. With a team of highly skilled professionals, we work on diverse projects ranging from web applications to AI-powered systems.

Join us in our journey to shape the future of technology!`,
    headquarters: 'San Francisco, CA',
    locations: [
      { id: 1, city: 'San Francisco', country: 'USA', address: '123 Tech Street, CA 94102', isPrimary: true },
      { id: 2, city: 'New York', country: 'USA', address: '456 Innovation Ave, NY 10001', isPrimary: false },
      { id: 3, city: 'London', country: 'UK', address: '789 Tech Lane, London EC1A 1BB', isPrimary: false }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techsolutions',
      twitter: 'https://twitter.com/techsolutions',
      facebook: 'https://facebook.com/techsolutions',
      instagram: 'https://instagram.com/techsolutions'
    },
    benefits: [
      'Health Insurance',
      'Remote Work Options',
      '401(k) Matching',
      'Unlimited PTO',
      'Professional Development',
      'Gym Membership'
    ],
    culture: [
      'Innovation-driven',
      'Collaborative Environment',
      'Work-Life Balance',
      'Diversity & Inclusion'
    ]
  });

  const [gallery, setGallery] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', caption: 'Office Space' },
    { id: 2, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', caption: 'Team Meeting' },
    { id: 3, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', caption: 'Work Environment' },
    { id: 4, url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', caption: 'Brainstorming Session' },
    { id: 5, url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', caption: 'Creative Workspace' },
    { id: 6, url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', caption: 'Team Collaboration' }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Developer',
      image: null,
      text: 'Working at Tech Solutions has been an amazing journey. The culture of innovation and support has helped me grow both professionally and personally.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      image: null,
      text: 'The collaborative environment and cutting-edge projects make every day exciting. Management truly cares about employee growth and well-being.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      image: null,
      text: 'Best company I\'ve worked for! Great benefits, supportive team, and meaningful work. The work-life balance is exceptional.',
      rating: 5
    }
  ]);

  const [newLocation, setNewLocation] = useState({
    city: '',
    country: '',
    address: '',
    isPrimary: false
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    position: '',
    text: '',
    rating: 5
  });

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setCompanyData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyData(prev => ({
          ...prev,
          logo: reader.result
        }));
        toast.success('Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLocation = () => {
    if (!newLocation.city || !newLocation.country) {
      toast.error('Please fill in city and country');
      return;
    }

    const location = {
      id: Date.now(),
      ...newLocation
    };

    setCompanyData(prev => ({
      ...prev,
      locations: [...prev.locations, location]
    }));

    setNewLocation({ city: '', country: '', address: '', isPrimary: false });
    toast.success('Location added successfully');
  };

  const handleRemoveLocation = (id) => {
    setCompanyData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== id)
    }));
    toast.success('Location removed');
  };

  const handleAddGalleryImage = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now() + Math.random(),
          url: reader.result,
          caption: file.name.split('.')[0]
        };
        setGallery(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    toast.success('Images uploaded successfully');
  };

  const handleRemoveGalleryImage = (id) => {
    setGallery(prev => prev.filter(img => img.id !== id));
    toast.success('Image removed');
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.position || !newTestimonial.text) {
      toast.error('Please fill in all testimonial fields');
      return;
    }

    const testimonial = {
      id: Date.now(),
      ...newTestimonial,
      image: null
    };

    setTestimonials(prev => [...prev, testimonial]);
    setNewTestimonial({ name: '', position: '', text: '', rating: 5 });
    toast.success('Testimonial added successfully');
  };

  const handleRemoveTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    toast.success('Testimonial removed');
  };

  const handleSave = () => {
    // Simulate API call
    toast.success('Company profile updated successfully!');
    setIsEditing(false);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600 mt-2">Manage your company information and branding</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Company Logo & Basic Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Company Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {companyData.logo ? (
                  <div className="relative">
                    <img src={companyData.logo} alt="Company Logo" className="w-32 h-32 object-contain mx-auto mb-4" />
                    {isEditing && (
                      <button
                        onClick={() => handleInputChange('logo', null)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 mb-4">
                    <FaCamera className="text-4xl mx-auto mb-2" />
                    <p className="text-sm">No logo uploaded</p>
                  </div>
                )}
                {isEditing && (
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block hover:bg-blue-700 text-sm">
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-xs text-gray-500 mt-2">Max size: 2MB</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={companyData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Brief company tagline"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={companyData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  >
                    <option>Information Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>E-commerce</option>
                    <option>Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select
                    value={companyData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  >
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>501-1000</option>
                    <option>1000-5000</option>
                    <option>5000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                  <input
                    type="text"
                    value={companyData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={companyData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Company</h2>
          <textarea
            value={companyData.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            disabled={!isEditing}
            rows={8}
            placeholder="Tell candidates about your company..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">{companyData.about.length} characters</p>
        </div>

        {/* Office Locations */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Office Locations</h2>
          
          <div className="space-y-4 mb-6">
            {companyData.locations.map((location) => (
              <div key={location.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{location.city}, {location.country}</h3>
                      {location.isPrimary && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Primary</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveLocation(location.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Add New Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  value={newLocation.city}
                  onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newLocation.country}
                  onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Full Address"
                value={newLocation.address}
                onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <button
                onClick={handleAddLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaPlus /> Add Location
              </button>
            </div>
          )}
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaLinkedin className="text-blue-700" /> LinkedIn
              </label>
              <input
                type="url"
                value={companyData.socialMedia.linkedin}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                disabled={!isEditing}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaTwitter className="text-blue-400" /> Twitter
              </label>
              <input
                type="url"
                value={companyData.socialMedia.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                disabled={!isEditing}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaFacebook className="text-blue-600" /> Facebook
              </label>
              <input
                type="url"
                value={companyData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                disabled={!isEditing}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaInstagram className="text-pink-600" /> Instagram
              </label>
              <input
                type="url"
                value={companyData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                disabled={!isEditing}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Company Gallery */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Company Photos</h2>
            {isEditing && (
              <label className="cursor-pointer">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center gap-2 hover:bg-blue-700">
                  <FaPlus /> Add Photos
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddGalleryImage}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageModal(image)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveGalleryImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Employee Testimonials</h2>
          
          <div className="space-y-4 mb-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Add New Testimonial</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Employee Name"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={newTestimonial.position}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, position: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Testimonial text..."
                  value={newTestimonial.text}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddTestimonial}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaPlus /> Add Testimonial
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="max-w-4xl w-full">
            <div className="relative">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto rounded-lg"
              />
              <div className="bg-white p-4 mt-4 rounded-lg">
                <p className="text-gray-900 font-medium">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
