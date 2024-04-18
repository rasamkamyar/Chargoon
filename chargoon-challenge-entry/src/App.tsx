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
      case actions.ADD:
        setSelectedItem(actionKey.payload)
        break;
    }

  };
  const handleUpdateTree = (nodes: NodeType[]) => { };

  //   // function pushNewUser(node:any, targetKey:string){
  //   //   if(node.key == targetKey){
  //   //     node.children.push(data)

  //   //   } else {
  //   //     for(let i = 0; i<node.children.length; i++) {
  //   //       pushNewUser(node.children[i], targetKey);
  //   //     }
  //   //   }
  //   // }
  //   let flag = true;
  //   function pushNewUser(currentItem: any, targetKey: any) {
  //     if (flag) {
  //       if (currentItem.key === targetKey) {

  //         flag = false
  //         currentItem.children.push({ ...data })
  //       } else {
  //         for (let index = 0; index < currentItem.children.length; index++) {
  //           pushNewUser(currentItem.children[index], targetKey)
  //         }
  //       }
  //     }
  //   }
  //   for (let i = 0; i < temp.length; i++) {
  //     pushNewUser(temp[i], key)
  //   }
  //   setTreeData([...temp])
  // };

  const handleUpdateNode = (key: string, data: any) => {
    debugger
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

    addItem(temp[0], key, data)

    setTreeData([
      ...temp,
    ])
    
  }
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
