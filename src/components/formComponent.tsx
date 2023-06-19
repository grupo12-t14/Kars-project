export const FormComponent = ({ children, handleSubmit, formData }: any) => {
  return (
    <form
      onSubmit={handleSubmit(formData)}
      className="flex flex-col w-[95%] gap-6 p-[16px] bg-white rounded-md sm:w-[400px]
            sm:p-[34px]"
    >
      {children}
    </form>
  );
};
