import React, { Component } from "react";
import { Switch } from "react-router-dom";
import TopNav from "./Main/TopNav";
import Menu from "./Main/Menu";
import ProtectedRoute from "./common/ProtectedRoute";
import Home from "./Home/Home";

import "../asset_theme/global/css/bootstrap.min.css";
import "../asset_theme/materialadmin.css";
import "../asset_theme/center/assets/css/site.min.css";
import "../asset_theme/global/vendor/animsition/animsition.css";
import "../asset_theme/global/vendor/asscrollable/asScrollable.css";
import "../asset_theme/global/vendor/slidepanel/slidePanel.css";
import "../asset_theme/global/vendor/flag-icon-css/flag-icon.css";
import "../asset_theme/global/fonts/material-design/material-design.min.css";
import "../asset_theme/global/fonts/font-awesome/font-awesome.min.css";
import "../asset_theme/center/assets/skins/daihatsu.css";
import "../asset_theme/global/vendor/alertify-js/alertify.css";
import "../asset_theme/center/assets/examples/css/advanced/alertify.css";
import "../asset_theme/center/assets/examples/css/uikit/tooltip-popover.css";
import "../asset_theme/global/vendor/asscrollable/asScrollable.css";
import "../asset_theme/center/assets/examples/css/advanced/scrollable.css";
import "../asset_theme/center/assets/examples/css/layouts/panel-transition.css";
import "../asset_theme/global/vendor/cropper/cropper.css";
import "../asset_theme/center/assets/examples/css/forms/image-cropping.css";
import "../asset_theme/center/assets/examples/css/apps/media.css";
import "../asset_theme/global/vendor/bootstrap-treeview/bootstrap-treeview.css";
import "../asset_theme/center/assets/examples/css/structure/pagination.css";
import "../asset_theme/global/vendor/toastr/toastr.css";
import "../asset_theme/center/assets/examples/css/advanced/toastr.css";
import "../asset_theme/global/vendor/filament-tablesaw/tablesaw.css";
import "../asset_theme/center/assets/examples/css/uikit/utilities.css";
import "../asset_theme/global/vendor/editable-table/editable-table.css";
import "../asset_theme/global/vendor/jquery-selective/jquery-selective.css";
import "../asset_theme/center/assets/examples/css/forms/masks.css";
import "../asset_theme/global/css/bootstrap-extend.min.css";

class MainPage extends Component {
  state = {};
  render() {
    document.body.className = document.body.className.replace("login-page", ""); // to fix the login page CSS clashing with the rest
    return (
      <React.Fragment>
        <TopNav />
        <div id="content">
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
          </Switch>
        </div>
        <Menu location={this.props.location} />
      </React.Fragment>
    );
  }
}

export default MainPage;
