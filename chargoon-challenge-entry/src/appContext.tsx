import React from 'react';
import { NodeType } from './types';


interface AppContext {
    updateTreeData: any;
    allUsers?: any;
    treeData: NodeType[];
    searchResult?: any;
    setSelectedItem?: any;
    setSearchResult?: any
    isAdding?: boolean;
    setIsAdding?: any;
}

const defaultAppContext: AppContext = {
    
    treeData: [],
    updateTreeData: null,
};

const AppContext = React.createContext<AppContext>(defaultAppContext);

export default AppContext;