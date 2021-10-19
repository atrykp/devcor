import { useMutation, gql } from "@apollo/client";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserCtx } from "../context/UserContext";
import { useNotificationBar } from "./useNotificationBar";

const ADD_WORD = gql`
  mutation addWord(
    $userId: ID!
    $from: String
    $to: String
    $fromLang: String
    $toLang: String
  ) {
    addWord(
      userId: $userId
      from: $from
      to: $to
      fromLang: $fromLang
      toLang: $toLang
    ) {
      status
      message
    }
  }
`;
type Inputs = {
  to: string;
  from: string;
};

export const useAddWord = () => {
  const [isAddWord, setIsAddWord] = useState(false);
  const { showNotification } = useNotificationBar();
  const ctx = useContext(UserCtx);
  const [addWord] = useMutation(ADD_WORD, {
    refetchQueries: ["GetLanguageObj"],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    showNotification("Adding word", "pending");
    const { data: saveResult } = await addWord({
      variables: {
        userId: ctx.id,
        from: data.from,
        to: data.to,
        fromLang: ctx.language.native,
        toLang: ctx.language.learn,
      },
    });
    if (!saveResult.addWord.status)
      return showNotification(saveResult.addWord.message, "error");
    showNotification(saveResult.addWord.message, "done");
    reset();
    setIsAddWord(false);
    // setIsMenuList(false);
  };

  const handleAddWordModal = (value: boolean) => setIsAddWord(value);

  return {
    reset,
    register,
    handleSubmit,
    errors,
    onSubmit,
    isAddWord,
    handleAddWordModal,
    ctx,
  };
};
