angular.module('modit-templates', ['../../../public/app/templates/app.tpl.html', '../../../public/app/templates/home-templates/data-picker-popup.tpl.html', '../../../public/app/templates/home-templates/data-picker.tpl.html', '../../../public/app/templates/home-templates/home.tpl.html', '../../../public/app/templates/home-templates/includes/chart-char.js.tpl.html', '../../../public/app/templates/home-templates/includes/chart-d3.tpl.html', '../../../public/app/templates/home-templates/includes/filters.tpl.html', '../../../public/app/templates/home-templates/includes/secondary-filters.tpl.html', '../../../public/app/templates/home-templates/includes/table-simple.tpl.html', '../../../public/app/templates/home-templates/includes/table.tpl.html', '../../../public/app/templates/user-nav.tpl.html', '../../../public/app/templates/welcome.tpl.html']);

angular.module("../../../public/app/templates/app.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/app.tpl.html",
    "<div class=\"admin-header col-lg-12\">\n" +
    "	<a ng-href=\"//{{CORE_HOST}}\" class=\"pull-left\">\n" +
    "		<img class=\"modit-logo\" ng-src=\"{{logo}}\" >\n" +
    "	</a>\n" +
    "	<span class=\"pull-left text-warning text-large admin-tag\"><b>Admin</b></span>\n" +
    "	\n" +
    "	<div ui-view=\"usernav\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div ui-view=\"main\" class=\"admin-main col-lg-12\"></div>");
}]);

angular.module("../../../public/app/templates/home-templates/data-picker-popup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/data-picker-popup.tpl.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "    <li ng-transclude></li>\n" +
    "    <li ng-show=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "      <span class=\"btn-group\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default-dark\" ng-click=\"today()\">{{currentText}}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default-dark\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">{{toggleWeeksText}}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default-dark\" ng-click=\"clear()\">{{clearText}}</button>\n" +
    "      </span>\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"isOpen = false\">{{closeText}}</button>\n" +
    "    </li>\n" +
    "  </ul>");
}]);

angular.module("../../../public/app/templates/home-templates/data-picker.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/data-picker.tpl.html",
    " <table>\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th ng-show=\"showWeekNumbers\" style=\"width: 30px;\"></th>\n" +
    "        <th>\n" +
    "          <button type=\"button\" class=\"btn btn-default-dark btn-sm pull-left\" ng-click=\"move(-1)\">\n" +
    "            <i class=\"fa fa-angle-left\"></i>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "        <th colspan=\"{{rows[0].length - 2}}\">\n" +
    "          <button type=\"button\" class=\"btn btn-default-dark btn-sm btn-block\" ng-click=\"toggleMode()\">\n" +
    "            <strong>{{title}}</strong>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          <button type=\"button\" class=\"btn btn-default-dark btn-sm pull-right\" ng-click=\"move(1)\">\n" +
    "            <i class=\"fa fa-angle-right\"></i>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr ng-show=\"labels.length > 0\" class=\"h6\">\n" +
    "        <th ng-show=\"showWeekNumbers\" class=\"text-center\">W#</th>\n" +
    "        <th ng-repeat=\"label in labels\" class=\"text-center\">{{label}}</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"row in rows\">\n" +
    "        <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
    "        <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
    "          <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default-dark btn-sm\" ng-class=\"{'btn-info': dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>");
}]);

