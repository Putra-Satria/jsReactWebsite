import React from 'react'
import { For, HStack, Stack, Table } from "@chakra-ui/react"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { baseURL } from '../../../constants/global-variable';
import { toast } from 'react-hot-toast';
import { queryClient } from '../../../utils/queryClient';

const EmployeeTable = ({data}) => {
  if(!data.length) {
    return <h1>You don't have any data in the Database</h1>
  }

  const mutation =  useMutation({
    mutationFn: async(ID) => {
      const response = await fetch(baseURL + '/' + ID, {
        method: "DELETE",
        headers: {"content-type": "application/json"} 
      })

      const data = await response.json()
      if(!response.ok) {
        throw new Error(data.error)
      }
      return data
    },

    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    }, 

    onSuccess: () => {
      toast.success("Employee data successfully deleted!")
      queryClient.invalidateQueries({queryKey: ["employee_data"]})
    }
  })
  return (
    <Stack gap="10">
      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Age</Table.ColumnHeader>
            <Table.ColumnHeader>Salary</Table.ColumnHeader>
            <Table.ColumnHeader>Roles</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.age}</Table.Cell>
              <Table.Cell>{item.salary}</Table.Cell>
              <Table.Cell>{item.roles}</Table.Cell>

              <Table.Cell>
                <HStack size="3">
                  <MdDeleteForever size={20} className='icon' onClick={() => mutation.mutate(item.id)}/>
                  <FaEdit size={20} className='icon'/>
                </HStack>
                
              </Table.Cell>      
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  )
}


export default EmployeeTable
