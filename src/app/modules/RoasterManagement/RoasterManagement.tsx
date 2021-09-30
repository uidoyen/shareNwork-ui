import React from 'react';
import moment from 'moment';
import { PageSection, Title } from '@patternfly/react-core';
import Timeline, { TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { TimelineKeys } from './constants';
import generateFakeData from './utils/generateFakeData';


const resources = [
  { id: 1, title: 'Adnan Khan' },
  { id: 2, title: 'Saravana' },
  { id: 3, title: 'Rishiraj' },
];

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
];

const RoasterManagement: React.FC = () => {
  const [visibleTimeStart, setVisibleTimeStart] = React.useState(
    moment()
    .startOf('week')
    .valueOf()
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = React.useState(
    moment().
    startOf('day')
    .add(1, 'day')
    .valueOf()
  );
  const [unit, setUnit] = React.useState<string>('day');
  const [scrolling, setScrolling] = React.useState<boolean>(false);
  const timelineRef = React.useRef(null)

  const onPrevClick = () => {
    if(unit === 'day') {
      const zoom = visibleTimeEnd - visibleTimeStart;
      setVisibleTimeStart(visibleTimeStart - zoom);
      setVisibleTimeEnd(visibleTimeEnd - zoom);
    }    
    if(unit === 'week') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(-1, 'week')
        .startOf('week')
        .valueOf();

      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(-1, 'week')
        .endOf('week')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }

    if(unit === 'month') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(-1, 'month')
        .startOf('month')
        .valueOf();
        
      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(-1, 'month')
        .endOf('month')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }
    if(unit === 'year') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(-1, 'year')
        .startOf('year')
        .valueOf();
        
      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(-1, 'year')
        .endOf('year')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }      
  }

  const onNextClick = () => {
    if(unit === 'day') {
      const zoom = visibleTimeEnd - visibleTimeStart;
      setVisibleTimeStart(visibleTimeStart + zoom);
      setVisibleTimeEnd(visibleTimeEnd + zoom);
    }        
    if(unit === 'week') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(1, 'week')
        .startOf('week')
        .valueOf();

      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(1, 'week')
        .endOf('week')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }

    if(unit === 'month') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(1, 'month')
        .startOf('month')
        .valueOf();
        
      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(1, 'month')
        .endOf('month')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }
    if(unit === 'year') {
      const newVisibleTimeStart = moment(visibleTimeStart)
        .add(1, 'year')
        .startOf('year')
        .valueOf();
        
      const newVisibleTimeEnd = moment(visibleTimeStart)
        .add(1, 'year')
        .endOf('year')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }      
  }

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setVisibleTimeStart(visibleTimeStart)
    setVisibleTimeEnd(visibleTimeEnd);
    setScrolling(true);
  };
  const handleTimeHeaderChange = unit => {
    setUnit(unit)

    if(unit === 'day') {
      const newVisibleTimeStart = moment()
        .startOf('day')
        .valueOf();

      const newVisibleTimeEnd = moment()
        .endOf('day')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }    
    if(unit === 'week') {
      const newVisibleTimeStart = moment()
        .startOf('week')
        .valueOf();

      const newVisibleTimeEnd = moment()
        .endOf('week')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }

    if(unit === 'month') {
      const newVisibleTimeStart = moment()
        .startOf('month')
        .valueOf();
        
      const newVisibleTimeEnd = moment()
        .endOf('month')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }
    if(unit === 'year') {
      const newVisibleTimeStart = moment()
        .startOf('year')
        .valueOf();
        
      const newVisibleTimeEnd = moment()
        .endOf('year')
        .valueOf();
      
      setVisibleTimeStart(newVisibleTimeStart);
      setVisibleTimeEnd(newVisibleTimeEnd);
    }
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  const { groups, items } = generateFakeData();
  return (
    <PageSection>
      <div>
        <button onClick={onPrevClick}>{"< Prev"}</button>
        <button onClick={onNextClick}>{"Next >"}</button>
        <button onClick={() => handleTimeHeaderChange("day")}>
          {"Daily"}
        </button>
        <button onClick={() => handleTimeHeaderChange("week")}>
          {"Weekly"}
        </button>
        <button onClick={() => handleTimeHeaderChange("month")}>
          {"Monthly"}
        </button>
        <button onClick={() => handleTimeHeaderChange("year")}>
          {"Yearly"}
        </button>
        <Timeline
          // scrollRef={timelineRef} // TODO
          groups={groups}
          items={items}
          keys={TimelineKeys}
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          canMove={true}
          fullUpdate
          canResize={"both"}
          defaultTimeStart={visibleTimeStart}
          defaultTimeEnd={visibleTimeEnd}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onTimeChange={handleTimeChange}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
        >
          <TimelineHeaders>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </div>
    </PageSection>
  );
};

export default RoasterManagement;
