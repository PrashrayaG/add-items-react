import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert,list}) => {

  useEffect (()=> {
    const timeOut = setTimeout(()=> {
      removeAlert()
    },3000) // alert will go after 3 sec

    return () => clearTimeout(timeOut)
  },[list])

  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
