import { AutoComplete, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../../transportLayer';


const UserAutoComplete: any = ({onAdd}:any) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string | null; value: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>("");

  
  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    })
  }, []);


  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter(o => o.label.indexOf(searchText) > -1 )
    );
  };

  const onSelect = (data: string) => {
    setSelectedItem(data)
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
    
      />
     <button onClick={()=>onAdd(selectedItem)}>افزودن</button>
    </>
  );
};

export default UserAutoComplete;