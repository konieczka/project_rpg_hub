import styled from "styled-components";

export const TextInput = styled.input.attrs({ type: "text" })`
  font-size: 18px;
  background-color: transparent;
  width: 70%;
  color: white;
  outline: none;
`;

export const LabeledInputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

export const TextInputArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  max-width: 200px;
  min-width: 200px;
  min-height: 200px;
  max-height: 500px;
  color: white;
  font-size: 15px;
  padding: 4px;
  font-family: Quicksand;
`;

export const LabeledInput = ({ label, value, onChange }) => (
  <LabeledInputContainer>
    <strong>{label}</strong>
    <TextInput value={value} onChange={onChange} />
  </LabeledInputContainer>
);

export const LabeledTextArea = ({ label, value, onChange }) => (
  <LabeledInputContainer>
    <strong>{label}</strong>
    <TextInputArea value={value} onChange={onChange} />
  </LabeledInputContainer>
);
