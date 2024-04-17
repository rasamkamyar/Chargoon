import React from "react";
import { NodeType, MenuActionType } from "../../types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";
import actions from "../../actions";

interface Props {
  node: NodeType;
  handleContextMenuClick: (key: MenuActionType) => void;
}

function Node({ node, handleContextMenuClick }: Props) {
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx id={node.key} title={node.title} />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx
          handleClick={() => { }}
          title={"افزودن زیرشاخه"}
          type="add"
          payload={node}
        />
        <ContextMenuItemEx
          handleClick={handleContextMenuClick}
          title={"برش"}
          type={actions.CUT}
          payload={node}
        />
        <ContextMenuItemEx
          handleClick={handleContextMenuClick}
          title={"چسباندن"}
          type={actions.PASTE}
          payload={node}
        />
        <ContextMenuItemEx
          handleClick={handleContextMenuClick}
          type={actions.DELETE}
          payload={node}
          title={"حذف"}
        />
      </ContextMenuEx>
    </div>
  );
}
export default Node;
