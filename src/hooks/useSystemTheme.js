import { useSelector } from "react-redux";

const useSystemTheme = () => {
  const { activeSystem } = useSelector((state) => state.gameSystems);

  if (activeSystem) {
    const { backgroundUrl, colors, description, name, systemId } = activeSystem;

    return { backgroundUrl, colors, description, name, systemId };
  }

  return null;
};

export default useSystemTheme;
