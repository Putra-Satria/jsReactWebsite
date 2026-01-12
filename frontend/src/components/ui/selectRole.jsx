import React from 'react'
import { Portal, Select, createListCollection } from "@chakra-ui/react"

const Roles = createListCollection({
  items: [
    { label: "HR", value: "HR" },
    { label: "Manager", value: "Manager" },
    { label: "Developer", value: "Developer" },
    { label: "Sales", value: "Sales" },
    { label: "Intern", value: "Intern" },

  ]
})

const SelectRole = ({setInfo}) => {
  return (
    <Select.Root 
    collection={Roles} 
    size="sm" 
    width="320px" 
    onChange={(e) => setInfo((prev) => ({...prev, Roles: e.target.value}))}>
      <Select.HiddenSelect />
      <Select.Label>Role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className="select">
            {Roles.items.map((role) => (
              <Select.Item item={role} key={role.value}>
                {role.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectRole

