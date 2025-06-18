
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, CheckCircle } from 'lucide-react';

interface DocumentsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({ data, updateData }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ resume: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Documents & Additional Information</h3>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="resume">Resume/CV *</Label>
            <Card className="mt-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    {data.resume ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>{data.resume.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Upload your resume or CV
                        </p>
                        <p className="text-xs text-gray-400">
                          PDF, DOC, or DOCX (Max 5MB)
                        </p>
                      </>
                    )}
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              value={data.coverLetter}
              onChange={(e) => updateData({ coverLetter: e.target.value })}
              placeholder="Write a brief cover letter explaining why you're the perfect fit for this position..."
              rows={6}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="references">Professional References</Label>
            <Textarea
              id="references"
              value={data.references}
              onChange={(e) => updateData({ references: e.target.value })}
              placeholder="Please provide 2-3 professional references with their contact information..."
              rows={4}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Important Notes</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• All information provided must be accurate and truthful</li>
              <li>• Additional documents may be requested during the review process</li>
              <li>• Background checks and drug testing are required for all positions</li>
              <li>• We are an equal opportunity employer</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-2">Next Steps</h4>
        <p className="text-sm text-green-800">
          Once you submit your application, our HR team will review it within 5-7 business days. 
          If your qualifications match our current openings, we'll contact you to schedule an interview.
        </p>
      </div>
    </div>
  );
};

export default DocumentsStep;
