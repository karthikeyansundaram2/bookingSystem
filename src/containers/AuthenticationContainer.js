/* eslint react/prop-types: 0 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
export default function AuthenticationContainer(ComposedComponent) {
  class AuthenticationContainer extends React.Component {
    render() {
      return <ComposedComponent  {...this.props} />
    }
  }
  function mapStateToProps(state) {
    return {
      authReducer: state.authReducer,
    
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(ActionCreators, dispatch)
    };
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticationContainer);
}
