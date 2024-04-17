import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { NodeType, MenuActionType } from "./types";
import actions from "./actions";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState<NodeType[]>([]);
  const [clipBoard, setClipBord] = useState<NodeType | null>(null)
  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const handleContextMenuClick = (actionKey: MenuActionType) => {
    let temp = treeData;

    function deleteItem(parentNode: any, targetKey: any) {
      let flag: boolean = true;
      if (parentNode.children.length) {
        for (let i = 0; i < parentNode.children.length; i++) {
          if (parentNode.children[i].key === targetKey) {
            parentNode.children = parentNode.children.filter(function (item: any) {
              return item.key != targetKey
            })
            flag = false;
          }
        }
        for (let i = 0; flag && i < parentNode.children.length; i++) {
          deleteItem(parentNode.children[i], targetKey)
        }
      }
    }

    function pasteItem(currentItem: any, targetKey: any) {

      if (currentItem.key === targetKey) {
        for (let i = 0; i < temp.length; i++) {
          deleteItem(temp[i], clipBoard.key)
        }
        let newHigherarchy = currentItem.hierarchy
        newHigherarchy.push(currentItem.key)
        currentItem.children.push({ ...clipBoard, parentKey: currentItem.key, hierarchy: newHigherarchy })

      } else {
        for (let index = 0; index < currentItem.children.length; index++) {
          pasteItem(currentItem.children[index], targetKey)
        }
      }
    }
    switch (actionKey.type) {
      case actions.DELETE:
        if (actionKey.payload.children?.length === 0) {
          for (let i = 0; i < temp.length; i++) {
            deleteItem(temp[i], actionKey.payload.key)
          }
          setTreeData([...temp])
        } else (alert("آیتم دارای زیرشاخه امکان حذف ندارد"))
        break;
      case actions.CUT:
        if (actionKey.payload.children?.length === 0) {
          setClipBord(actionKey.payload)
        } else alert("آیتم دارای زیرشاخه امکان کات کردن ندارد")
        break;
      case actions.PASTE:
        if (actionKey.payload.key !== clipBoard?.key) {
          for (let index = 0; index < temp.length; index++) {
            pasteItem(temp[index], actionKey.payload.key)
          }

          setTreeData([...temp])
        } else alert("امکان چسباندن آیتم بر روز خودش وجود ندارد")
        break;
    }

  };
  const handleUpdateTree = (nodes: NodeType[]) => { };

  const handleUpdateNode = (key: string, data: any) => { };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
