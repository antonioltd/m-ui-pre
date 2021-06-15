import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar,
  useScrollTrigger,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "7em",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    marginLeft: "25px",
    minWidth: "10px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "20px",
    height: "45px",
    color: "white",
  },
  menu: {
    background: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/customsoftware" },
    { name: "Mobile App Development", link: "/mobileapps" },
    { name: "Website Development", link: "/websites" },
  ];

  useEffect(() => {
    if (window.location.pathname === "/" && value !== "0") {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== "1") {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== "2") {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== "3") {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== "4") {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== "5") {
      setValue(5);
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters={true}>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            <Tabs
              indicatorColor="primary"
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Home"
              ></Tab>
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab}
                component={Link}
                onMouseOver={(event) => handleClick(event)}
                to="/services"
                label="Services"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                to="/revolution"
                label="Revolution"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                to="/about"
                label="About Us"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                to="contact"
                label="Contact Us"
              ></Tab>
            </Tabs>
            <Button
              component={Link}
              to="/estimate"
              color="secondary"
              variant="contained"
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                  key={option}
                  onClick={(event) => {
                    handleMenuItemClick(event, i);
                    setValue(1);
                    handleClose();
                  }}
                  selected={i === selectedIndex && value === 1}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};
export default Header;
