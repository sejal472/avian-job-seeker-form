
import AirlineJobsForm from '../components/AirlineJobsForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Airline Careers Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our team and soar to new heights in your aviation career. 
            Complete your application to get started.
          </p>
        </div>
        <AirlineJobsForm />
      </div>
    </div>
  );
};

export default Index;
