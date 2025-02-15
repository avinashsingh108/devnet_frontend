const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4 p-3 sm:p-4 bg-gray-800 rounded-xl shadow-lg">
      <div className="p-2 sm:p-3 bg-gray-700 rounded-full">{icon}</div>
      <div>
        <h3 className="sm:text-lg xl:text-xl font-semibold">{title}</h3>
        <p className="text-xs sm:text-sm xl:text-base text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
