import React from 'react'
import { PageSection, Title } from '@patternfly/react-core';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
// import moment from 'moment'
import withDragDropContext from './withDnDContext';
import DemoData from './Data';
const ReactScheduler: React.FC = () => {

const schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week);
schedulerData.localeMoment.locale('en');
schedulerData.setResources(DemoData.resources);
schedulerData.setEvents(DemoData.events);

const [viewModel, setViewModel] = React.useState(schedulerData);

const nextClick = (schedulerData: SchedulerData)=> {
  schedulerData.next();
  schedulerData.setEvents(DemoData.events);
  setViewModel(schedulerData)
}

const prevClick = (schedulerData)=> {
  schedulerData.prev();
  schedulerData.setEvents(DemoData.events);
  setViewModel(schedulerData)
}

const onViewChange = (schedulerData: SchedulerData, view: View) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData)
}

const onSelectDate = (schedulerData: SchedulerData, date: string) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData)
}
//@ts-ignore
const eventClicked = (schedulerData: SchedulerData, event: any) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
};
//@ts-ignore
const ops1 = (schedulerData: SchedulerData, event: any) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
};
//@ts-ignore
const ops2 = (schedulerData: SchedulerData, event: any) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
};

const newEvent = (schedulerData: any, slotId:any, slotName:any, start:any, end:any, type:any, item:any) => {
    if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

        let newFreshId = 0;
        schedulerData.events.forEach((item:any) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        schedulerData.addEvent(newEvent);
        setViewModel(schedulerData)
    }
}

const updateEventStart = (schedulerData: any, event:any, newStart:any) => {
    if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
        schedulerData.updateEventStart(event, newStart);
    }
    setViewModel(schedulerData)
}

const updateEventEnd = (schedulerData: any, event:any, newEnd:any) => {
    if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
        schedulerData.updateEventEnd(event, newEnd);
    }
    setViewModel(schedulerData)
}

const moveEvent = (schedulerData: any, event:any, slotId:any, slotName:any, start:any, end:any) => {
    if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        setViewModel(schedulerData)
    }
}

const onScrollRight = (schedulerData: any, schedulerContent:any, maxScrollLeft:any) => {
    if(schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        setViewModel(schedulerData)

        schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
}
//@ts-ignore
const onScrollLeft = (schedulerData: any, schedulerContent:any, maxScrollLeft:any) => {
    if(schedulerData.ViewTypes === ViewTypes.Day) {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        setViewModel(schedulerData)

        schedulerContent.scrollLeft = 10;
    }
}
//@ts-ignore
const onScrollTop = (schedulerData: SchedulerData, schedulerContent:any, maxScrollTop:any) => {
    console.log('onScrollTop');
}
//@ts-ignore
const onScrollBottom = (schedulerData: SchedulerData, schedulerContent:any, maxScrollTop:any) => {
    console.log('onScrollBottom');
}

const toggleExpandFunc = (schedulerData: any, slotId:any) => {
    schedulerData.toggleExpandStatus(slotId);
    setViewModel(schedulerData)
}

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Roaster Management
      </Title>

      <Scheduler schedulerData={viewModel} 
        prevClick={prevClick}
        nextClick={nextClick}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
        eventItemClick={eventClicked}
        viewEventClick={ops1}
        viewEventText="Ops 1"
        viewEvent2Text="Ops 2"
        viewEvent2Click={ops2}
        updateEventStart={updateEventStart}
        updateEventEnd={updateEventEnd}
        moveEvent={moveEvent}
        newEvent={newEvent}
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        onScrollTop={onScrollTop}
        onScrollBottom={onScrollBottom}
        toggleExpandFunc={toggleExpandFunc}
      />
    </PageSection>
  );
}
const ReactBigScheduler = withDragDropContext(ReactScheduler)
export default ReactBigScheduler; 
