import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import EmployeeTable from './components/ui/employeeTable'
import { useQuery } from '@tanstack/react-query'
import { baseURL } from '../constants/global-variable'
import InputEmployee from './components/ui/inputEmployee'
import { Button, Box } from '@chakra-ui/react'
import { Dialog } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/react'

const App = () => {
  const [addOpen, setAddOpen] = useState(false);

  async function fetchEmployeeData(params) {
    const res = await fetch(baseURL)
    const data = await res.json()

    if(!res.ok) {
      throw new Error(data.error)
    }
    return data
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["employee_data"],
    queryFn: fetchEmployeeData
  })

  if(isPending) return "Loading"
  if(isError) return error.message
  console.log("Data from the database: ", data)

  return (
    
      <VStack gap="6" align="flex-start">

        <h1 style={{ fontSize: "24px", fontWeight: 600 }}>
          Putra's Employee Data Management Table
        </h1>

        <Button variant="outline" onClick={() => setAddOpen(true)}>
          Add Employee
        </Button>

        <EmployeeTable data={data} />

        <InputEmployee
          type="add"
          open={addOpen}
          onClose={() => setAddOpen(false)}
        />
      </VStack>
  )
}


export default App