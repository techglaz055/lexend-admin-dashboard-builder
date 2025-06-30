
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Edit } from 'lucide-react';

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  onEditStatus: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  student,
  onEditStatus 
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Students Information</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onEditStatus}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">BASICS</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium">{student.name}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Display Name</label>
                  <p className="text-gray-900 font-medium">{student.name.split(' ')[0]}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-900 font-medium">{student.email}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="text-gray-900 font-medium">{student.phone || 'Not add yet'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <p className="text-gray-900 font-medium">29 Feb, 1986</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Nationality</label>
                  <p className="text-gray-900 font-medium">Canadian</p>
                </div>
                
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Address</label>
                  <p className="text-gray-900 font-medium">2337 Kildeer Drive,</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Course Enrolled</label>
              <p className="text-gray-900 font-medium">{student.course}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Country</label>
              <p className="text-gray-900 font-medium">{student.country}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Payment Status</label>
              <div className="mt-1">
                <Badge className={student.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                  {student.status === 'paid' ? 'Paid' : 'Inquiry'}
                </Badge>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Account Status</label>
              <div className="mt-1">
                <Badge className={student.paymentStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                  {student.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;
