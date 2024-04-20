import { Button, Form, Input } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import UserAutoComplete from './user-autocomplete';
import { title } from 'process';
import AppContext from '../../appContext';

interface Props {
	initialValue?: any;
}

function BasicInformation({ newUser, setNewUser }: any) {
	const [form] = Form.useForm();
	const {allUsers} = useContext(AppContext)



	function handleChange(e: any) {
		const { value, name } = e.target

		setNewUser(function (prev: any) {
			return {
				...prev,
				[name]: value,
			}
		})
	}

	function handleAddUser(title: string){
		
		const result = newUser?.users?.find((item: any) => item.title == title)
		console.log(result)
		if(result){
			alert("کاربری مورد نظر در حال حاضر وجود دارد")
		}else {
			setNewUser((prev: any) => {
				const myUser = allUsers.find((user : any) => user.value == title)
				return {
					...prev,
					users: [
						...prev.users,
						{
							title: myUser?.label,
							isDefault: false
						}
					]
				}
			})
		}
	}

	

	return (
		<Form>
			<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input type='text' value={newUser?.title ? newUser.title : ""} name='title' onChange={handleChange} />
				<span style={{display: "none"}}>{newUser?.title ? newUser.title : "harhci"}</span>
			</Form.Item>
			<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
				<Input name="key" value={newUser?.key ? newUser.key : ""} onChange={handleChange} />
				<span style={{display: "none"}}>{newUser?.key ? newUser.key : "harhci"}</span>
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete onAdd={handleAddUser} />
			</Form.Item>

		</Form>
	);
}
export default BasicInformation