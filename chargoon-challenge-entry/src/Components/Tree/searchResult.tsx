import React, { useState } from 'react';
import { NodeType } from '../../types';
import { Popover } from 'antd';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
interface Props {
	items: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ items }: any) {
	const [isExtended, setIsExtended] = useState(true)


	
	return <div className='search-result' style={{height: isExtended? "400px": "30px", overflow: isExtended? "auto": "hidden", position:"relative", paddingTop: "50px"}}>
		<div style={{position:"absolute", height: "50px",top: "0", left: "50%", zIndex: "100", transform: "translateX(-50%)"}}>
        <button onClick={()=> setIsExtended(!isExtended)} style={{margin: "auto"}}>{isExtended? <ArrowDownIcon /> : <ArrowUpIcon />}</button>
      </div>
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