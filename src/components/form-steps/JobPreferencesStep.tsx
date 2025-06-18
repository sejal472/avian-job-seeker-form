
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface JobPreferencesStepProps {
  data: any;
  updateData: (data: any) => void;
}

const JobPreferencesStep: React.FC<JobPreferencesStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Job Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="position">Desired Position *</Label>
            <Select value={data.position} onValueChange={(value) => updateData({ position: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pilot">Pilot</SelectItem>
                <SelectItem value="flight-attendant">Flight Attendant</SelectItem>
                <SelectItem value="aircraft-mechanic">Aircraft Mechanic</SelectItem>
                <SelectItem value="ground-crew">Ground Crew</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="air-traffic-controller">Air Traffic Controller</SelectItem>
                <SelectItem value="baggage-handler">Baggage Handler</SelectItem>
                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <Select value={data.department} onValueChange={(value) => updateData({ department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flight-operations">Flight Operations</SelectItem>
                <SelectItem value="cabin-crew">Cabin Crew</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="ground-operations">Ground Operations</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="air-traffic-control">Air Traffic Control</SelectItem>
                <SelectItem value="cargo">Cargo</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="preferredLocation">Preferred Location *</Label>
            <Select value={data.preferredLocation} onValueChange={(value) => updateData({ preferredLocation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York (JFK/LGA)</SelectItem>
                <SelectItem value="los-angeles">Los Angeles (LAX)</SelectItem>
                <SelectItem value="chicago">Chicago (ORD)</SelectItem>
                <SelectItem value="miami">Miami (MIA)</SelectItem>
                <SelectItem value="dallas">Dallas (DFW)</SelectItem>
                <SelectItem value="denver">Denver (DEN)</SelectItem>
                <SelectItem value="atlanta">Atlanta (ATL)</SelectItem>
                <SelectItem value="san-francisco">San Francisco (SFO)</SelectItem>
                <SelectItem value="flexible">Flexible/Any Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="availabilityDate">Available Start Date *</Label>
            <Input
              id="availabilityDate"
              type="date"
              value={data.availabilityDate}
              onChange={(e) => updateData({ availabilityDate: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Work Type Preference *</Label>
        <RadioGroup
          value={data.workType}
          onValueChange={(value) => updateData({ workType: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full-time" id="full-time" />
            <Label htmlFor="full-time">Full-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="part-time" id="part-time" />
            <Label htmlFor="part-time">Part-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="contract" id="contract" />
            <Label htmlFor="contract">Contract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="seasonal" id="seasonal" />
            <Label htmlFor="seasonal">Seasonal</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="salaryExpectation">Salary Expectation (Annual USD)</Label>
        <Select value={data.salaryExpectation} onValueChange={(value) => updateData({ salaryExpectation: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select salary range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30000-40000">$30,000 - $40,000</SelectItem>
            <SelectItem value="40000-50000">$40,000 - $50,000</SelectItem>
            <SelectItem value="50000-60000">$50,000 - $60,000</SelectItem>
            <SelectItem value="60000-80000">$60,000 - $80,000</SelectItem>
            <SelectItem value="80000-100000">$80,000 - $100,000</SelectItem>
            <SelectItem value="100000-120000">$100,000 - $120,000</SelectItem>
            <SelectItem value="120000+">$120,000+</SelectItem>
            <SelectItem value="negotiable">Negotiable</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobPreferencesStep;
