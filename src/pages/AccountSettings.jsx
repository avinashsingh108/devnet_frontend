import axios from "axios";
import { useState } from "react";
import { FaLock, FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../constants";
import { toast } from "sonner";
import { validatePassword } from "../utils/validationFncs";

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = async () => {
    if (currentPassword && newPassword) {
      const validationMessage = validatePassword(newPassword);

      if (validationMessage) {
        setMessage(validationMessage);
        return;
      } else {
        setMessage("");
      }
      setIsUpdating(true);
      try {
        const response = await axios.patch(
          BASE_URL + "/profile/update-password",
          { currentPassword, newPassword },
          { withCredentials: true }
        );

        toast.success(
          response.data.message || "Password updated successfully!"
        );
        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        toast.error(
          error.response?.data || "Something went wrong. Please try again."
        );
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast.error("Please enter both current and new passwords.");
    }
  };

  const handleAccountDeletion = async () => {
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        const response = await axios.delete(BASE_URL + "/profile", {
          withCredentials: true,
        });

        toast.success(response.data.message || "Account deleted successfully.");
        setDeleteReason("");
        setConfirmDelete(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred.");
      } finally {
        setIsDeleting(false);
      }
    } else {
      toast.error("Please confirm deletion by checking the box.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-12 md:px-28 lg:px-60 xl:px-[350px] 2xl:px[450px] pt-28 space-y-8">
      <h1 className="text-2xl sm:text-3xl max-w-3xl border-b border-gray-500 font-semibold py-2 text-white">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 max-w-3xl content-center gap-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-600">
          <h2 className="text-xl font-medium text-white flex items-center gap-2 mb-4">
            <FaLock /> Change Password
          </h2>

          <div className="relative mb-4">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 text-white bg-gray-900 rounded-lg focus:outline-none"
            />
            <button
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-4 top-4 text-gray-400"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 text-white bg-gray-900 rounded-lg focus:outline-none"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-4 text-gray-400"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {message && <p className="text-red-500 text-xs sm:text-sm py-1">{message}</p>}
          <button
            onClick={handlePasswordChange}
            disabled={!currentPassword || !newPassword}
            className={`w-full mt-4 py-3 text-white rounded-lg ${
              currentPassword && newPassword
                ? "bg-gray-900 hover:bg-gray-950"
                : "bg-gray-700 cursor-not-allowed"
            } transition duration-300`}
          >
            {isUpdating ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-600">
          <h2 className="text-xl font-medium text-white flex items-center gap-2 mb-4">
            <FaTrashAlt /> Delete Account
          </h2>

          <textarea
            placeholder="Reason for leaving (optional)"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            className="w-full px-4 py-3 border bg-gray-900 text-white border-gray-600 rounded-lg focus:outline-none resize-none h-24"
          />

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="confirmDelete"
              checked={confirmDelete}
              onChange={() => setConfirmDelete(!confirmDelete)}
              className="h-4 w-4 text-white outline-none border-gray-600 rounded"
            />
            <label
              htmlFor="confirmDelete"
              className="ml-2 text-xs sm:text-sm text-white"
            >
              I confirm that I want to delete my account.
            </label>
          </div>

          <button
            onClick={handleAccountDeletion}
            disabled={!confirmDelete || isDeleting}
            className={`w-full mt-4 py-3 text-white rounded-lg ${
              confirmDelete && !isDeleting
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-400 cursor-not-allowed"
            } transition duration-300`}
          >
            {isDeleting ? "Deleting..." : "Permanently Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
