import React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

export function ColorModeSwitcher () {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      size="md"
      fontSize="lg"
    />
  )
}