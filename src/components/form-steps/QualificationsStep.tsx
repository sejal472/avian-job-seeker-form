
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
                <SelectItem value="10th-pass">10th Pass</SelectItem>
                <SelectItem value="12th-pass">12th Pass</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="aviation-school">Aviation Training School</SelectItem>
                <SelectItem value="technical-institute">Technical Institute</SelectItem>
                <SelectItem value="iti">ITI</SelectItem>
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
                <SelectItem value="dgca-cpl">DGCA Commercial Pilot License (CPL)</SelectItem>
                <SelectItem value="dgca-atpl">DGCA Airline Transport Pilot License (ATPL)</SelectItem>
                <SelectItem value="dgca-ppl">DGCA Private Pilot License (PPL)</SelectItem>
                <SelectItem value="dgca-ir">DGCA Instrument Rating (IR)</SelectItem>
                <SelectItem value="dgca-me">DGCA Multi-Engine Rating</SelectItem>
                <SelectItem value="dgca-type-rating">DGCA Type Rating</SelectItem>
                <SelectItem value="dgca-ame">DGCA Aircraft Maintenance Engineer (AME)</SelectItem>
                <SelectItem value="dgca-cabin-crew">DGCA Cabin Crew Certificate</SelectItem>
                <SelectItem value="dgca-ground-instructor">DGCA Ground Instructor</SelectItem>
                <SelectItem value="dgca-flight-dispatcher">DGCA Flight Dispatcher License</SelectItem>
                <SelectItem value="aai-atc">AAI Air Traffic Control Certificate</SelectItem>
                <SelectItem value="iata-training">IATA Training Certificate</SelectItem>
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
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="bengali">Bengali</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
                <SelectItem value="marathi">Marathi</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="gujarati">Gujarati</SelectItem>
                <SelectItem value="urdu">Urdu</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
                <SelectItem value="odia">Odia</SelectItem>
                <SelectItem value="punjabi">Punjabi</SelectItem>
                <SelectItem value="malayalam">Malayalam</SelectItem>
                <SelectItem value="assamese">Assamese</SelectItem>
                <SelectItem value="maithili">Maithili</SelectItem>
                <SelectItem value="santali">Santali</SelectItem>
                <SelectItem value="kashmiri">Kashmiri</SelectItem>
                <SelectItem value="nepali">Nepali</SelectItem>
                <SelectItem value="konkani">Konkani</SelectItem>
                <SelectItem value="sindhi">Sindhi</SelectItem>
                <SelectItem value="dogri">Dogri</SelectItem>
                <SelectItem value="manipuri">Manipuri</SelectItem>
                <SelectItem value="bodo">Bodo</SelectItem>
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
              I have or can obtain a valid DGCA medical certificate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backgroundCheck"
              checked={data.backgroundCheck}
              onCheckedChange={(checked) => updateData({ backgroundCheck: checked })}
            />
            <Label htmlFor="backgroundCheck">
              I can pass a background security check (Police Verification)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationsStep;
