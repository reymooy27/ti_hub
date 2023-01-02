import React from 'react'
import Image from 'next/image';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Flex,
} from '@chakra-ui/react'

type DropdownMenuProps = {
  session: any,
  signOut: ()=> void
}

export default function DropdownMenu({session, signOut}: DropdownMenuProps) {
  return (
    <Menu arrowPadding={4}>
      <MenuButton>
        <Flex justifyContent='center' alignItems='center'>
          <Image src={session.user?.image as string} width={40} height={40} className='rounded-full' alt='profile-picture'/>    
        </Flex>
      </MenuButton>
      <MenuList bgColor={'#282828'}>
        <MenuGroup title='Profile'>
          <MenuItem backgroundColor={'#282828'} _hover={{bg: '#302e2e'}}>My Account</MenuItem>
          <MenuItem backgroundColor={'#282828'} _hover={{bg: '#302e2e'}}>My Account</MenuItem>
          <MenuItem onClick={signOut} backgroundColor={'#282828'} _hover={{bg: '#302e2e'}}>SignOut</MenuItem>
        </MenuGroup>
        {/* <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem backgroundColor={'#282828'} _hover={{bg: '#302e2e'}}>My Account</MenuItem>
          <MenuItem backgroundColor={'#282828'} _hover={{bg: '#302e2e'}}>My Account</MenuItem>
        </MenuGroup> */}
      </MenuList>
    </Menu>
  )
}
