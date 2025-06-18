
import AirlineJobsForm from '../components/AirlineJobsForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Air Bharat Careers Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the Air Bharat family and soar to new heights in your aviation career. 
            Complete your application to get started with Indian aviation excellence.
          </p>
        </div>
        <AirlineJobsForm />
      </div>
    </div>
  );
};

export default Index;
