import { useState } from "react";
import Label from "./../authentication/Label.jsx";
import Input from "./../authentication/Input.jsx";
import Button from "./../Button.jsx";
import ProfileInfoPara from "./ProfileInfoPara.jsx";
import HeadingTwo from "./../HeadingTwo.jsx";
import { UserRoundPen, Save } from "lucide-react";

function ProfileInfoCompo({ user, setUser }) {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const handleInputChange = () => {};
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
                Save
              </>
            }
            size="sm"
            btnVariant="primary"
            onBtnClick={() => {
              setIsProfileEditing(false);
            }}
          />
        ) : (
          <Button
            type="button"
            btnTitle={
              <>
                <UserRoundPen size={18} />
                Edit
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
            <Label htmlFor="full-name" labelTitle="Full Name" />
            <Input
              type="text"
              name="full-name"
              id="full-name"
              value={user?.fullName}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="email-address" labelTitle="Email Address" />
            <Input
              type="text"
              name="email-address"
              id="email-address"
              value={user?.email}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="phone-number" labelTitle="Phone Number" />
            <Input
              type="text"
              name="phone-number"
              id="phone-number"
              value={user?.phoneNumber}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="gender" labelTitle="Gender" />
            <Input
              type="select"
              name="gender"
              id="gender"
              value={user?.gender}
              onInputChange={handleInputChange}
            />
            {/* <select>
                <option value="male">Male</option>
                <option value="male">Female</option>
                <option value="male">Other</option>
              </select> */}
          </div>
          <div>
            <Label labelTitle="Date of Birth" />
            <Input
              type="date"
              name="dob"
              id="dob"
              value={new Date(user?.dateOfBirth).toISOString().split("T")[0]}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <Label labelTitle="Address" />
            <Input
              type="text"
              name="address"
              id="address"
              value={user?.address}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <Label htmlFor="full-name" labelTitle="Full Name" />
            <ProfileInfoPara info={user?.fullName} />
          </div>
          <div>
            <Label htmlFor="email-address" labelTitle="Email Address" />
            <ProfileInfoPara info={user?.email} />
          </div>
          <div>
            <Label htmlFor="phone-number" labelTitle="Phone Number" />
            <ProfileInfoPara info={user?.phoneNumber} />
          </div>
          <div>
            <Label htmlFor="gender" labelTitle="Gender" />
            <ProfileInfoPara info={user?.gender} />
          </div>
          <div>
            <Label labelTitle="Date of Birth" />
            <ProfileInfoPara
              info={new Date(user?.dateOfBirth).toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label labelTitle="Address" />
            <ProfileInfoPara info={user?.address} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileInfoCompo;