angular.module("../../../public/app/templates/home-templates/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/home.tpl.html",
    "<div >\n" +
    "  \n" +
    "  <div ng-show=\"TARGET_VERSION == 2\">\n" +
    "    <div class=\"admin-home\">\n" +
    "      <p class=\"lead\">Metrics Dashboard</p>\n" +
    "      \n" +
    "      <div ng-include=\"templateBaseUrl + 'home-templates/includes/filters.tpl.html'\"></div>\n" +
    "      \n" +
    "      <hr>\n" +
    "      <p ng-show=\"!data.$resolved\">\n" +
    "        Loading...\n" +
    "      </p>\n" +
    "      <div ng-include=\"templateBaseUrl + 'home-templates/includes/table-simple.tpl.html'\"></div>\n" +
    "      \n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"TARGET_VERSION == 3 || TARGET_VERSION == 4\">\n" +
    "    <div class=\"admin-home\">\n" +
    "      <p class=\"lead\">Metrics Dashboard</p>\n" +
    "      \n" +
    "      \n" +
    "      <div ng-include=\"templateBaseUrl + 'home-templates/includes/filters.tpl.html'\"></div>\n" +
    "      \n" +
    "      \n" +
    "      <hr>\n" +
    "      <p ng-show=\"!data.$resolved\">\n" +
    "        Loading...\n" +
    "      </p>\n" +
    "      <div class=\"container-fluid\">\n" +
    "        <tabset ng-show=\"data.$resolved\">\n" +
    "        <tab heading=\"Chart\" active=\"tabs[1].active\">\n" +
    "          <div ng-include=\"templateBaseUrl + 'home-templates/includes/chart-d3.tpl.html'\"></div>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Table\" active=\"tabs[0].active\">\n" +
    "          <div ng-show=\"complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table.tpl.html'\"></div>\n" +
    "          <div ng-show=\"!complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table-simple.tpl.html'\"></div>\n" +
    "        </tab>\n" +
    "        </tabset>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"TARGET_VERSION == 5 || TARGET_VERSION == 6\">\n" +
    "    <div class=\"admin-home\">\n" +
    "      <p class=\"lead\">Metrics Dashboard\n" +
    "        <span>\n" +
    "          <a class=\"btn-link text-small\" ng-click=\"optionsCollapsed = !optionsCollapsed\">\n" +
    "            {{optionsCollapsed ? 'Filter': 'Hide Filters'}}\n" +
    "          </a>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "      \n" +
    "      <div ng-init=\"optionsCollapsed = true\" collapse=\"optionsCollapsed\">\n" +
    "        <div ng-include=\"templateBaseUrl + 'home-templates/includes/filters.tpl.html'\"></div>\n" +
    "        <!-- <div ng-include=\"templateBaseUrl + 'home-templates/includes/secondary-filters.tpl.html'\"></div> -->\n" +
    "      </div>\n" +
    "      \n" +
    "      <hr>\n" +
    "      <p ng-show=\"!data.$resolved\">\n" +
    "        Loading...\n" +
    "      </p>\n" +
    "      <div class=\"container-fluid\">\n" +
    "        <tabset ng-show=\"data.$resolved\">\n" +
    "          <tab heading=\"Chart\" active=\"tabs[1].active\">\n" +
    "            <div ng-include=\"templateBaseUrl + 'home-templates/includes/chart-d3.tpl.html'\"></div>\n" +
    "          </tab>\n" +
    "          <tab heading=\"Table\" active=\"tabs[0].active\">\n" +
    "            <div ng-show=\"complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table.tpl.html'\"></div>\n" +
    "            <div ng-show=\"!complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table-simple.tpl.html'\"></div>\n" +
    "          </tab>\n" +
    "        </tabset>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"TARGET_VERSION == 7 || TARGET_VERSION == 8\" >\n" +
    "    <div class=\"admin-home\">\n" +
    "      <p class=\"lead\">Metrics Dashboard\n" +
    "        <span>\n" +
    "          <a class=\"btn-link text-small\" ng-click=\"optionsCollapsed = !optionsCollapsed\">\n" +
    "            {{optionsCollapsed ? 'Filter': 'Hide Filters'}}\n" +
    "          </a>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "      \n" +
    "      <div ng-init=\"optionsCollapsed = true\" collapse=\"optionsCollapsed\">\n" +
    "        <div ng-include=\"templateBaseUrl + 'home-templates/includes/filters.tpl.html'\"></div>\n" +
    "        <!-- <div ng-include=\"templateBaseUrl + 'home-templates/includes/secondary-filters.tpl.html'\"></div> -->\n" +
    "      </div>\n" +
    "      \n" +
    "      <hr>\n" +
    "      <p ng-show=\"!data.$resolved\">\n" +
    "        Loading...\n" +
    "      </p>\n" +
    "      <div class=\"container-fluid\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-md-offset-1 col-md-10\">\n" +
    "            <tabset ng-show=\"data.$resolved\">\n" +
    "            <tab heading=\"Chart\" active=\"tabs[1].active\">\n" +
    "            <div ng-include=\"templateBaseUrl + 'home-templates/includes/chart-char.js.tpl.html'\"></div>\n" +
    "            </tab>\n" +
    "            <tab heading=\"Table\" active=\"tabs[0].active\">\n" +
    "            <div ng-show=\"complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table.tpl.html'\"></div>\n" +
    "            <div ng-show=\"!complexChart\" ng-include=\"templateBaseUrl + 'home-templates/includes/table-simple.tpl.html'\"></div>\n" +
    "            </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"false\"  class=\"admin-home\">\n" +
    "    <p class=\"lead\">Metrics Dashboard\n" +
    "      \n" +
    "      <span>\n" +
    "        <a class=\"btn-link text-small\" ng-click=\"optionsCollapsed = !optionsCollapsed\">\n" +
    "          {{optionsCollapsed ? 'Filter': 'Hide Filters'}}\n" +
    "        </a>\n" +
    "      </span></p>\n" +
    "      <div ng-init=\"optionsCollapsed = true\" collapse=\"optionsCollapsed\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"form-group col-sm-3\">\n" +
    "            <label class=\"form-label\">Metric</label>\n" +
    "            <select class=\"form-control\" ng-model=\"metric\">\n" +
    "              <option value=\"user\">Users</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"form-group col-sm-3\">\n" +
    "            <label class=\"form-label\">Date Range</label>\n" +
    "            <select class=\"form-control\" ng-model=\"range\" ng-options=\"o.label for o in rangeOptions\">\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"form-group col-sm-3\" ng-show=\"range.label === 'Custom'\">\n" +
    "            <label class=\"form-label\">Start</label>\n" +
    "            <input type=\"text\" class=\"form-control\" datepicker-popup show-weeks=\"false\" ng-model=\"range.start\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-sm-3\" ng-show=\"range.label === 'Custom'\">\n" +
    "            <label class=\"form-label\">End</label>\n" +
    "            <input type=\"text\" class=\"form-control\" datepicker-popup show-weeks=\"false\" ng-model=\"range.end\" />\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <hr>\n" +
    "      <p ng-show=\"!data.$resolved\">\n" +
    "        Loading...\n" +
    "      </p>\n" +
    "      <tabset ng-show=\"data.$resolved\">\n" +
    "      <tab heading=\"Table\" active=\"tabs[0].active\">\n" +
    "      <div ng-show=\"data.$resolved && data.length\" class=\"results\" ng-class=\"{ 'trail1': resultInt1, 'trail2': resultInt2 }\">\n" +
    "        \n" +
    "        <div class=\"results-header\">\n" +
    "          \n" +
    "          <div class=\"row lead\">\n" +
    "            <div class=\"col-xs-2\">Date</div>\n" +
    "            <div class=\"var-col\">New</div>\n" +
    "            \n" +
    "            <div class=\"var-col\">Total</div>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"row\" ng-show=\"resultInt1\">\n" +
    "            <div class=\"col-xs-2\">&nbsp;</div>\n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row\">\n" +
    "                <div>1d</div>\n" +
    "                <div>{{resultInt1}}d</div>\n" +
    "                <div ng-show=\"resultInt2\">{{resultInt2}}d</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row\" ng-show=\"method.label != 'Sum'\">\n" +
    "                <div>1d</div>\n" +
    "                <div>{{resultInt1}}d</div>\n" +
    "                <div ng-show=\"resultInt2\">{{resultInt2}}d</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"results-main\">\n" +
    "          <div class=\"row day\" ng-repeat=\"day in filtered = (data | slice:trail | orderBy:'-date':true) \">\n" +
    "            <div class=\"col-xs-2\">{{day.date | date:'mediumDate'}}</div>\n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row text-success\">\n" +
    "                <div new=\"\">{{day.new | number}}</div>\n" +
    "                <div new=\"trail1\" ng-show=\"resultInt1\" >{{day | trailing:method:resultInt1:'new' | number}}</div>\n" +
    "                <div new=\"trail2\" ng-show=\"resultInt2\">{{day | trailing:method:resultInt2:'new' | number}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            \n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row text-primary\">\n" +
    "                <div tot=\"\">{{day.total | number}}</div>\n" +
    "                <div tot=\"trail1\" ng-show=\"resultInt1 && method.label != 'Sum'\">{{day | trailing:method:resultInt1:'total' | number}}</div>\n" +
    "                <div tot=\"trail2\" ng-show=\"resultInt2 && method.label != 'Sum'\">{{day | trailing:method:resultInt2:'total'| number}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"results-total\" ng-if=\"filtered.length > 1\">\n" +
    "          <hr>\n" +
    "          <div class=\"row day\" ng-repeat=\"type in ['Total', 'Average', 'Maximum', 'Minimum']\">\n" +
    "            <div class=\"col-xs-2\"><b>{{type}}</b></div>\n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row text-success\">\n" +
    "                <div><b>{{getTotal(type, 'new') | number}}</b></div>\n" +
    "                <div ng-show=\"resultInt1 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'new', 'trail1') | number}}</b></div>\n" +
    "                <div ng-show=\"resultInt2 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'new', 'trail2') | number}}</b></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"var-col\">\n" +
    "              <div class=\"row text-primary\">\n" +
    "                <div><b>{{getTotal(type, 'tot') | number}}</b></div>\n" +
    "                <div ng-show=\"resultInt1 && method.label != 'Sum'\"><b>{{getTotal(type, 'tot', 'trail1') | number}}</b></div>\n" +
    "                <div ng-show=\"resultInt2 && method.label != 'Sum'\"><b>{{getTotal(type, 'tot', 'trail2') | number}}</b></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          \n" +
    "        </div>\n" +
    "        \n" +
    "      </div>\n" +
    "      </tab>\n" +
    "      <tab heading=\"Graph\" active=\"tabs[1].active\">\n" +
    "      <div style=\"padding-top: 30px\">\n" +
    "        <div modit-chart=\"chart\"></div>\n" +
    "      </div>\n" +
    "      \n" +
    "      </tab>\n" +
    "      \n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>");
}]);

