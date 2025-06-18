
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExperienceStepProps {
  data: any;
  updateData: (data: any) => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="totalExperience">Total Aviation Experience</Label>
            <Select value={data.totalExperience} onValueChange={(value) => updateData({ totalExperience: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry-level">Entry Level (0-1 years)</SelectItem>
                <SelectItem value="1-3-years">1-3 years</SelectItem>
                <SelectItem value="3-5-years">3-5 years</SelectItem>
                <SelectItem value="5-10-years">5-10 years</SelectItem>
                <SelectItem value="10-15-years">10-15 years</SelectItem>
                <SelectItem value="15-plus-years">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="previousEmployer">Previous/Current Employer</Label>
              <Input
                id="previousEmployer"
                value={data.previousEmployer}
                onChange={(e) => updateData({ previousEmployer: e.target.value })}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={data.jobTitle}
                onChange={(e) => updateData({ jobTitle: e.target.value })}
                placeholder="Enter your job title"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="experienceDescription">Describe Your Aviation Experience</Label>
            <Textarea
              id="experienceDescription"
              value={data.experienceDescription}
              onChange={(e) => updateData({ experienceDescription: e.target.value })}
              placeholder="Describe your relevant aviation experience, responsibilities, and achievements..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="reason">Why do you want to work in aviation?</Label>
            <Textarea
              id="reason"
              value={data.reason}
              onChange={(e) => updateData({ reason: e.target.value })}
              placeholder="Tell us about your passion for aviation and why you want to join our team..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Flight Hours (if applicable)</h4>
        <p className="text-sm text-blue-700 mb-3">
          If you're applying for a pilot position, please provide your flight hour details in the experience description above.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-blue-600">
            <span className="font-medium">Total:</span> _____ hrs
          </div>
          <div className="text-blue-600">
            <span className="font-medium">PIC:</span> _____ hrs
          </div>
          <div className="text-blue-600">
            <span className="font-medium">Multi-Engine:</span> _____ hrs
          </div>
          <div className="text-blue-600">
            <span className="font-medium">Turbine:</span> _____ hrs
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;
