
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface QualificationsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const QualificationsStep: React.FC<QualificationsStepProps> = ({ data, updateData }) => {
  const addCertification = (cert: string) => {
    if (cert && !data.certifications.includes(cert)) {
      updateData({ certifications: [...data.certifications, cert] });
    }
  };

  const removeCertification = (cert: string) => {
    updateData({ certifications: data.certifications.filter((c: string) => c !== cert) });
  };

  const addLanguage = (lang: string) => {
    if (lang && !data.languages.includes(lang)) {
      updateData({ languages: [...data.languages, lang] });
    }
  };

  const removeLanguage = (lang: string) => {
    updateData({ languages: data.languages.filter((l: string) => l !== lang) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Qualifications & Certifications</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="education">Education Level *</Label>
            <Select value={data.education} onValueChange={(value) => updateData({ education: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School Diploma</SelectItem>
                <SelectItem value="associate">Associate Degree</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="aviation-school">Aviation Training School</SelectItem>
                <SelectItem value="trade-school">Trade/Technical School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">Aviation Certifications</Label>
            <Select onValueChange={addCertification}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add certification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private-pilot">Private Pilot License (PPL)</SelectItem>
                <SelectItem value="commercial-pilot">Commercial Pilot License (CPL)</SelectItem>
                <SelectItem value="airline-transport">Airline Transport Pilot License (ATPL)</SelectItem>
                <SelectItem value="instrument-rating">Instrument Rating (IR)</SelectItem>
                <SelectItem value="multi-engine">Multi-Engine Rating</SelectItem>
                <SelectItem value="type-rating">Type Rating</SelectItem>
                <SelectItem value="a&p-mechanic">A&P Mechanic License</SelectItem>
                <SelectItem value="ground-instructor">Ground Instructor Certificate</SelectItem>
                <SelectItem value="dispatcher">Aircraft Dispatcher License</SelectItem>
                <SelectItem value="air-traffic">Air Traffic Control Certificate</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.certifications.map((cert: string) => (
                <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                  {cert}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeCertification(cert)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Languages</Label>
            <Select onValueChange={addLanguage}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="mandarin">Mandarin Chinese</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="russian">Russian</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.languages.map((lang: string) => (
                <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                  {lang}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeLanguage(lang)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Required Clearances</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="medicalCertificate"
              checked={data.medicalCertificate}
              onCheckedChange={(checked) => updateData({ medicalCertificate: checked })}
            />
            <Label htmlFor="medicalCertificate">
              I have or can obtain a valid medical certificate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backgroundCheck"
              checked={data.backgroundCheck}
              onCheckedChange={(checked) => updateData({ backgroundCheck: checked })}
            />
            <Label htmlFor="backgroundCheck">
              I can pass a background security check
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationsStep;
