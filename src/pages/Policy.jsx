const Policy = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center pt-16 px-4 md:px-0">
      <div className="max-w-4xl w-full px-2 md:px-6 py-6 text-white">
        <div className="sm:text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold pt-8 sm:pt-10 mb-2 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. Here's how we handle your data at{" "}
            <span className="font-semibold">DevNet</span>.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              What Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed">
              When you sign up, we collect basic information such as your name,
              email, bio, dob, skills, location, and profile picture. We do not
              share this information with any third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">How We Use Your Data</h2>
            <p className="text-gray-300 leading-relaxed">
              Your profile information is used only to display your profile to
              other users on the platform. This allows developers to discover
              and connect with each other. We do not personalize content or use
              your data for targeted recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You can update your profile details anytime from the profile
              section. If you choose to leave, you can permanently delete your
              account. Once deleted, your data will no longer be accessible.
              Currently, there is no option to download your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-300">
              Have any concerns? Reach out to us at{" "}
              <a href="mailto:facks.fh@gmail.com" className="underline">
                facks.fh@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
