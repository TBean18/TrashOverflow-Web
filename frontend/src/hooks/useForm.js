import { useState } from "react";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  return [
    // Returns the values
    values,
    //Returns the hook to update the values on the onClick functions
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    // Returns a function to reset the values
    (JSONObject) => {
      setValues(JSONObject);
    },
  ];
};
