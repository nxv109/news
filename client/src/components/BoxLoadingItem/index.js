import React from "react";
import { createArrayLength } from "../../helpers"

export default function({ number = 8 }) {
	const boxItemList = createArrayLength(number);
	const BoxItem = () => (
		<div className="box-loading">
      <div className="box-thumbnail" />
      <div className="box-line-sm" />
      <div className="box-line-xs" />
		</div>
	);
  return(
    <React.Fragment>
			{
				boxItemList.map((v, i) => (
					<BoxItem key={i} />
				))
			}
    </React.Fragment>
  )
}
