
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoStepProps {
  data: any;
  updateData: (data: any) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => updateData({ dateOfBirth: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality *</Label>
            <Select value={data.nationality} onValueChange={(value) => updateData({ nationality: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Address Information</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              placeholder="Enter your street address"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                value={data.state}
                onChange={(e) => updateData({ state: e.target.value })}
                placeholder="Enter state"
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
              <Input
                id="zipCode"
                value={data.zipCode}
                onChange={(e) => updateData({ zipCode: e.target.value })}
                placeholder="Enter ZIP code"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
