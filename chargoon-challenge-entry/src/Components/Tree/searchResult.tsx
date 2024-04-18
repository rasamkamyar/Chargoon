import React from 'react';
import { NodeType } from '../../types';
import { Popover } from 'antd';
interface Props {
	items: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ items }: any) {

	
	return <div className='search-result' style={{height: 200, overflow: 'auto'}}>
		{items.map(function(item:any) {
		
			let elements = item?.nodeAddress?.map(function(addressItem: any, index:number){
				return (
					<div style={{paddingRight: `${index*25}px`}}>
						&gt; {addressItem} 
					</div>
				)
			})
			elements.pop()

			return (
			<div>
				
				<Popover content={elements} title="مسیر: " trigger="hover">
					{item.title}
				</Popover>
			</div>
			)
		})
		}
	</div>
}
export default SearchResult;