angular.module("../../../public/app/templates/home-templates/includes/chart-char.js.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/chart-char.js.tpl.html",
    "<canvas id=\"line\" class=\"chart chart-line\" data=\"dataSet\" labels=\"labels\" \n" +
    "    legend=\"true\" series=\"series\" colours=\"chartColors\" options=\"chartOpts\" click=\"onClick\"></canvas> ");
}]);

angular.module("../../../public/app/templates/home-templates/includes/chart-d3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/chart-d3.tpl.html",
    "<!-- <tab heading=\"Graph\" active=\"tabs[1].active\"> -->\n" +
    "<div style=\"padding-top: 30px\">\n" +
    "	<div modit-chart=\"chart\"></div>\n" +
    "</div>\n" +
    "<!-- </tab> -->");
}]);

angular.module("../../../public/app/templates/home-templates/includes/filters.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/filters.tpl.html",
    "<div class=\"row\">\n" +
    "  <div class=\"form-group col-sm-3\">\n" +
    "    <label class=\"form-label\">Metric</label>\n" +
    "    <select class=\"form-control\" ng-model=\"$parent.metric\">\n" +
    "      <option value=\"user\">Users</option>\n" +
    "      <!--  <option value=\"project\">Projects</option>\n" +
    "      <option value=\"org\">Orgs</option> -->\n" +
    "    </select>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"form-group col-sm-3\">\n" +
    "    <label class=\"form-label\">Date Range</label>\n" +
    "    <select class=\"form-control\" ng-model=\"$parent.range\" ng-options=\"o.label for o in $parent.rangeOptions\">\n" +
    "    </select>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"form-group col-sm-3\" ng-show=\"$parent.range.label === 'Custom'\">\n" +
    "    <label class=\"form-label\">Start</label>\n" +
    "    <input type=\"text\" class=\"form-control\" datepicker-popup show-weeks=\"false\" ng-model=\"$parent.range.start\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group col-sm-3\" ng-show=\"$parent.range.label === 'Custom'\">\n" +
    "    <label class=\"form-label\">End</label>\n" +
    "    <input type=\"text\" class=\"form-control\" datepicker-popup show-weeks=\"false\" ng-model=\"$parent.range.end\" />\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../../../public/app/templates/home-templates/includes/secondary-filters.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/secondary-filters.tpl.html",
    "<p>\n" +
    "  <a class=\"btn-link\" ng-click=\"optionsCollapsed = !optionsCollapsed\">\n" +
    "    {{optionsCollapsed ? 'Show options': 'Hide options'}}\n" +
    "  </a>\n" +
    "</p>\n" +
    "<div collapse=\"optionsCollapsed\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"form-group col-sm-3\">\n" +
    "      <label>Trailing Intervals (days)</label>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-6\"><input type=\"number\" class=\"form-control\" ng-model=\"interval1\" min=\"2\"></div>\n" +
    "        <div class=\"col-xs-6\"><input type=\"number\" class=\"form-control\" ng-Model=\"interval2\" min=\"{{interval1 + 1}}\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group col-sm-3\">\n" +
    "      <label>Trailing Method</label>\n" +
    "      <select class=\"form-control\" ng-model=\"$parent.method\" ng-options=\"o.label for o in trailingOptions\">\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group col-sm-2\">\n" +
    "      <div><label>&nbsp;</label></div>\n" +
    "      <button type=\"button\" class=\"btn btn-success\" ng-click=\"query()\">Apply</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../../../public/app/templates/home-templates/includes/table-simple.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/table-simple.tpl.html",
    "\n" +
    "<div ng-show=\"data.$resolved && data.length\" class=\"results\" ng-class=\"{ 'trail1': resultInt1, 'trail2': resultInt2 }\">\n" +
    "  \n" +
    "  <div class=\"results-header\">\n" +
    "    \n" +
    "    <div class=\"row lead\">\n" +
    "      <div class=\"col-xs-2\">Date</div>\n" +
    "      <div class=\"col-xs-2\"></div>\n" +
    "      <div class=\"var-col\">New</div>\n" +
    "      <div class=\"col-xs-2\"></div>\n" +
    "      <div class=\"var-col\">Total</div>\n" +
    "    </div>\n" +
    "  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"results-main\">\n" +
    "    <div class=\"row day\" ng-repeat=\"day in filtered = (data | slice:trail | orderBy:'-date':true) \">\n" +
    "      <div class=\"col-xs-2\">{{day.date | date:'mediumDate'}}</div>\n" +
    "      <div class=\"col-xs-2\"></div>\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-success\">\n" +
    "          <div new=\"\">{{day.new | number}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-2\"></div>\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-primary\">\n" +
    "          <div tot=\"\">{{day.total | number}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../../../public/app/templates/home-templates/includes/table.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/home-templates/includes/table.tpl.html",
    "<!-- <tab heading=\"Table\" active=\"tabs[0].active\"> -->\n" +
    "<div ng-show=\"data.$resolved && data.length\" class=\"results\" ng-class=\"{ 'trail1': resultInt1, 'trail2': resultInt2 }\">\n" +
    "  \n" +
    "  <div class=\"results-header\">\n" +
    "    \n" +
    "    <div class=\"row lead\">\n" +
    "      <div class=\"col-xs-2\">Date</div>\n" +
    "      <div class=\"var-col\">New</div>\n" +
    "      <!-- <div class=\"var-col\">Deleted</div> -->\n" +
    "      <div class=\"var-col\">Total</div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"row\" ng-show=\"resultInt1\">\n" +
    "      <div class=\"col-xs-2\">&nbsp;</div>\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row\">\n" +
    "          <div>1d</div>\n" +
    "          <div>{{resultInt1}}d</div>\n" +
    "          <div ng-show=\"resultInt2\">{{resultInt2}}d</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <!-- <div class=\"var-col\">\n" +
    "        <div class=\"row\">\n" +
    "          <div>1d</div>\n" +
    "          <div>{{resultInt1}}d</div>\n" +
    "          <div ng-show=\"resultInt2\">{{resultInt2}}d</div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row\" ng-show=\"method.label != 'Sum'\">\n" +
    "          <div>1d</div>\n" +
    "          <div>{{resultInt1}}d</div>\n" +
    "          <div ng-show=\"resultInt2\">{{resultInt2}}d</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"results-main\">\n" +
    "    <div class=\"row day\" ng-repeat=\"day in filtered = (data | slice:trail | orderBy:'-date':true) \">\n" +
    "      <div class=\"col-xs-2\">{{day.date | date:'mediumDate'}}</div>\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-success\">\n" +
    "          <div new=\"\">{{day.new | number}}</div>\n" +
    "          <div new=\"trail1\" ng-show=\"resultInt1\" >{{day | trailing:method:resultInt1:'new' | number}}</div>\n" +
    "          <div new=\"trail2\" ng-show=\"resultInt2\">{{day | trailing:method:resultInt2:'new' | number}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <!-- <div class=\"var-col\">\n" +
    "        <div class=\"row text-danger\">\n" +
    "          <div del=\"\">{{day.deleted | number}}</div>\n" +
    "          <div del=\"trail1\" ng-show=\"resultInt1\">{{day | trailing:method:resultInt1:'deleted' | number}}</div>\n" +
    "          <div del=\"trail2\" ng-show=\"resultInt2\">{{day | trailing:method:resultInt2:'deleted' | number}}</div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-primary\">\n" +
    "          <div tot=\"\">{{day.total | number}}</div>\n" +
    "          <div tot=\"trail1\" ng-show=\"resultInt1 && method.label != 'Sum'\">{{day | trailing:method:resultInt1:'total' | number}}</div>\n" +
    "          <div tot=\"trail2\" ng-show=\"resultInt2 && method.label != 'Sum'\">{{day | trailing:method:resultInt2:'total'| number}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"results-total\" ng-if=\"filtered.length > 1\">\n" +
    "    <hr>\n" +
    "    <div class=\"row day\" ng-repeat=\"type in ['Total', 'Average', 'Maximum', 'Minimum']\">\n" +
    "      <div class=\"col-xs-2\"><b>{{type}}</b></div>\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-success\">\n" +
    "          <div><b>{{getTotal(type, 'new') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt1 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'new', 'trail1') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt2 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'new', 'trail2') | number}}</b></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <!--  <div class=\"var-col\">\n" +
    "        <div class=\"row text-danger\">\n" +
    "          <div><b>{{getTotal(type, 'del') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt1 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'del', 'trail1') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt2 && (type !== 'Total' || method.label != 'Sum')\"><b>{{getTotal(type, 'del', 'trail2') | number}}</b></div>\n" +
    "        </div>\n" +
    "      </div> -->\n" +
    "      <div class=\"var-col\">\n" +
    "        <div class=\"row text-primary\">\n" +
    "          <div><b>{{getTotal(type, 'tot') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt1 && method.label != 'Sum'\"><b>{{getTotal(type, 'tot', 'trail1') | number}}</b></div>\n" +
    "          <div ng-show=\"resultInt2 && method.label != 'Sum'\"><b>{{getTotal(type, 'tot', 'trail2') | number}}</b></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    \n" +
    "  </div>\n" +
    "  \n" +
    "</div>\n" +
    "<!-- </tab> -->");
}]);

