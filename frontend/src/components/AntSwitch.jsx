import { Switch } from '@mui/material'
import { styled } from '@mui/material/styles'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(18px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    transition: theme.transitions.create(['transform'], {
      duration: 300
    }),
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#0F4C81' : '#1890ff',
        opacity: 1,
        border: '1px solid transparent'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .2)',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'dark' ? '#b8b9c2' : '#ffffff',
    transition: theme.transitions.create(['width', 'background-color'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: theme.palette.mode === 'dark' ? '#4c4c4c' : '#c6c6c6',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300
    })
  }
}))

export default AntSwitch
