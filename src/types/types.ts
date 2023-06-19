import { ChangeEvent, FocusEvent } from "react";

export interface iInputForm {
  label: string;
  placeholder: string;
  type: "input" | "text" | "email" | "password" | "number" | "date";
  maxlength?: number;
  value?: string;
  register?: any;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface iRegisterForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  description: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
  accType: string;
  password: string;
  confirmPassword: string;
}
