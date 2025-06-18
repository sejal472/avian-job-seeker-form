
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
                <SelectItem value="co-pilot">Co-Pilot</SelectItem>
                <SelectItem value="flight-attendant">Flight Attendant</SelectItem>
                <SelectItem value="cabin-crew">Cabin Crew</SelectItem>
                <SelectItem value="aircraft-mechanic">Aircraft Mechanic</SelectItem>
                <SelectItem value="ground-crew">Ground Crew</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="air-traffic-controller">Air Traffic Controller</SelectItem>
                <SelectItem value="baggage-handler">Baggage Handler</SelectItem>
                <SelectItem value="dispatcher">Flight Dispatcher</SelectItem>
                <SelectItem value="security">Airport Security</SelectItem>
                <SelectItem value="operations">Flight Operations</SelectItem>
                <SelectItem value="cargo-handler">Cargo Handler</SelectItem>
                <SelectItem value="check-in-agent">Check-in Agent</SelectItem>
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
                <SelectItem value="maintenance">Aircraft Maintenance</SelectItem>
                <SelectItem value="ground-operations">Ground Operations</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="air-traffic-control">Air Traffic Control</SelectItem>
                <SelectItem value="cargo">Cargo Operations</SelectItem>
                <SelectItem value="security">Airport Security</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="preferredLocation">Preferred Airport Location *</Label>
            <Select value={data.preferredLocation} onValueChange={(value) => updateData({ preferredLocation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select airport location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="del-international">Delhi (DEL) - Indira Gandhi International</SelectItem>
                <SelectItem value="bom-international">Mumbai (BOM) - Chhatrapati Shivaji International</SelectItem>
                <SelectItem value="blr-international">Bangalore (BLR) - Kempegowda International</SelectItem>
                <SelectItem value="hyd-international">Hyderabad (HYD) - Rajiv Gandhi International</SelectItem>
                <SelectItem value="ccu-international">Kolkata (CCU) - Netaji Subhash Chandra Bose International</SelectItem>
                <SelectItem value="maa-international">Chennai (MAA) - Chennai International</SelectItem>
                <SelectItem value="cok-international">Kochi (COK) - Cochin International</SelectItem>
                <SelectItem value="goa-international">Goa (GOI) - Goa International</SelectItem>
                <SelectItem value="amd-international">Ahmedabad (AMD) - Sardar Vallabhbhai Patel International</SelectItem>
                <SelectItem value="pune-domestic">Pune (PNQ) - Pune Airport</SelectItem>
                <SelectItem value="jaipur-domestic">Jaipur (JAI) - Jaipur International</SelectItem>
                <SelectItem value="lucknow-domestic">Lucknow (LKO) - Chaudhary Charan Singh International</SelectItem>
                <SelectItem value="chandigarh-domestic">Chandigarh (IXC) - Chandigarh Airport</SelectItem>
                <SelectItem value="bhubaneswar-domestic">Bhubaneswar (BBI) - Biju Patnaik International</SelectItem>
                <SelectItem value="indore-domestic">Indore (IDR) - Devi Ahilya Bai Holkar Airport</SelectItem>
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
        <Label htmlFor="salaryExpectation">Salary Expectation (Annual INR)</Label>
        <Select value={data.salaryExpectation} onValueChange={(value) => updateData({ salaryExpectation: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select salary range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="200000-300000">₹2,00,000 - ₹3,00,000</SelectItem>
            <SelectItem value="300000-500000">₹3,00,000 - ₹5,00,000</SelectItem>
            <SelectItem value="500000-800000">₹5,00,000 - ₹8,00,000</SelectItem>
            <SelectItem value="800000-1200000">₹8,00,000 - ₹12,00,000</SelectItem>
            <SelectItem value="1200000-1800000">₹12,00,000 - ₹18,00,000</SelectItem>
            <SelectItem value="1800000-2500000">₹18,00,000 - ₹25,00,000</SelectItem>
            <SelectItem value="2500000+">₹25,00,000+</SelectItem>
            <SelectItem value="negotiable">Negotiable</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobPreferencesStep;
