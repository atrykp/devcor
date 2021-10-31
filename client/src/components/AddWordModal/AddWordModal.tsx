import Input from "../Input/Input";
import Modal from "../Modal/Modal";

const AddWordModal = ({ ...props }) => {
  const {
    reset,
    handleAddWordModal,
    handleSubmit,
    onSubmit,
    errors,
    register,
    ctx,
    title,
  } = props;
  return (
    <Modal
      title={title}
      confirmTxt={"save"}
      cancelTxt={"cancel"}
      cancelCallback={() => {
        reset();
        handleAddWordModal(false);
      }}
      confirmCallback={() => handleSubmit(onSubmit)()}
    >
      <div className="modal__inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            styles={errors?.to ? "input--error" : ""}
            placeholder={`${ctx.language.learn}`}
            {...register("to", { required: true })}
          />
          <Input
            styles={errors?.from ? "input--error" : ""}
            placeholder={`${ctx.language.native}`}
            {...register("from", { required: true })}
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddWordModal;
