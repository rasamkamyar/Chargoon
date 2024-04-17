import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { Button, Popover } from 'antd';
import React from 'react';
interface Props { }
function Table({ mockData, setMockData, checkedItems, setCheckedItems }: any) {
	return (
		<table>
			<thead>
				<tr className='tableStyle'>
					<td >عملیات</td>
					<td>پیش فرض</td>
					<td>کد</td>
				</tr>
			</thead>
			<tbody>
				{mockData.map(function (item: any) {

					return (
						<tr className='tableStyle' key={item.key} >
							<td>
								<Popover content="" title="Delete" trigger="click">

									<img src='/dots.png' width="40px" height="40px" />


								</Popover>
							</td>
							<td> <input type="checkbox"
							// checked={checkedItems.includes(item.key) ? true : false}
							//  onChange={() => {
							// 	setMockData(function(prev: any) {
							// 		return prev.map(function(rowItem: any, index:number) {
							// 			if(rowItem.key == item.key){

							// 				return {
							// 					...rowItem,
							// 					checked: !rowItem.checked
							// 				}
							// 			}else {
							// 				return {
							// 					...rowItem
							// 				}
							// 			}
							// 		})
							// 	})
							// 	// if(checkedItems.includes(item.key)){
							// 	// 	setCheckedItems(function(prev: any) {
							// 	// 		return prev.filter(function(item:any) {
							// 	// 			return item != item.key
							// 	// 		})
							// 	// 	})
							// 	// }else {
							// 	// 	setCheckedItems(function(prev : any) {
							// 	// 		return [
							// 	// 			...prev,
							// 	// 			item.key
							// 	// 		]
							// 	// 	})
							// 	// }

							// }}


							/> </td>
							<td> {item.code} </td>
						</tr>
					)
				})}

			</tbody>
		</table>
	)
}
export default Table