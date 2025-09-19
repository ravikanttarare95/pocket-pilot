import React from "react";
import { Eye, EyeOff } from "lucide-react";

function EyePassword({ inputType, setInputType }) {
  return (
    <div>
      {inputType === "password" ? (
        <Eye
          onClick={() => {
            setInputType("text");
          }}
        />
      ) : (
        <EyeOff
          onClick={() => {
            setInputType("password");
          }}
        />
      )}
    </div>
  );
}

export default EyePassword;
