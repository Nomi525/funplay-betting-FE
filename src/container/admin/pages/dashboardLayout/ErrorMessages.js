import React from 'react'
import { ErrorMessage } from 'formik'


const ErrorMessages = ({ name }) => {
  return (
    <div className='error-message'>
      <ErrorMessage name={name} />
    </div>
  )
}

export default ErrorMessages
