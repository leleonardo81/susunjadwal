import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

import SelectedCourses from "containers/SelectedCourses";
import Schedule from "containers/ViewSchedule/Schedule";

const HideBodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

function transformSchedules(schedules) {
  return schedules
    .map(schedule =>
      schedule.schedule_items.map(item => ({
        ...item,
        name: schedule.name
      }))
    )
    .reduce((prev, now) => [...prev, ...now], []);
}

function Detail() {
  const schedules = useSelector(state => state.schedules);

  return (
    <Container>
      <HideBodyOverflow />
      <Schedule
        schedule={{ schedule_items: transformSchedules(schedules) }}
        pxPerMinute={0.3}
        width="100%"
        startHour={8}
        endHour={21}
        mobile
      />
      <SelectedCourses />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  z-index: 322;
  padding: 1rem;
  overflow: auto;
`;

export default Detail;
