import React from "react";

function ProfileInfoPara({ info, customStyle }) {
  return (
    <p className={`py-2 border border-transparent ${customStyle}`}>{info}</p>
  );
}

export default ProfileInfoPara;
