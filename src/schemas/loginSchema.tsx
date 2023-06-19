import * as yup from "yup";

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Deve ser um email válido")
    .max(50, "O email deve ter no máximo 50 caracteres")
    .required("Email obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve conter 8 ou mais caracteres")
    .max(200, "A senha deve conter no máximo 200 caracteres")
    .required("Senha obrigatória"),
});
