import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';

import {requestItem, enterEditor, leaveEditor, patchItem, EDITOR_REQUEST_NONE} from './ducks';
import EventForm from './EventForm';
import GroupForm from './GroupForm';


function submitPatch({itemType, id, initial, email, token}) {
  return function(data, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(patchItem({
        itemType,
        id,
        initial,
        data,
        defer: {resolve, reject}
      }));
    });
  };
}

function mapStateToProps(state, props) {
  const {itemType, id} = props.params;
  const {email, token} = props.location.query;
  const {initial, request, entered} = state.editor[itemType];
  const item = state.api[itemType][id] || null;
  return {
    itemType,
    id,
    item,
    initial,
    request,
    entered,
    email, token
  }
}

function mapDispatchToProps(dispatch, props) {
  const {itemType, id} = props.params;

  return {
    requestItem: () => dispatch(requestItem(itemType, id)),
    enterEditor: (item) => dispatch(enterEditor(itemType, item)),
    leaveEditor: () => dispatch(leaveEditor(itemType)),
    submitPatch: (params) => () => dispatch(submitPatch(params))
  }
}

function mergeProps(stateProps, dispatchProps) {
  const {itemType, id, initial, email, token} = stateProps;
  const {submitPatch} = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    submitPatch: submitPatch({itemType, id, initial, email, token})
  };
}

const components = {
  'evenements': EventForm,
  'groupes': GroupForm
};

class Editor extends React.Component {
  //  props: {
  // itemType e,
  // id: l'identifiant de l'élément,
  // item: la copie cachée de l'item telle qu'elle existe,
  // initial: la copie sur laquelle l'édition a démarrée,
  // request: y a-t-il une requête prévue ?,
  // entered: l'édition a-t-elle commencée ?
  // }

  dispatchAll() {
    if (this.props.item === null && this.props.request === EDITOR_REQUEST_NONE) {
      this.props.requestItem();
    }
    if (!this.props.entered && this.props.item !== null) {
      this.props.enterEditor(this.props.item);
    }
  }

  componentDidMount() {
    this.dispatchAll();
  }

  componentDidUpdate() {
    this.dispatchAll();
  }

  componentWillUnmount() {
    this.props.leaveEditor();
  }

  render() {
    const Component = components[this.props.itemType];

    if (this.props.entered) {
      return <div className="container">
        <Component initialValues={this.props.initial}/>
      </div>
    } else {
      return <Spinner spinnerName='three-bounce' noFadeIn/>;
    }
  }
}

const connectedEditor = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
export default connectedEditor;
