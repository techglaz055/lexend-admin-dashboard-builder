
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Graphics Design',
      description: 'Website Design & Develop the website with web applications',
      subcategories: ['Photoshop', 'Adobe Illustrator', 'Logo Design', 'Drawing', 'Figma'],
      subcategoryCount: 4,
      avatar: 'GD',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Web Development',
      description: 'Website Design & Develop the website with web applications',
      subcategories: ['Responsive Design', 'WordPress Customization', 'Theme Development', 'Bootstrap', 'HTML & CSS Grid'],
      subcategoryCount: 5,
      avatar: 'WD',
      color: 'bg-orange-500'
    },
    {
      id: 3,
      name: 'Mobile Application',
      description: 'Website Design & Develop the website with web applications',
      subcategories: ['Mobile App Design', 'User Interface', 'Design Thinking', 'Prototyping'],
      subcategoryCount: 4,
      avatar: 'MA',
      color: 'bg-cyan-500'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subcategories: ''
  });

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      subcategories: formData.subcategories.split(',').map(s => s.trim()),
      subcategoryCount: formData.subcategories.split(',').length,
      avatar: formData.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      color: ['bg-purple-500', 'bg-orange-500', 'bg-cyan-500', 'bg-green-500', 'bg-blue-500'][Math.floor(Math.random() * 5)]
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '', subcategories: '' });
    setIsAddDialogOpen(false);
    toast({
      title: "Category Added",
      description: `${formData.name} has been added successfully.`,
    });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      subcategories: category.subcategories.join(', ')
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id 
        ? {
            ...cat,
            name: formData.name,
            description: formData.description,
            subcategories: formData.subcategories.split(',').map(s => s.trim()),
            subcategoryCount: formData.subcategories.split(',').length,
            avatar: formData.name.split(' ').map(word => word[0]).join('').toUpperCase(),
          }
        : cat
    );

    setCategories(updatedCategories);
    setFormData({ name: '', description: '', subcategories: '' });
    setEditingCategory(null);
    setIsAddDialogOpen(false);
    toast({
      title: "Category Updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Category Deleted",
      description: `${category.name} has been deleted successfully.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Category</h1>
            <p className="text-gray-600 mt-1">You have total {categories.length} Categories</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    placeholder="e.g. Web Development"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write Category Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    placeholder="e.g. Web Development, React, Node.js"
                    value={formData.subcategories}
                    onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple subcategories with commas</p>
                </div>
                <Button 
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!formData.name || !formData.description}
                >
                  {editingCategory ? 'Update Category' : 'Save Information'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="relative hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold">{category.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.subcategoryCount} SubCategories</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 4).map((subcategory, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subcategory}
                    </Badge>
                  ))}
                  {category.subcategories.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{category.subcategories.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
