export interface UserType {
  title: string;
  isDefault: boolean;
}
export interface NodeType {
  title: string;
  users: UserType[];
  key: string;
  children?: NodeType[];
  parentKey?: string;
  data?: any[];
  hierarchy: string[];
  accesses: string[];
}



export interface MenuActionType {
	type:string,
	payload:any,
}
