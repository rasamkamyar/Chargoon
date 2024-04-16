import React from 'react';
import { NodeType } from '../../types';
interface Props {
	items: (NodeType & { hierarchy: string[] })[]
}

function SearchResult({ items }: Props) {
	return <div className='search-result' style={{height: 200, overflow: 'auto'}}>
		{items.map(item => (
			<div>
				{item.title}
			</div>
		))
		}
	</div>
}
export default SearchResult;