import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Cliente' icon='fa fa-address-book' />
        <MenuTree label='Cadastro' icon='edit'> 
            <MenuItem path='city'
                label='Cidades' icon='fa fa-archway' />
        </MenuTree>
    </ul>
)