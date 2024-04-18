import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import React, { useContext, useMemo, useRef, useState } from "react";
import AppContext from "../../appContext";
import { NodeType, MenuActionType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";
import { Console } from "console";

const { Search } = Input;

interface Props {
  setSelectedItem: any,
  handleContextMenuClick: (key: MenuActionType) => void;
}

const TreeExtended: React.FC<Props> = ({ handleContextMenuClick, setSelectedItem }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef();
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const [searchResultList, setSearchResultList] = useState<any>([]);
  const { treeData } = useContext(AppContext);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentSearchResult: any = [];
    let addressPath: any = []
    let searchTemp: string= "";

    function findNodeTitle(currentNode: any, key: string) {

      if (currentNode.key === key) {
        searchTemp = currentNode.title
      } else {
        for (let index = 0; index < currentNode.children.length; index++) {
          findNodeTitle(currentNode.children[index], key)
        }
      }
    }

    function searchNodes(currentNode: any, tempAddress: any) {

      if (currentNode.title.includes(e.target.value)) {
        
        if(currentNode.hierarchy.length > 0){
          for(let i = 0; i<currentNode.hierarchy.length; i++){
            findNodeTitle(treeData[0], currentNode.hierarchy[i])      
            addressPath.push(searchTemp)

          }
        }
        currentSearchResult.push({
          ...currentNode,
          nodeAddress: addressPath
        });

        addressPath = []
        searchTemp = ""

      }
      if (currentNode.children.length != 0) {
        for (let i = 0; i < currentNode.children.length; i++) {
          searchNodes(currentNode.children[i], tempAddress)
        }
      }
    }
    searchNodes(treeData[0], [])
    if(currentSearchResult.length > 0) {
      setSearchResultList(currentSearchResult)
    }else {
      setSearchResultList([])
    }
    
    
  };

  const handlePressEnter = () => {
    setSearchResultVisible(true);
  };

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  };

  const handleSelectNode = (selectedKeys: any, e: any) => {
    setSelectedItem({
      ...e.selectedNodes[0]
    })
  }

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={handleSelectNode}
      />
      {searchResultVisible && <SearchResult items={searchResultList} />}
    </div>
  );
};

export default TreeExtended;
