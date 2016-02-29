using System.Data.Entity.Core.EntityClient;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Xml.Linq;
using Vidyano.Service;

namespace Websites.Service
{
    public class WebsitesAdvanced: Advanced
    {
        private static readonly string ConnectionString;

        static WebsitesAdvanced()
        {
            var webConfigDevelopment = HostingEnvironment.MapPath("~/Web.Development.config");
            if (!File.Exists(webConfigDevelopment))
                return;

            var config = XDocument.Load(webConfigDevelopment);
            var connectionString = config.Root.Element("connectionStrings");
            var vidyano = connectionString.Elements().FirstOrDefault(e => (string)e.Attribute("name") == "Vidyano");
            if (vidyano != null)
                ConnectionString = (string)vidyano.Attribute("connectionString");
        }

        public override EntityConnection CreateRepositoryConnection(string connectionString)
        {
            return base.CreateRepositoryConnection(ConnectionString ?? connectionString);
        }
    }
}