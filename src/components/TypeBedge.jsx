import {Badge, HStack, Icon, Text} from "@chakra-ui/react"
import { getTypeConfig } from "../config/pokemonTypes";

export default function TypeBadge({typeName}) {
  const typeConfig = getTypeConfig(typeName);
  return (
    <Badge
      // colorPalette={typeConfig.color}
      bg={typeConfig.bgColor}
      color={typeConfig.color}
      fontSize="sm"
      fontWeight="semibold"
    >
      <HStack>
        <Icon as={typeConfig.icon} color={typeConfig.color} />
        <Text>{typeConfig.displayName}</Text>
      </HStack>

    </Badge>
  )
}