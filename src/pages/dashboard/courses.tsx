// src/pages/dashboard/courses.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  description: string;
  track: string;
  program: string;
  duration: string;
  level: string;
  price: number;
  enrolled: number;
  rating: number;
  features: string[];
  status: 'available' | 'enrolled' | 'completed';
}

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Mock data - in real app, this would come from API
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Project Management Fundamentals',
          description: 'Learn essential project management skills for tech projects',
          track: 'project-management',
          program: 'launchpad',
          duration: '8 weeks',
          level: 'Beginner',
          price: 50000,
          enrolled: 245,
          rating: 4.8,
          features: ['Agile Methodology', 'Scrum Framework', 'Risk Management', 'Team Leadership'],
          status: 'available'
        },
        {
          id: '2',
          title: 'Frontend Development Bootcamp',
          description: 'Master modern frontend technologies and frameworks',
          track: 'frontend-development',
          program: 'professional',
          duration: '12 weeks',
          level: 'Intermediate',
          price: 150000,
          enrolled: 189,
          rating: 4.9,
          features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'State Management'],
          status: 'available'
        },
        {
          id: '3',
          title: 'Backend Development Mastery',
          description: 'Build robust backend systems with modern technologies',
          track: 'backend-development',
          program: 'professional',
          duration: '14 weeks',
          level: 'Advanced',
          price: 180000,
          enrolled: 156,
          rating: 4.7,
          features: ['Node.js & Express', 'Database Design', 'API Development', 'Security'],
          status: 'available'
        },
        {
          id: '4',
          title: 'Quality Assurance & Testing',
          description: 'Ensure software quality through comprehensive testing strategies',
          track: 'quality-assurance',
          program: 'launchpad',
          duration: '10 weeks',
          level: 'Beginner',
          price: 75000,
          enrolled: 98,
          rating: 4.6,
          features: ['Manual Testing', 'Automated Testing', 'Test Planning', 'Bug Tracking'],
          status: 'available'
        },
        {
          id: '5',
          title: 'DevOps & Cloud Engineering',
          description: 'Master deployment, scaling, and infrastructure management',
          track: 'devops',
          program: 'professional',
          duration: '16 weeks',
          level: 'Advanced',
          price: 200000,
          enrolled: 87,
          rating: 4.8,
          features: ['AWS/Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring'],
          status: 'available'
        }
      ];
      setCourses(mockCourses);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const tracks = [
    { value: 'all', label: 'All Tracks' },
    { value: 'project-management', label: 'Project Management' },
    { value: 'frontend-development', label: 'Frontend Development' },
    { value: 'backend-development', label: 'Backend Development' },
    { value: 'quality-assurance', label: 'Quality Assurance' },
    { value: 'devops', label: 'DevOps' }
  ];

  const filteredCourses = selectedTrack === 'all'
    ? courses
    : courses.filter(course => course.track === selectedTrack);

  const getTrackColor = (track: string) => {
    const colors = {
      'project-management': 'bg-blue-100 text-blue-800',
      'frontend-development': 'bg-green-100 text-green-800',
      'backend-development': 'bg-purple-100 text-purple-800',
      'quality-assurance': 'bg-orange-100 text-orange-800',
      'devops': 'bg-red-100 text-red-800'
    };
    return colors[track as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleEnroll = (courseId: string) => {
    // In real app, this would navigate to application form or enrollment process
    toast.success('Redirecting to application form...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
          <p className="text-gray-600 mt-2">Explore our comprehensive learning programs</p>
        </div>
      </div>

      {/* Track Filter */}
      <div className="flex flex-wrap gap-2">
        {tracks.map((track) => (
          <Button
            key={track.value}
            variant={selectedTrack === track.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTrack(track.value)}
            className="capitalize"
          >
            {track.label}
          </Button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getTrackColor(course.track)}>
                  {tracks.find(t => t.value === course.track)?.label || course.track}
                </Badge>
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <Badge variant="outline">
                  {course.program}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{course.enrolled} enrolled</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What you'll learn:</h4>
                <ul className="space-y-1">
                  {course.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ₦{course.price.toLocaleString()}
                  </span>
                  {course.program === 'professional' && (
                    <span className="text-sm text-gray-500 ml-2">Professional</span>
                  )}
                </div>
                <Button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {course.status === 'enrolled' ? 'Continue Learning' : 'Enroll Now'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try selecting a different track or check back later for new courses.</p>
        </div>
      )}

      {/* Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-600 mb-4">
            Join thousands of learners who have transformed their careers through our programs.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Browse All Programs
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Courses;
