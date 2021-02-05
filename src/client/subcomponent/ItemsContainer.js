
// const util = require("@common/util");
import React, { useState } from 'react';
var classNames = require('classnames');

export default function ItemsContainer(props) {
    const [ open, setOpen ] = useState(false);
    const { className, items, neverCollapse } = props;
    const TOO_MUCH = 15;

    if (neverCollapse || items.length <= TOO_MUCH) {
        return (
            <ul className={classNames("dir-list container", className)}>
                {items}
            </ul>);
    } else {
        const _items = open ? items : items.slice(0, TOO_MUCH);
        const cn = classNames("item-container-expand-button", className, {
            "fas fa-arrow-down": !open,
            "fas fa-arrow-up": open,
        });
        return (
            <ul className={"dir-list container"}>
                {_items}
                <div className={cn} onClick={() => { setOpen(!open) }} > </div>
            </ul>);
    }
}
