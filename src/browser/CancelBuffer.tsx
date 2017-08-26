import { Button } from '@zaibot/activitylogger-react';
import React from 'react';

import { PureConnect } from 'react-redux-pure';
import * as actions from '../actions';
import { Status } from '../buffer';
import { Task } from '../buffer/reducer';

export default PureConnect<{ item: Task }>(`PageBuffer`)(
  null,
  (dispatch, props) => ({
    onCancel: () => dispatch(actions.BUFFER_CANCEL({ id: props.item.id, time: Date.now() })),
  }),
  ({ item, onCancel }) => (
    item.status === Status.Error ? <Button secondary onClick={onCancel}>remove</Button> : null
  ));
