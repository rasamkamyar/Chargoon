import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { Button, Popover } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getUsers } from '../../transportLayer';
import AppContext from '../../appContext';
interface Props { }
function Table({ newUser , setNewUser }: any) {
	
	const {allUsers} = useContext(AppContext)
	
	
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
				{newUser?.users?.map(function (item: any) {
					
					
					let itemId = allUsers?.find((userItem: any) => userItem.label == item.title).value
				
					const deleteBtn = (
						<button onClick={() => {
							setNewUser(function (prev: any) {
								return {
									...newUser,
									users: prev.users.filter((filterItem: any) => filterItem.title != item.title)
								}
							})
						}}>حذف</button>
					)
					
					return (
						<tr className='tableStyle' key={item.title} >
							<td>
								<Popover content={deleteBtn} trigger="click">
									<img src='/dots.png' width="40px" height="40px" />
								</Popover>
							</td>
							<td> <input type="checkbox"
								onChange={(e: any) => {
									
								}}
							/> </td>
							<td>{itemId ? itemId : ""}</td>
						</tr>
					)
				})}

			</tbody>
		</table>
	)
}
export default Table