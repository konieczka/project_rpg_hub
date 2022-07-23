import { useSelector } from "react-redux";

const useSystemMetadata = () => {
  const { activeSystem } = useSelector((state) => state.gameSystems);

  const { backgroundUrl, colors, description, name, systemId } = activeSystem;

  return { backgroundUrl, colors, description, name, systemId };
};

export default useSystemMetadata;
