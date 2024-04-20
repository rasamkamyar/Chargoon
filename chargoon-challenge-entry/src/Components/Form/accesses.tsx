import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';

interface Props {
	initialValue?: any;
}

function Accesses({ setNewUser, initialValue }: any) {
	const [options, setOptions] = useState([]);
	
	const fetchAccessList = async () => {
		const result = await getAccessList();
		const options = result.map(item => ({ ...item, value: item.id }))
		setOptions(options);
	}

	useEffect(() => {
		fetchAccessList()
	}, [])


	const handleOnChange = (checkedValues: any) => {
		const accessesList: any = []

		options.forEach(option => {
			if (checkedValues.includes(option.id)) {
				accessesList.push(option)
			}	
		});
		setNewUser(function (prev: any) {
			return (
				{
					...prev,
					accesses: accessesList
				}
			)
		})

	};
	
	return (
		<Checkbox.Group options={options as any} onChange={handleOnChange} />
	);
}
export default Accesses