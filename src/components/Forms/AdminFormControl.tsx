import React from 'react'
import FormList from './FormList'
import FormBuilder from './FormBuilder'

const AdminFormControl:React.FC = () => {

   
  return (
    <div className="container mx-auto py-8">
      Edit the forms
      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
          <FormList/>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Form</h2>
       <FormBuilder/>
        </div>
      </div>
    </div>
  )
}

export default AdminFormControl
