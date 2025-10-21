import { Avatar, Button, Menu, Portal, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { logout } from "../services/auth";

export default function MenuWithAvatar() {

  const { user } = useContext(AuthContext)
  const handleLogout = async () => {
    await logout();
    console.log("로그아웃")
  }

  return (
    <Menu.Root>
      <Menu.Trigger>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user.displayName || user.email} />
            <Avatar.Image src={user.photoURL} />
          </Avatar.Root>
      </Menu.Trigger>
      {/** 최상단 위치하게 하기 위해 Portal 사용 */}
      <Portal>
        <Menu.Positioner>
          <Menu.Content borderRadius="lg">
            <Menu.Item 
              value="profile" 
              cursor="default"
              pointerEvents="none"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            >
              <Text fontWeight="medium">안녕하세요, {user.displayName || user.email}님.</Text>
            </Menu.Item>
            <Menu.Separator/>
            <Menu.Item value="logout" asChild>
              <Button 
                width="100%" 
                borderRadius="full"
                variant="outline"
                onClick={handleLogout}
                _hover ={{
                  cursor:"pointer"
                }}
              >로그아웃</Button>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}