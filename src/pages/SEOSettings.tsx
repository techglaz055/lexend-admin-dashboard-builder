
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const SEOSettings = () => {
  const [seoData, setSeoData] = useState({
    siteTitle: 'Lexend Learning Platform',
    metaDescription: 'Comprehensive online learning platform for web development, design, and programming courses.',
    metaKeywords: 'online learning, web development, programming, design courses, e-learning',
    ogTitle: 'Lexend - Online Learning Platform',
    ogDescription: 'Join thousands of students learning web development, design, and programming skills.',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterSite: '@lexend',
    twitterCreator: '@lexend',
    canonicalUrl: 'https://lexend.com',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapUrl: 'https://lexend.com/sitemap.xml',
    googleAnalytics: '',
    googleSearchConsole: '',
    enableBreadcrumbs: true,
    enableStructuredData: true,
    enableOpenGraph: true,
    enableTwitterCards: true
  });

  const handleInputChange = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend/database
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO configuration has been updated successfully.",
    });
  };

  const handleReset = () => {
    setSeoData({
      siteTitle: 'Lexend Learning Platform',
      metaDescription: 'Comprehensive online learning platform for web development, design, and programming courses.',
      metaKeywords: 'online learning, web development, programming, design courses, e-learning',
      ogTitle: 'Lexend - Online Learning Platform',
      ogDescription: 'Join thousands of students learning web development, design, and programming skills.',
      ogImage: '',
      twitterCard: 'summary_large_image',
      twitterSite: '@lexend',
      twitterCreator: '@lexend',
      canonicalUrl: 'https://lexend.com',
      robotsTxt: 'User-agent: *\nAllow: /',
      sitemapUrl: 'https://lexend.com/sitemap.xml',
      googleAnalytics: '',
      googleSearchConsole: '',
      enableBreadcrumbs: true,
      enableStructuredData: true,
      enableOpenGraph: true,
      enableTwitterCards: true
    });
    toast({
      title: "Settings Reset",
      description: "SEO settings have been reset to default values.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
            <p className="text-gray-600 mt-1">Manage your website's search engine optimization settings.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General SEO</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="technical">Technical SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input
                      id="siteTitle"
                      value={seoData.siteTitle}
                      onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                      placeholder="Your site title"
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended length: 50-60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={seoData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      placeholder="Brief description of your website"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      value={seoData.metaKeywords}
                      onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-sm text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>

                  <div>
                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                    <Input
                      id="canonicalUrl"
                      value={seoData.canonicalUrl}
                      onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                      placeholder="https://yoursite.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">Your site's primary domain</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Open Graph Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableOpenGraph">Enable Open Graph Tags</Label>
                    <Switch
                      id="enableOpenGraph"
                      checked={seoData.enableOpenGraph}
                      onCheckedChange={(checked) => handleInputChange('enableOpenGraph', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogTitle">Open Graph Title</Label>
                    <Input
                      id="ogTitle"
                      value={seoData.ogTitle}
                      onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                      placeholder="Title for social media sharing"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogDescription">Open Graph Description</Label>
                    <Textarea
                      id="ogDescription"
                      value={seoData.ogDescription}
                      onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                      placeholder="Description for social media sharing"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input
                      id="ogImage"
                      value={seoData.ogImage}
                      onChange={(e) => handleInputChange('ogImage', e.target.value)}
                      placeholder="https://yoursite.com/og-image.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">Recommended size: 1200x630 pixels</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Twitter Card Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableTwitterCards">Enable Twitter Cards</Label>
                    <Switch
                      id="enableTwitterCards"
                      checked={seoData.enableTwitterCards}
                      onCheckedChange={(checked) => handleInputChange('enableTwitterCards', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitterSite">Twitter Site Handle</Label>
                    <Input
                      id="twitterSite"
                      value={seoData.twitterSite}
                      onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                      placeholder="@yoursitehandle"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitterCreator">Twitter Creator Handle</Label>
                    <Input
                      id="twitterCreator"
                      value={seoData.twitterCreator}
                      onChange={(e) => handleInputChange('twitterCreator', e.target.value)}
                      placeholder="@creatorhandle"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical SEO Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableBreadcrumbs">Enable Breadcrumbs</Label>
                      <p className="text-sm text-gray-500">Show navigation breadcrumbs</p>
                    </div>
                    <Switch
                      id="enableBreadcrumbs"
                      checked={seoData.enableBreadcrumbs}
                      onCheckedChange={(checked) => handleInputChange('enableBreadcrumbs', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableStructuredData">Enable Structured Data</Label>
                      <p className="text-sm text-gray-500">Add JSON-LD structured data</p>
                    </div>
                    <Switch
                      id="enableStructuredData"
                      checked={seoData.enableStructuredData}
                      onCheckedChange={(checked) => handleInputChange('enableStructuredData', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                    <Textarea
                      id="robotsTxt"
                      value={seoData.robotsTxt}
                      onChange={(e) => handleInputChange('robotsTxt', e.target.value)}
                      placeholder="User-agent: *&#10;Allow: /"
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sitemapUrl">XML Sitemap URL</Label>
                    <Input
                      id="sitemapUrl"
                      value={seoData.sitemapUrl}
                      onChange={(e) => handleInputChange('sitemapUrl', e.target.value)}
                      placeholder="https://yoursite.com/sitemap.xml"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="googleAnalytics">Google Analytics Tracking ID</Label>
                    <Input
                      id="googleAnalytics"
                      value={seoData.googleAnalytics}
                      onChange={(e) => handleInputChange('googleAnalytics', e.target.value)}
                      placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                    />
                    <p className="text-sm text-gray-500 mt-1">Your Google Analytics measurement ID</p>
                  </div>

                  <div>
                    <Label htmlFor="googleSearchConsole">Google Search Console Verification</Label>
                    <Input
                      id="googleSearchConsole"
                      value={seoData.googleSearchConsole}
                      onChange={(e) => handleInputChange('googleSearchConsole', e.target.value)}
                      placeholder="Verification meta tag content"
                    />
                    <p className="text-sm text-gray-500 mt-1">HTML tag verification code from Search Console</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-gray-600">SEO Score</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Indexed Pages</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">3</div>
                      <div className="text-sm text-gray-600">Issues Found</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SEOSettings;
