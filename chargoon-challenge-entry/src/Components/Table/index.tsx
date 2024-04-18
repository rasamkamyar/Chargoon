import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { Button, Popover } from 'antd';
import React from 'react';
interface Props { }
function Table({ mockData, setMockData, checkedItems, setCheckedItems }: any) {
	console.log(mockData)
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

					const deleteBtn = (
						<button onClick={() => {
							setMockData(function (prev: any) {
								return prev.filter(function (currentItem: any) {
									return currentItem.id !== item.id
								})
							})
						}}>حذف</button>
					)
					return (
						<tr className='tableStyle' key={item.code} >
							<td>
								<Popover content={deleteBtn} trigger="click">
									<img src='/dots.png' width="40px" height="40px" />
								</Popover>
							</td>
							<td> <input type="checkbox"
								onChange={(e: any) => {
									setMockData(function (prev: any) {
										return prev.map(function (currentItem: any) {
											if (currentItem.id === item.id) {
												return { ...currentItem, checked: !! e.checked }
											} else {
												return { ...currentItem }
											}
										})
									})
								}}
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