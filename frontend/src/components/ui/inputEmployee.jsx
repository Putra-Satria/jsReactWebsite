import React from "react"
import SelectRole from "./selectRole.jsx"
import {
  Dialog,
  Button,
  CloseButton,
  Input,
  VStack,
  Field,
} from "@chakra-ui/react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { baseURL } from "../../../constants/global-variable.js"
import { queryClient } from '../../../utils/queryClient';


const InputEmployee = () => {
  const [info, setInfo] = useState({Name: "", Email: "", Age: "", Salary: "", Roles: ""})

  function handleChanges(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}))
  }
  console.log(info)

  const mutation = useMutation({
    mutationFn: async(info) => {
      const response = await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {"content-type": "application/json"}
      })

      const data = await response.json()
      if(!response.ok) {
        throw new Error(data.error)
      }
      return data
    },

    onError: (error) => {
      toast.error(error.message)
    }, 
    
    onSuccess: (data) => {
      toast.success("Employee data has been added!")
      queryClient.invalidateQueries({queryKey: ["employee_data"]})
      
    }
  })
  
  const requiredFields = ["Name", "Email", "Age", "Salary"]
  function handleSubmits() {
    for(const key of requiredFields) {
      if(info[key] === "" || info[key] === null || info[key] === undefined) {
        toast.error("Missing one of the field!")
        return
      }
    }

    const payload = {
      Name: info.Name.trim(),
      Email: info.Email.trim(),
      Age: Number(info.Age),
      Salary: Number(info.Salary),
      Roles: info.Roles,
    }

    mutation.mutate(payload)
  }

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline">Add Employee</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Input Employee</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <VStack gap="4" align="flex-start">
            <Field.Root required>
              <Field.Label>Name</Field.Label>
              <Input name="Name" placeholder="Enter Name" value={info.Name} onChange={handleChanges}/>
            </Field.Root>
            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input name="Email" placeholder="Enter Email" value={info.Email} onChange={handleChanges}/>
            </Field.Root>
            <Field.Root required>
              <Field.Label>Age</Field.Label>
              <Input name="Age" type="number" placeholder="Enter Age" value={info.Age} onChange={handleChanges}/>
            </Field.Root>
            <Field.Root required>
              <Field.Label>Salary</Field.Label>
              <Input name="Salary" type="number" placeholder="Enter Salary" value={info.Salary} onChange={handleChanges}/>
            </Field.Root>
            <SelectRole setInfo={setInfo}/>
          </VStack>
        </Dialog.Body>

        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button onClick={handleSubmits}>Add</Button>
        </Dialog.Footer>

        <Dialog.CloseTrigger asChild>
          <CloseButton size="sm" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default InputEmployee
