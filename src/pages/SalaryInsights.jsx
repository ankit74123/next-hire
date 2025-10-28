import { useState } from 'react';
import { FaCalculator, FaChartLine, FaMapMarkerAlt, FaIndustry, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SalaryInsights = () => {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator', 'comparison', 'trends'
  
  // Calculator form
  const [calculatorForm, setCalculatorForm] = useState({
    jobTitle: '',
    experience: '',
    location: '',
    education: '',
    skills: ''
  });
  const [estimatedSalary, setEstimatedSalary] = useState(null);

  // Comparison form
  const [comparisonForm, setComparisonForm] = useState({
    role: '',
    location1: '',
    location2: ''
  });
  const [comparisonData, setComparisonData] = useState(null);

  // Sample data for trends
  const industryTrends = [
    { industry: 'Information Technology', avg: 1250000, growth: '+12%', color: 'bg-blue-500' },
    { industry: 'Finance & Banking', avg: 1100000, growth: '+8%', color: 'bg-green-500' },
    { industry: 'Healthcare', avg: 950000, growth: '+10%', color: 'bg-red-500' },
    { industry: 'E-commerce', avg: 1150000, growth: '+15%', color: 'bg-purple-500' },
    { industry: 'Manufacturing', avg: 850000, growth: '+5%', color: 'bg-yellow-500' },
    { industry: 'Education', avg: 650000, growth: '+6%', color: 'bg-indigo-500' }
  ];

  const locationData = [
    { city: 'Bangalore', avg: 1400000, costOfLiving: 'High', popular: true },
    { city: 'Mumbai', avg: 1350000, costOfLiving: 'Very High', popular: true },
    { city: 'Delhi NCR', avg: 1300000, costOfLiving: 'High', popular: true },
    { city: 'Hyderabad', avg: 1200000, costOfLiving: 'Medium', popular: true },
    { city: 'Pune', avg: 1150000, costOfLiving: 'Medium', popular: true },
    { city: 'Chennai', avg: 1100000, costOfLiving: 'Medium', popular: false },
    { city: 'Kolkata', avg: 950000, costOfLiving: 'Low', popular: false },
    { city: 'Ahmedabad', avg: 900000, costOfLiving: 'Low', popular: false }
  ];

  const experienceRanges = [
    { range: '0-2 years', min: 300000, max: 600000, avg: 450000 },
    { range: '2-5 years', min: 600000, max: 1200000, avg: 900000 },
    { range: '5-8 years', min: 1200000, max: 2000000, avg: 1600000 },
    { range: '8-12 years', min: 2000000, max: 3500000, avg: 2750000 },
    { range: '12+ years', min: 3500000, max: 6000000, avg: 4750000 }
  ];

  const topPayingRoles = [
    { role: 'Data Scientist', salary: 1800000, demand: 'Very High' },
    { role: 'Full Stack Developer', salary: 1500000, demand: 'Very High' },
    { role: 'DevOps Engineer', salary: 1600000, demand: 'High' },
    { role: 'Product Manager', salary: 2000000, demand: 'High' },
    { role: 'Machine Learning Engineer', salary: 1900000, demand: 'Very High' },
    { role: 'Blockchain Developer', salary: 2200000, demand: 'Medium' },
    { role: 'Cloud Architect', salary: 2500000, demand: 'High' },
    { role: 'Cybersecurity Specialist', salary: 1700000, demand: 'High' }
  ];

  // Calculate estimated salary
  const calculateSalary = () => {
    if (!calculatorForm.jobTitle || !calculatorForm.experience || !calculatorForm.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simple calculation logic (in real app, this would be ML-based)
    const baseAmount = 500000;
    const experienceMultiplier = parseInt(calculatorForm.experience) || 0;
    const locationMultiplier = calculatorForm.location === 'Bangalore' || calculatorForm.location === 'Mumbai' ? 1.3 : 1.0;
    const educationBonus = calculatorForm.education === 'masters' ? 1.2 : calculatorForm.education === 'phd' ? 1.4 : 1.0;

    const estimatedMin = Math.round((baseAmount + (experienceMultiplier * 100000)) * locationMultiplier * educationBonus * 0.85);
    const estimatedMax = Math.round((baseAmount + (experienceMultiplier * 150000)) * locationMultiplier * educationBonus * 1.15);
    const estimatedAvg = Math.round((estimatedMin + estimatedMax) / 2);

    setEstimatedSalary({
      min: estimatedMin,
      max: estimatedMax,
      avg: estimatedAvg,
      percentile25: Math.round(estimatedMin * 1.1),
      percentile50: estimatedAvg,
      percentile75: Math.round(estimatedMax * 0.9)
    });

    toast.success('Salary estimated successfully!');
  };

  // Compare salaries
  const compareSalaries = () => {
    if (!comparisonForm.role || !comparisonForm.location1 || !comparisonForm.location2) {
      toast.error('Please fill in all fields');
      return;
    }

    // Sample comparison data
    const loc1Data = locationData.find(l => l.city === comparisonForm.location1);
    const loc2Data = locationData.find(l => l.city === comparisonForm.location2);

    if (!loc1Data || !loc2Data) {
      toast.error('Location data not available');
      return;
    }

    const difference = loc1Data.avg - loc2Data.avg;
    const percentDiff = ((difference / loc2Data.avg) * 100).toFixed(1);

    setComparisonData({
      location1: {
        city: loc1Data.city,
        salary: loc1Data.avg,
        costOfLiving: loc1Data.costOfLiving
      },
      location2: {
        city: loc2Data.city,
        salary: loc2Data.avg,
        costOfLiving: loc2Data.costOfLiving
      },
      difference: Math.abs(difference),
      percentDiff: Math.abs(percentDiff),
      higher: difference > 0 ? loc1Data.city : loc2Data.city
    });

    toast.success('Comparison generated!');
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Insights</h1>
        <p className="text-gray-600">Discover salary trends and estimate your compensation</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaCalculator className="inline mr-2" />
            Salary Calculator
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'comparison'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaMapMarkerAlt className="inline mr-2" />
            Location Comparison
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'trends'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Industry Trends
          </button>
        </div>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calculate Your Expected Salary</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaBriefcase className="inline mr-2" />
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={calculatorForm.jobTitle}
                    onChange={(e) => setCalculatorForm({ ...calculatorForm, jobTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Software Engineer, Product Manager"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      value={calculatorForm.experience}
                      onChange={(e) => setCalculatorForm({ ...calculatorForm, experience: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 5"
                      min="0"
                      max="40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Location *
                    </label>
                    <select
                      value={calculatorForm.location}
                      onChange={(e) => setCalculatorForm({ ...calculatorForm, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select location</option>
                      {locationData.map(loc => (
                        <option key={loc.city} value={loc.city}>{loc.city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaGraduationCap className="inline mr-2" />
                    Education Level
                  </label>
                  <select
                    value={calculatorForm.education}
                    onChange={(e) => setCalculatorForm({ ...calculatorForm, education: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select education</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Skills (Optional)
                  </label>
                  <input
                    type="text"
                    value={calculatorForm.skills}
                    onChange={(e) => setCalculatorForm({ ...calculatorForm, skills: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>

                <button
                  onClick={calculateSalary}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Calculate Salary
                </button>
              </div>

              {/* Estimated Result */}
              {estimatedSalary && (
                <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Estimated Salary Range</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Minimum</div>
                      <div className="text-xl font-bold text-gray-900">{formatCurrency(estimatedSalary.min)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Average</div>
                      <div className="text-2xl font-bold text-primary-600">{formatCurrency(estimatedSalary.avg)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Maximum</div>
                      <div className="text-xl font-bold text-gray-900">{formatCurrency(estimatedSalary.max)}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">25th Percentile</span>
                        <span className="font-semibold">{formatCurrency(estimatedSalary.percentile25)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">50th Percentile (Median)</span>
                        <span className="font-semibold">{formatCurrency(estimatedSalary.percentile50)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">75th Percentile</span>
                        <span className="font-semibold">{formatCurrency(estimatedSalary.percentile75)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">
                      💡 This estimate is based on {calculatorForm.experience} years of experience in {calculatorForm.location}.
                      Actual salaries may vary based on company size, specific skills, and negotiation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Experience Ranges */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Salary by Experience</h3>
              <div className="space-y-4">
                {experienceRanges.map((range, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <div className="font-semibold text-gray-900">{range.range}</div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(range.min)} - {formatCurrency(range.max)}
                    </div>
                    <div className="text-xs text-gray-500">Avg: {formatCurrency(range.avg)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Paying Roles</h3>
              <div className="space-y-3">
                {topPayingRoles.slice(0, 5).map((role, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{role.role}</div>
                      <div className="text-xs text-gray-500">Demand: {role.demand}</div>
                    </div>
                    <div className="text-sm font-bold text-primary-600">
                      {formatCurrency(role.salary)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Tab */}
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comparison Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Compare Salaries Across Locations</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Job Title *
                </label>
                <input
                  type="text"
                  value={comparisonForm.role}
                  onChange={(e) => setComparisonForm({ ...comparisonForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location 1 *
                </label>
                <select
                  value={comparisonForm.location1}
                  onChange={(e) => setComparisonForm({ ...comparisonForm, location1: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select location</option>
                  {locationData.map(loc => (
                    <option key={loc.city} value={loc.city}>{loc.city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location 2 *
                </label>
                <select
                  value={comparisonForm.location2}
                  onChange={(e) => setComparisonForm({ ...comparisonForm, location2: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select location</option>
                  {locationData.map(loc => (
                    <option key={loc.city} value={loc.city}>{loc.city}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={compareSalaries}
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Compare Now
              </button>
            </div>

            {/* Comparison Result */}
            {comparisonData && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">{comparisonData.location1.city}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {formatCurrency(comparisonData.location1.salary)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cost of Living: {comparisonData.location1.costOfLiving}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">{comparisonData.location2.city}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {formatCurrency(comparisonData.location2.salary)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cost of Living: {comparisonData.location2.costOfLiving}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-gray-900 mb-2">Comparison Summary</div>
                  <p className="text-sm text-gray-700">
                    {comparisonData.higher} offers {formatCurrency(comparisonData.difference)} ({comparisonData.percentDiff}%) 
                    more in average salary for this role.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Location Data Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Average Salaries by Location</h3>
            <div className="space-y-2">
              {locationData.map((loc, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    loc.popular ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary-600" />
                      {loc.city}
                      {loc.popular && (
                        <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded">Popular</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Cost of Living: {loc.costOfLiving}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary-600">{formatCurrency(loc.avg)}</div>
                    <div className="text-xs text-gray-500">avg/year</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Industry Trends */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              <FaIndustry className="inline mr-2" />
              Industry-wise Salary Trends
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industryTrends.map((industry, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{industry.industry}</h3>
                    <span className="text-green-600 text-sm font-semibold">{industry.growth}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {formatCurrency(industry.avg)}
                    </div>
                    <div className="text-xs text-gray-500">Average Annual Salary</div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${industry.color} h-2 rounded-full`}
                      style={{ width: `${(industry.avg / 1500000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Paying Roles Full List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Highest Paying Tech Roles</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Salary</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {topPayingRoles.map((role, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{role.role}</td>
                      <td className="py-3 px-4 font-bold text-primary-600">{formatCurrency(role.salary)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          role.demand === 'Very High' ? 'bg-green-100 text-green-700' :
                          role.demand === 'High' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {role.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Salary Growth Chart Visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              <FaChartLine className="inline mr-2" />
              Salary Growth by Experience Level
            </h2>
            
            <div className="relative h-64">
              {experienceRanges.map((range, index) => {
                const heightPercent = (range.avg / 5000000) * 100;
                return (
                  <div key={index} className="inline-block mr-4" style={{ width: '18%' }}>
                    <div className="relative h-60 flex items-end">
                      <div
                        className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg hover:from-primary-700 hover:to-primary-500 transition-all cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                        title={`${range.range}: ${formatCurrency(range.avg)}`}
                      >
                        <div className="absolute -top-8 left-0 right-0 text-center">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(range.avg)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-gray-600 mt-2">{range.range}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                📈 Salaries show significant growth with experience. The biggest jump typically occurs between 
                5-8 years when professionals transition to senior roles.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryInsights;
