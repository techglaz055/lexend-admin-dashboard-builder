
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Filter } from 'lucide-react';

const Courses = () => {
  const [courses] = useState([
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
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>;
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
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtered By</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

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
              <SelectItem value="inactive">Inactive</SelectItem>
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
      </div>
    </AdminLayout>
  );
};

export default Courses;
