import * as yup from "yup";

export const editAddresSchema = yup.object().shape({
  cep: yup
    .string()
    .max(9, "O CEP deve conter mrnos de 9 caracteres")
    .required("CEP obrigatório"),
  state: yup.string().max(50).required("Estado obrigatório"),
  city: yup.string().max(30).required("Cidade obrigatória"),
  street: yup.string().max(50).required("Rua obrigatória"),
  number: yup
    .string()
    .required("Número da casa obrigatório")
    .optional()
    .nullable(),
  complement: yup
    .string()
    .max(50, "O complemento deve conter menos de 50 caracteres")
    .optional()
    .nullable(),
});