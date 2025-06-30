import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Globe, 
  MessageCircle,
  Calendar,
  DollarSign,
  Users,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mentorProfiles } from '../data/mentorProfiles';
import { MentorProfile } from '../types';
import { BookingModal } from './BookingModal';

export function MentorProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Get all unique expertise areas
  const allExpertise = useMemo(() => {
    const expertise = new Set<string>();
    mentorProfiles.forEach(mentor => {
      mentor.expertise.forEach(skill => expertise.add(skill));
    });
    return Array.from(expertise).sort();
  }, []);

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    let filtered = mentorProfiles.filter(mentor => {
      // Search filter
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      // Expertise filter
      const matchesExpertise = selectedExpertise === 'all' || 
                              mentor.expertise.includes(selectedExpertise);

      // Price filter
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'under-100' && (mentor.hourlyRate || 0) < 100) ||
                          (priceRange === '100-150' && (mentor.hourlyRate || 0) >= 100 && (mentor.hourlyRate || 0) <= 150) ||
                          (priceRange === '150-200' && (mentor.hourlyRate || 0) > 150 && (mentor.hourlyRate || 0) <= 200) ||
                          (priceRange === 'over-200' && (mentor.hourlyRate || 0) > 200);

      // Availability filter
      const matchesAvailability = availability === 'all' || mentor.availability === availability;

      return matchesSearch && matchesExpertise && matchesPrice && matchesAvailability;
    });

    // Sort mentors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return (a.hourlyRate || 0) - (b.hourlyRate || 0);
        case 'price-high':
          return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedExpertise, priceRange, availability, sortBy]);

  const handleBookSession = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Offline': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Expert Mentors
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized guidance from industry professionals who've walked your path
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search mentors by name, expertise, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-purple-400"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="experience">Most Experience</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                    <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Expertise</SelectItem>
                        {allExpertise.map(skill => (
                          <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-100">Under $100/hr</SelectItem>
                        <SelectItem value="100-150">$100-150/hr</SelectItem>
                        <SelectItem value="150-200">$150-200/hr</SelectItem>
                        <SelectItem value="over-200">Over $200/hr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Availability</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredMentors.length} of {mentorProfiles.length} mentors
            </p>
          </div>

          {/* Mentor Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1 flex-shrink-0">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate">{mentor.name}</h3>
                        <p className="text-purple-600 font-medium text-sm">{mentor.title}</p>
                        <p className="text-gray-500 text-sm">{mentor.company}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={`text-xs ${getAvailabilityColor(mentor.availability || 'Offline')}`}>
                            {mentor.availability}
                          </Badge>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{mentor.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-800">{mentor.rating}</span>
                        <span className="text-gray-500 text-sm">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{mentor.experience} exp</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                    {/* Expertise */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                            +{mentor.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-gray-800">${mentor.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">{mentor.timezone}</span>
                      </div>
                    </div>

                    {/* Languages */}
                    {mentor.languages && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Languages:</p>
                        <p className="text-sm text-gray-700">{mentor.languages.join(', ')}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleBookSession(mentor)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        disabled={mentor.availability === 'Offline'}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Session
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => window.open(`mailto:${mentor.name.toLowerCase().replace(' ', '.')}@jouvi.com`, '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No mentors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedExpertise('all');
                  setPriceRange('all');
                  setAvailability('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Booking Modal */}
          {selectedMentor && (
            <BookingModal
              isOpen={showBookingModal}
              onClose={() => {
                setShowBookingModal(false);
                setSelectedMentor(null);
              }}
              mentor={selectedMentor}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}