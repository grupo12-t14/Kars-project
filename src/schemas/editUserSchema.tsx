import * as yup from "yup";

export const ediInfoUserSchema = yup.object({
  name: yup.string().max(50, "O nome deve conter menos de 50 caracteres"),
  email: yup
    .string()
    .email("Deve ser um email válido")
    .max(50, "O email deve ter no máximo 50 caracteres"),
  cpf: yup.string().max(14, "O CPF deve conter menos de 14 caracteres"),
  phone: yup.string().max(15, "O telefone deve conter menos de 15 caracteres"),
  birthDate: yup.date(),
});
