import { Container } from "./styles";

const Tooltip = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

export default Tooltip;
