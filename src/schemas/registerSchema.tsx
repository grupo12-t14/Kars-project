import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "O nome deve conter menos de 50 caracteres")
    .required("Nome obrigatório"),
  email: yup
    .string()
    .email("Deve ser um email válido")
    .max(50)
    .required("Email obrigatório"),
  cpf: yup
    .string()
    .max(14, "O CPF deve conter menos de 14 caracteres")
    .required("CPF obrigatório"),
  phone: yup
    .string()
    .max(15, "O telefone deve conter menos de 15 caracteres")
    .required("Telefone obrigatório"),
  birthDate: yup.date().required("Data de nascimento obrigatório"),
  description: yup
    .string()
    .max(250, "A descrição deve conter menos de 250 caracteres"),
  cep: yup
    .string()
    .max(9, "O CEP deve conter mrnos de 9 caracteres")
    .required("CEP obrigatório"),
  state: yup.string().max(50).required("Estado obrigatório"),
  city: yup.string().max(30).required("Cidade obrigatória"),
  street: yup.string().max(50).required("Rua obrigatória"),
  number: yup.string().required("Número da casa obrigatório"),
  complement: yup
    .string()
    .max(50, "O complemento deve conter menos de 50 caracteres"),
  accType: yup
    .string()
    .min(5, "O tipo de conta deve ser buyer ou seller")
    .max(6, "O tipo de conta deve ser buyer ou seller")
    .default("buyer"),
  password: yup
    .string()
    .min(8, "A senha deve conter 8 ou mais caracteres")
    .max(200, "A senha deve conter no máximo 200 caracteres")
    .required("Senha obrigatória"),
  confirmPassword: yup
    .string()
    .min(8, "A senha deve conter 8 ou mais caracteres")
    .max(200, "A senha deve conter no máximo 200 caracteres")
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "A senha  deve corresponder"),
});
