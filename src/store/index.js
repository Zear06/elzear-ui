import { observable, computed } from 'mobx';

class UiState {
  @observable language = 'en_US';
  @observable pendingRequestCount = 0;

  @computed get appIsInSync() {
    return this.pendingRequestCount === 0;
  }
}

const singleton = new UiState();
export default singleton;
