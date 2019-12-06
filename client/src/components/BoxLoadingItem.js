import React from "react";

export default function BoxLoading() {
	const BoxItem = () => (
		<div className="box-loading">
	        <div className="box-thumbnail" />
	        <div className="box-line-sm" />
	        <div className="box-line-xs" />
		</div>
	);
  return(
    <>
			<BoxItem />
			<BoxItem />
			<BoxItem />
			<BoxItem />
			<BoxItem />
			<BoxItem />
			<BoxItem />
			<BoxItem />
    </>
  )
}
