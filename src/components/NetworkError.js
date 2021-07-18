import React from 'react'
import { FcWiFiLogo } from 'react-icons/fc'
import { BiRefresh } from 'react-icons/bi'

const NetworkError = ({ retry }) => 
<div className="no-internet">
    <FcWiFiLogo size={100} />
    <p>Check Your Internet conntetion <br/> and try again</p>
    <BiRefresh size={40} className="btn" onClick={()=> retry()} />
</div>

export default NetworkError