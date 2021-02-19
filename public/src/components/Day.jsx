import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Record, { StyledRecord } from './Record';

export const DayContainer = styled.div`
  ${({ theme }) => css`
    min-width: ${theme.maxWidth};
    max-width: ${theme.maxWidth};
  `}
  ${StyledRecord} + ${StyledRecord} {
    margin-top: .25em;
  }
  flex: 1;
  margin: .25em 0;
`;
export const DaysContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 1em;
  overflow-x: auto;
  ${DayContainer} + ${DayContainer} {
    margin-left: .5em;
  }
`;
export const Day = ({ records }) => (
  <DayContainer>
    {records.map((record) => <Record key={record.id} data={record} />)}
  </DayContainer>
);

Day.propTypes = {
  records: PropTypes.array.isRequired,
};

export default Day;