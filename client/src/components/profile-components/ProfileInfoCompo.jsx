import { useState } from "react";
import Label from "./../authentication/Label.jsx";
import Input from "./../authentication/Input.jsx";
import Button from "./../Button.jsx";
import ProfileInfoPara from "./ProfileInfoPara.jsx";
import HeadingTwo from "./../HeadingTwo.jsx";
import { UserRoundPen, Save } from "lucide-react";
import { API_URL } from "./../../configs/axiosConfigs.js";
import toast from "react-hot-toast";

function ProfileInfoCompo({ user, setUser, accessToken }) {
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth
      ? new Date(user?.dateOfBirth).toISOString().split("T")[0]
      : "",
    address: user?.address || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfileInfo = async () => {
    try {
      const response = await API_URL.put(
        "/api/users",
        {
          fullName: profileData?.fullName,
          email: profileData?.email,
          phoneNumber: profileData?.phoneNumber,
          gender: profileData?.gender,
          dateOfBirth: profileData?.dateOfBirth,
          address: profileData?.address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response?.data?.success) {
        console.log(response?.data);
        setUser(response?.data?.user);
        setIsProfileEditing(false);
        return toast.success(
          response?.data?.message || "Profile updated successfully"
        );
      }
    } catch (error) {
      console.error("Update profile failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile";

      return toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <HeadingTwo title="Personal Information" className="!mb-0" />

        {isProfileEditing ? (
          <Button
            type="button"
            btnTitle={
              <>
                <Save size={18} />
                <span className="max-[400px]:hidden block">Save</span>
              </>
            }
            size="sm"
            btnVariant="primary"
            onBtnClick={() => {
              updateProfileInfo();
            }}
          />
        ) : (
          <Button
            type="button"
            btnTitle={
              <>
                <UserRoundPen size={18} />
                <span className="max-[400px]:hidden block">Edit</span>
              </>
            }
            size="sm"
            btnVariant="secondary"
            onBtnClick={() => {
              setIsProfileEditing(true);
            }}
          />
        )}
      </div>
      {isProfileEditing ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <Label
              htmlFor="full-name"
              labelTitle="Full Name"
              isMandatory={true}
            />
            <Input
              type="text"
              name="fullName"
              id="full-name"
              value={profileData?.fullName}
              onInputChange={handleInputChange}
            />
          </div>

          <div>
            <Label labelTitle="Email Address" isMandatory={true} />
            <ProfileInfoPara info={user?.email ? user?.email : "--"} />
          </div>

          <div>
            <Label htmlFor="phone-number" labelTitle="Phone Number" />
            <Input
              type="text"
              name="phoneNumber"
              id="phone-number"
              value={profileData?.phoneNumber}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="gender" labelTitle="Gender" />
            <select
              name="gender"
              id="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 outline-cyan-400"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <Label htmlFor="dob" labelTitle="Date of Birth" />
            <Input
              type="date"
              name="dateOfBirth"
              id="dob"
              value={profileData?.dateOfBirth}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="address" labelTitle="Address" />
            <Input
              type="text"
              name="address"
              id="address"
              value={profileData?.address}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <Label labelTitle="Full Name" />
            <ProfileInfoPara info={user?.fullName ? user?.fullName : "--"} />
          </div>
          <div>
            <Label labelTitle="Email Address" />
            <ProfileInfoPara info={user?.email ? user?.email : "--"} />
          </div>
          <div>
            <Label labelTitle="Phone Number" />
            <ProfileInfoPara
              info={user?.phoneNumber ? user?.phoneNumber : "--"}
            />
          </div>
          <div>
            <Label labelTitle="Gender" />
            <ProfileInfoPara
              info={user?.gender ? user?.gender : "--"}
              customStyle="capitalize"
            />
          </div>
          <div>
            <Label labelTitle="Date of Birth" />
            <ProfileInfoPara
              info={
                user?.dateOfBirth
                  ? new Date(user?.dateOfBirth).toISOString().split("T")[0]
                  : "--"
              }
            />
          </div>
          <div>
            <Label labelTitle="Address" />
            <ProfileInfoPara info={user?.address ? user?.address : "--"} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileInfoCompo;
