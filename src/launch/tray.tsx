import Electron from 'electron';
import notifier from 'node-notifier';
import { Store } from 'redux';
import * as saga from 'redux-saga';
import * as actions from '../actions';
import { Action, isType } from '../actions';
import Config from '../config';
import State from '../store/state';
import Menu from './tray/menu';

export function* rootSaga() {
  yield saga.takeEvery(actions.ERROR_APPLICATION.type, showApplicationError);
}

function showApplicationError(action: Action<any>) {
  if (isType(actions.ERROR_APPLICATION, action)) {
    notifier.notify({
      title: 'Activity Logger Error',
      message: `${action.payload.message}\nSee error log for more details`,
    });
  }
}

let appIcon: Electron.Tray = null;
export default (store: Store<State>) => {
  if (appIcon) { return appIcon; }
  // https://www.flaticon.com/free-icon/clock-circular-outline_59252#term=time&page=1&position=51
  const pathIcon = Config.resolveStatic('ic_access_time_white_24dp_1x.png');
  appIcon = new Electron.Tray(pathIcon);
  const contextMenu = Electron.Menu.buildFromTemplate(Menu);
  appIcon.on('click', () => {
    if (store.getState().window.visible) {
      store.dispatch(actions.WINDOW_HIDE({}));
    } else {
      store.dispatch(actions.WINDOW_SHOW({}));
    }
  });
  appIcon.setContextMenu(contextMenu);
  return appIcon;
};
