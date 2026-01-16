import React, { useEffect, useState } from "react";
import SelectRole from "./selectRole.jsx";
import {
  Dialog,
  Button,
  CloseButton,
  Input,
  VStack,
  Field,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "../../../constants/global-variable.js";
import { queryClient } from "../../../utils/queryClient";

const EMPTY_FORM = {
  Name: "",
  Email: "",
  Age: "",
  Salary: "",
  Roles: "",
};

const InputEmployee = ({ type = "add", data, open, onClose }) => {
  const [info, setInfo] = useState(EMPTY_FORM);

  useEffect(() => {
    if (type === "update" && data) {
      setInfo({
        id: data.id,
        Name: data.name,
        Email: data.email,
        Age: data.age,
        Salary: data.salary,
        Roles: data.roles,
      });
    }

    if (type === "add") {
      setInfo(EMPTY_FORM);
    }
  }, [type, data, open]);

  function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

  function handleChanges(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const addEmployeeMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast.success("Employee added!");
      queryClient.invalidateQueries({ queryKey: ["employee_data"] });
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const editEmployeeMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await fetch(`${baseURL}/${payload.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast.success("Employee updated!");
      queryClient.invalidateQueries({ queryKey: ["employee_data"] });
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit() {
    if (!info.Name.trim()) {
    toast.error("Name is required")
    return
  }

  // Email
  if (!info.Email.trim()) {
    toast.error("Email is required")
    return
  }

  if (!isValidEmail(info.Email)) {
    toast.error("Please enter a valid email address")
    return
  }

  // Age
  if (info.Age === "") {
    toast.error("Age is required")
    return
  }

  const age = Number(info.Age)
  if (Number.isNaN(age)) {
    toast.error("Age must be a number")
    return
  }

  if (age < 18) {
    toast.error("Age must be 18 or above")
    return
  }

  // Salary
  if (info.Salary === "") {
    toast.error("Salary is required")
    return
  }

  const salary = Number(info.Salary)
  if (Number.isNaN(salary)) {
    toast.error("Salary must be a number")
    return
  }

  if (salary <= 0) {
    toast.error("Salary must be greater than 0")
    return
  }

  if (!info.Roles) {
  toast.error("Please select a role")
  return
}

  // Submit payload
  const payload = {
    ...info,
    Age: age,
    Salary: salary,
    Roles: info.Roles || null
  }

  if (type === "add") {
    addEmployeeMutation.mutate(payload)
  } else {
    editEmployeeMutation.mutate(payload)
  }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {if(!e.open) onClose() }}
      placement="center"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              {type === "add" ? "Add Employee" : "Edit Employee"}
            </Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap="4" align="stretch">
              <Field.Root required>
                <Field.Label>Name</Field.Label>
                <Input name="Name" placeholder="Enter your name here" value={info.Name} onChange={handleChanges} />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Email</Field.Label>
                <Input name="Email" placeholder="Enter your email here" value={info.Email} onChange={handleChanges} />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Age</Field.Label>
                <Input
                  name="Age"
                  type="text"
                  placeholder="Enter your age here"
                  value={info.Age}
                  onChange={handleChanges}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Salary</Field.Label>
                <Input
                  name="Salary"
                  type="text"
                  placeholder="Enter your salary here"
                  value={info.Salary}
                  onChange={handleChanges}
                />
              </Field.Root>

              <SelectRole setInfo={setInfo} />
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {type === "add" ? "Add" : "Update"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default InputEmployee;
