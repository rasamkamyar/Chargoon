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
  const [searchResult, setSearchResult] = useState<any>([])
  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };
  const [newUser, setNewUser] = useState({
    key: '',
    title: '',
    parentKey: "",
    hierarchy: [],
    users: [
    ],
    accesses: [],
    children: []
  })


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
          setClipBord(null)
          setTreeData([...temp])
        } else alert("امکان چسباندن آیتم بر روی خودش وجود ندارد")
        break;
      case actions.ADD:
        setSelectedItem(actionKey.payload)
        break;
      default:
        console.log("default")
    }

  };
  const handleUpdateTree = (nodes: NodeType[]) => { };

  const handleUpdateNode = (key: string, data: any) => {

    let temp = treeData;
    function addItem(currentItem: any, targetKey: any, newUser: any) {

      if (currentItem.key === targetKey) {

        let newHigherarchy = currentItem.hierarchy
        newHigherarchy.push(newUser.key)
        currentItem.children.push({ ...newUser, parentKey: currentItem.key, hierarchy: newHigherarchy, children: [] })
      } else {
        for (let index = 0; index < currentItem.children.length; index++) {
          addItem(currentItem.children[index], targetKey, data);
        }
      }
    }

    for (let i = 0; i < temp.length; i++) {
      addItem(temp[i], key, data)
    }

    setTreeData([
      ...temp,
    ])
    setSelectedItem(null)
  }
  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
        searchResult: searchResult,
        setSearchResult: setSearchResult
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree setSelectedItem={setSelectedItem} handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form newUser={newUser} setNewUser={setNewUser} item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
