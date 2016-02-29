using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using Vidyano.Service;
using Vidyano.Web2;

namespace Websites
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            var routes = RouteTable.Routes;
            routes.MapVidyanoWeb2Route();
            routes.MapVidyanoRoute();
        }
    }
}