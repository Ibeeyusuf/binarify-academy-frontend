import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/dashboard/courses.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { BookOpen, Clock, Users, Star, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
const Courses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState('all');
    useEffect(() => {
        fetchCourses();
    }, []);
    const fetchCourses = async () => {
        try {
            setLoading(true);
            // Mock data - in real app, this would come from API
            const mockCourses = [
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
        }
        catch (error) {
            toast.error('Failed to load courses');
        }
        finally {
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
    const getTrackColor = (track) => {
        const colors = {
            'project-management': 'bg-blue-100 text-blue-800',
            'frontend-development': 'bg-green-100 text-green-800',
            'backend-development': 'bg-purple-100 text-purple-800',
            'quality-assurance': 'bg-orange-100 text-orange-800',
            'devops': 'bg-red-100 text-red-800'
        };
        return colors[track] || 'bg-gray-100 text-gray-800';
    };
    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'bg-green-100 text-green-800',
            'Intermediate': 'bg-yellow-100 text-yellow-800',
            'Advanced': 'bg-red-100 text-red-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };
    const handleEnroll = (courseId) => {
        // In real app, this would navigate to application form or enrollment process
        toast.success('Redirecting to application form...');
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading courses..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex justify-between items-start", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Available Courses" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Explore our comprehensive learning programs" })] }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: tracks.map((track) => (_jsx(Button, { variant: selectedTrack === track.value ? "default" : "outline", size: "sm", onClick: () => setSelectedTrack(track.value), className: "capitalize", children: track.label }, track.value))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredCourses.map((course) => (_jsx(Card, { className: "p-6 hover:shadow-lg transition-shadow", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 line-clamp-2", children: course.title }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { className: "text-sm font-medium", children: course.rating })] })] }), _jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: course.description })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { className: getTrackColor(course.track), children: tracks.find(t => t.value === course.track)?.label || course.track }), _jsx(Badge, { className: getLevelColor(course.level), children: course.level }), _jsx(Badge, { variant: "outline", children: course.program })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { children: course.duration })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [course.enrolled, " enrolled"] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "What you'll learn:" }), _jsx("ul", { className: "space-y-1", children: course.features.slice(0, 3).map((feature, index) => (_jsxs("li", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [_jsx(CheckCircle, { className: "h-3 w-3 text-green-500 flex-shrink-0" }), _jsx("span", { children: feature })] }, index))) })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t", children: [_jsxs("div", { children: [_jsxs("span", { className: "text-2xl font-bold text-gray-900", children: ["\u20A6", course.price.toLocaleString()] }), course.program === 'professional' && (_jsx("span", { className: "text-sm text-gray-500 ml-2", children: "Professional" }))] }), _jsx(Button, { onClick: () => handleEnroll(course.id), className: "bg-blue-600 hover:bg-blue-700", children: course.status === 'enrolled' ? 'Continue Learning' : 'Enroll Now' })] })] }) }, course.id))) }), filteredCourses.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(BookOpen, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No courses found" }), _jsx("p", { className: "text-gray-600", children: "Try selecting a different track or check back later for new courses." })] })), _jsx(Card, { className: "p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200", children: _jsxs("div", { className: "text-center", children: [_jsx(Award, { className: "h-12 w-12 text-blue-600 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Ready to Start Your Learning Journey?" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Join thousands of learners who have transformed their careers through our programs." }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2" }), "Browse All Programs"] })] }) })] }));
};
export default Courses;
