import chatImage from './image.png'; // adjust the path as needed

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center h-screen bg-base-200 p-12">
      <div className="max-w-lg text-center">
        {/* Chat Icon */}
        <img 
          src={chatImage} 
          alt="Chat Icon" 
          className="mx-auto mb-6 w-28 h-28 object-contain" 
        />
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        {/* Subtitle */}
        <p className="text-lg text-base-content/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
