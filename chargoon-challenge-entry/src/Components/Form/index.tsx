import { Button, Input, Tabs } from 'antd';
import React, { useMemo, useState } from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';
import Table from '../Table';
import { NodeType } from '../../types';

interface Props {
	item: any;
	updateNode: (key: string, data: any) => void
}

function Form({ item, updateNode }: Props) {
	const [mockData, setMockData] = useState([{
		operation: true,
		checked: false,
		code: item?.key
	}])
	const [checkedItems, setCheckedItems] = useState([]);


	const [newUser, setNewUser] = useState({
		key: '',
		title: '',
		parentKey: item?.key,
		hierarchy: [],
		users: [
		],
		accesses: [],
		children: []
	})


	const handleSave = () => {
		updateNode(item.key, newUser)
	}
	console.log(newUser)

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content flex flex-col '>
							<BasicInformation initialValue={item}
								newUser={newUser}
								setNewUser={setNewUser}
							/>
							{item && (
								<Table mockData={mockData} setMockData={setMockData} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
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
				<Button type='primary' onClick={handleSave}>ذخیره</Button>
			</div>
			<ActionBar actions={[]} />
		</div>
	);
}
export default Form