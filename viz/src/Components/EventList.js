import React from 'react';

import EventItem from './EventItem.js';

function EventList(props) {
  const {events, currentPage, totalPages, onDetails} = props;
  return (
    <div className="col-xs-8">
      {
        events.map((event) => <EventItem event={event} onDetails={onDetails} key={event.id} />)
      }
      <p className="text-center">
        <small>Page&nbsp;: {currentPage} / {totalPages}</small>
      </p>
    </div>);
}

export default EventList;
