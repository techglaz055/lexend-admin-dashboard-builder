
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (courseData: any) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    category: '',
    difficulties: 'beginner',
    lessons: '',
    thumbnail: null as File | null,
    description: '',
    status: 'active',
    price: '',
    deadline: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCourseData(prev => ({ ...prev, thumbnail: e.target.files[0] }));
    }
  };

  const handleSubmit = () => {
    if (!courseData.name || !courseData.category) {
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
      instructor: 'Admin', // Default instructor
      avatar: courseData.name.substring(0, 2).toUpperCase(),
      color: 'bg-purple-500'
    });

    setCourseData({
      name: '',
      category: '',
      difficulties: 'beginner',
      lessons: '',
      thumbnail: null,
      description: '',
      status: 'active',
      price: '',
      deadline: ''
    });

    toast({
      title: "Course Added",
      description: "New course has been added successfully.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="e.g. Responsive Design"
              value={courseData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Course category</Label>
              <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Web Development" />
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
              <Label htmlFor="difficulties">Course Difficulties</Label>
              <Select value={courseData.difficulties} onValueChange={(value) => handleInputChange('difficulties', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Beginners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginners</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lessons">Total Lesson</Label>
              <Input
                id="lessons"
                placeholder="40"
                value={courseData.lessons}
                onChange={(e) => handleInputChange('lessons', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Course thumbnail</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                <Input
                  placeholder="Choose file"
                  value={courseData.thumbnail?.name || ''}
                  readOnly
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('thumbnail')?.click()}
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              placeholder="Write Course Description"
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div>
            <Label>Status</Label>
            <RadioGroup
              value={courseData.status}
              onValueChange={(value) => handleInputChange('status', value)}
              className="flex items-center space-x-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" className="border-purple-500 text-purple-500" />
                <Label htmlFor="active" className="text-sm">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending" className="text-sm">Pending</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Course Price</Label>
              <Input
                id="price"
                placeholder="30"
                value={courseData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                placeholder="mm/dd/yyyy"
                value={courseData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
            Save Informations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
