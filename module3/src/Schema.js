import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(3, "name must be 3 chars long"),
  email: yup
    .string()
    .email("Must be valid email address")
    .required("Must include email address"),
  Password: yup
    .string()
    .required('Password is required'),
  TermsOfService: yup
    .boolean()
    .required("Needs to be checked")
    .oneOf([true],"Needs tos")
//   // we are done with checkboxes
//   hiking: yup.boolean(),
//   reading: yup.boolean(),
//   coding: yup.boolean(),
});