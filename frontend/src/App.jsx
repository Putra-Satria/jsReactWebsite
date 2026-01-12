import { VStack } from '@chakra-ui/react'
import React from 'react'
import EmployeeTable from './components/ui/employeeTable'
import { useQuery } from '@tanstack/react-query'
import { baseURL } from '../constants/global-variable'
import InputEmployee from './components/ui/inputEmployee'


const App = () => {

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
      <InputEmployee/>
      <EmployeeTable data={data}/>
    </VStack>
  )
}


export default App