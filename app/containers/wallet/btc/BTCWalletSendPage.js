// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { intlShape } from 'react-intl';
import WalletSendForm from '../../../components/wallet/WalletSendForm';
import type { InjectedProps } from '../../../types/injectedPropsType';
import globalMessages from '../../../i18n/global-messages';
import { DECIMAL_PLACES_IN_LUX, MAX_INTEGER_PLACES_IN_LUX } from '../../../config/numbersConfig';

type Props = InjectedProps;

@inject('stores', 'actions') @observer
export default class BTCWalletSendPage extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { uiDialogs } = this.props.stores;
    const { wallets, transactions } = this.props.stores.lux;
    const { actions } = this.props;
    const { isValidAddress } = wallets;
    const { calculateTransactionFee, validateAmount } = transactions;
    const activeWallet = wallets.active;

    // Guard against potential null values
    if (!activeWallet) throw new Error('Active wallet required for WalletSendPage.');

    return (
      <WalletSendForm
        currencyUnit={intl.formatMessage(globalMessages.unitLux)}
        currencyMaxIntegerDigits={MAX_INTEGER_PLACES_IN_LUX}
        currencyMaxFractionalDigits={DECIMAL_PLACES_IN_LUX}
        validateAmount={validateAmount}
        calculateTransactionFee={(receiver, amount) => (
          calculateTransactionFee(activeWallet.id, receiver, amount)
        )}
        addressValidator={isValidAddress}
        isDialogOpen={uiDialogs.isOpen}
        openDialogAction={actions.dialogs.open.trigger}
        balance={activeWallet.amount.toFormat(DECIMAL_PLACES_IN_LUX)}
      />
    );
  }

}