
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Plus, Mail, UserMinus, Ban, Eye, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddStudentModal from '../components/AddStudentModal';
import StudentDetailModal from '../components/StudentDetailModal';
import EditStatusModal from '../components/EditStatusModal';

const Students = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Abu Bin Ishtiyak',
      email: 'info@softnio.com',
      course: 'Front-end Development',
      phone: '+811 847-4958',
      country: 'United State',
      status: 'paid',
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
      id: 5,
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
      id: 6,
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

  const getFilteredStudents = (type: string) => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (type === 'registered') {
        return matchesSearch && student.type === 'registered';
      } else if (type === 'general') {
        return matchesSearch && student.type === 'general';
      }
      return matchesSearch;
    });
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked, type) => {
    const filteredStudents = getFilteredStudents(type);
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

  const handleAddStudent = (studentData) => {
    setStudents(prev => [...prev, studentData]);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const handleEditStatus = (student = null) => {
    if (student) {
      setSelectedStudent(student);
    }
    setIsDetailOpen(false);
    setIsEditStatusOpen(true);
  };

  const handleSaveStatus = (studentId, updates) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, ...updates }
        : student
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>;
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
      case 'N/A':
        return <Badge variant="secondary">N/A</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const StudentTable = ({ students, type }) => (
    <Card>
      <CardContent className="p-0">
        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedStudents.length} student(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction('email')}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email to All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('suspend')}>
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('remove')}
                      className="text-red-600"
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Remove Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4">
                  <Checkbox
                    checked={selectedStudents.length === students.length && students.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(checked, type)}
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Enrolled Courses</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Country</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">
                  <MoreHorizontal className="h-4 w-4" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
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
                        <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditStatus(student)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Status
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
  );

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
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddStudentOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <Tabs defaultValue="registered" className="space-y-6">
          <TabsList>
            <TabsTrigger value="registered">Registered Students</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="registered">
            <StudentTable students={getFilteredStudents('registered')} type="registered" />
          </TabsContent>

          <TabsContent value="general">
            <StudentTable students={getFilteredStudents('general')} type="general" />
          </TabsContent>
        </Tabs>

        <AddStudentModal
          isOpen={isAddStudentOpen}
          onClose={() => setIsAddStudentOpen(false)}
          onAdd={handleAddStudent}
        />

        <StudentDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          student={selectedStudent}
          onEditStatus={() => handleEditStatus()}
        />

        <EditStatusModal
          isOpen={isEditStatusOpen}
          onClose={() => setIsEditStatusOpen(false)}
          student={selectedStudent}
          onSave={handleSaveStatus}
        />
      </div>
    </AdminLayout>
  );
};

export default Students;
