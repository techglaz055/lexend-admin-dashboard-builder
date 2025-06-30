
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const enrollmentData = [
    { month: 'Jan', students: 400 },
    { month: 'Feb', students: 300 },
    { month: 'Mar', students: 600 },
    { month: 'Apr', students: 800 },
    { month: 'May', students: 500 },
    { month: 'Jun', students: 900 },
    { month: 'Jul', students: 700 },
    { month: 'Aug', students: 1200 },
    { month: 'Sep', students: 1100 },
    { month: 'Oct', students: 1400 },
    { month: 'Nov', students: 1300 },
    { month: 'Dec', students: 1500 },
  ];

  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 7000 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 8000 },
  ];

  const topCategories = [
    { name: 'Web Development', color: 'bg-orange-500', progress: 85 },
    { name: 'Mobile Application', color: 'bg-blue-500', progress: 70 },
    { name: 'Graphics Design', color: 'bg-green-500', progress: 60 },
    { name: 'Database', color: 'bg-indigo-500', progress: 90 },
    { name: 'Marketing', color: 'bg-cyan-500', progress: 40 },
    { name: 'Machine Learning', color: 'bg-pink-500', progress: 65 },
    { name: 'Data Science', color: 'bg-purple-500', progress: 75 },
  ];

  const topCourses = [
    { name: 'UI/UX Design with Adobe XD', price: '$2,125.00', sold: '25 Sold', avatar: 'UI/X' },
    { name: 'Android App Development', price: '$1,710.00', sold: '10 Sold', avatar: 'AD' },
    { name: 'WordPress Development', price: '$1,050.00', sold: '15 Sold', avatar: 'WD' },
    { name: 'Machine Learning', price: '$990.00', sold: '10 Sold', avatar: 'ML' },
    { name: 'Responsive Design', price: '$960.00', sold: '12 Sold', avatar: 'RD' },
  ];

  const supportRequests = [
    { name: 'Vincent Lopez', message: 'Thanks for contact us with your issues...', time: '6 min ago', avatar: 'VL' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to Learning Management Dashboard.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Last 30 Days</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Reports
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students Enrolement</p>
                  <p className="text-xs text-gray-500 mt-1">In last 30 days enrolement of students</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline space-x-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5490</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                  <div className="flex items-center text-red-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">16.93%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-baseline space-x-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-700">1480</p>
                      <p className="text-sm text-gray-600">This Week</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">4.26%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={60}>
                  <BarChart data={enrollmentData.slice(-6)}>
                    <Bar dataKey="students" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">Total Sales</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-2xl font-bold text-gray-900">$9,495.20</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      4.63%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">vs. last month</p>
                </div>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={salesData}>
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">This week so far</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-2xl font-bold text-gray-900">$2,995.81</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      7.13%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">vs. last week</p>
                </div>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={salesData.slice(-4)}>
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Categories</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">In last 15 days buy and sells overview.</p>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Courses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Courses</CardTitle>
              <Button variant="ghost" size="sm">Weekly</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{course.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{course.name}</p>
                        <p className="text-sm text-gray-500">{course.sold}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{course.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Support Requests</CardTitle>
            <Button variant="ghost" size="sm">All Requests</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportRequests.map((request, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">{request.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{request.name}</p>
                    <p className="text-sm text-gray-600">{request.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                  </div>
                  <Button variant="outline" size="sm">Reply</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
