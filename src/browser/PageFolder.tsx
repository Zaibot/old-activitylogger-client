import { Label, Reference, Button } from '@zaibot/activitylogger-react';
import React from 'react';
import { PureConnect } from 'react-redux-pure';
import * as actions from '../actions';
import selectors from '../store/selectors';
import State from '../store/state';

export default PureConnect(`PageFolder`)(
  (state: State) => ({
    statusConnection: selectors.statusConnection(state),
    serverUrl: selectors.config(state).serverUrl,
    sourceId: selectors.config(state).sourceId,
    timelineId: selectors.config(state).timelineId,
    folders: selectors.folder(state).folders,
  }),
  (dispatch) => ({
    onAddFolder: () => dispatch(actions.MONITORFOLDER_INIT({})),
  }),
  ({ folders, onAddFolder }) => (
    <div>
      <ul>
        {folders.map(({ path }) => <li><Label>{path}</Label> <Reference>GIT</Reference></li>)}
        {folders.length ? null : <li>No folders specified</li>}
      </ul>
      <Button primary onClick={onAddFolder}>Add</Button>
    </div>
  ));
