/* React */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* Components */
import Logo from "./Logo";

/* Data */
import fusionDocs from "./fusion-docs.json";

class SideMenu extends PureComponent {
  generateMenuItems = menuItems => {
    const menuKeys = Object.keys(menuItems || {});
    return menuKeys.map((menuKey, index) => {
      const menuParent = menuItems[menuKey];

      return (
        <ul key={index} className="menu">
          <span className="key">{menuKey.toUpperCase()}</span>
          {menuParent.map((menuItem, itemIndex) => {
            return (
              <li key={itemIndex} className="item">
                <a
                  className="link"
                  href={`/alc/articles/${menuKey}/${menuItem}`}
                >
                  {menuItem}
                </a>
              </li>
            );
          })}
        </ul>
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <nav
        className={`side_menu | col widescreen-3 desktop-3 tablet-3 ${classes}`}
      >
        <span className="header">
          <Logo />
          <span className="title">ALC (Fusion Docs)</span>
        </span>
        <span className="content">{this.generateMenuItems(fusionDocs)}</span>
      </nav>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.string
};

export default SideMenu;
