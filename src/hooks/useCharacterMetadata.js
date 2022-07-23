import { useSelector } from "react-redux";

const useCharacterMetadata = ({ classId, typeId }) => {
  const { classes, types } = useSelector((state) => state.characterClasses);

  return {
    classMeta: classes.find((c) => c.classId === classId),
    typeMeta: types.find((c) => c.typeId === typeId),
  };
};

export default useCharacterMetadata;
