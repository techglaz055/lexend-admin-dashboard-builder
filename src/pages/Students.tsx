
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Plus, Mail, UserMinus, Ban } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Students = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentFilter, setStudentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [students] = useState([
    {
      id: 1,
      name: 'Abu Bin Ishtiyak',
      email: 'info@softnio.com',
      course: 'Front-end Development',
      phone: '+811 847-4958',
      country: 'United State',
      status: 'due',
      paymentStatus: 'Active',
      avatar: 'AB',
      type: 'registered'
    },
    {
      id: 2,
      name: 'Ashley Lawson',
      email: 'ashley@softnio.com',
      course: 'Responsive Design',
      phone: '+124 394-1787',
      country: 'United Kingdom',
      status: 'paid',
      paymentStatus: 'Inactive',
      avatar: 'AL',
      type: 'registered'
    },
    {
      id: 3,
      name: 'Joe Larson',
      email: 'larson@example.com',
      course: 'Mobile Application',
      phone: '+168 603-2320',
      country: 'India',
      status: 'paid',
      paymentStatus: 'Active',
      avatar: 'JL',
      type: 'registered'
    },
    {
      id: 4,
      name: 'Jane Montgomery',
      email: 'jane84@example.com',
      course: 'UI/UX Design with Adobe XD',
      phone: '+439 271-5360',
      country: 'Canada',
      status: 'cancelled',
      paymentStatus: 'Suspend',
      avatar: 'JM',
      type: 'registered'
    },
    {
      id: 5,
      name: 'Frances Burns',
      email: 'frances@example.com',
      course: 'Application Management',
      phone: '+639 130-3150',
      country: 'Australia',
      status: 'paid',
      paymentStatus: 'Active',
      avatar: 'FB',
      type: 'registered'
    },
    {
      id: 6,
      name: 'John Smith',
      email: 'john@example.com',
      course: 'General Inquiry',
      phone: '+1 555-0123',
      country: 'United States',
      status: 'inquiry',
      paymentStatus: 'N/A',
      avatar: 'JS',
      type: 'general'
    },
    {
      id: 7,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      course: 'Course Information Request',
      phone: '+44 20 7946 0958',
      country: 'United Kingdom',
      status: 'inquiry',
      paymentStatus: 'N/A',
      avatar: 'SW',
      type: 'general'
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (studentFilter === 'registered') {
      return matchesSearch && student.type === 'registered' && student.status !== 'cancelled';
    } else if (studentFilter === 'general') {
      return matchesSearch && student.type === 'general';
    }
    return matchesSearch;
  });

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleBulkAction = (action) => {
    const selectedCount = selectedStudents.length;
    if (selectedCount === 0) {
      toast({
        title: "No Selection",
        description: "Please select students first.",
        variant: "destructive",
      });
      return;
    }

    switch (action) {
      case 'email':
        toast({
          title: "Email Sent",
          description: `Email sent to ${selectedCount} selected students.`,
        });
        break;
      case 'suspend':
        toast({
          title: "Students Suspended",
          description: `${selectedCount} students have been suspended.`,
        });
        break;
      case 'remove':
        toast({
          title: "Students Removed",
          description: `${selectedCount} students have been removed.`,
        });
        break;
    }
    setSelectedStudents([]);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>;
      case 'due':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Due</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>;
      case 'inquiry':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Inquiry</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Inactive</Badge>;
      case 'Suspend':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Suspend</Badge>;
      case 'N/A':
        return <Badge variant="secondary">N/A</Badge>;
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
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name"
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={studentFilter} onValueChange={setStudentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter students" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="registered">Registered Students</SelectItem>
                <SelectItem value="general">General Inquiries</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {selectedStudents.length} student(s) selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction('email')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email to All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction('suspend')}
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Suspend Selected
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBulkAction('remove')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Students Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4">
                      <Checkbox
                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Enrolled Courses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Country</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Payment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) => handleSelectStudent(student.id, checked)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{student.course}</p>
                          <button className="text-sm text-blue-600 hover:text-blue-800">View More</button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{student.phone}</td>
                      <td className="py-4 px-4 text-gray-600">{student.country}</td>
                      <td className="py-4 px-4">
                        {getStatusBadge(student.status)}
                      </td>
                      <td className="py-4 px-4">
                        {getPaymentStatusBadge(student.paymentStatus)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <UserMinus className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Students;
