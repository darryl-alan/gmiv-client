import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../common/Auth";
import menuImg from "../../asset/logo3.jpg";
class Menu extends Component {
  constructor(props) {
    super(props);
    const menu = Auth.getMenu();
    let open = "";
    const openGroup = menu
      .filter(e => e.controller == "")
      .filter(e => this.hasActiveChildren(e.children));
    if (openGroup.length) {
      open = openGroup[0].title;
    }
    this.state = {
      open,
      menu
    };
  }

  hasActiveChildren = menu => {
    const items = menu.filter(item => (item.controller ? true : false));
    const menugroups = menu.filter(item => item.controller == "");

    if (
      items.filter(
        item =>
          "/" + item.controller.toLowerCase() === this.props.location.pathname
      ).length > 0
    ) {
      return true;
    } else if (menugroups.length) {
      return this.hasActiveChildren(menugroups);
    } else {
      return false;
    }
  };

  handleToggle = e => {
    let title = e.currentTarget.getAttribute("datatitle");
    if (title === this.state.open) {
      this.setState({ open: "" });
    } else {
      this.setState({ open: title });
    }
  };
  renderMenuItems = menu => {
    return menu.map(item => {
      if (item.controller) {
        // means it's a menu item
        let active = "";
        const pathname = this.props.location.pathname;
        if (
          pathname === "/" + item.controller.toLowerCase() ||
          (pathname === "/" && item.controller === "Home")
        ) {
          active = "active";
        }
        return (
          <li key={item.controller} className={"site-menu-item " + active}>
            <Link to={"/" + item.controller.toLowerCase().replace("home", "")}>
              {item.icon ? (
                <i className={"site-menu-icon " + item.icon} />
              ) : null}
              <span className="site-menu-title">{item.title}</span>
            </Link>
          </li>
        );
      } else {
        let isActive = this.hasActiveChildren(item.children);
        return (
          <li
            key={item.title}
            className={
              "site-menu-item has-sub" +
              (item.title === this.state.open ? " open" : "") +
              (isActive ? " active" : "")
            }
          >
            <a
              href="javascript:void(0)"
              datatitle={item.title}
              onClick={this.handleToggle}
            >
              {item.icon ? (
                <i className={"site-menu-icon " + item.icon} />
              ) : null}
              <span className="site-menu-title">{item.title}</span>
              <span className="site-menu-arrow" />
            </a>
            <ul className="site-menu-sub">
              {/*recursively call serve to display submenus*/}
              {this.renderMenuItems(item.children)}
            </ul>
          </li>
        );
      }
    });
  };

  render() {
    const menu = this.state.menu;

    const menuItems = this.renderMenuItems(menu);

    return (
      <div className="site-menubar site-menubar-dark">
        <div className="site-menubar-header">
          <div className="cover overlay">
            <img className="cover-image" src={menuImg} alt="" />
          </div>
        </div>
        <div
          className="site-menubar-body scrollable scrollable-inverse is-enabled scrollable-vertical"
          style={{ position: "relative", height: "410px" }}
        >
          <div
            className="scrollable-container"
            style={{ height: "400px", width: "277px" }}
          >
            <div className="scrollable-content" style={{ width: "260px" }}>
              <ul className="site-menu">{menuItems}</ul>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#610b05",
            position: "fixed",
            width: "260px",
            height: "40px",
            bottom: "0"
          }}
        >
          <div style={{ padding: "10px", marginLeft: "20px", color: "white" }}>
            <strong>&copy;2019 PT. Gaya Motor</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
