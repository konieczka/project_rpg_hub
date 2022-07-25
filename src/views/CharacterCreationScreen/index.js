import { HeadingLarge } from "components/shared/Heading";
import { LabeledInput, LabeledTextArea } from "components/shared/Input";
import InteractiveList from "components/shared/InteractiveList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  convertRootObjectIntoList,
  stringifyAttrs,
} from "utils/dataConversions";
import {
  Container,
  FormColumn,
  FormContainer,
  SelectedItemInfo,
} from "./styles";

const SELECTABLE_TYPES = {
  characterClass: "startingClass",
  characterType: "startingType",
};

const CharacterCreationScreen = () => {
  const { activeSystem, activeSystemMetadata, metadataSet } = useSelector(
    (state) => state.gameSystems
  );

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");

  const [attrsAssignment, setAttrsAssignment] = useState(null);
  const [classModifiers, setClassModifiers] = useState(null);
  const [typeModifiers, setTypeModifiers] = useState(null);

  const mapClassesAndTypesToListData = () => [
    {
      id: SELECTABLE_TYPES.characterClass,
      label: activeSystemMetadata.characterClasses.classDisplayName,
      items: convertRootObjectIntoList(
        activeSystemMetadata.characterClasses.classes
      ).map((classInstance) => ({
        id: classInstance.classId,
        label: classInstance.name,
      })),
    },
    {
      id: SELECTABLE_TYPES.characterType,
      label: activeSystemMetadata.characterClasses.typeDisplayName,
      items: convertRootObjectIntoList(
        activeSystemMetadata.characterClasses.types
      ).map((typeInstance) => ({
        id: typeInstance.typeId,
        label: typeInstance.name,
      })),
    },
  ];

  // Set initial attribute points assignment state
  useEffect(() => {
    if (!!activeSystem) {
      const assignmentSchema = Object.fromEntries(
        activeSystem.mechanics.attrsSchema.map(({ attrId }) => [attrId, 0])
      );
      setAttrsAssignment(assignmentSchema);
      setClassModifiers(assignmentSchema);
      setTypeModifiers(assignmentSchema);
    }
  }, [activeSystem]);

  // Set base attributes upon class selection
  useEffect(() => {
    if (selectedClassId) {
      setClassModifiers((prev) => ({
        ...prev,
        ...activeSystemMetadata.characterClasses.classes[selectedClassId]
          .baseAttrs,
      }));
    }
  }, [selectedClassId, activeSystemMetadata.characterClasses.classes]);

  // Set base attributes upon type selection
  useEffect(() => {
    if (selectedTypeId) {
      setTypeModifiers((prev) => ({
        ...prev,
        ...activeSystemMetadata.characterClasses.types[selectedTypeId]
          .baseAttrs,
      }));
    }
  }, [selectedTypeId, activeSystemMetadata.characterClasses.types]);

  if (!metadataSet || !activeSystem) {
    return null;
  }

  const { classes, types, classDisplayName, typeDisplayName } =
    activeSystemMetadata.characterClasses;
  const { mechanics } = activeSystem;

  return (
    <Container>
      <HeadingLarge>Nowa Postać</HeadingLarge>
      <FormContainer>
        <FormColumn>
          <h2>Informacje podstawowe</h2>
          <LabeledInput label="Portret (URL)" />
          <LabeledInput label="Nazwa postaci" />
          <LabeledTextArea label="Notka biograficzna" />
        </FormColumn>
        <FormColumn>
          <h2>Atrybuty początkowe</h2>
          <div style={{ minHeight: "150px" }}>
            <InteractiveList
              listData={mapClassesAndTypesToListData()}
              onSelectItem={(secondLevelId, firstLevelId) => {
                if (firstLevelId === SELECTABLE_TYPES.characterClass) {
                  setSelectedClassId(secondLevelId);
                } else if (firstLevelId === SELECTABLE_TYPES.characterType) {
                  setSelectedTypeId(secondLevelId);
                }
              }}
            />
          </div>
          <SelectedItemInfo>
            <h3>
              Wybrana {classDisplayName}
              :&nbsp;
              {selectedClassId ? classes[selectedClassId].name : "Nie wybrano"}
            </h3>
            {selectedClassId && (
              <>
                <p>{classes[selectedClassId].description}</p>
                <p>
                  <b>Bazowe atrybuty:</b>{" "}
                  {stringifyAttrs(classes[selectedClassId].baseAttrs)}
                </p>
                {classes[selectedClassId].baseSkills.length > 0 && (
                  <div>
                    <b>Umiejętności początkowe:</b>
                    <ul style={{ marginLeft: "15px" }}>
                      {classes[selectedClassId].baseSkills.map(
                        ({ skillId, level }) => (
                          <li key={skillId}>
                            {activeSystemMetadata.skills[skillId].attrs.join(
                              "/"
                            )}{" "}
                            {activeSystemMetadata.skills[skillId].name}: {level}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </SelectedItemInfo>
          <SelectedItemInfo>
            <h3>
              Wybrana {typeDisplayName}
              :&nbsp;
              {selectedTypeId ? types[selectedTypeId].name : "Nie wybrano"}
            </h3>
            {selectedTypeId && (
              <>
                <p>{types[selectedTypeId].description}</p>
                <p>
                  <b>Bazowe atrybuty:</b>{" "}
                  {stringifyAttrs(types[selectedTypeId].baseAttrs)}
                </p>
              </>
            )}
          </SelectedItemInfo>
          <SelectedItemInfo>
            <ul>
              {mechanics.attrsSchema.map((attr) => (
                <li>
                  <b>
                    {attr.attrId} {attr.name}{" "}
                    {attrsAssignment[attr.attrId] +
                      classModifiers[attr.attrId] +
                      typeModifiers[attr.attrId]}
                  </b>
                  <p>{attr.description}</p>
                </li>
              ))}
            </ul>
          </SelectedItemInfo>
        </FormColumn>
        <FormColumn>
          <h2>Umiejętności i perki</h2>
        </FormColumn>
      </FormContainer>
    </Container>
  );
};

export default CharacterCreationScreen;
