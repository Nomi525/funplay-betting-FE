import React from 'react'
import Index from '../../Index'

export default function BlueOutlineButton(props) {
    return (
        <>

            <Index.Box className='outline-blue-btn-main'>
                <Index.Button className={props.className}  disabled={props.disabled} type={props.type} onClick={props.onClick}><span>{props.btnLabel}</span></Index.Button>
            </Index.Box>

        </>
    )
}