angular.module("../../../public/app/templates/user-nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/user-nav.tpl.html",
    "  <div class=\"dropdown pull-right navatar\">\n" +
    "    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span>{{user.profile.name}}</span>\n" +
    "      <img modit-thumb=\"user\" thumb-size=\"25\" right>\n" +
    "    </a>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "      <li><a href=\"https://support.mod.it\" target=\"_blank\">Help</a></li>\n" +
    "      <!-- <li><a href=\"//{{API_HOST}}/auth/logout?redirect={{origin}}\" target=\"_self\">Sign out</a></li> -->\n" +
    "      <li><a href=\"//{{API_HOST}}/api/v1/logout?redirect={{origin}}\" target=\"_self\">Sign out</a></li> \n" +
    "    </ul>\n" +
    "  </div>");
}]);

angular.module("../../../public/app/templates/welcome.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../../../public/app/templates/welcome.tpl.html",
    "<h1 class=\"text-center\">Welcome to the Modit Admin Dashboard</h1>\n" +
    "  <h1 class=\"text-center\">\n" +
    "    <!-- <a class=\"btn btn-lg btn-success\" ng-href=\"//{{API_HOST}}/auth/google?redirect={{origin}}\" target=\"_self\">Login with Google</a> -->\n" +
    "    <a class=\"btn btn-lg btn-success\" ng-href=\"//{{API_HOST}}/api/v1/login?redirect={{origin}}\" target=\"_self\">Login with Google</a>\n" +
    "</h1>");
}]);
