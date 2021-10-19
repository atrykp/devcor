import { useContext } from "react";
import { MenuButton } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import WordElement, {
  IWordElement,
} from "../../components/WordElement/WordElement";
import { LanguageCtx } from "../../context/LanguageContext";
import { useAddWord } from "../../hooks/useAddWord";
import { useAuth } from "../../hooks/useAuth";
import "./DictionaryScreen.scss";

const DictionaryScreen = () => {
  useAuth("protect");
  const langCtx = useContext(LanguageCtx);
  const {
    handleSubmit,
    errors,
    reset,
    register,
    onSubmit,
    isAddWord,
    handleAddWordModal,
    ctx,
  } = useAddWord();
  return (
    <div className="dictionary-screen">
      <p className="dictionary-screen__title">Dictionary</p>
      <div className="dictionary-screen__buttons">
        <MenuButton>Scan text</MenuButton>
        <MenuButton>Search</MenuButton>
        <MenuButton
          callback={() => {
            handleAddWordModal(true);
          }}
        >
          add
        </MenuButton>
      </div>
      <div className="dictionary-screen__words">
        {langCtx.dictionary.length > 0 ? (
          langCtx.dictionary.map((element: IWordElement) => (
            <WordElement {...element} key={element.id} />
          ))
        ) : (
          <p>its nothing here</p>
        )}
      </div>
      {isAddWord && (
        <Modal
          title={"Add Word"}
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
      )}
    </div>
  );
};

export default DictionaryScreen;
