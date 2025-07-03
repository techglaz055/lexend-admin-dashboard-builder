
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import AddCourseModal from '../components/AddCourseModal';

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Responsive Design',
      category: 'Web Development',
      instructor: 'Alex Ashley',
      lessons: 32,
      status: 'active',
      price: '$30',
      deadline: '20.4.2021',
      avatar: 'RD',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Android Development',
      category: 'Mobile Application',
      instructor: 'Michael Wood',
      lessons: 11,
      status: 'pending',
      price: '$65',
      deadline: '10.5.2021',
      avatar: 'AD',
      color: 'bg-cyan-500'
    },
    {
      id: 3,
      name: 'UI/UX Design',
      category: 'Graphics Design',
      instructor: 'Abu Bin Istiak',
      lessons: 12,
      status: 'active',
      price: '$20',
      deadline: '15.4.2021',
      avatar: 'UD',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      name: 'WordPress Theme Development',
      category: 'Web Development',
      instructor: 'Emily Smith',
      lessons: 24,
      status: 'active',
      price: '$50',
      deadline: '20.4.2021',
      avatar: 'WT',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'React Native App Development',
      category: 'Mobile Application',
      instructor: 'John Doe',
      lessons: 18,
      status: 'pending',
      price: '$45',
      deadline: '25.5.2021',
      avatar: 'RN',
      color: 'bg-blue-500'
    }
  ]);

  const [categories] = useState([
    { id: 1, name: 'Web Development', color: 'bg-orange-500', courses: 85 },
    { id: 2, name: 'Mobile Application', color: 'bg-blue-500', courses: 70 },
    { id: 3, name: 'Graphics Design', color: 'bg-green-500', courses: 60 },
    { id: 4, name: 'Database', color: 'bg-indigo-500', courses: 90 },
    { id: 5, name: 'Marketing', color: 'bg-cyan-500', courses: 40 },
    { id: 6, name: 'Machine Learning', color: 'bg-pink-500', courses: 65 },
    { id: 7, name: 'Data Science', color: 'bg-purple-500', courses: 55 },
    { id: 8, name: 'Cloud Computing', color: 'bg-red-500', courses: 78 },
    { id: 9, name: 'DevOps', color: 'bg-yellow-500', courses: 42 }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || course.name === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleSelectCourse = (courseId, checked) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCourses(filteredCourses.map(course => course.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleAddCourse = (courseData) => {
    setCourses(prev => [...prev, courseData]);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600 mt-1">You have total {courses.length} Courses.</p>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtered By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCourseFilter('all')}>
                  All Courses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCourseFilter('Responsive Design')}>
                  Responsive Design
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCourseFilter('Android Development')}>
                  Android Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCourseFilter('UI/UX Design')}>
                  UI/UX Design
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCourseFilter('WordPress Theme Development')}>
                  WordPress Theme Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCourseFilter('React Native App Development')}>
                  React Native App Development
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddCourseOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="courses">Course List</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-lg font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.courses} courses available</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Courses Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4">
                          <Checkbox
                            checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Course Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Instructor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Lesson</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <Checkbox
                              checked={selectedCourses.includes(course.id)}
                              onCheckedChange={(checked) => handleSelectCourse(course.id, checked)}
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className={`${course.color} text-white font-semibold`}>
                                  {course.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{course.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{course.category}</td>
                          <td className="py-4 px-4 text-gray-600">{course.instructor}</td>
                          <td className="py-4 px-4 text-gray-600">Total lesson: {course.lessons}</td>
                          <td className="py-4 px-4">
                            {getStatusBadge(course.status)}
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-900">{course.price}</td>
                          <td className="py-4 px-4 text-gray-600">{course.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Prev</Button>
                    <Button variant="outline" size="sm" className="bg-purple-600 text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <span className="text-gray-500">...</span>
                    <Button variant="outline" size="sm">6</Button>
                    <Button variant="outline" size="sm">7</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">PAGE</span>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">OF 102</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddCourseModal
          isOpen={isAddCourseOpen}
          onClose={() => setIsAddCourseOpen(false)}
          onAdd={handleAddCourse}
        />
      </div>
    </AdminLayout>
  );
};

export default Courses;
