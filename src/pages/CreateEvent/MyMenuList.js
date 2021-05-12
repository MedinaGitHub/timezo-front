import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MyMenuList({ text, listItems, cbFunction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id={'myMenuButton'} aria-controls={`simple-menu${text}`} aria-haspopup="true" onClick={handleClick}>
        {text}
      </Button>
      <Menu
        id={`simple-menu${text}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {console.log('safafasfsafafa',listItems)}
        {listItems.length > 0 &&
          listItems.map((item,index) => (
          < MenuItem key={item._name + index} onClick={()=>cbFunction(item)}>{item._name}</MenuItem>
          ))
        }

      </Menu>
    </div >
  );
}
