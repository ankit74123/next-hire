import { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFilter, FaPlus, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CompanyReviews = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterRating, setFilterRating] = useState('all'); // 'all', 'positive', 'negative'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'helpful', 'rating'

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    companyName: '',
    jobTitle: '',
    employmentType: 'full-time',
    currentEmployee: true,
    overallRating: 0,
    workLifeBalance: 0,
    culture: 0,
    salaryBenefits: 0,
    management: 0,
    careerGrowth: 0,
    title: '',
    pros: '',
    cons: '',
    advice: ''
  });

  // Sample reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      companyName: 'Tech Corp',
      jobTitle: 'Software Engineer',
      employmentType: 'full-time',
      currentEmployee: true,
      overallRating: 4.5,
      workLifeBalance: 5,
      culture: 4,
      salaryBenefits: 5,
      management: 4,
      careerGrowth: 4,
      title: 'Great place to work with excellent benefits',
      pros: 'Amazing work-life balance, competitive salary, great team culture, modern tech stack, flexible working hours, learning opportunities.',
      cons: 'Sometimes projects can be challenging with tight deadlines. Office location could be better.',
      advice: 'Focus on learning and building relationships with team members. Take advantage of all the learning resources.',
      helpful: 45,
      notHelpful: 3,
      date: '2025-10-15',
      verified: true
    },
    {
      id: 2,
      companyName: 'Innovation Labs',
      jobTitle: 'Product Manager',
      employmentType: 'full-time',
      currentEmployee: false,
      overallRating: 3.5,
      workLifeBalance: 3,
      culture: 4,
      salaryBenefits: 3,
      management: 3,
      careerGrowth: 4,
      title: 'Good for learning but work pressure is high',
      pros: 'Fast-paced environment, learn a lot, good product portfolio, smart colleagues, opportunity to work on cutting-edge technology.',
      cons: 'Long working hours, high pressure, below-market salary, limited work-life balance, frequent management changes.',
      advice: 'Be prepared for long hours. Make sure to negotiate salary well. Great for early career learning.',
      helpful: 32,
      notHelpful: 5,
      date: '2025-09-28',
      verified: true
    },
    {
      id: 3,
      companyName: 'Digital Solutions Inc',
      jobTitle: 'UI/UX Designer',
      employmentType: 'full-time',
      currentEmployee: true,
      overallRating: 5,
      workLifeBalance: 5,
      culture: 5,
      salaryBenefits: 4,
      management: 5,
      careerGrowth: 5,
      title: 'Dream company for designers!',
      pros: 'Creative freedom, supportive management, excellent design tools, collaborative environment, regular design workshops, great benefits package.',
      cons: 'Can\'t think of any major cons. Maybe slightly lower pay compared to bigger companies.',
      advice: 'Don\'t hesitate to share your ideas. The company really values creativity and innovation.',
      helpful: 67,
      notHelpful: 1,
      date: '2025-10-20',
      verified: true
    },
    {
      id: 4,
      companyName: 'StartupX',
      jobTitle: 'Full Stack Developer',
      employmentType: 'full-time',
      currentEmployee: true,
      overallRating: 4,
      workLifeBalance: 3,
      culture: 5,
      salaryBenefits: 4,
      management: 4,
      careerGrowth: 5,
      title: 'Exciting startup with great growth opportunities',
      pros: 'Wear multiple hats, direct impact on product, equity options, flexible schedule, modern tech stack, young and energetic team.',
      cons: 'Typical startup chaos, changing priorities, limited structure, sometimes unclear expectations.',
      advice: 'Be adaptable and ready to learn new things quickly. Great place if you want to grow fast.',
      helpful: 28,
      notHelpful: 4,
      date: '2025-10-05',
      verified: false
    },
    {
      id: 5,
      companyName: 'Enterprise Tech',
      jobTitle: 'Senior Backend Developer',
      employmentType: 'full-time',
      currentEmployee: false,
      overallRating: 3,
      workLifeBalance: 4,
      culture: 2,
      salaryBenefits: 4,
      management: 2,
      careerGrowth: 2,
      title: 'Stable job but limited innovation',
      pros: 'Job security, good work-life balance, decent pay, comprehensive benefits, stable projects, defined processes.',
      cons: 'Legacy codebase, slow decision making, bureaucratic, limited learning opportunities, outdated technology.',
      advice: 'Good if you want stability and work-life balance. Not ideal for those seeking innovation.',
      helpful: 19,
      notHelpful: 8,
      date: '2025-09-15',
      verified: true
    },
    {
      id: 6,
      companyName: 'Creative Agency Co',
      jobTitle: 'Marketing Manager',
      employmentType: 'contract',
      currentEmployee: true,
      overallRating: 4,
      workLifeBalance: 4,
      culture: 5,
      salaryBenefits: 3,
      management: 4,
      careerGrowth: 4,
      title: 'Creative and dynamic workplace',
      pros: 'Diverse clients, creative projects, friendly team, flexible work arrangements, exposure to various industries.',
      cons: 'Contract work means less job security, benefits not as comprehensive, can be stressful during busy seasons.',
      advice: 'Perfect for those who want variety in work. Build strong client relationships.',
      helpful: 15,
      notHelpful: 2,
      date: '2025-10-10',
      verified: false
    }
  ]);

  // Calculate statistics
  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length).toFixed(1),
    recommendPercent: Math.round((reviews.filter(r => r.overallRating >= 4).length / reviews.length) * 100),
    ratingDistribution: {
      5: reviews.filter(r => r.overallRating >= 4.5).length,
      4: reviews.filter(r => r.overallRating >= 3.5 && r.overallRating < 4.5).length,
      3: reviews.filter(r => r.overallRating >= 2.5 && r.overallRating < 3.5).length,
      2: reviews.filter(r => r.overallRating >= 1.5 && r.overallRating < 2.5).length,
      1: reviews.filter(r => r.overallRating < 1.5).length
    },
    categoryAverages: {
      workLifeBalance: (reviews.reduce((sum, r) => sum + r.workLifeBalance, 0) / reviews.length).toFixed(1),
      culture: (reviews.reduce((sum, r) => sum + r.culture, 0) / reviews.length).toFixed(1),
      salaryBenefits: (reviews.reduce((sum, r) => sum + r.salaryBenefits, 0) / reviews.length).toFixed(1),
      management: (reviews.reduce((sum, r) => sum + r.management, 0) / reviews.length).toFixed(1),
      careerGrowth: (reviews.reduce((sum, r) => sum + r.careerGrowth, 0) / reviews.length).toFixed(1)
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'positive') return review.overallRating >= 4;
    if (filterRating === 'negative') return review.overallRating < 3;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.overallRating - a.overallRating;
    return 0;
  });

  // Handle helpful/not helpful vote
  const handleVote = (reviewId, type) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          [type]: review[type] + 1
        };
      }
      return review;
    }));
    toast.success('Thank you for your feedback!');
  };

  // Handle rating change
  const handleRatingChange = (category, value) => {
    setReviewForm({ ...reviewForm, [category]: value });
  };

  // Submit review
  const handleSubmitReview = () => {
    if (!reviewForm.companyName || !reviewForm.jobTitle || !reviewForm.title || 
        !reviewForm.pros || reviewForm.overallRating === 0) {
      toast.error('Please fill in all required fields and provide ratings');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      ...reviewForm,
      helpful: 0,
      notHelpful: 0,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    setReviews([newReview, ...reviews]);
    setShowReviewModal(false);
    setReviewForm({
      companyName: '',
      jobTitle: '',
      employmentType: 'full-time',
      currentEmployee: true,
      overallRating: 0,
      workLifeBalance: 0,
      culture: 0,
      salaryBenefits: 0,
      management: 0,
      careerGrowth: 0,
      title: '',
      pros: '',
      cons: '',
      advice: ''
    });
    toast.success('Review submitted successfully!');
  };

  // Render stars
  const renderStars = (rating, size = 'text-base') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${size} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Render interactive stars for form
  const renderInteractiveStars = (category, currentRating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="focus:outline-none hover:scale-110 transition-transform"
          >
            <FaStar
              className={`text-2xl ${star <= currentRating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
        <span className="ml-2 text-gray-600">{currentRating}/5</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Reviews</h1>
            <p className="text-gray-600">Read and share honest reviews about companies</p>
          </div>
          
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <FaPlus />
            Write a Review
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">{stats.averageRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(parseFloat(stats.averageRating), 'text-xl')}
            </div>
            <p className="text-gray-600">{stats.totalReviews} reviews</p>
            <p className="text-sm text-gray-500 mt-2">
              {stats.recommendPercent}% would recommend
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-8">{rating} ★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{stats.ratingDistribution[rating]}</span>
            </div>
          ))}
        </div>

        {/* Category Ratings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Category Ratings</h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryAverages).map(([category, rating]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRating === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating('positive')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRating === 'positive' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Positive ({reviews.filter(r => r.overallRating >= 4).length})
              </button>
              <button
                onClick={() => setFilterRating('negative')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRating === 'negative' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Critical ({reviews.filter(r => r.overallRating < 3).length})
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {/* Review Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaBuilding className="text-primary-600 text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{review.companyName}</h3>
                    {review.verified && (
                      <FaCheckCircle className="text-green-500" title="Verified Employee" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {review.jobTitle} • {review.employmentType} • 
                    {review.currentEmployee ? ' Current Employee' : ' Former Employee'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-gray-900">{review.overallRating}</span>
                  {renderStars(review.overallRating)}
                </div>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Review Title */}
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{review.title}</h4>

            {/* Category Ratings */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              {[
                { label: 'Work-Life Balance', value: review.workLifeBalance },
                { label: 'Culture', value: review.culture },
                { label: 'Salary & Benefits', value: review.salaryBenefits },
                { label: 'Management', value: review.management },
                { label: 'Career Growth', value: review.careerGrowth }
              ].map((category, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-1">{category.value}</div>
                  <div className="text-xs text-gray-600">{category.label}</div>
                </div>
              ))}
            </div>

            {/* Review Content */}
            <div className="space-y-3 mb-4">
              <div>
                <h5 className="text-sm font-semibold text-green-700 mb-1">Pros</h5>
                <p className="text-gray-700">{review.pros}</p>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-red-700 mb-1">Cons</h5>
                <p className="text-gray-700">{review.cons}</p>
              </div>
              
              {review.advice && (
                <div>
                  <h5 className="text-sm font-semibold text-blue-700 mb-1">Advice to Management</h5>
                  <p className="text-gray-700">{review.advice}</p>
                </div>
              )}
            </div>

            {/* Helpful Votes */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleVote(review.id, 'helpful')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FaThumbsUp />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button
                  onClick={() => handleVote(review.id, 'notHelpful')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaThumbsDown />
                  <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Company and Job Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={reviewForm.companyName}
                    onChange={(e) => setReviewForm({ ...reviewForm, companyName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={reviewForm.jobTitle}
                    onChange={(e) => setReviewForm({ ...reviewForm, jobTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Your job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={reviewForm.employmentType}
                    onChange={(e) => setReviewForm({ ...reviewForm, employmentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status
                  </label>
                  <select
                    value={reviewForm.currentEmployee}
                    onChange={(e) => setReviewForm({ ...reviewForm, currentEmployee: e.target.value === 'true' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="true">Current Employee</option>
                    <option value="false">Former Employee</option>
                  </select>
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating *
                    </label>
                    {renderInteractiveStars('overallRating', reviewForm.overallRating)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work-Life Balance
                      </label>
                      {renderInteractiveStars('workLifeBalance', reviewForm.workLifeBalance)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Culture & Values
                      </label>
                      {renderInteractiveStars('culture', reviewForm.culture)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary & Benefits
                      </label>
                      {renderInteractiveStars('salaryBenefits', reviewForm.salaryBenefits)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Management
                      </label>
                      {renderInteractiveStars('management', reviewForm.management)}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Career Growth
                      </label>
                      {renderInteractiveStars('careerGrowth', reviewForm.careerGrowth)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Sum up your experience in one line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pros *
                </label>
                <textarea
                  value={reviewForm.pros}
                  onChange={(e) => setReviewForm({ ...reviewForm, pros: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="What are the positive aspects of working here?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cons
                </label>
                <textarea
                  value={reviewForm.cons}
                  onChange={(e) => setReviewForm({ ...reviewForm, cons: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="What could be improved?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advice to Management (Optional)
                </label>
                <textarea
                  value={reviewForm.advice}
                  onChange={(e) => setReviewForm({ ...reviewForm, advice: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="What would you suggest to improve the company?"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3 rounded-b-lg border-t">
              <button
                onClick={handleSubmitReview}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyReviews;
