using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Xml.Linq;

namespace Websites.Service
{
    public partial class WebsitesEntityModelContainer : DbContext
    {
        private static readonly string ConnectionString;

        static WebsitesEntityModelContainer()
        {
            var webConfigDevelopment = HostingEnvironment.MapPath("~/Web.Development.config");
            if (!File.Exists(webConfigDevelopment))
                return;

            var config = XDocument.Load(webConfigDevelopment);
            var connectionString = config.Root.Element("connectionStrings");
            var websites = connectionString.Elements().FirstOrDefault(e => (string)e.Attribute("name") == "WebsitesEntityModelContainer");
            if (websites != null)
                ConnectionString = (string)websites.Attribute("connectionString");
        }

        public WebsitesEntityModelContainer():
            base(ConnectionString ?? "name=WebsitesEntityModelContainer")
        {
        }
    }
}