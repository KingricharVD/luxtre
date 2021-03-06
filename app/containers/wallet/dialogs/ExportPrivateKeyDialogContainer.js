// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { StoresMap } from '../../../stores/index';
import type { ActionsMap } from '../../../actions/index';
import environment from '../../../environment';
import resolver from '../../../utils/imports';

const ExportPrivateKeyDialog = resolver('components/wallet/ExportPrivateKeyDialog');

type Props = {
  exportPrivateKey: Function,
  stores: any | StoresMap,
  actions: any | ActionsMap,
};

@inject('actions', 'stores') @observer
export default class ExportPrivateKeyDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  handleExportPrivateKeySubmit = (publicKey: string) => (
      this.props.exportPrivateKey(publicKey)
  );

  render() {
    const { actions } = this.props;
    const { wallets } = this.props.stores[environment.API];
    const { isValidAddress } = wallets;
    const activeWallet = wallets.active;

    if (!activeWallet) throw new Error('Active wallet required for WalletSendPage.');

    return (
      <ExportPrivateKeyDialog
        onSubmit={this.handleExportPrivateKeySubmit}
        addressValidator={isValidAddress}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
        }}
      />
    );
  }

}
