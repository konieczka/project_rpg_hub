import { useState } from "react";
import PropTypes from "prop-types";
import { DropdownArrowRegular } from "components/shared/DropdownArrow";
import {
  CollapsibleItem,
  Container,
  CollapsibleItemLabel,
  CollapsibleSection,
  NestedItem,
  MiniLabel,
} from "./styles";
import useSystemTheme from "hooks/useSystemTheme";
import { addAlpha } from "utils/addAlpha";

const InteractiveList = ({ listData, onSelectItem = () => {} }) => {
  const [expandedItemId, setExpandedItemId] = useState("");
  const systemTheme = useSystemTheme();

  return (
    <Container>
      {listData.map((firstLevel) => (
        <CollapsibleItem key={firstLevel.id}>
          <CollapsibleItemLabel
            onClick={() => {
              if (expandedItemId === firstLevel.id) {
                setExpandedItemId("");
              } else {
                setExpandedItemId(firstLevel.id);
              }
            }}
          >
            {firstLevel.label}
            <DropdownArrowRegular
              mainColor="white"
              isOpen={expandedItemId === firstLevel.id}
            />
          </CollapsibleItemLabel>
          {expandedItemId === firstLevel.id && (
            <CollapsibleSection>
              {firstLevel.items.map((secondLevel) => (
                <NestedItem
                  onClick={() => onSelectItem(secondLevel.id, firstLevel.id)}
                  key={secondLevel.id}
                  highlighted={
                    secondLevel.highlighted &&
                    addAlpha(systemTheme.colors.main, 0.15)
                  }
                >
                  {secondLevel.label}
                  {secondLevel.miniLabel && (
                    <MiniLabel mainColor={systemTheme.colors.main}>
                      {secondLevel.miniLabel}
                    </MiniLabel>
                  )}
                </NestedItem>
              ))}
            </CollapsibleSection>
          )}
        </CollapsibleItem>
      ))}
    </Container>
  );
};

InteractiveList.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      firstLevel: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            highlighted: PropTypes.bool,
            miniLabel: PropTypes.string,
          })
        ),
      }),
    })
  ).isRequired,
  onSelectItem: PropTypes.func,
};

export default InteractiveList;
