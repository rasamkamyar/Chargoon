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
  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const handleContextMenuClick = (actionKey: MenuActionType) => {
    function removeItem(higherArchies:any, parentKey:any, targetKey: any) {
      let temp = treeData[0];
      let targetPath = [0];
      for(let i = 0; i<higherArchies.length ; i++){
        for(let j = 0; j<temp.children.length; j++){
          // if(parentKey == )
        }
      }
    }
    switch (actionKey.type) {
      case "DELETE":
        if (actionKey.payload.children.length === 0) {
          console.log("okkk");
        }
        break;
    }
  };

  const handleUpdateTree = (nodes: NodeType[]) => {};

  const handleUpdateNode = (key: string, data: any) => {};

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
