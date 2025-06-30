
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (courseData: any) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    category: '',
    instructor: '',
    price: '',
    lessons: '',
    duration: '',
    level: 'beginner'
  });

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!courseData.name || !courseData.category || !courseData.instructor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      ...courseData,
      id: Date.now(),
      status: 'active',
      avatar: courseData.name.substring(0, 2).toUpperCase(),
      color: 'bg-purple-500'
    });

    setCourseData({
      name: '',
      description: '',
      category: '',
      instructor: '',
      price: '',
      lessons: '',
      duration: '',
      level: 'beginner'
    });

    toast({
      title: "Course Added",
      description: "New course has been added successfully.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="e.g. Web Development"
              value={courseData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write Course Description"
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="graphics-design">Graphics Design</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              placeholder="Instructor Name"
              value={courseData.instructor}
              onChange={(e) => handleInputChange('instructor', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="$50"
                value={courseData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lessons">Total Lessons</Label>
              <Input
                id="lessons"
                placeholder="24"
                value={courseData.lessons}
                onChange={(e) => handleInputChange('lessons', e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              Save Information
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
