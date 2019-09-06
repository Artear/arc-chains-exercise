/* React */
import React from "react";
import PropTypes from "prop-types";

const listItems = {
  unordered: "ul",
  ordered: "ol",
  ul: "ul",
  ol: "ol"
};

const isList = item => {
  const { type } = item;
  return type === "list";
};

const renderListItem = (item, index, nextItem = {}) => {
  const { content } = item;
  const properListType = listItems[nextItem.list_type];
  const nextItemIsAList = isList(nextItem);

  return (
    <li key={index}>
      <span dangerouslySetInnerHTML={{ __html: content }} />
      {nextItemIsAList ? (
        <List key={index} items={nextItem.items} listType={properListType} />
      ) : null}
    </li>
  );
};

const List = props => {
  const { listType = "ul", classes, items = [] } = props;

  if (items.length === 0) return null;

  const ListType = listItems[listType] || listType;

  return (
    <ListType className={classes}>
      {items.map((item, index) => {
        if (isList(item) && items[index - 1] && !isList(items[index - 1]))
          return null;
        if (isList(item)) {
          return (
            <List
              key={index}
              listType={listItems[item.list_type] || "ul"}
              items={item.items}
            />
          );
        }
        const nextItem = items[index + 1];
        return renderListItem(item, index, nextItem);
      })}
    </ListType>
  );
};

List.propTypes = {
  classes: PropTypes.string,
  items: PropTypes.array,
  listType: PropTypes.string
};

export default List;
