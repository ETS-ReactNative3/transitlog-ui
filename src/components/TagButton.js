import React from "react";
import styled from "styled-components";

export const TagButton = styled.button`
  margin: 0.3rem 0.25rem;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  border-radius: 4px;
  border: 1px solid var(--lighter-grey);
  background: #fefefe;
  outline: 0;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  padding: 0;
  cursor: pointer;
`;

export const ColoredIconSlot = styled.span`
  padding: 3px 3px 3px 5px;
  background-color: transparent;
  color: ${({color}) => color};
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-weight: bold;
  justify-content: flex-start;
  margin-right: 0.25rem;
  min-width: 5rem;

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 2px;
    margin-top: -1px;
  }
`;

export const ColoredBackgroundSlot = styled.span`
  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
  border-radius: 4px;
  line-height: 1rem;
  padding: 4px 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({backgroundColor}) => backgroundColor};
  color: ${({color}) => color};
  transform: translate(1px, -2px);
  margin-bottom: -4px;
  min-width: 5rem;

  &:empty {
    display: none;
  }
`;

export const PlainSlot = styled.span`
  min-width: 4rem;
  padding: 3px 8px;
  border-left: 1px solid var(--lighter-grey);
  font-weight: bold;
`;

export const PlainSlotSmallRight = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  border-left: 0;
  font-weight: normal;
  min-width: 4rem;
  padding: 3px 8px;
  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
`;
