import React from 'react';
import { PureConnect } from 'react-redux-pure';
import { createSelector } from 'reselect';

import { Status } from '../buffer';
import State from '../store/state';
import ItemBuffer from './ItemBuffer';

const queueItems = createSelector(
  (state: State) => state.buffer.tasks,
  (tasks) => {
    return tasks.slice(0).sort((a, b) => b.creationTime - a.creationTime);
  },
);
const queueLength = createSelector(
  queueItems,
  (combined) => combined.reduce((state, cur) => state + (cur.status !== Status.Sent ? 1 : 0), 0),
);
export default PureConnect(`PageBuffer`)(
  (state: State) => ({
    items: queueItems(state),
    queue: queueLength(state),
  }),
  (dispatch) => ({
  }),
  ({ items, queue }) => (
    <div>
      {queue ? (<h2>{queue} submission(s) in queue</h2>) : (<h2>Server up-to-date</h2>)}
      {items.slice(0, 10).map((item) => <ItemBuffer item={item} />)}
      {items.length > 10 ? <div>{items.length - 10} more items</div> : null}
    </div>
  ));
