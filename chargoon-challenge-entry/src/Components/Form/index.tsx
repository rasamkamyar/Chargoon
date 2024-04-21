import { Button, Input, Tabs } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';
import Table from '../Table';
import { NodeType } from '../../types';
import AppContext from '../../appContext';

interface Props {
	newUser: any,
	setNewUser: any,
	item: any;
	updateNode: (key: string, data: any,) => void
}

function Form({ item, updateNode }: any) {
	const {isAdding} = useContext(AppContext)
	
	const [checkedItems, setCheckedItems] = useState([]);


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

	  useMemo(() => {

		if(isAdding){
			setNewUser({
				...item,
				title: "",
				key: "",
				children: [],
				users: [],
				accesses: []

			})
		}else {
			setNewUser({
				...item,
				
			})
		}
		
	  }, [item])



	const handleSave = () => {
	
		updateNode(item.key, newUser)
		setNewUser(function(prev: any){
			return {
				...prev,
				key: "",
				title: ""
				
			}
		})
		
	}

	

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content flex flex-col '>
							<BasicInformation 

								
								
								newUser={newUser}
								setNewUser={setNewUser}
							/>
							
							{item && (
								<Table setNewUser={setNewUser} newUser={newUser} />
							)}
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={item} setNewUser={setNewUser} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
				{
					isAdding && item && <Button type='primary' onClick={handleSave}>ذخیره</Button>
				}
			</div>
			<ActionBar actions={[]} />
		</div>
	);
}
export default Form