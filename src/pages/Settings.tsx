
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Web store settings
    storeName: 'My Store',
    siteEmail: 'info@softnio.com',
    siteCopyright: '© 2021, DashLite. All Rights Reserved.',
    allowRegistration: 'enable',
    mainWebsite: 'https://www.softnio.com',
    websiteDescription: '',
    maintenanceMode: false,
    
    // Theme settings
    selectedTheme: 'current',
    
    // Email settings
    emailSettings: {
      courseEnrollment: false,
      addNewLesson: false,
      updateNewsletter: false,
      courseSale: false,
      supportStudent: false,
      feedbackCourse: false,
      emailFromName: ''
    }
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('emailSettings.')) {
      const emailField = field.split('.')[1];
      setSettings(prev => ({
        ...prev,
        emailSettings: {
          ...prev.emailSettings,
          [emailField]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleUpdate = () => {
    toast({
      title: "Settings Updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>

        <Tabs defaultValue="webstore" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="webstore" className="flex items-center space-x-2">
              <span>🌐</span>
              <span>Web store settings</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center space-x-2">
              <span>🎨</span>
              <span>Theme setting</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <span>📧</span>
              <span>Email settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="webstore">
            <Card>
              <CardHeader>
                <CardTitle>Web store setting</CardTitle>
                <p className="text-sm text-gray-600">Here is your basic store setting of your website.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <p className="text-sm text-gray-500 mb-2">Specify the name of your website.</p>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    placeholder="My Store"
                  />
                </div>

                <div>
                  <Label htmlFor="siteEmail">Site Email</Label>
                  <p className="text-sm text-gray-500 mb-2">Specify the email address of your website.</p>
                  <Input
                    id="siteEmail"
                    type="email"
                    value={settings.siteEmail}
                    onChange={(e) => handleInputChange('siteEmail', e.target.value)}
                    placeholder="info@softnio.com"
                  />
                </div>

                <div>
                  <Label htmlFor="siteCopyright">Site Copyright</Label>
                  <p className="text-sm text-gray-500 mb-2">Copyright information of your website.</p>
                  <Input
                    id="siteCopyright"
                    value={settings.siteCopyright}
                    onChange={(e) => handleInputChange('siteCopyright', e.target.value)}
                    placeholder="© 2021, DashLite. All Rights Reserved."
                  />
                </div>

                <div>
                  <Label>Allow Registration</Label>
                  <p className="text-sm text-gray-500 mb-3">Enable or disable registration from site.</p>
                  <RadioGroup 
                    value={settings.allowRegistration} 
                    onValueChange={(value) => handleInputChange('allowRegistration', value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enable" id="enable" />
                      <Label htmlFor="enable">Enable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disable" id="disable" />
                      <Label htmlFor="disable">Disable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onrequest" id="onrequest" />
                      <Label htmlFor="onrequest">On Request</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="mainWebsite">Main Website</Label>
                  <p className="text-sm text-gray-500 mb-2">Specify the URL if your main website is external.</p>
                  <Input
                    id="mainWebsite"
                    value={settings.mainWebsite}
                    onChange={(e) => handleInputChange('mainWebsite', e.target.value)}
                    placeholder="https://www.softnio.com"
                  />
                </div>

                <div>
                  <Label htmlFor="websiteDescription">Website description</Label>
                  <p className="text-sm text-gray-500 mb-2">Describe your website.</p>
                  <Textarea
                    id="websiteDescription"
                    value={settings.websiteDescription}
                    onChange={(e) => handleInputChange('websiteDescription', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Enable to make website make offline.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                      />
                      <span className="text-sm">{settings.maintenanceMode ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700">
                  Update
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Installed</CardTitle>
                <p className="text-sm text-gray-600">Here are last week's updates!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Theme 1 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 p-4">
                      <div className="text-white text-xs">Theme Preview</div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sapiente!</p>
                      <Button variant="outline" className="w-full">
                        Active Theme
                      </Button>
                    </div>
                  </div>

                  {/* Theme 2 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                      <div className="text-white text-xs">Theme Preview</div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sapiente!</p>
                      <Button className="w-full bg-purple-200 text-purple-700 hover:bg-purple-300">
                        Current theme
                      </Button>
                    </div>
                  </div>

                  {/* Theme 3 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 p-4">
                      <div className="text-white text-xs">Theme Preview</div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, sapiente!</p>
                      <Button variant="outline" className="w-full">
                        Active theme
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email-Settings</CardTitle>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">E-mail to students</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.courseEnrollment}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.courseEnrollment', checked)}
                      />
                      <Label>Course enrollment</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.addNewLesson}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.addNewLesson', checked)}
                      />
                      <Label>Add new lesson</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.updateNewsletter}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.updateNewsletter', checked)}
                      />
                      <Label>Update newsletter</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">E-mail to Teachers</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.courseSale}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.courseSale', checked)}
                      />
                      <Label>Course sale</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.supportStudent}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.supportStudent', checked)}
                      />
                      <Label>Support student</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={settings.emailSettings.feedbackCourse}
                        onCheckedChange={(checked) => handleInputChange('emailSettings.feedbackCourse', checked)}
                      />
                      <Label>Feedback course</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="emailFromName">E-mail from a name</Label>
                  <Input
                    id="emailFromName"
                    value={settings.emailSettings.emailFromName}
                    onChange={(e) => handleInputChange('emailSettings.emailFromName', e.target.value)}
                    placeholder="E-mail from a name"
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700">
                  Update
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
