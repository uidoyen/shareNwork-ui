import React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import moment from "moment";
import Timeline from "react-calendar-timeline";
import generateFakeData from "./utils/randomData";
import { TimelineKeys } from './constants';
import 'react-calendar-timeline/lib/Timeline.css';

const RoasterManagement: React.FC = () => {;
  const { groups, items } = generateFakeData();
  const [defaultTimeStart, setDefaultTimeStart] = React.useState(moment().startOf("day").toDate())
  const [defaultTimeEnd, setDefaultTimeEnd] = React.useState(moment().startOf("day").add(1, "day").toDate())
  const [resources, setResources] = React.useState(groups);
  const [candidates, setCandidates] = React.useState(items);

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = resources[newGroupOrder];
    setResources(candidates.map(candidate =>
      candidate.id === itemId
        ? Object.assign({}, candidate, {
            start: dragTime,
            end: dragTime + (candidate.end - candidate.start),
            group: group.id
          })
        : candidate
    ))


    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    setResources(candidates.map(candidate =>
      candidate.id === itemId
        ? Object.assign({}, candidate, {
            start: edge === "left" ? time : candidate.start,
            end: edge === "left" ? candidate.end : time
          })
        : candidate
    ));

    console.log("Resized", itemId, time, edge);
  };

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Roaster Management
      </Title>
      <Timeline
        groups={groups}
        items={items}
        keys={TimelineKeys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      />
    </PageSection>
  )
}

export default RoasterManagement;
