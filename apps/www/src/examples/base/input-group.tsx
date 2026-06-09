"use client"
import { InputGroup, InputGroupText } from "@static-ui/ui"
import { Input } from "@static-ui/ui"
export default function InputGroupDemo() {
  return (
    <InputGroup className="w-80">
      <InputGroupText>@</InputGroupText>
      <Input placeholder="username" />
    </InputGroup>
  )
}
