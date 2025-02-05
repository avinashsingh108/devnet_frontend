import { useSelector } from "react-redux";
import ProfileForm from "../components/ProfileForm";
import UserCard from "../components/UserCard";

const ProfilePage = () => {
  const userData = useSelector((store) => store.user);
  return (
    <div className="bg-gray-900 pt-16 lg:pt-32 lg:pb-20 h-full">
      <div className="flex flex-col lg:items-center lg:justify-center lg:flex-row lg:gap-6 lg:px-10 xl:px-36">
        <div className="xl:w-3/5 bg-gray-800 border border-gray-700 lg:rounded-lg max-lg:pt-6 p-3 md:p-6">
          <ProfileForm />
        </div>

        {userData && (
          <div className="xl:w-2/5 p-3 sm:p-6 max-lg:pt-10 max-lg:pb-10 flex flex-col sticky top-14 lg:bottom-16 h-fit bg-gray-800 lg:border lg:border-gray-700 lg:rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
              Preview Your Profile Card
            </h2>
            <p className="text-sm text-gray-400 pb-4">
              This is how your profile card will appear to others.
            </p>
            <UserCard user={userData} type="profileCard" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
