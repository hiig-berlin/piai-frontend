import React, { useState } from 'react';
import styled from 'styled-components';
import safeHtml from '~/utils/sanitize';
import { Reveal } from '~/components/ui/Reveal';
import { Icon } from '../../shared/ui/Icon';
import { ActiveFilterOption } from './ActiveFilterOption';
import { FieldCheckbox } from './FieldCheckbox';
import { ClearAll } from './ClearAll';

// Styled components
const Container = styled.div``;

const OptionsContainer = styled.div`
  padding-top: var(--size-3);
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
`;

const Active = styled.div`
  display: flex;
  width: 100%;
  gap: var(--size-3);
`;

const Selected = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-1);
  flex-grow: 1;

  & .labelAll {
    color: var(--color-light-grey);
    font-family: var(--font-family-monospace);
    font-size: var(--text-small-font-size);
  }
`;

const Add = styled.div`
  flex-grow: 0;

  & .svg {
    min-height: var(--size-2);
  }
`;

const Dropdown = styled.select`
  width: 100%;

  // Reset select appearance
  // black background with white button line
  // white triangle at the right

  appearance: none;
  background: #000;
  border: 1px solid #fff;
  border-width: 0 0 1px 0;
  color: #fff;



`;

// Component
export const AttributeSelector = ({
  label,
  labelAllShown,
  options,
  activeTerms,
  debug,
  updateState,
  clearAllOnClick,
  singleSelect = false, // Optional prop with default value false
}: {
  label: string;
  debug?: boolean;
  labelAllShown: string;
  options: string[]; // List of names
  activeTerms: string[] | string; // List of active names or single name for singleSelect
  clearAllOnClick?: () => void;
  updateState: (name: string, isChecked: boolean) => void; // Simplified to handle a single name
  singleSelect?: boolean; // Optional singleSelect prop
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle option change for multi-select
  const handleOptionChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState(name, event.target.checked);
  };

  // Handle selection change for single-select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateState(event.target.value, true); // Single select always sets isChecked to true
  };

  return (
    <Container>
      <H4>
        {safeHtml(label)}
        <Add>
          <Icon
            className="textLink"
            type={isOpen ? 'minus' : 'plus'}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? 'Collapse' : 'Select'}
          </Icon>
        </Add>
      </H4>

      <Active>
        <Selected>
          {singleSelect ? (
            <div>
              {activeTerms && typeof activeTerms === 'string' ? (
                <ActiveFilterOption
                  key={activeTerms}
                  onRemove={() => {
                    updateState(activeTerms, false);
                  }}
                  label={activeTerms}
                />
              ) : (
                <span
                  className="labelAll"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {labelAllShown}
                </span>
              )}
            </div>
          ) : (
            <>
              {Array.isArray(activeTerms) && activeTerms.length > 0 ? (
                activeTerms.map((term) => (
                  <ActiveFilterOption
                    key={term}
                    onRemove={() => {
                      updateState(term, false);
                    }}
                    label={term}
                  />
                ))
              ) : (
                <span
                  className="labelAll"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {labelAllShown}
                </span>
              )}
              {typeof clearAllOnClick === 'function' && activeTerms.length > 0 && (
                <ClearAll onClick={clearAllOnClick} />
              )}
            </>
          )}
        </Selected>
      </Active>

      <Reveal open={isOpen} id={`${label}-options`} role="region" position="top">
        <OptionsContainer>
          {singleSelect ? (
            <Dropdown value="{activeTerms || ''}" onChange={handleSelectChange}>
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Dropdown>
          ) : (
            options.map((option) => (
              <FieldCheckbox
                key={option}
                label={option}
                value={option}
                name={`field-${option}`}
                isChecked={activeTerms.includes(option)}
                updateState={handleOptionChange(option)}
              />
            ))
          )}
        </OptionsContainer>
      </Reveal>
    </Container>
  );
};
