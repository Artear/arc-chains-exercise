import React from "react";
import { CompositeDecorator, EditorState, RichUtils } from "draft-js";
import PropTypes from "prop-types";

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} className="arc-link">
      {props.children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node,
  contentState: PropTypes.object,
  entityKey: PropTypes.string
};

export const linkDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

export const insertLinkIntoState = (editorState, urlValue) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url: urlValue
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });

  const returnState = RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey
  );

  return returnState;
};

export const getHyperlinkFromSelection = editorState => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    let url = "";
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      // TODO: remove prefer desctructuring rule?
      /* eslint-disable-next-line */
      url = linkInstance.getData().url;
    }

    return url;
  }
  return undefined;
};

export const removeLinkFromState = editorState => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return RichUtils.toggleLink(editorState, selection, null);
  }
  return editorState;
};
