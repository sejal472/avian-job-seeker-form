
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plane, User, Briefcase, GraduationCap, FileText } from 'lucide-react';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import JobPreferencesStep from './form-steps/JobPreferencesStep';
import QualificationsStep from './form-steps/QualificationsStep';
import ExperienceStep from './form-steps/ExperienceStep';
import DocumentsStep from './form-steps/DocumentsStep';
import { toast } from 'sonner';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Job Preferences
  position: string;
  department: string;
  preferredLocation: string;
  availabilityDate: string;
  workType: string;
  salaryExpectation: string;
  
  // Qualifications
  education: string;
  certifications: string[];
  languages: string[];
  medicalCertificate: boolean;
  backgroundCheck: boolean;
  
  // Experience
  totalExperience: string;
  previousEmployer: string;
  jobTitle: string;
  experienceDescription: string;
  reason: string;
  
  // Documents
  resume: File | null;
  coverLetter: string;
  references: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  nationality: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  position: '',
  department: '',
  preferredLocation: '',
  availabilityDate: '',
  workType: '',
  salaryExpectation: '',
  education: '',
  certifications: [],
  languages: [],
  medicalCertificate: false,
  backgroundCheck: false,
  totalExperience: '',
  previousEmployer: '',
  jobTitle: '',
  experienceDescription: '',
  reason: '',
  resume: null,
  coverLetter: '',
  references: ''
};

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Job Preferences', icon: Briefcase },
  { id: 3, title: 'Qualifications', icon: GraduationCap },
  { id: 4, title: 'Experience', icon: Plane },
  { id: 5, title: 'Documents', icon: FileText }
];

const AirlineJobsForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    toast.success('Application submitted successfully! We will contact you soon.');
    // Here you would typically send the data to your backend
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData} updateData={updateFormData} />;
      case 2:
        return <JobPreferencesStep data={formData} updateData={updateFormData} />;
      case 3:
        return <QualificationsStep data={formData} updateData={updateFormData} />;
      case 4:
        return <ExperienceStep data={formData} updateData={updateFormData} />;
      case 5:
        return <DocumentsStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Plane className="h-6 w-6" />
            Airline Employment Application
          </CardTitle>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{currentStep} of {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      currentStep >= step.id
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs mt-1 text-center">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep === steps.length ? (
              <Button
                type="button"
                onClick={submitForm}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Application
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AirlineJobsForm;
