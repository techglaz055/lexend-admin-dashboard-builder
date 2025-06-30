
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (studentData: any) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    courseToEnroll: '',
    paymentMethods: [] as string[],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('address.')) {
      const addressField = field.split('.')[1];
      setStudentData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setStudentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setStudentData(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev.paymentMethods, method]
        : prev.paymentMethods.filter(m => m !== method)
    }));
  };

  const handleSubmit = () => {
    if (!studentData.firstName || !studentData.lastName || !studentData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      id: Date.now(),
      name: `${studentData.firstName} ${studentData.lastName}`,
      email: studentData.email,
      phone: studentData.phone,
      course: studentData.courseToEnroll,
      country: studentData.address.country,
      status: 'paid',
      paymentStatus: 'Active',
      avatar: `${studentData.firstName.charAt(0)}${studentData.lastName.charAt(0)}`,
      type: 'registered'
    });

    setStudentData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      courseToEnroll: '',
      paymentMethods: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    });

    toast({
      title: "Student Added",
      description: "New student has been added successfully.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Students</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="information" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="information">Student Information</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          
          <TabsContent value="information" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={studentData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={studentData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="courseToEnroll">Course to Enroll</Label>
                <Select value={studentData.courseToEnroll} onValueChange={(value) => handleInputChange('courseToEnroll', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="UI/UX Design with Adobe XD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ui-ux-design">UI/UX Design with Adobe XD</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-app">Mobile Application</SelectItem>
                    <SelectItem value="graphics-design">Graphics Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={studentData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+880"
                  value={studentData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  placeholder="Date of Birth"
                  value={studentData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Payment Methods</Label>
              <div className="flex space-x-6 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="card"
                    checked={studentData.paymentMethods.includes('card')}
                    onCheckedChange={(checked) => handlePaymentMethodChange('card', checked as boolean)}
                  />
                  <label htmlFor="card" className="text-sm">Card</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bitcoin"
                    checked={studentData.paymentMethods.includes('bitcoin')}
                    onCheckedChange={(checked) => handlePaymentMethodChange('bitcoin', checked as boolean)}
                  />
                  <label htmlFor="bitcoin" className="text-sm">Bitcoin</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cash"
                    checked={studentData.paymentMethods.includes('cash')}
                    onCheckedChange={(checked) => handlePaymentMethodChange('cash', checked as boolean)}
                  />
                  <label htmlFor="cash" className="text-sm">Cash</label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="address" className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="Street Address"
                value={studentData.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={studentData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  value={studentData.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="Zip Code"
                  value={studentData.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Country"
                  value={studentData.address.country}
                  onChange={(e) => handleInputChange('address.country', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-3 pt-4">
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
            Add Student
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
