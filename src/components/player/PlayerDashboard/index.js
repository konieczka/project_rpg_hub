import { OutlinePanelButton } from "components/shared/Button";
import useSystemTheme from "hooks/useSystemTheme";
import { useState } from "react";
import PlayerCharacterManagementPanel from "../PlayerCharacterManagementPanel";
import PlayerInventoryPanel from "../PlayerInventoryPanel";
import { Container, DashboardButtons, ModalArea } from "./styles";

const PlayerDashboard = () => {
  const { colors } = useSystemTheme();
  const [isEqModalOpen, setIsEqModalOpen] = useState(false);
  const [isCharacterManagementModalOpen, setIsCharacterManagementModalOpen] =
    useState(false);

  return (
    <Container>
      <ModalArea>
        {isEqModalOpen && <PlayerInventoryPanel />}
        {isCharacterManagementModalOpen && <PlayerCharacterManagementPanel />}
      </ModalArea>
      <DashboardButtons>
        <OutlinePanelButton
          onClick={() => {
            setIsCharacterManagementModalOpen(false);
            setIsEqModalOpen((prev) => !prev);
          }}
          bgColor={colors.main}
          hoverColor={colors.primary}
        >
          Ekwipunek
        </OutlinePanelButton>
        <OutlinePanelButton
          onClick={() => {
            setIsEqModalOpen(false);
            setIsCharacterManagementModalOpen((prev) => !prev);
          }}
          bgColor={colors.main}
          hoverColor={colors.primary}
        >
          Postać
        </OutlinePanelButton>
      </DashboardButtons>
    </Container>
  );
};

export default PlayerDashboard;
