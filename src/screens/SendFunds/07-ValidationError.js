/* @flow */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { Account } from "@ledgerhq/live-common/lib/types";

import { accountScreenSelector } from "../../reducers/accounts";

import colors from "../../colors";
import ValidateError from "./ValidateError";

type Props = {
  account: Account,
  navigation: NavigationScreenProp<{
    params: {
      accountId: string,
      deviceId: string,
      transaction: *,
      error: Error,
    },
  }>,
};

class ValidationError extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  dismiss = () => {
    const { navigation } = this.props;
    if (navigation.dismiss) {
      const dismissed = navigation.dismiss();
      if (!dismissed) navigation.goBack();
    }
  };

  contactUs = () => {
    console.warn("not implemented");
  };

  retry = () => {
    const { navigation } = this.props;
    // $FlowFixMe
    navigation.replace("SendValidation", {
      ...navigation.state.params,
    });
  };

  render() {
    const { navigation } = this.props;
    const error = navigation.getParam("error");

    return (
      <View style={styles.root}>
        <ValidateError
          error={error}
          onRetry={this.retry}
          onClose={this.dismiss}
          onContactUs={this.contactUs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  center: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state, props) => ({
  account: accountScreenSelector(state, props),
});

export default connect(mapStateToProps)(ValidationError);
