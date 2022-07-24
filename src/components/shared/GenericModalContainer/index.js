import useSystemTheme from "hooks/useSystemTheme";
import { Container, Label } from "./styles";

const GenericModalContainer = ({ children, label }) => {
  const systemTheme = useSystemTheme();

  return (
    <Container mainColor={systemTheme.colors.main}>
      <Label mainColor={systemTheme.colors.main}>{label}</Label>
      {children}
    </Container>
  );
};

export default GenericModalContainer;
